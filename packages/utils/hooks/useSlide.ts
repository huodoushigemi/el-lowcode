import { computed, ref, Ref, watch, watchEffect } from 'vue'
import { MaybeElementRef, useEventListener, useMagicKeys, useElementHover, useMousePressed, unrefElement } from '@vueuse/core'

const { control } = useMagicKeys()

const count = ref(0)
watchEffect(() => document.body.style.cursor = count.value ? 'w-resize' : '')

interface UseSlideOption {
  min: number
  max: number
  step: number
} 

export function useSlide(el: MaybeElementRef, val: Ref<number>, props: UseSlideOption) {
  const { pressed } = useMousePressed(el)
  const hover = useElementHover(el)

  watch(() => control.value && pressed.value, v => count.value += v ? 1 : -1)
  watch(() => control.value && hover.value, v => unrefElement(el)!.style.cursor = v ? 'w-resize' : '')

  useEventListener(el, 'mousedown', mousedown)

  const _val = computed({
    get: () => val.value == null ? val.value : clamp(val.value),
    set: v => val.value = clamp(v)
  })
  
  const clamp = (v, min = props.min ?? -Infinity, max = props.max ?? Infinity) => Math.max(min, Math.min(max, +(v || 0)))
  
  let sv = 0, sx = 0
  function mousedown(e) {
    if (!control.value) return
    e.preventDefault()
    sv = _val.value || 0
    sx = e.pageX
    const stop = useEventListener('mousemove', e => _val.value = sv + (e.pageX - sx) * (props.step ?? 1))
    useEventListener('mouseup', () => stop(), { once: true })
  }
}

export const vSlide = {
  mounted(el, binding) {
    const [value, option] = binding.value
    useSlide(el, value, option)
  }
}