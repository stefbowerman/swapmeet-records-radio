
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: '🔊 SWAPMEET RECORDS 🔊',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The illest radio station on the planet.' },
      { name: 'apple-mobile-web-app-title', content: 'Swapmeet' },
    ],
    link: [
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#111' },
  /*
  ** Global CSS
  */
  css: [
    '~/styles/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/google-analytics', {
        id: 'UA-163433059-1'
      }
    ]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  styleResources: {
    scss: [
      '~/styles/_variables.scss',
      '~/styles/_mixins.scss'
    ]
  }
}
