import { ref, watch, watchEffect } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'

export function refWithWatch<T>(fn: () => T) {
  const ret = ref(fn())
  // @ts-ignore
  watch(fn, val => ret.value = val)
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