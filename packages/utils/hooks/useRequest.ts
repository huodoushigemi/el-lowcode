import { reactive, watchPostEffect, onBeforeUnmount, toRefs } from 'vue'

type Config<T, A> = Partial<{
  onBefore(params: A): void
  onSuccess(data: T): void
  onError(...args): void
  onFinally(): void
  defaultParams: A
  /**@default false  */
  manual: boolean
  /**@default true */
  trackDep: boolean
}>

type UnFn<T> =
  T extends () => Promise<infer R> ? R :
  T extends () => infer R ? R :
  any

export function useRequest<F extends (...args) => any, T = UnFn<F>, A = Parameters<F>>(reqFn: F, config?: Config<T, A>) {
  config = { trackDep: true, ...config }
  const state = reactive({
    loading: !config.manual,
    data: undefined as T,
    params: <A>[],
    error: undefined,
  })

  let interrupt = () => { }
  async function run(...args: Parameters<F>) {
    const req = reqFn.apply(null, args)
    let interrupted = false
    interrupt()
    await new Promise((s) => s(undefined))
    try {
      config.onBefore?.(args as A)
      state.loading = true
      state.params = args as any
      state.data = await Promise.race([req, new Promise((s, j) => interrupt = () => { interrupted = true; j() })])
      state.loading = false
      config.onSuccess?.(state.data as T)
      return state.data as T
    } catch (e) {
      if (interrupted) return
      state.loading = false
      state.error = e
      if (config.onError) config.onError?.(e)
      else throw e
    } finally {
      config.onFinally?.()
    }
  }

  function refresh() {
    return run(...state.params as any)
  }

  function cancel() {
    interrupt()
  }

  if (!config.manual) {
    if (config.trackDep) {
      let stop = watchPostEffect(() => run.apply(null, config.defaultParams))
      onBeforeUnmount(stop)
    } else {
      Promise.resolve().then(() => run.apply(null, config.defaultParams))
    }
  }

  return {
    ...toRefs(state),
    run,
    refresh,
    cancel
  }
}
