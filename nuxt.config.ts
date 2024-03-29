import { IncomingMessage, ServerResponse } from 'http'
import { NextFunction } from 'express'
import { HTTPError } from 'crosswalk'
import { defineNuxtConfig } from '@nuxtjs/composition-api'

export default defineNuxtConfig({
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

  router: {
    middleware: ['auth'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/crosswalk',
    '~/plugins/auth',
    { src: '~/plugins/vue-filepond', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/detail-listing',
    '~/components/detail-listing/EditListing',
    '~/components/homepage',
    '~/components/listings',
    '~/components/showing',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/vuetify',
    'cookie-universal-nuxt',
    '@nuxtjs/router-extras',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    ['@nuxtjs/axios', { proxy: true, credentials: true }],
  ],

  vuetify: {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#881226',
          secondary: '#E2D476',
          tertiary: '#F5F0EE',
          background: '#F5F0EE',
        },
        dark: {
          primary: '#881226',
          secondary: '#E2D476',
          tertiary: '#F5F0EE',
          background: '#F5F0EE',
        },
      },
      options: {
        customProperties: true,
      },
    },
  },

  serverMiddleware: [{ path: '/api', handler: '~/api' }],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config!.resolve!.alias!.vue = 'vue/dist/vue.common'
    },
  },

  hooks: {
    render: {
      errorMiddleware(app) {
        app.use(
          (
            err: HTTPError,
            req: IncomingMessage,
            res: ServerResponse,
            next: NextFunction
          ) => {
            if (err && req.url?.startsWith('/api')) {
              // eslint-disable-next-line no-console
              console.error(
                'Unknown runtime error encountered. See stacktrace below for more information\n',
                `URL: ${req.url}\n`,
                `METHOD: ${req.method}\n`,
                err.stack
              )

              res.setHeader('Content-Type', 'application/json')
              res.writeHead(err.code ?? 500)
              return res.end(
                JSON.stringify({
                  name: err.name,
                  message: err.message,
                  stack: err.stack?.split('\n'),
                })
              )
            }

            next(err)
          }
        )
      },
    },
  },
})
