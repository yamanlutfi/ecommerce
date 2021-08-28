const withPWA = require('next-pwa')

module.exports = withPWA({
  env: {
    API: 'http://localhost/ecommerce/',
  },
  pwa: {
    dest: 'public',
    sw: 'service-worker.js'
  }
})