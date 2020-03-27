require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

export default {
  // mode: 'universal',
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en',
      class:
        'has-aside-left has-aside-mobile-transition has-navbar-fixed-top has-aside-expanded',
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  router: {
    middleware: ['check-auth'],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/global-components.js',
    '~/plugins/lodash.js',
    '~/plugins/vee-validate.js',
    '~/plugins/axios.js',
    '~/plugins/idle-vue.js',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    // 'nuxt-buefy',
    // ['nuxt-buefy', { css: false, materialDesignIcons: false }],
    ['nuxt-buefy', { materialDesignIcons: false }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/proxy-module
    // '@nuxtjs/proxy',
    // Doc: https://auth.nuxtjs.org/guide/setup.html
    // '@nuxtjs/auth'
    // Doc: https://github.com/nuxt-community/universal-storage-module
    '@nuxtjs/universal-storage',
    // Doc: https://www.npmjs.com/package/vue-sweetalert2
    'vue-sweetalert2/nuxt',
    // '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // Doc: https://github.com/nuxt-community/axios-module#options
    // baseURL: 'https://laravel-restful.valet/'
    baseUrl: process.env.API_URL,
    // enable only if proxy can work
    // prefix: '/',
    // proxy: true
  },
  /*
  // proxy does not work on production on spa mode (failed to setup nginx reverse proxy)
  proxy: {
    // '/api/': 'http://ilp-api.valet'
    '/api/': 'https://ilp-api.infinitum.com.my'
  },
  */
  /*
  auth: {
    // Doc: https://www.stephanedoiron.com/posts/user-authentication-with-nuxtjs-and-laravel/
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'token' },
          user: {
            url: 'user/profile',
            method: 'get',
            propertyName: 'data.user'
          }
        },
        tokenRequired: true,
        tokenName: 'Authorization',
        tokenType: 'Bearer'
      }
    },
    // localStorage: true,
    cookie: false,
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  },
  */
  storage: {
    vuex: { namespace: 'storage' },
    cookie: {
      prefix: '',
      options: { path: '/' },
    },
    localStorage: { prefix: 'app.' },
    ignoreExceptions: false,
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
