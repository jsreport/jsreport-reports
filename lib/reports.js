/*!
 * Copyright(c) 2016 Jan Blaha
 *
 * Reports extension allows to store rendering output into storage for later use.
 */

const Promise = require('bluebird')
const url = require('url')
const extend = require('node.extend')
const _omit = require('lodash.omit')

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
          throw new Error('Report ' + query._id + ' not found')
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
  }

  configureExpress (app) {
    const serveReport = async (req, res) => {
      const result = await this.reporter.documentStore.collection('reports').find({_id: req.params.id}, req)
      if (result.length !== 1) {
        throw new Error('Report ' + req.params.id + ' not found')
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
        res.setHeader('Content-Disposition', 'attachment; filename="report.' + result.report.fileExtension + '"')
        result.stream.pipe(res)
      }).catch(next)
    })

    app.get('/reports/:id/status', (req, res, next) => {
      this.reporter.documentStore.collection('reports').find({_id: req.params.id}, req).then((result) => {
        if (result.length !== 1) {
          throw new Error('Report ' + req.params.id + ' not found')
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
    if (request.options.reports && request.options.reports.async && !request.options.isChildRequest) {
      request.options.reports.save = true

      const r = await this.reporter.documentStore.collection('reports').insert({name: request.template.name || 'anonymous'}, request)
      let link = '/reports'
      if (request.context.http) {
        link = request.context.http.baseUrl
        response.meta.headers['Location'] = link + '/' + r._id + '/status'
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

  _findOrInsert (request) {
    if (request.options.reports._id) {
      return Promise.resolve(request.options.reports._id)
    }

    return this.reporter.documentStore.collection('reports').insert({name: request.template.name || 'anonymous'}, request).then((r) => r._id)
  }

  async handleAfterRender (request, response) {
    request.options.reports = request.options.reports || {}

    if (!request.options.reports.save || request.options.isChildRequest) {
      this.reporter.logger.debug('Skipping storing report.', request)
      return Promise.resolve()
    }

    const report = Object.assign({}, request.options.reports.mergeProperties || {}, {
      recipe: request.template.recipe,
      name: request.template.name,
      fileExtension: response.meta.fileExtension,
      templateShortid: request.template.shortid,
      creationDate: new Date(),
      contentType: response.meta.contentType
    })

    report._id = await this._findOrInsert(request)
    report.blobName = await this.reporter.blobStorage.write(report._id + '.' + report.fileExtension, response.content, request, response)
    await this.reporter.documentStore.collection('reports').update({_id: report._id}, {$set: _omit(report, '_id')}, request)

    response.meta.reportId = report._id
    response.meta.reportBlobName = report.blobName

    if (request.context.http) {
      response.meta.headers['Permanent-Link'] = `${request.meta.http.baseUrl}/reports/${report._id}/content`
      response.meta.headers['Report-Id'] = response.meta.reportId
      response.meta.headers['Report-BlobName'] = response.meta.reportBlobName
    }

    this.reporter.logger.debug('Report stored as ' + report.blobName, request)
  }

  _defineEntities () {
    this.ReportType = this.reporter.documentStore.registerEntityType('ReportType', {
      _id: {type: 'Edm.String', key: true},
      creationDate: {type: 'Edm.DateTimeOffset'},
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
      }, { readPermissions: req.user._id.toString() } ]
    }
  }
}

module.exports = function (reporter, definition) {
  reporter[definition.name] = new Reports(reporter, definition)
}
