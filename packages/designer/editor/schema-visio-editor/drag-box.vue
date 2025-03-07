<script setup lang="ts">
import { cloneVNode, computed, defineComponent, effectScope, h, inject, mergeProps, shallowRef, watchEffect, watchPostEffect, watchSyncEffect } from 'vue'
import { isArray } from '@vue/shared'
import { useEventListener } from '@vueuse/core'
import { processProps } from 'el-lowcode'
import { createRender } from '@el-lowcode/render'
import { findret, unFn, useDraggable } from '@el-lowcode/utils'
import type { DesignerCtx, BoxProps, DisplayNode } from '../../layout/interface'

type El = Element

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  root: Object
})

defineRender(() => {
  return [
    h(DragGuidMask),
    cloneVNode(Render(props.root!) || h('div') as any, { 'lcd-root': '' }, true),
  ]
})

const lcd = inject('designerCtx') as DesignerCtx

const wm = new WeakMap()
const EMPTY = Symbol()

window.processProps = processProps

const Render = createRender({
  processProps: (_props: any, vars, { provide }) => {
    if (_props[EMPTY]) return _props
    if (!_props.is && _props.vFor) return processProps(_props, vars)
    if (vars.__not_index_0_in_for) return processProps(_props, vars)
    
    if (_props.vFor && vars[_props.vFor[2] || 'index'] != 0) {
      provide({ __not_index_0_in_for: true })
      return mergeProps(processProps(_props, vars), { style: 'pointer-events: none;' })
    }
    
    // return wm.get(_props)?.value || wm.set(_props, computed(() => {
      const node = lcd.keyedNode[_props._id] // todo

      if (node.vSlotName && (node.parent!.config?.getScopeIndex?.(node, vars) ?? 0) != 0) {
        provide({ __not_index_0_in_for: true })
        return mergeProps(processProps(_props, vars), { style: 'pointer-events: none;' })
      }

      node.vars = vars
      let { children, ...props } = node.$data

      const ctx = setup(node)

      if (isArray(children)) {
        if (!children.length) {
          children = [{ ref: ctx.emptyRef, is: 'div', 'lcd-id': props._id, class: 'empty-placeholder', [EMPTY]: 1 } as any]
        }
        else {
          sortAbsolute(children)
        }
      }

      // 合并属性
      props.children = children
      props = mergeProps(ctx.attrs, props)

      return props
    // })).get(_props).value
  }
})

const propsCtx = new WeakMap()

function setup(node: DisplayNode) {
  if (propsCtx.has(node)) return propsCtx.get(node)

  if (node.vSlotName) {
    const ret = { emptyRef: node.emptyRef }
    propsCtx.set(node, ret)
    return ret
  }

  const scope = effectScope()
  scope.run(() => {
    watchPostEffect(() => {
      if (node.detached) {
        propsCtx.delete(node)
        return scope?.stop()
      }
      ;([{ ...node.parent?.children as any }, node.els])

      const xxx = () => node.setAttrs({
        draggable: (!node.isAbs && !node.drag.disabled) + '',
        'lcd-id': node.id
      })

      xxx()
      setTimeout(xxx, 0) // fix: el-table-column | el-descriptions-item | el-tab-pane
    })
  })

  const ret = { emptyRef: node.emptyRef, attrs: { ref: node.ref, key: node.id } }
  propsCtx.set(node, ret)
  return ret
}

let pid

const dragjs = useDraggable(document.body, {
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

// 将 absolute 的元素移动到前面
function sortAbsolute(arr: BoxProps[]) {
  let ii = -1, bool = false
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].style?.position != 'absolute') continue
    if (i - ii > 1) { bool = true; break }
    ii = i
  }
  if (bool) {
    const c1 = arr.filter(e => e.style?.position == 'absolute')
    const c2 = arr.filter(e => e.style?.position != 'absolute')
    arr.length = 0
    arr.push(...c1, ...c2)
  }
}

// 
useEventListener('dragstart', dragStart)
useEventListener('dragend', dragEnd)
if (frameElement) {
  const doc = frameElement.ownerDocument
  useEventListener(doc, 'dragstart', dragStart)
  useEventListener(doc, 'dragend', dragEnd)
}

let dragNode: DisplayNode | undefined, dragged = shallowRef<DisplayNode>()
let activitybarId = ''

function dragStart(e: DragEvent) {
  dragNode = resolveNode(e.target as El)
  dragged.value = dragNode
  if (!dragNode) return
  lcd.draggedId = dragNode?.id
  // activitybarId = designer.state.activitybarId
  // designer.state.activitybarId = 'comp-tree'
  // designer.state.sidebarVisible = true
}

function dragEnd() {
  dragjs.dragend()
  dragNode = void 0
  dragged.value = void 0
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

const dragMaskRects = computed(() => {
  const { to } = dragged.value?.drag || {}
  const putable = to ? Object.values(lcd.keyedNode).filter(e => to.includes(e.is)) : void 0
  // const putable = dragged.value ? Object.values(designer.keyedNode).sort((a, b) => a.deep - b.deep).filter(e => e.insertable(dragged.value!)) : void 0
  return putable?.map(e => e.el!.getBoundingClientRect()).map(e => ({ x: e.x, y: e.y, w: e.width, h: e.height }))
})
const DragGuidMask = defineComponent({
  setup() {
    const root = document.scrollingElement!
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
</script>


<style lang="scss">
.empty-placeholder {
  position: relative;
  padding: 18px;
  align-self: stretch;
  flex: 1;
  overflow: hidden;
  container-type: inline-size;
  container-name: empty-placeholder;
  outline-offset: -1px;
  mix-blend-mode: difference;
  &::after {
    content: 'Drag and drop here';
    opacity: .4;
    text-wrap: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    color: rgba(#e6a23c, .5);
    transform: translate(-50%, -50%);
  }
  &:hover {
    outline: 1px dashed rgba(#e6a23c, .4);
    background: rgba(#e6a23c, .1);
  }
}

@container empty-placeholder (max-width: 128px) {
  .empty-placeholder::after {
    content: '';
    inset: 0;
    opacity: 1;
    transform: unset;
    outline: 1px dashed rgba(#e6a23c, .4);
    outline-offset: -1px;
  }
}

[lcd-root] > .empty-placeholder {
  position: absolute;
  inset: 0;
  font-size: 22px;
  &:hover {
    background: unset;
  }
}
[lcd-absolute-layout] > .empty-placeholder {
  width: 100%;
  height: 100%;
}
[lcd-lock] > * {
  pointer-events: none;
}
[lcd-hidden] {
  display: none !important;
}
</style>
