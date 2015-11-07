var assert = require('assert')
var path = require('path')
var supertest = require('supertest')
var Reporter = require('jsreport-core').Reporter

describe('with reports extension', function () {
  var reporter

  beforeEach(function (done) {
    reporter = new Reporter({
      rootDirectory: path.join(__dirname, '../')
    })

    reporter.init().then(function () {
      done()
    }).fail(done)
  })

  it('should insert report to storage', function (done) {
    var request = {
      options: {recipe: 'html', saveResult: true},
      originalUrl: 'http://localhost/api/report',
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
})
