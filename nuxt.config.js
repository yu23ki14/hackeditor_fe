
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/stylesheets/reset.css',
    '@/assets/stylesheets/layout.sass',
    '@/assets/stylesheets/text.sass',
    '@/assets/stylesheets/form.sass',
    '@/assets/stylesheets/lib/font_icon.css'
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
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  
  axios: {
    // proxyHeaders: false
    //baseURL: "http://127.0.0.1:8080/api/v1",
    baseURL: "https://hackeditorapi.herokuapp.com/api/v1",
    retry: { retries: 3 }
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
  server: {
    port: 8081,
    host: '0.0.0.0',
  }
}
