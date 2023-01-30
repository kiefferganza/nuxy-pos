import { POSITION } from 'vue-toastification'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TraxionPay V2',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss',
    '@/assets/scss/base/_fonts.scss',
    'animate.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.js',
    '~/plugins/qr-code.js',
    '~/plugins/validate.js',
    '~/plugins/permission.js',
    '~/plugins/v-mask.js',
    '~/plugins/vue-clickaway.js',
    '~/plugins/clickaway.js',
    { src: '~/plugins/datepicker.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/fontawesome',
      {
        suffix: true,
        addCss: true,
        icons: {
          solid: [
            'faSpinner',
            'faHome',
            'faMoneyBills',
            'faBuildingColumns',
            'faChevronRight',
            'faChevronDown',
            'faSignal',
            'faList',
            'faInfo',
            'faPlus',
            'faArrowRightArrowLeft',
            'faAddressCard',
            'faShop',
            'faTrashCan',
            'faLink',
            'faCalendarAlt',
            'faExclamation',
            'faUsersCog',
            'faChartLine',
            'faCircle',
            'faEllipsisVertical',
            'faPenToSquare',
            'faFolderOpen',
            'faRightFromBracket',
            'faListCheck',
            'faLock',
            'faUsers',
            'faLockOpen',
            'faScaleBalanced',
            'faCreditCardAlt',
            'faTriangleExclamation',
            'faArrowUpRightFromSquare',
            'faClockRotateLeft',
            'faHourglass2',
          ],
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'vue-toastification/nuxt',
    'nuxt-route-meta',
    '@nuxt/image',
  ],
  /**
   * Vue toastification options
   */
  toast: {
    draggable: false,
    position: POSITION.BOTTOM_LEFT,
  },
  image: {
    baseURL: process.env.IMAGE_URL,
    // TODO : Integrate s3
    // domains: [process.env.IMAGE_URL],
    // alias: {
    //   coopNet: process.env.IMAGE_URL,
    // },
  },
  axios: {
    // proxy: true
    baseURL: 'http://localhost',
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
    encryption: process.env.ENCRYPTION || false,
    appID: process.env.APP_ID || 0,
    tokenEncryptionPhrase: process.env.TOKEN_ENCRYPTION_PHRASE,
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
