import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'free-real-estate',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // auth: {},

  vuetify: {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#F5F0EE',
          secondary: '#E2D476',
          tertiary: '#881226',
        },
        dark: {
          primary: '#F5F0EE',
          secondary: '#E2D476',
          tertiary: '#881226',
        },
      },
    },
  },

  serverMiddleware: [{ path: '/api', handler: '~/api' }],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  storybook: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config!.resolve!.alias!.vue = 'vue/dist/vue.common'
    },
  },
}

export default config
