import { cloneVNode, computed, defineComponent, effectScope, getCurrentInstance, h, inject, mergeProps, shallowRef, watchEffect, watchPostEffect, watchSyncEffect } from 'vue'
import { useEventListener } from '@vueuse/core'
import { findret, unFn, useDraggable } from '@el-lowcode/utils'
import type { DesignerCtx, BoxProps, DisplayNode } from '../../designer/layout/interface'
import { Process } from '.'

declare module '.' {
  interface ProcessStore {
    dragjs: ReturnType<typeof useDraggable>
    dragged?: DisplayNode
  }
}

type El = Element

/**
 * 文本元素 开启编辑模式
 */
export const Drag: Process = {
  mounted(store) {
    const { lcd } = store

    let pid
    
    store.dragjs = useDraggable(document.body, {
      dragstart(e) {
        if (findret(e.composedPath() as El[], e => e.nodeType == 1 ? resolveNode(e) : void 0)?.isAbs) {
          e.preventDefault()
          e.stopPropagation()
        }
        e.dataTransfer!.setDragImage(new Image(), 0, 0)
      },
      dragover(el, _, { path }) {
        pid = void 0
        if (!dragNode) return false
        if (el.getAttribute('lcd-id')) {
          let node = resolveNode(el)!
          let container = node.dropEls.find(e => path.includes(e))
          if (!container || !node.insertable(dragNode)) {
            node = node.parent!
            container = node?.dropEls.find(e => path.includes(e))
            if (!container || !node.insertable(dragNode)) return
          }
          pid = node.id
          return container
        }
      },
      children() {
        const node = lcd.keyedNode[pid]
        if (node.isAbsLayout) return []
        const ret = node.children$!.map(e => e.el!)
        return ret
      },
      getRect(el) {
        return resolveNode(el)!.getRect()!
      },
      drop(el, _, type, e) {
        try {
          if (el == dragNode!.el) return
          if (!dragNode) return
          const rel = resolveNode(el)!
          if (rel.isAbsLayout && type == 'inner') {
            const rect = el.getBoundingClientRect()
            dragNode.isAbs = true
            dragNode.x = e.x - rect.x
            dragNode.y = e.y - rect.y
            rel.insertBefore(dragNode)
          } else {
            dragNode.isAbs = false
            type == 'prev' ? rel.before(dragNode) :
            type == 'next' ? rel.after(dragNode) :
            type == 'inner' ? rel.insertBefore(dragNode) : void 0
          }
          dragNode.click()
        } finally {
          dragEnd()
        }
      },
      dragend() {
        pid = void 0
      },
    })

    const dragjs = store.dragjs

    watchSyncEffect(() => {
      Object.assign(lcd.state.dragstate, {
        ...dragjs.state,
        drag: dragjs.state.drag?.getAttribute('lcd-id'),
        rel: dragjs.state.rel?.getAttribute('lcd-id'),
      })
    })

    watchSyncEffect(() => {
      Object.assign(dragjs.state, {
        ...lcd.state.dragstate,
        drag: lcd.rootNode.keyed[lcd.state.dragstate.drag]?.el,
        rel: lcd.rootNode.keyed[lcd.state.dragstate.rel]?.el,
      })
    })

    useEventListener(document.body, 'mousedown', e => {
      if (e.button != 0) return
      e.stopPropagation()
      const el = e.composedPath().find(e => resolveNode(e as El)?.selectable)!
      if (!el) return
      const node = resolveNode(el as El)!
      if (lcd.dragged) return
      node.click()
    })

    useEventListener(document.body, 'mouseover', e => {
      if (lcd.dragged) return
      const el = e.composedPath().find(e => resolveNode(e as El)?.selectable)!
      if (!el) return
      const node = resolveNode(el as El)!
      node.hover()
    })

    // 
    useEventListener('dragstart', dragStart)
    useEventListener('dragend', dragEnd)
    if (frameElement) {
      const doc = frameElement.ownerDocument
      useEventListener(doc, 'dragstart', dragStart)
      useEventListener(doc, 'dragend', dragEnd)
    }

    let dragNode: DisplayNode | undefined
    let activitybarId = ''

    function dragStart(e: DragEvent) {
      dragNode = resolveNode(e.target as El)
      // store.dragged = Object.freeze(dragNode)
      store.dragged = Object.freeze(dragNode)
      if (!dragNode) return
      lcd.draggedId = dragNode?.id
      // activitybarId = designer.state.activitybarId
      // designer.state.activitybarId = 'comp-tree'
      // designer.state.sidebarVisible = true
    }

    function dragEnd() {
      dragjs.dragend()
      dragNode = void 0
      store.dragged = void 0
      lcd.draggedId = void 0
      // designer.state.activitybarId = activitybarId
      // designer.state.sidebarVisible = true
    }

    function resolveNode(el: El) {
      if (el.nodeType != 1) return
      // snippet
      const snippet = el.getAttribute('lcd-snippet')
      if (snippet) return new lcd.DisplayNode(unFn(lcd.snippets.find(e => e.id == snippet)?.schema))
      // id
      let id = el.getAttribute('lcd-id')
      if (id) return lcd.keyedNode[id!]
      // is
      const is = el.getAttribute('lcd-is')
      if (is) return new lcd.DisplayNode(lcd.newProps(is!))
    }
  },
  layer: defineComponent({
    props: ['store'],
    setup(props) {
      const root = document.scrollingElement!

      const dragMaskRects = computed(() => {
        const { dragged, lcd } = props.store
        const { to } = dragged?.drag || {}
        const putable = to ? Object.values(lcd.keyedNode).filter(e => to.includes(e.is)) : void 0
        // const putable = dragged.value ? Object.values(designer.keyedNode).sort((a, b) => a.deep - b.deep).filter(e => e.insertable(dragged.value!)) : void 0
        return putable?.map(e => e.el!.getBoundingClientRect()).map(e => ({ x: e.x, y: e.y, w: e.width, h: e.height }))
      })
      
      return () => dragMaskRects.value && h('div', { style: `position: fixed; inset: 0; pointer-events: none; line-height: 0; z-index: 99999` }, h('svg', { style: 'width: 100%; height: 100%' }, h('path', {
        style: 'pointer-events: auto;',
        fill: 'rgba(0,0,0,.6)',
        d: `
          M${root.scrollWidth},0 L0,0 L0,${root.scrollHeight} L${root.scrollWidth},${root.scrollHeight} L${root.scrollWidth},0 Z
          ${dragMaskRects.value.map(e => ` M${e.x},${e.y} h${e.w} v${e.h} H${e.x} Z`).join('')}
          `
      })))
    }
  })
}
