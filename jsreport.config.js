
module.exports = {
  'name': 'reports',
  'main': 'lib/reports.js',
  'dependencies': ['templates'],
  'optionsSchema': {
    extensions: {
      reports: {
        type: 'object',
        properties: {
          cleanInterval: { type: 'string' },
          cleanThreshold: { type: 'string' }
        }
      }
    }
  }
}
