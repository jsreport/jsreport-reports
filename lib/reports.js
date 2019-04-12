/*!
 * Copyright(c) 2018 Jan Blaha
 *
 * Reports extension allows to store rendering output into storage for later use.
 */

const url = require('url')
const extend = require('node.extend.without.arrays')
const _omit = require('lodash.omit')
const parseDuration = require('parse-duration')

class Reports {
  constructor (reporter, definition) {
    this.reporter = reporter
    this.definition = definition

    this.reporter.afterRenderListeners.add(definition.name, this, this.handleAfterRender)
    this.reporter.beforeRenderListeners.insert(0, definition.name, this, this.handleBeforeRender)
    this.reporter.on('express-configure', this.configureExpress.bind(this))

    this._defineEntities()

    this.reporter.initializeListeners.add(definition.name, () => {
      const col = reporter.documentStore.collection('reports')

      col.beforeRemoveListeners.add('reports', async (query) => {
        const result = await col.find({ _id: query._id })
        if (result.length === 0) {
          throw reporter.createError(`Report ${query._id} not found`, {
            statusCode: 404
          })
        }

        if (typeof reporter.blobStorage.remove !== 'function') {
          reporter.logger.debug('Skipping removing ' + result[0].blobName + ' from storage because configured blobStorage doesn\'t support remove functionality')
          return
        }

        await reporter.blobStorage.remove(result[0].blobName)
        reporter.logger.debug('Report ' + result[0].blobName + ' was removed from storage')
      })
    })

    if (this.reporter.authorization) {
      this.reporter.authorization.findPermissionFilteringListeners.add(definition.name, this._reportsFiltering.bind(this))
    }

    if (definition.options.cleanInterval && definition.options.cleanTreshold) {
      this.reporter.logger.info(`reports extension has enabled old reports cleanup with interval ${definition.options.cleanInterval} and treshold ${definition.options.cleanTreshold}`)
      this.cleanTresholdMS = parseDuration(definition.options.cleanTreshold + '')
      this.cleanIntervalMS = parseDuration(definition.options.cleanInterval + '')

      this.cleanInterval = setInterval(() => this.clean(), this.cleanIntervalMS)
      this.reporter.closeListeners.add('reports', () => clearInterval(this.cleanInterval))
    }
  }

  configureExpress (app) {
    const serveReport = async (req, res) => {
      const result = await this.reporter.documentStore.collection('reports').find({_id: req.params.id}, req)
      if (result.length !== 1) {
        throw this.reporter.createError(`Report ${req.params.id} not found`, {
          statusCode: 404
        })
      }
      const stream = await this.reporter.blobStorage.read(result[0].blobName)
      stream.on('error', function (err) {
        res.error(err)
      })

      if (result[0].contentType) {
        res.setHeader('Content-Type', result[0].contentType)
      }
      if (result[0].fileExtension) {
        res.setHeader('File-Extension', result[0].fileExtension)
      }

      return { stream: stream, report: result[0] }
    }

    app.get('/reports/:id/content', (req, res, next) => {
      serveReport(req, res).then((result) => result.stream.pipe(res)).catch(next)
    })

    app.get('/reports/:id/attachment', (req, res, next) => {
      serveReport(req, res).then((result) => {
        res.setHeader('Content-Disposition', `attachment; filename="${result.report.name}.${result.report.fileExtension}"`)
        result.stream.pipe(res)
      }).catch(next)
    })

    app.get('/reports/:id/status', (req, res, next) => {
      this.reporter.documentStore.collection('reports').find({_id: req.params.id}, req).then((result) => {
        if (result.length !== 1) {
          throw this.reporter.createError(`Report ${req.params.id} not found`, {
            statusCode: 404
          })
        }

        if (result[0].blobName) {
          let link = req.protocol + '://' + req.headers.host
          link += url.parse(req.originalUrl).pathname.replace('/status', '/content')
          res.setHeader('Location', link)
          res.setHeader('Content-Type', 'text/html')
          res.status(201).send("Report is ready, check Location header or download it <a href='" + link + "'>here</a>")
        } else {
          res.send('Report is pending. Wait until 201 response status code')
        }
      }).catch(next)
    })
  }

  async handleBeforeRender (request, response) {
    if (request.options.reports && request.options.reports.async && !request.context.isChildRequest) {
      request.options.reports.save = true

      const r = await this.reporter.documentStore.collection('reports').insert({ name: response.meta.reportName }, request)

      if (request.context.http) {
        response.meta.headers['Location'] = `${request.context.http.baseUrl}/reports/${r._id}/status`
      }

      const asyncRequest = extend(true, {}, _omit(request, 'data'))
      asyncRequest.data = request.data
      asyncRequest.options.reports.async = false
      asyncRequest.options.reports._id = r._id

      request.options = {}
      request.template = {
        content: "Async rendering in progress. Use Location response header to check the current status. Check it <a href='" + response.meta.headers['Location'] + "'>here</a>",
        engine: 'none',
        recipe: 'html'
      }

      process.nextTick(() => {
        this.reporter.logger.info('Starting to render async report ' + asyncRequest.options.reports._id)
        this.reporter.render(asyncRequest).catch((e) => {
          this.reporter.logger.error('Async reports extension render failed ' + e.stack)
        })
      })
    }
  }

  async clean () {
    try {
      this.reporter.logger.debug('Cleaning up old reports')
      const removeOlderDate = new Date(Date.now() - this.cleanTresholdMS)
      const reportsToRemove = await this.reporter.documentStore.collection('reports').find({ creationDate: { $lt: removeOlderDate } })
      this.reporter.logger.debug(`Cleaning old reports with remove ${reportsToRemove.length} reports`)
      await Promise.all(reportsToRemove.map((r) => this.reporter.documentStore.collection('reports').remove({ _id: r._id })))
    } catch (e) {
      this.reporter.logger.error('Failed to clean up old reports', e)
    }
  }

  _findOrInsert (request, response) {
    if (request.options.reports._id) {
      return Promise.resolve(request.options.reports._id)
    }

    return this.reporter.documentStore.collection('reports').insert({ name: response.meta.reportName }, request).then((r) => r._id)
  }

  async handleAfterRender (request, response) {
    request.options.reports = request.options.reports || {}

    if (!request.options.reports.save || request.context.isChildRequest) {
      this.reporter.logger.debug('Skipping storing report.', request)
      return Promise.resolve()
    }

    const report = Object.assign({}, request.options.reports.mergeProperties || {}, {
      recipe: request.template.recipe,
      name: response.meta.reportName,
      fileExtension: response.meta.fileExtension,
      templateShortid: request.template.shortid,
      creationDate: new Date(),
      contentType: response.meta.contentType
    })

    report._id = await this._findOrInsert(request, response)

    const reportBlobName = request.options.reports.blobName ? request.options.reports.blobName : report._id

    report.blobName = await this.reporter.blobStorage.write(`${reportBlobName}.${report.fileExtension}`, response.content, request, response)

    await this.reporter.documentStore.collection('reports').update({_id: report._id}, {$set: _omit(report, '_id')}, request)

    response.meta.reportId = report._id
    response.meta.reportBlobName = report.blobName

    if (request.context.http) {
      response.meta.headers['Permanent-Link'] = `${request.context.http.baseUrl}/reports/${report._id}/content`
      response.meta.headers['Report-Id'] = response.meta.reportId
      response.meta.headers['Report-BlobName'] = response.meta.reportBlobName
    }

    this.reporter.logger.debug('Report stored as ' + report.blobName, request)
  }

  _defineEntities () {
    this.ReportType = this.reporter.documentStore.registerEntityType('ReportType', {
      recipe: {type: 'Edm.String'},
      blobName: {type: 'Edm.String'},
      contentType: {type: 'Edm.String'},
      name: {type: 'Edm.String'},
      fileExtension: {type: 'Edm.String'},
      templateShortid: {type: 'Edm.String'}
    })

    this.reporter.documentStore.registerEntitySet('reports', {entityType: 'jsreport.ReportType'})
  }

  async _reportsFiltering (collection, query, req) {
    if (collection.name === 'reports') {
      if (query.templateShortid) {
        const templates = await this.reporter.documentStore.collection('templates').find({shortid: query.templateShortid})
        if (templates.length !== 1) {
          return
        }

        delete query.readPermissions
      }

      const templates = await this.reporter.documentStore.collection('templates').find({}, req)
      delete query.readPermissions
      query.$or = [{
        templateShortid: { $in: templates.map(function (t) {
          return t.shortid
        })
        }
      }, { readPermissions: req.context.user._id.toString() } ]
    }
  }
}

module.exports = function (reporter, definition) {
  reporter[definition.name] = new Reports(reporter, definition)
}
