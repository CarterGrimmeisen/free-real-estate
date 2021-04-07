import { Plugin } from '@nuxt/types'
import { typedApi, Options } from 'crosswalk'
import { HTTPVerb } from 'crosswalk/dist/api-spec'
import API from '~/api/api'

const createTypedApi = (options?: Options) => typedApi<API>(options)

declare module '@nuxt/types' {
  interface Context {
    $crosswalk: ReturnType<typeof createTypedApi>
  }
}

const plugin: Plugin = (ctx, inject) => {
  function fetch(
    url: string,
    method: HTTPVerb,
    data: unknown,
    params?: Record<string, string>
  ) {
    return ctx.$axios.$request({
      url,
      method,
      data,
      params,
    })
  }
  inject(
    'crosswalk',
    createTypedApi({
      fetch,
      prefix: '/api',
    })
  )
}

export default plugin
