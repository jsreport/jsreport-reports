/*!
 * Copyright(c) 2016 Jan Blaha
 *
 * Reports extension allows to store rendering output into storage for later use.
 */

var _ = require('underscore')
var Promise = require('bluebird')
var url = require('url')
var extend = require('node.extend')

var Reporting = function (reporter, definition) {
  this.reporter = reporter
  this.definition = definition

  this.reporter.afterRenderListeners.add(definition.name, this, Reporting.prototype.handleAfterRender)
  this.reporter.beforeRenderListeners.insert(0, definition.name, this, Reporting.prototype.handleBeforeRender)
  this.reporter.on('express-configure', Reporting.prototype.configureExpress.bind(this))

  this._defineEntities()

  this.reporter.initializeListeners.add(definition.name, function () {
    var col = reporter.documentStore.collection('reports')

    col.beforeRemoveListeners.add('reports', function (query) {
      return col.find({ _id: query._id }).then(function (result) {
        if (result.length === 0) {
          throw new Error('Report ' + query._id + ' not found')
        }

        if (typeof reporter.blobStorage.remove !== 'function') {
          reporter.logger.debug('Skipping removing ' + result[0].blobName + ' from storage because configured blobStorage doesn\'t support remove functionality')
          return
        }

        return reporter.blobStorage.remove(result[0].blobName).then(function () {
          reporter.logger.debug('Report ' + result[0].blobName + ' was removed from storage')
        })
      })
    })
  })

  if (this.reporter.authorization) {
    this.reporter.authorization.findPermissionFilteringListeners.add(definition.name, Reporting.prototype._reportsFiltering.bind(this))
  }
}

Reporting.prototype.configureExpress = function (app) {
  var self = this

  function serveReport (req, res) {
    return self.reporter.documentStore.collection('reports').find({_id: req.params.id}, req).then(function (result) {
      if (result.length !== 1) {
        throw new Error('Report ' + req.params.id + ' not found')
      }
      return self.reporter.blobStorage.read(result[0].blobName).then(function (stream) {
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
      })
    })
  }

  app.get('/reports/:id/content', function (req, res, next) {
    serveReport(req, res).then(function (result) {
      result.stream.pipe(res)
    }).catch(next)
  })

  app.get('/reports/:id/attachment', function (req, res, next) {
    serveReport(req, res).then(function (result) {
      res.setHeader('Content-Disposition', 'attachment; filename="report.' + result.report.fileExtension + '"')
      result.stream.pipe(res)
    }).catch(next)
  })

  app.get('/reports/:id/status', function (req, res, next) {
    self.reporter.documentStore.collection('reports').find({_id: req.params.id}, req).then(function (result) {
      if (result.length !== 1) {
        throw new Error('Report ' + req.params.id + ' not found')
      }

      if (result[0].blobName) {
        var link = req.protocol + '://' + req.headers.host
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

Reporting.prototype.handleBeforeRender = function (request, response) {
  var self = this

  if (request.options.reports && request.options.reports.async && !request.options.isChildRequest) {
    request.options.reports.save = true

    return self.reporter.documentStore.collection('reports').insert({ }, request).then(function (r) {
      var link = request.protocol + '://' + request.headers.host
      link += url.parse(request.originalUrl).pathname.replace('/api/report', '/reports/')
      response.headers['Location'] = link + r._id + '/status'

      var asyncRequest = {}
      asyncRequest.template = extend(true, {}, request.template)
      asyncRequest.options = extend(true, {}, request.options)
      if (request.data) {
        asyncRequest.data = extend(true, {}, request.data)
      }
      asyncRequest.headers = extend(true, {}, request.headers)
      asyncRequest.protocol = request.protocol
      asyncRequest.originalUrl = request.originalUrl
      asyncRequest.user = extend(true, {}, request.user)

      request.options = {}
      request.template = {
        content: "Async rendering in progress. Use Location response header to check the current status. Check it <a href='" + response.headers['Location'] + "'>here</a>",
        engine: 'none',
        recipe: 'html'
      }

      process.nextTick(function () {
        var res = {headers: true}
        asyncRequest.options.reports.async = false
        asyncRequest.options.reports._id = r._id

        self.reporter.logger.info('Starting to render async report ' + asyncRequest.options.reports._id)
        self.reporter.render(asyncRequest, res).catch(function (e) {
          self.reporter.logger.error('Async reports extension render failed ' + e.stack)
        })
      })
    })
  }
}

Reporting.prototype._findOrInsert = function (request) {
  if (request.options.reports._id) {
    return Promise.resolve(request.options.reports._id)
  }

  return this.reporter.documentStore.collection('reports').insert({}, request).then(function (r) {
    return r._id
  })
}

Reporting.prototype.handleAfterRender = function (request, response) {
  var self = this

  request.options.reports = request.options.reports || {}

  if (!request.options.reports.save || request.options.isChildRequest) {
    request.logger.debug('Skipping storing report.')
    return Promise.resolve()
  }

  var report = _.extend(request.options.reports.mergeProperties || {}, {
    recipe: request.template.recipe,
    name: request.template.name,
    fileExtension: response.headers['File-Extension'],
    templateShortid: request.template.shortid,
    creationDate: new Date(),
    contentType: response.headers['Content-Type']
  })

  return this._findOrInsert(request).then(function (_id) {
    report._id = _id
  }).then(function () {
    return self.reporter.blobStorage.write(report._id + '.' + report.fileExtension, response.content, request, response)
  }).then(function (blobName) {
    report.blobName = blobName
    // mongo is crashing when update contains _id
    var update = _.extend({}, report)
    delete update._id
    return self.reporter.documentStore.collection('reports').update({_id: report._id}, {$set: update}, request).then(function () {
      if (request.headers) {
        var link = request.protocol + '://' + request.headers.host
        link += url.parse(request.originalUrl).pathname.replace('/api/report', '/reports/')
        response.headers['Permanent-Link'] = link + report._id + '/content'
      }
      response.headers['Report-Id'] = report._id
      response.headers['Report-BlobName'] = report.blobName
      request.logger.debug('Report stored as ' + report.blobName)
    })
  })
}

Reporting.prototype._defineEntities = function () {
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

Reporting.prototype._reportsFiltering = function (collection, query, req) {
  if (collection.name === 'reports') {
    if (query.templateShortid) {
      return this.reporter.documentStore.collection('templates').find({shortid: query.templateShortid}).then(function (templates) {
        if (templates.length !== 1) {
          return
        }

        delete query.readPermissions
      })
    }

    return this.reporter.documentStore.collection('templates').find({}, req).then(function (templates) {
      delete query.readPermissions
      query.$or = [{
        templateShortid: { $in: templates.map(function (t) {
          return t.shortid
        })
        }
      }, { readPermissions: req.user._id.toString() } ]
    })
  }
}

module.exports = function (reporter, definition) {
  reporter[definition.name] = new Reporting(reporter, definition)
}
