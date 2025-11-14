import { computed, defineAsyncComponent, defineComponent, h, nextTick, ref, Teleport, toRaw, toRef, triggerRef, watch, watchEffect } from 'vue'
import { toReactive, useScroll, useWindowScroll } from '@vueuse/core'
import { Process } from '.'
import type { DesignerCtx } from '../../designer/layout/interface'

const Moveable = defineAsyncComponent(() => import('vue3-moveable'))

/**
 * 元素大小可调整
 */
export const Resizable: Process = {
  layer2: defineComponent({
    props: ['store'],
    setup(props) {
      const moveable = ref()
      const lcd = toReactive(computed(() => props.store.lcd))

      watch(() => lcd.active?.index, async () => {
        await nextTick()
        moveable.value?.updateRect()
      })

      function onDragStart(e) {
        lcd.draggedId = e.target.getAttribute('lcd-id')
      }
      function onDrag(e) {
        e.target.style.transform = e.transform
      }
      function onDragEnd(e) {
        const style = lcd.dragged!.data!.style ??= {}
        ;['transform'].forEach(k => style[k] = e.target.style.getPropertyValue(k))
        lcd.draggedId = undefined
      }
      function onResize({ target, width, height, transform, drag }) {
        const style = lcd.dragged!.data!.style ??= {}
        const setw = width != target.offsetWidth
        const seth = height != target.offsetHeight
        const sett = drag.translate[0] != 0 && drag.translate[1] != 0
        setw && (toRaw(style).width = target.style.width = `${width}px`)
        seth && (toRaw(style).height = target.style.height = `${height}px`)
        sett && (toRaw(style).transform = target.style.transform = transform)
      }
      function onResizeEnd(e) {
        triggerRef(toRef(lcd.dragged!.data, 'style'))
        lcd.draggedId = undefined
      }

      const scroll = useWindowScroll()

      return () => {
        const { active } = props.store.lcd as DesignerCtx
        if (active && !active.isRoot && active.el && !active?.inline && active.is != 'span') {
          return h(Moveable, {
            ref: moveable,
            key: active.id,
            style: `pointer-events: auto; top: -${scroll.y.value}px; left: -${scroll.x.value}px`,
            target: active.el as HTMLElement,
            resizable: true,
            rotatable: false,
            origin: false,
            renderDirections: active.isAbs ? undefined : ['e', 'se', 's'],
            hideDefaultLines: true,
            snappable: true,
            snapGap: false,
            snapElement: true,
            elementGuidelines: [active.parent, ...active?.siblings || []].map(e => e?.el),
            // useResizeObserver: true,
            // useMutationObserver: true,
            onResizeStart: onDragStart, onResize: onResize, onResizeEnd: onResizeEnd,
            onRotateStart: onDragStart, onRotate: onDrag, onRotateEnd: onDragEnd
          })
        }
      }
    },
  })
}
