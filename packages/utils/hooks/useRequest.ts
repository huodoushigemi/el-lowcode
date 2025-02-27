import { isPromise } from '@vue/shared'
import { reactive, watchPostEffect, onBeforeUnmount, toRef, watch } from 'vue'

function toRefs(obj) {
  const ret = {}
  for (const k in obj) ret[k] = toRef(() => obj[k])
  return ret
}

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
  function __run(...args: Parameters<F>) {
    interrupt()
    let interrupted = false
    try {
      config.onBefore?.(args as A)
      state.loading = true
      const req = reqFn.apply(null, args)
      state.params = args as any
      return isPromise(req)
        ? Promise.race([req, new Promise((s, j) => interrupt = () => { interrupted = true; j() })])
        : req
    } catch (e) {
      if (interrupted) return
      state.loading = false
      state.error = e
      if (config.onError) config.onError?.(e)
      else throw e
    } finally {
      state.loading = false
      config.onFinally?.()
    }
  }

  async function __after(ret) {
    state.data = isPromise(ret) ? await ret : ret
    state.loading = false
    config.onSuccess?.(state.data as T)
    return state.data
  }

  async function run() {
    return __after(__run(config.defaultParams))
  }

  function refresh() {
    return __after(__run(state.params))
  }

  function cancel() {
    interrupt()
  }

  if (!config.manual) {
    if (config.trackDep) {
      let stop = watch(() => __run(config.defaultParams), __after, { immediate: true, flush: 'post' })
      onBeforeUnmount(stop)
    } else {
      run()
    }
  }

  return {
    ...toRefs(state),
    run,
    refresh,
    cancel
  }
}
