var assert = require('assert')
var path = require('path')
var supertest = require('supertest')
var Reporter = require('jsreport-core').Reporter
var should = require('should')

// looks like a current bug in jsreport-express, it should start on random port by default
process.env.PORT = 0

describe('with reports extension', function () {
  var reporter

  beforeEach(function () {
    reporter = new Reporter({
      rootDirectory: path.join(__dirname, '../')
    })

    return reporter.init()
  })

  it.only('should be able to read stored report through link', function (done) {
    var request = {
      options: {recipe: 'html', reports: {save: true}},
      originalUrl: 'http://localhost/api/report',
      logger: reporter.logger,
      reporter: reporter,
      template: {
        name: 'name',
        recipe: 'html'
      },
      headers: {}
    }
    var response = {
      content: new Buffer('Hey'),
      headers: {'Content-Type': 'foo', 'File-Extension': 'foo'}
    }

    reporter.reports.handleAfterRender(request, response).then(function () {
      supertest(reporter.express.app)
        .get('/reports/' + response.headers['Report-Id'] + '/content')
        .expect(200)
        .parse(function (res, cb) {
          res.data = ''
          res.on('data', function (chunk) {
            res.data += chunk
          })
          res.on('end', function () {
            cb(null, res.data)
          })
        })
        .end(function (err, res) {
          if (err) {
            return done(err)
          }

          assert.equal('Hey', res.body)
          done()
        })
    }).catch(done)
  })

  it('should return immediate response with link to status when async specified', function (done) {
    var request = {
      options: {reports: {async: true}},
      logger: reporter.logger,
      template: {content: 'foo', recipe: 'html', engine: 'none'},
      originalUrl: 'http://localhost/api/report',
      headers: {}
    }

    var response = {
      headers: {}
    }

    reporter.reports.handleBeforeRender(request, response).then(function () {
      response.headers.Location.should.be.ok
      done()
    }).catch(done)
  })

  it('should return 200 status code on /status if report is not finished', function (done) {
    reporter.documentStore.collection('reports').insert({}).then(function (r) {
      supertest(reporter.express.app)
        .get('/reports/' + r._id + '/status')
        .expect(200)
        .end(done)
    }).catch(done)
  })

  it('should return 201 status code and Location header on /status if report is finished', function (done) {
    reporter.documentStore.collection('reports').insert({blobName: 'foo'}).then(function (r) {
      supertest(reporter.express.app)
        .get('/reports/' + r._id + '/status')
        .expect(201)
        .expect('Location', /content/)
        .end(done)
    }).catch(done)
  })

  it('should pass inline data into the child rendering request when async specified', function (done) {
    var request = {
      options: {recipe: 'html', reports: {async: true}},
      originalUrl: 'http://localhost/api/report',
      reporter: reporter,
      logger: reporter.logger,
      data: {foo: 'hello'},
      template: {
        name: 'name',
        recipe: 'html'
      },
      headers: {}
    }
    var response = {
      content: new Buffer('Hey'),
      headers: {'Content-Type': 'foo', 'File-Extension': 'foo'}
    }

    reporter.render = function (req) {
      req.data.foo.should.be.eql('hello')
      done()
    }

    reporter.reports.handleBeforeRender(request, response).catch(done)
  })

  it('should not pass any data when undefined is on the input when async specified', function (done) {
    var request = {
      options: {recipe: 'html', reports: {async: true}},
      originalUrl: 'http://localhost/api/report',
      logger: reporter.logger,
      reporter: reporter,
      template: {
        name: 'name',
        recipe: 'html'
      },
      headers: {}
    }
    var response = {
      content: new Buffer('Hey'),
      headers: {'Content-Type': 'foo', 'File-Extension': 'foo'}
    }

    reporter.render = function (req) {
      should.not.exist(req.data)
      done()
    }

    reporter.reports.handleBeforeRender(request, response).catch(done)
  })
})
