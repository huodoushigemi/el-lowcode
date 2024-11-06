import { Directive, ObjectDirective } from 'vue'
import { MaybeComputedElementRef, unrefElement, useEventListener } from '@vueuse/core'

interface UseListFocusProps {
  target?: HTMLElement
  list?: HTMLElement
  defaultFirst?: boolean
  loop?: boolean
}

export function useListFocus(el: MaybeComputedElementRef, props?: UseListFocusProps) {
  const list = () => unrefElement(props?.list ?? el)!
  const stop = useEventListener(props?.target ?? el as any, 'keydown', e => {
    if (!['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) return
    e.stopPropagation()
    e.preventDefault()
    const i = { ArrowUp: -1, ArrowDown: 1 }[e.key] || 0
    const ul = list()
    const li = ul.querySelector('.focused') ?? ul.querySelector('.selected')
    const curr = li?.getAttribute('data-index') || -1
    let next = ul.querySelector(`[data-index="${+curr + i}"]`)
    if (!next && props?.loop) {
      next = i > 0 ? ul.querySelector(`[data-index="0"]`) : ul.querySelector(`[data-index]:last-child`)
    }
    if (next) {
      ul.classList.add('element-focused')
      li?.classList.remove('focused')
      next.classList.add('focused')
    }
    if (e.key == 'Enter') {
      li?.click()
    }
  }, { capture: true })

  ;(() => {
    if (props?.defaultFirst) {
      const ul = list()
      const li = ul.querySelector('.focused') ?? ul.querySelector('.selected')
      if (li) return
      const next = ul.querySelector(`[data-index="0"]`)
      if (!next) return
      ul.classList.add('element-focused')
      next.classList.add('focused')
    }
  })()
  
  return { stop }
}

export const vListFocus: ObjectDirective<HTMLElement, UseListFocusProps> = {
  mounted(el, binding) {
    ;(el as any).__useListFocus ??= useListFocus(el, binding.value)
  },
  unmounted(el) {
    ;(el as any).__useListFocus.stop()
  }
}