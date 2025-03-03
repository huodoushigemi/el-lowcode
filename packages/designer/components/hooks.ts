import { computed, MaybeRefOrGetter, Ref, ref, watch, watchEffect } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { isFunction } from '@vue/shared'

export function refWithWatch<T>(fn: () => T, refreshDep?: MaybeRefOrGetter) {
  const ret = ref(fn()) as Ref<T> & { refresh() }
  ret.refresh = () => ret.value = fn()
  watch(fn, val => ret.value = val)
  if (refreshDep) watch(refreshDep, () => ret.refresh())
  return ret
}

export function useEdit(inputRef, cb) {
  onClickOutside(inputRef, () => cb())
  useEventListener(inputRef, 'keyup', e => e.key == 'Escape' && cb())

  watchEffect(() => {
    if (!inputRef.value) return
    inputRef.value.focus()
    inputRef.value.select()
  })

  return { inputRef }
}

export function unref$<T>(fn: (() => T) | Ref<T>) {
  const ret = isFunction(fn) ? computed(fn) : fn
  return new Proxy(ret, {
    get(target, p, receiver) {
      const v = ret.value?.[p]
      return isFunction(v) ? v.bind(ret.value) : v

    },
    set(target, p, newValue, receiver) {
      ret.value[p] = newValue
      return true
    },
  }) as T
}