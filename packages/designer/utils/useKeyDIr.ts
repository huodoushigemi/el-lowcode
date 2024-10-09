import { Directive } from 'vue'
import { MaybeComputedElementRef, useEventListener } from '@vueuse/core'

export function useKeyDir(el: MaybeComputedElementRef) {
  useEventListener(el as any, 'keydown', e => {
    if (!['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) return
    e.stopPropagation()
    e.preventDefault()
    const i = { ArrowUp: -1, ArrowDown: 1 }[e.key] || 0
    const ul = e.currentTarget as HTMLElement
    const li = ul.querySelector('.focused') ?? ul.querySelector('.selected')
    const curr = li?.getAttribute('data-index') || -1
    const next = ul.querySelector(`[data-index="${+curr + i}"]`)
    if (next) {
      ul.classList.add('element-focused')
      li?.classList.remove('focused')
      next.classList.add('focused')
    }
    if (e.key == 'Enter') {
      li?.click()
    }
  })
}

export const vKeyDir: Directive = {
  mounted(el) {
    useKeyDir(el)
  }
}