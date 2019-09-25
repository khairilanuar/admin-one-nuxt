// Doc: https://github.com/wesssel/nuxt-unit-testing
// Doc: https://nuxtjs.org/guide/development-tools/
const hooks = require('require-extension-hooks')
const env = require('browser-env')

if (process.env.TEST === 'unit') {
  env()
}

hooks('vue')
  .plugin('vue')
  .push()
hooks(['vue', 'js'])
  .plugin('babel')
  .push()
