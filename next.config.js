const withPWA = require('next-pwa')

module.exports = withPWA({
  env: {
    API: 'http://localhost/test/',
  },
  pwa: {
    dest: 'public',
    sw: 'service-worker.js'
  }
})