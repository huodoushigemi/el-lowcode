import { reactive, shallowReactive, watchEffect } from 'vue'
import { MaybeComputedElementRef, unrefElement, useEventListener } from '@vueuse/core'

interface UseDraggableProps {
  dragstart?(e: DragEvent): void
  dragover(el: Element, drag: Element): boolean
  children(el: Element): Element[]
  drop(el: Element, drag: Element, related: Element, type?: 'prev' | 'next'): void
}

export function useDraggable(el: MaybeComputedElementRef, props: UseDraggableProps) {
  const root = () => unrefElement(el) as HTMLElement
  let x = 0, y = 0
  let nearest: [number, HTMLElement, DOMRect, 'T' | 'B' | 'L' | 'R'] | void

  const ret = shallowReactive({
    dragEl: void 0 as Element | undefined,
    dragoverEl: void 0 as Element | undefined,
    data: '',
    dragend
  })

  useEventListener(root, 'dragstart', e => {
    props.dragstart?.(e)
    ret.dragEl = e.target as Element
  })

  useEventListener(root, 'dragover', (e: DragEvent) => {
    const container = root()
    const path = e.composedPath()
    ret.dragoverEl = path.slice(0, path.indexOf(container) + 1).find(e => e instanceof Element ? props.dragover(e as Element, ret.dragEl!) : void 0) as HTMLElement
    if (!ret.dragoverEl) {
      Object.assign(cursor.style, { transform: '', width: '', height: ''})
      return
    }

    e.stopPropagation()
    e.preventDefault()
    if (e.x == x && e.y == y) return
    x = e.x; y = e.y

    const children = props.children(ret.dragoverEl)
    const [, el, rect, dir] = nearest = nearestEl(e.x, e.y, children, ret.dragoverEl)!
    const rect2 = el ? rect : ret.dragoverEl.getBoundingClientRect()
    const size = 6, v = dir == 'T' || dir == 'B'
    Object.assign(cursor.style, el ? {
      transform: `translate(${rect.x - (v ? 0 : size / 2) + (v || dir == 'L' ? 0 : rect.width)}px, ${rect.y - (v ? size / 2 : 0) + (!v || dir == 'T' ? 0 : rect.height)}px)`,
      width: v ? `${rect.width}px` : `${size}px`,
      height: v ? `${size}px` : `${rect.height}px`,
    } : {
      transform: `translate(${rect2.x}px, ${rect2.y}px)`,
      width: `${rect2.width}px`,
      height: `${rect2.height}px`,
    })
  })

  useEventListener(root, 'drop', e => {
    e.stopPropagation()
    e.preventDefault()
    const type = { T: 'prev', B: 'next', L: 'prev', R: 'next' }[nearest[3]]
    props.drop(ret.dragoverEl!, ret.dragEl!, nearest[1], type)
    dragend()
  })

  useEventListener('dragend', dragend)

  function dragend() {
    Object.assign(cursor.style, { transform: '', width: '0px', height: '0px' })
    ret.dragEl = ret.dragoverEl = nearest = void 0
    ret.data = ''
  }

  // drop cursor
  const cursorContainer = Object.assign(document.createElement('div'), { style: 'position: fixed; top: 0; left: 0; pointer-events: none; z-index: 100000' })
  const cursor = Object.assign(document.createElement('div'), { style: 'background: #e6a23c66' })
  cursorContainer.append(cursor)
  document.body.append(cursorContainer)

  return ret
}

function nearestEl(x, y, els: Element[], container: Element) {
  const s1 = getComputedStyle(container)
  const dir = 
    s1.display.includes('flex') ? s1.flexDirection.includes('row') ? 'h' : 'v' :
    s1.display.includes('grid') ? 'h' : // todo
    s1.display.includes('table-row') ? 'h' :
    void 0
  if (dir == 'h') {
    return els.reduce((t, e) => { const dis = distance(x, y, e, e.getBoundingClientRect(), 'h'); return t[0] < dis[0] ? t : dis }, [Infinity] as ReturnType<typeof distance>)
  }
  else if (dir == 'v') {
    return els.reduce((t, e) => { const dis = distance(x, y, e, e.getBoundingClientRect(), 'v'); return t[0] < dis[0] ? t : dis }, [Infinity] as ReturnType<typeof distance>)
  }
  else {
    return els.reduce((t, e) => {
      const dis = distance(x, y, e, e.getBoundingClientRect(), getComputedStyle(e).display.includes('inline') ? 'h' : 'v');
      return t[0] < dis[0] ? t : dis
    }, [Infinity] as ReturnType<typeof distance>)
  }
}

function distance(x, y, el, rect, dir) {
  if (dir == 'h') {
    const y2 = Math.pow(y - (rect.y + rect.height / 2), 2)
    return x < rect.x + rect.width / 2
      ? [Math.sqrt(Math.pow(x - rect.x, 2) + y2), el, rect, 'L']
      : [Math.sqrt(Math.pow(x - rect.right, 2) + y2), el, rect, 'R']
  }
  if (dir == 'v') {
    const x2 = Math.pow(x - (rect.x + rect.width / 2), 2)
    return y < rect.y + rect.height / 2
      ? [Math.sqrt(Math.pow(y - rect.y, 2) + x2), el, rect, 'T']
      : [Math.sqrt(Math.pow(y - rect.bottom, 2) + x2), el, rect, 'B']
  }
}