import { useCurrentElement, useElementSize } from '@vueuse/core'
import { toRaw, useAttrs, watchSyncEffect } from 'vue'

export function useSize() {
  const attrs = useAttrs()
  const { width: w, height: h } = useElementSize(useCurrentElement(), { width: parseInt(attrs.style.width), height: parseInt(attrs.style.height) }, { box: 'border-box' })
  watchSyncEffect(() => {
    toRaw(attrs.style).width = `${w.value}px`
    toRaw(attrs.style).height = `${h.value}px`
  })
  return { w, h }
}
