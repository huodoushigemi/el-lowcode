import { defineAsyncComponent, h } from 'vue'
import { Process } from '.'

const Moveable = defineAsyncComponent(() => import('vue3-moveable'))

/**
 * absolute 元素 自由拖拽
 */
export const FreeDrag: Process = {
  layer: ({ store: { lcd } }) => {
    return lcd.hover?.isAbs && lcd.hover?.el && h(Moveable, {
          key: lcd.hover.id,
          target: lcd.hover.el,
          draggable: true,
          origin: false,
          hideDefaultLines: true,
          throttleDrag: 1,
          snappable: true,
          elementGuidelines: [lcd.hover.parent, ...lcd.hover.siblings || []]?.map(e => e?.el),
          snapDirections: Object.fromEntries(['top', 'left', 'bottom', 'right', 'center', 'middle'].map(e => [e, true])),
          elementSnapDirections: Object.fromEntries(['top', 'left', 'bottom', 'right', 'center', 'middle'].map(e => [e, true])),
          onDragStart: e => lcd.activeId = lcd.draggedId = lcd.hover.id,
          onDrag: e => e.target.style.transform = e.transform,
          onDragEnd: e => {
            const style = lcd.hover.data.style ??= {}
            style.transform = e.target.style.getPropertyValue('transform')
            lcd.draggedId = undefined
          }
        })
  }
}
