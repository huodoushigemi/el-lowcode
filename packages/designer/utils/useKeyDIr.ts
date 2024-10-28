import { Directive, ObjectDirective } from 'vue'
import { MaybeComputedElementRef, useEventListener } from '@vueuse/core'

interface UseKeyDirProps {
  /**@default 'target' */
  source?: 'target' | 'currentTarget'
}

export function useKeyDir(el: MaybeComputedElementRef, props?: UseKeyDirProps) {
  const opt = { source: 'currentTarget', ...props } as Required<UseKeyDirProps>

  const stop = useEventListener(el as any, 'keydown', e => {
    if (!['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) return
    e.stopPropagation()
    if (e.key != 'Enter') e.preventDefault()
    const i = { ArrowUp: -1, ArrowDown: 1 }[e.key] || 0
    const ul = e[opt.source] as HTMLElement
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
  return { stop }
}

export const vKeyDir: ObjectDirective<HTMLElement, UseKeyDirProps> = {
  mounted(el, binding) {
    ;(el as any).__useKeyDir ??= useKeyDir(el, binding.value)
  },
  unmounted(el) {
    ;(el as any).__useKeyDir.stop()
  }
}