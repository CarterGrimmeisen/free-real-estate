import { defineNuxtPlugin, Ref, ssrRef } from '@nuxtjs/composition-api'
import { Agent, Agency, User } from '.prisma/client'

declare module '@nuxt/types' {
  interface Context {
    $auth: Ref<{
      loggedin: boolean
      user:
        | (User & { agentProfile: (Agent & { agency: Agency }) | null })
        | null
    }>
  }
}

const plugin = defineNuxtPlugin((ctx) => {
  ctx.$auth = ssrRef({
    loggedin: false,
    user: null,
  })
})

export default plugin
