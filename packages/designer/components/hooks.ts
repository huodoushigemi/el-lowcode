import { ref, watch } from 'vue'

export function refWithWatch<T>(fn: () => T) {
  const ret = ref(fn())
  // @ts-ignore
  watch(fn, val => ret.value = val)
  return ret
}
