const withPWA = require('next-pwa')

module.exports = withPWA({
  env: {
    API: 'https://thingproxy.freeboard.io/fetch/https://ecommerce-sehatq.000webhostapp.com/',
  },
  pwa: {
    dest: 'public',
    sw: 'service-worker.js'
  }
})