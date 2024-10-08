<script setup lang="ts">
import { cloneVNode, computed, defineComponent, h, inject, mergeProps, reactive, ref, shallowRef, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { isArray, isObject } from '@vue/shared'
import { useEventListener } from '@vueuse/core'
import { createRender } from '@el-lowcode/render'
import { mapValues } from '@el-lowcode/utils'
import { parseAttrs } from '../../components/_utils'
import type { DesignerCtx, BoxProps, DisplayNode } from '../interface'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  el: Object
})

defineRender(() => {
  return [
    h(DragLine),
    h(DragGuidMask),
    cloneVNode(Render(props.el!) || h('div'), { 'lcd-root': '' }),
  ]
})

const designer = inject('designerCtx') as DesignerCtx

const wm = new WeakMap()
const EMPTY = Symbol()

const Render = createRender({
  defaultIs: 'div',
  processProps: (_props: any) => {
    if (_props[EMPTY]) return _props
    return wm.get(_props)?.value || wm.set(_props, computed(() => {
      let { children, ...props } = designer.keyedCtx[_props._id].$data

      const ctx = setup(_props)

      if (isArray(children)) {
        if (!children.length) {
          children = [{ ref: ctx.boxRef, is: 'div', class: 'empty-placeholder', [EMPTY]: 1 }]
        }
        else {
          sortAbsolute(children)
        }
      }
      else if (isObject(children)) {
        // todo 插槽
      }

      // 合并属性
      props.children = children
      props = mergeProps(props, ctx.attrs)

      return props
    })).get(_props).value
    
  }
})


const propsCtx = new WeakMap()

function setup(props: BoxProps) {
  if (propsCtx.has(props)) return propsCtx.get(props)
  
  const node = designer.keyedCtx[props._id]
  const elRef = designer.keyedCtx[props._id].ref, boxRef = ref(), nillRef = ref()
  
  useDrop(node, boxRef)
  useDrag(node)
  
  useEventListener(elRef, 'mousedown', e => {
    if (e.button != 0) return
    e.stopPropagation()
    if (designer.dragged) return
    designer.activeId = props._id
  })

  useEventListener(elRef, 'mouseover', e => {
    e.stopPropagation()
    if (designer.dragged) return
    designer.hoverId = props._id
  })

  const ret = {
    boxRef,
    nillRef,
    attrs: {
      ref: elRef,
      get key() { return props._id },
    },
  }

  propsCtx.set(props, ret)
  
  return ret
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
  const target = () => isArray(node.children) ? firstEl()?.parentElement : void 0
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
      const draggables = [...el.children].filter(e => e.getAttribute('draggable') == 'true') as HTMLElement[]

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
    if (dragNode && dragNode == dragRelatedNode) return dragEnd()
    if (!dragNode) return
    e.stopPropagation()

    const el = e.currentTarget as HTMLElement
    const doc = el.ownerDocument
    // const dragNode = _id ? designer.keyedCtx[_id] : new designer.DisplayNode(parseAttrs(designer.widgets[is!]!, designer))
    
    // 自由布局
    if (node.isAbsLayout) {
      // 获取初始坐标
      const nill = doc.createElement('div')
      firstEl().before(nill)
      const { x, y } = nill.getBoundingClientRect()
      nill.remove()
      // 计算坐标
      dragNode.isAbs = true
      dragNode.xy = [e.x - x, e.y - y]
      node.insertBefore(dragNode)
    }
    // 排序布局
    else {
      const before = dragRelatedDir == 'L' || dragRelatedDir == 'T'
      dragRelatedNode
        ? dragRelatedNode[before ? 'before' : 'after'](dragNode)
        : node.insertBefore(dragNode)
    }

    designer.activeId = dragNode.id

    dragEnd()
  })
}

function useDrag(node: DisplayNode) {
  const draggable = () => !node.isAbs && !node.drag.disabled
  const target = () => draggable() ? node.el : void 0
  useEventListener(target, 'dragstart', e => {
    e.stopPropagation()
    dragStart(e)
    e.dataTransfer!.setDragImage(new Image(), 0, 0)
  })
  watchEffect(() => {
    const el = node.el
    if (!el) return
    el.setAttribute?.('draggable', draggable() + '')
    el.setAttribute?.('_id', node.id)
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

function dragStart(e: DragEvent) {
  dragNode = resolveNode(e.target as HTMLElement)
  dragged.value = dragNode
  if (!dragNode) return
  designer.draggedId = dragNode?.id
}

function dragEnd() {
  dragNode = void 0 
  dragged.value = void 0
  designer.draggedId = void 0
  designer.hoverId = void 0
  dragRelatedDir = void 0
  dragLineStyle.width = ''
  dragLineStyle.height = ''
}

function dragover() {
  Object.assign(dragLineStyle, mapValues(dragLineStyle, () => void 0))
}

function resolveNode(el: HTMLElement) {
  if (el.nodeType != 1) return
  const is = el.getAttribute('lcd-is')
  const id = el.getAttribute('_id')
  if (!is && !id) return
  return designer.keyedCtx[id!] || new designer.DisplayNode(parseAttrs(designer.widgets[is!]!, designer))
}

const dragLineStyle = reactive({ transform: '',  width: '', height: '' })
const DragLine = defineComponent({
  setup() {
    return () => h('div', { style: { ...dragLineStyle, position: 'fixed', zIndex: 100, pointerEvents: 'none', background: '#e6a23c66' } })
  }
})

const dragMaskRects = computed(() => {
  const { to } = dragged.value?.drag || {}
  const putable = to ? Object.values(designer.keyedCtx).filter(e => to.includes(e.is)) : void 0
  // const putable = dragged.value ? Object.values(designer.keyedCtx).sort((a, b) => a.deep - b.deep).filter(e => e.insertable(dragged.value!)) : void 0
  return putable?.map(e => e.el!.getBoundingClientRect()).map(e => ({ x: e.x, y: e.y, w: e.width, h: e.height }))
})
const DragGuidMask = defineComponent({
  setup() {
    const root = document.scrollingElement!
    return () => dragMaskRects.value && h('div', { style: `position: fixed; inset: 0; pointer-events: none; line-height: 0; z-index: 99` }, h('svg', { style: 'width: 100%; height: 100%' }, h('path', {
      style: 'pointer-events: auto;',
      fill: 'rgba(0,0,0,.4)',
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
  padding: 18px 72px;
  height: 100%;
  opacity: .4;
  &::after {
    content: 'Drag and drop here';
    text-wrap: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

[lcd-root] > .empty-placeholder {
  position: absolute;
  inset: 0;
}
[lcd-lock] > * {
  pointer-events: none;
}
[lcd-hidden] {
  display: none !important;
}
</style>
