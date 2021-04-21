import { ref, Ref, useAsync, useContext } from '@nuxtjs/composition-api'

export function useCrosswalk() {
  const { $crosswalk } = useContext()

  return $crosswalk
}

type PromiseFn<T> = (...args: any[]) => Promise<T>

export function useRequest<
  T extends PromiseFn<any>,
  U extends T extends PromiseFn<infer R> ? R : never,
  V extends Parameters<T>
>(promiseFn: T): [Ref<U | null>, (...args: V) => Promise<void>] {
  const state = ref<U | null>(null)
  const execute = async (...args: V) => {
    state.value = null
    state.value = await promiseFn(...args)
  }

  return [state, execute]
}

export function useData<
  T extends PromiseFn<any>,
  U extends T extends PromiseFn<infer R> ? R : never,
  V extends Parameters<T>
>(promiseFn: T, ...args: V): Ref<U | null> {
  const state = useAsync(
    () => promiseFn(...args),
    JSON.stringify([promiseFn.name, args])
  )

  return state
}

export * from './auth'
export * from './homes'
export * from './showings'
export * from './user'
export * from './files'
