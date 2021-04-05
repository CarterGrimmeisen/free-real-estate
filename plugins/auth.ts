import { Plugin } from '@nuxt/types'
import { Ref, ssrRef } from '@nuxtjs/composition-api'
import { User } from '.prisma/client'

declare module '@nuxt/types' {
  interface Context {
    $auth: Ref<{
      loggedin: boolean
      user: User | null
      error: boolean
    }>
  }
}

const plugin: Plugin = (ctx) => {
  ctx.$auth = ssrRef({
    loggedin: false,
    user: null,
    error: false,
  })
}

export default plugin
