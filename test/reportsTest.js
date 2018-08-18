const supertest = require('supertest')
const jsreport = require('jsreport-core')
require('should')
const Promise = require('bluebird')

describe('with reports extension', () => {
  let reporter

  beforeEach(() => {
    reporter = jsreport({ tasks: { strategy: 'in-process' } })
    reporter.use(require('../')())
    reporter.use(require('jsreport-express')())

    return reporter.init()
  })

  afterEach(() => reporter.close())

  it('should be able to read stored report through link', async () => {
    const request = {
      options: { reports: {save: true} },
      template: {
        engine: 'none',
        content: 'hello',
        name: 'name',
        recipe: 'html'
      }
    }

    const response = await reporter.render(request)

    return supertest(reporter.express.app)
      .get('/reports/' + response.meta.reportId + '/content')
      .expect(200)
      .parse((res, cb) => {
        res.data = ''
        res.on('data', (chunk) => (res.data += chunk))
        res.on('end', () => cb(null, res.data))
      })
      .expect((res) => {
        res.body.should.be.eql('hello')
      })
  })

  it('should return immediate response with link to status when async specified', async () => {
    const request = {
      options: {reports: {async: true}},
      template: {content: 'foo', recipe: 'html', engine: 'none'},
      context: { http: { baseUrl: 'http://localhost' } }
    }

    const response = await reporter.render(request)
    response.content.toString().should.containEql('Async rendering in progress')
    response.meta.headers['Location'].should.be.ok()
  })

  it('should return 200 status code on /status if report is not finished', async () => {
    const r = await reporter.documentStore.collection('reports').insert({name: 'foo'})
    return supertest(reporter.express.app)
      .get('/reports/' + r._id + '/status')
      .expect(200)
  })

  it('should return 201 status code and Location header on /status if report is finished', async () => {
    const r = await reporter.documentStore.collection('reports').insert({name: 'foo', blobName: 'foo'})
    return supertest(reporter.express.app)
      .get('/reports/' + r._id + '/status')
      .expect(201)
      .expect('Location', /content/)
  })

  it('should pass inline data into the child rendering request when async specified', () => {
    const request = {
      options: {recipe: 'html', reports: {async: true}},
      data: {foo: 'hello'},
      template: {
        name: 'name',
        recipe: 'html'
      }
    }

    return new Promise((resolve, reject) => {
      reporter.beforeRenderListeners.add('test', (req) => {
        if (req.options.reports && req.options.reports.async) {
          return
        }

        if (req.data.foo !== 'hello') {
          return reject(new Error('not propagated'))
        }

        resolve()
      })

      reporter.render(request)
    })
  })

  it('should not pass any data when undefined is on the input when async specified', () => {
    const request = {
      options: {recipe: 'html', reports: {async: true}},
      template: {
        name: 'name',
        recipe: 'html'
      }
    }

    return new Promise((resolve, reject) => {
      reporter.beforeRenderListeners.add('test', (req) => {
        if (req.options.reports && req.options.reports.async) {
          return
        }

        if (req.data) {
          return reject(new Error('Data should not be passed'))
        }

        resolve()
      })

      reporter.render(request)
    })
  })
})

describe('with reports extension and clean enabled', () => {
  let reporter

  beforeEach(() => {
    reporter = jsreport({ tasks: { strategy: 'in-process' } })
    reporter.use(require('../')({
      cleanInterval: '100ms',
      cleanTreshold: '1ms'
    }))

    return reporter.init()
  })

  afterEach(() => reporter.close())

  it('should remove old reports', async () => {
    await reporter.render({ template: { content: 'foo', engine: 'none', recipe: 'html' }, options: { reports: { save: true } } })
    await Promise.delay(100)
    const reports = await reporter.documentStore.collection('reports').find({})
    reports.should.have.length(0)
  })
})

describe('with reports extension and clean enabled but long treshold', () => {
  let reporter

  beforeEach(() => {
    reporter = jsreport({ tasks: { strategy: 'in-process' } })
    reporter.use(require('../')({
      cleanInterval: '100ms',
      cleanTreshold: '1d'
    }))

    return reporter.init()
  })

  afterEach(() => reporter.close())

  it('should remove old reports', async () => {
    await reporter.render({ template: { content: 'foo', engine: 'none', recipe: 'html' }, options: { reports: { save: true } } })
    await Promise.delay(100)
    const reports = await reporter.documentStore.collection('reports').find({})
    reports.should.have.length(1)
  })
})
