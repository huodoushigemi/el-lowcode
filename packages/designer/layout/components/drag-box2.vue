<script setup lang="ts">
import { cloneVNode, computed, defineComponent, effectScope, h, inject, mergeProps, reactive, ref, shallowRef, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { isArray, isObject } from '@vue/shared'
import {unrefElement, useEventListener } from '@vueuse/core'
import { processProps } from 'el-lowcode'
import { createRender } from '@el-lowcode/render'
import { mapValues, unFn, useDraggable } from '@el-lowcode/utils'
import type { DesignerCtx, BoxProps, DisplayNode } from '../interface'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  root: Object
})

const rootEl = ref()

defineRender(() => {
  return [
    // h(DragLine),
    // h(DragGuidMask),
    cloneVNode(Render(props.root!) || h('div') as any, { 'lcd-root': '', ref: rootEl, onMousedown, onMouseover }),
  ]
})

useDraggable(rootEl, {
  dragover(el, drag) {
    const id = el.getAttribute('lcd-dragover')
    if (!id) return false
    const node1 = designer.keyedNode[id], node2 = resolveNode(drag)!
    return node1.insertable(node2)
  },
  children(el) {
    return [...el.children].filter((el: any) => el.getAttribute('lcd-is'))
  },
  drop(el, drag, related, type) {
    const dragNode = resolveNode(drag)!
    type == 'prev' ? resolveNode(related)!.before(dragNode) : resolveNode(related)!.after(dragNode)
  },
})

const designer = inject('designerCtx') as DesignerCtx

const wm = new WeakMap()
const EMPTY = Symbol()

const Render = createRender({
  defaultIs: 'Fragment',
  processProps: (_props: any, vars, { provide }) => {
    if (_props[EMPTY]) return _props
    if (!_props.is && _props.$?.for) return processProps(_props, vars)
    if (vars.__not_index_0_in_for) return processProps(_props, vars)
    
    if (_props.$?.for) {
      const node = new designer.DisplayNode(_props)
      node.vars = vars
      if (node.indexInFor > 0) {
        provide({ __not_index_0_in_for: true })
        return node.processProps(vars)
      }
    }
    
    // return wm.get(_props)?.value || wm.set(_props, computed(() => {
      const node = designer.keyedNode[_props._id] // todo
      node.vars = vars
      let { children, ...props } = node.$data

      const ctx = setup(node)

      if (isArray(children)) {
        if (!children.length) {
          children = [{ ref: ctx.boxRef, is: 'div', class: 'empty-placeholder', [EMPTY]: 1 } as any]
        }
        else {
          sortAbsolute(children)
        }
      }

      // 合并属性
      props.children = children
      props = mergeProps(props, ctx.attrs)

      return props
    // })).get(_props).value
  }
})

let count = 0

const propsCtx = new WeakMap()

function setup(node: DisplayNode) {
  if (propsCtx.has(node)) return propsCtx.get(node)
  
  let scope = effectScope()
  
  return scope.run(() => {
    let elRef = node.ref, boxRef = ref()

    // useDrop(node, boxRef)
    // useDrag(node)
  
    // add attrs
    watchEffect(() => {
      const el = node.el
      if (!el) return
      el.setAttribute('draggable', (!node.isAbs && !node.drag.disabled) + '')
      el.setAttribute('_id', node.id)
      el.setAttribute('lcd-is', node.is)
      // el.parentElement('lcd-dragover', )
    })

    watch(() => node.children?.[0]?.el?.parentElement ?? boxRef.value, (el: Element, old) => {
      if (!el) return
      el.setAttribute('lcd-dragover', node.id)
    })

    let flag = 0

    let ret = {
      boxRef,
      attrs: {
        ref: elRef,
        key: count++,
        // _id: node.id,
        // draggable: true,
        // 'lcd-is': node.is,
        onVnodeBeforeMount: () => flag++,
        onVnodeUnmounted: () => {
          if (--flag) return
          propsCtx.delete(node)
          scope?.stop()
          node = scope = boxRef = boxRef.value = elRef = elRef.value = ret = void 0
          node = void 0
          console.log('um');
        },
      },
    }

    propsCtx.set(node, ret)

    return ret
  })
}

function onMousedown(e: MouseEvent) {
  if (e.button != 0) return
  e.stopPropagation()
  const el = e.composedPath().find(e => resolveNode(e as HTMLElement)?.selectable)!
  const node = resolveNode(el as HTMLElement)!
  if (designer.dragged) return
  node.click()
}

function onMouseover(e: MouseEvent) {
  if (designer.dragged) return
  e.stopPropagation()
  const el = e.composedPath().find(e => resolveNode(e as HTMLElement)?.selectable)!
  const node = resolveNode(el as HTMLElement)!
  node.hover()
}

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

function useDrop(node: DisplayNode, emptyRef: Ref<HTMLElement>) {
  const firstEl = () => node.children![0]?.el ?? emptyRef.value
  const target = () => node.children ? firstEl()?.parentElement : void 0
  let x = 0, y = 0
  useEventListener(target, 'dragover', e => {
    if (!dragNode) return
    if (!node.insertable(dragNode)) return

    e.preventDefault()
    e.stopPropagation()

    if (e.x == x && e.y == y) return
    x = e.x
    y = e.y
    
    dragRelatedDir = void 0
    dragRelatedNode = void 0

    const el = e.currentTarget as HTMLElement
    
    // 自由布局
    if (node.isAbsLayout) {
      const rect = el.getBoundingClientRect()
      Object.assign(dragLineStyle, {
        transform: `translate(${rect.x}px, ${rect.y}px)`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      })
    }
    // 排序布局
    else {
      const draggables = [...el.children].filter(e => e.getAttribute('lcd-is')) as HTMLElement[]

      // 查找距离 xy 最近的元素
      const rects = draggables.map(e => e.getBoundingClientRect())
      let closestDistance = Infinity, style = {}
      rects.forEach((rect, i) => {
        let x = 0, y = 0, d = 0
        // L
        x = rect.x; y = rect.y + rect.height / 2
        d = Math.sqrt(Math.pow(x - e.x, 2) + Math.pow(y - e.y, 2))
        if (d < closestDistance) {
          dragRelatedDir = 'L'
          dragRelatedNode = resolveNode(draggables[i])
          closestDistance = d
          style = { left: rect.x - 3, top: rect.y, width: 6, height: rect.height }
        }
        // R
        x = rect.x + rect.width; y = rect.y + rect.height / 2
        d = Math.sqrt(Math.pow(x - e.x, 2) + Math.pow(y - e.y, 2))
        if (d < closestDistance) {
          dragRelatedDir = 'R'
          dragRelatedNode = resolveNode(draggables[i])
          closestDistance = d
          style = { left: x - 3, top: rect.y, width: 6, height: rect.height }
        }
        // T
        x = rect.x + rect.width / 2; y = rect.y
        d = Math.sqrt(Math.pow(x - e.x, 2) + Math.pow(y - e.y, 2))
        if (d < closestDistance) {
          dragRelatedDir = 'T'
          dragRelatedNode = resolveNode(draggables[i])
          closestDistance = d
          style = { left: rect.x, top: rect.top - 3, width: rect.width, height: 6 }
        }
        // B
        x = rect.x + rect.width / 2; y = rect.y + rect.height
        d = Math.sqrt(Math.pow(x - e.x, 2) + Math.pow(y - e.y, 2))
        if (d < closestDistance) {
          dragRelatedDir = 'B'
          dragRelatedNode = resolveNode(draggables[i])
          closestDistance = d
          style = { left: rect.x, top: y - 3, width: rect.width, height: 6 }
        }
      })

      if (!rects.length) {
        if (emptyRef.value) {
          const { x, y, width, height } = emptyRef.value.getBoundingClientRect()
          style = { left: x, top: y, width, height }
        } else {
          const nill = Object.assign(firstEl().ownerDocument.createElement('div'), { style: 'min-width: 3px; min-height: 3px' })
          firstEl().before(nill)
          const { x, y, width, height } = nill.getBoundingClientRect()
          nill.remove()
          style = { left: x, top: y, width, height }
        }
      }

      Object.assign(dragLineStyle, {
        transform: `translate(${style.left}px, ${style.top}px)`,
        width: `${style.width}px`,
        height: `${style.height}px`,
      })
    }
  })

  useEventListener(target, 'drop', async (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (dragNode && dragNode == dragRelatedNode) return dragEnd()
    if (!dragNode) return

    const el = e.currentTarget as HTMLElement
    const doc = el.ownerDocument
    
    // 自由布局
    if (node.isAbsLayout) {
      // 获取初始坐标
      const nill = doc.createElement('div')
      firstEl().before(nill)
      const { x, y } = nill.getBoundingClientRect()
      nill.remove()
      // 计算坐标
      dragNode.isAbs = true
      dragNode.x = e.x - x
      dragNode.y = e.y - y
      node.insertBefore(dragNode)
    }
    // 排序布局
    else {
      const before = dragRelatedDir == 'L' || dragRelatedDir == 'T'
      dragRelatedNode
        ? dragRelatedNode[before ? 'before' : 'after'](dragNode)
        : node.insertBefore(dragNode)
    }

    dragNode.click()

    dragEnd()
  })
}

function useDrag(node: DisplayNode) {
  useEventListener(() => node.el && !node.isAbs && !node.drag.disabled ? node.el : void 0, 'dragstart', e => {
    e.stopPropagation()
    dragStart(e)
    e.dataTransfer!.setDragImage(new Image(), 0, 0)
  })
}

// 
useEventListener('dragstart', dragStart)
useEventListener('dragend', dragEnd)
useEventListener('dragover', dragover)
if (frameElement) {
  const doc = frameElement.ownerDocument
  useEventListener(doc, 'dragend', dragEnd)
  useEventListener(doc, 'dragstart', dragStart)
  useEventListener( doc, 'dragover', dragover)
}

let dragNode: DisplayNode | undefined, dragged = shallowRef<DisplayNode>()
let dragRelatedDir: 'L' | 'R' | 'T' | 'B' | undefined
let dragRelatedNode: DisplayNode | undefined
let activitybarId = ''

function dragStart(e: DragEvent) {
  dragNode = resolveNode(e.target as HTMLElement)
  dragged.value = dragNode
  if (!dragNode) return
  designer.draggedId = dragNode?.id
  activitybarId = designer.workbench.activitybarId
  // designer.workbench.activitybarId = 'comp-tree'
  // designer.workbench.sidebarVisible = true
}

function dragEnd() {
  dragNode = void 0
  dragged.value = void 0
  dragRelatedNode = void 0
  designer.draggedId = void 0
  dragRelatedDir = void 0
  dragLineStyle.width = ''
  dragLineStyle.height = ''
  // designer.workbench.activitybarId = activitybarId
  // designer.workbench.sidebarVisible = true
}

function dragover() {
  Object.assign(dragLineStyle, mapValues(dragLineStyle, () => void 0))
}

function resolveNode(el: Element) {
  if (el.nodeType != 1) return
  const is = el.getAttribute('lcd-is')
  const id = el.getAttribute('_id')
  const snippet = el.getAttribute('lcd-snippet')
  if (is || id) {
    return designer.keyedNode[id!] || new designer.DisplayNode(designer.newProps(is!))
  }
  else if (snippet) {
    const data = unFn(designer.snippets.find(e => e.id == snippet)?.schema)
    return new designer.DisplayNode(data)
  }
}

const dragLineStyle = reactive({ transform: '',  width: '', height: '' })
const DragLine = defineComponent({
  setup() {
    return () => h('div', { style: { ...dragLineStyle, position: 'fixed', top: 0, left: 0, zIndex: 100000, pointerEvents: 'none', background: '#e6a23c66' } })
  }
})

const dragMaskRects = computed(() => {
  const { to } = dragged.value?.drag || {}
  const putable = to ? Object.values(designer.keyedNode).filter(e => to.includes(e.is)) : void 0
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
[lcd-lock] > * {
  pointer-events: none;
}
[lcd-hidden] {
  display: none !important;
}
</style>
