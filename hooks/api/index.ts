import { Ref, UnwrapRef, useContext } from '@nuxtjs/composition-api'
import { useAsyncState } from '@vueuse/core'
import { typedApi } from 'crosswalk'
import { HTTPVerb } from '~/../crosswalk/dist/api-spec'
import API from '~/api/api'

export function fetch(
  url: string,
  method: HTTPVerb,
  data: unknown,
  params?: Record<string, string>
) {
  const { $axios } = useContext()

  return $axios.$request({
    url,
    method,
    data,
    params,
  })
}

export function useCrosswalk() {
  return typedApi<API>({ prefix: '/api', fetch })
}

export function useRequest<T>(
  promise: Promise<T>,
  initialState?: T,
  delay?: number,
  catchFn?: (e: Error) => void
): [state: Ref<UnwrapRef<T>>, ready: Ref<boolean>] {
  const { state, ready } = useAsyncState(
    promise,
    initialState ?? ({} as T),
    delay,
    catchFn
  )
  return [state, ready]
}

export * from './auth'
export * from './homes'
export * from './showings'
export * from './user'
