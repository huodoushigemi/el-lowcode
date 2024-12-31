<script setup lang="ts">
import { cloneVNode, computed, defineComponent, effectScope, h, inject, mergeProps, reactive, ref, shallowRef, watch, watchEffect } from 'vue'
import { isArray, isObject } from '@vue/shared'
import { useEventListener } from '@vueuse/core'
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
    h(DragGuidMask),
    cloneVNode(Render(props.root!) || h('div') as any, { 'lcd-root': '', ref: rootEl, onMousedown, onMouseover }, true),
  ]
})

const designer = inject('designerCtx') as DesignerCtx

const wm = new WeakMap()
const EMPTY = Symbol()

const Render = createRender({
  defaultIs: 'Fragment',
  processProps: (_props: any, vars, { provide }) => {
    if (_props[EMPTY]) return _props
    if (!_props.is && _props.vFor) return processProps(_props, vars)
    if (vars.__not_index_0_in_for) return processProps(_props, vars)
    
    if (_props.vFor) {
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

    // add attrs
    watchEffect(() => {
      const el = node.el
      if (!el) return
      el.setAttribute('draggable', (!node.isAbs && !node.drag.disabled) + '')
      el.setAttribute('_id', node.id)
      el.setAttribute('lcd-is', node.is)
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
        onVnodeBeforeMount: () => flag++,
        onVnodeUnmounted: () => {
          if (--flag) return
          propsCtx.delete(node)
          scope?.stop()
          node = scope = boxRef = boxRef.value = elRef = elRef.value = ret = void 0
        },
      },
    }

    propsCtx.set(node, ret)

    return ret
  })
}

const draggable = useDraggable(rootEl, {
  dragstart(e) {
    e.dataTransfer!.setDragImage(new Image(), 0, 0)
  },
  dragover(el) {
    const id = el.getAttribute('lcd-dragover')
    if (!dragNode || !id) return false
    const node = designer.keyedNode[id]
    return node.insertable(dragNode)
  },
  children(el) {
    return [...el.children].filter((el: any) => el.getAttribute('lcd-is'))
  },
  drop(el, drag, related, type) {
    type == 'prev' ? resolveNode(related)!.before(dragNode!) :
    type == 'next' ? resolveNode(related)!.after(dragNode!) :
    designer.keyedNode[el.getAttribute('lcd-dragover')!].insertBefore(dragNode!)
    dragNode!.click()
    dragEnd()
  },
})

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
  dragNode = resolveNode(e.target as HTMLElement)
  dragged.value = dragNode
  if (!dragNode) return
  designer.draggedId = dragNode?.id
  // activitybarId = designer.workbench.activitybarId
  // designer.workbench.activitybarId = 'comp-tree'
  // designer.workbench.sidebarVisible = true
}

function dragEnd() {
  draggable.dragend()
  dragNode = void 0
  dragged.value = void 0
  designer.draggedId = void 0
  // designer.workbench.activitybarId = activitybarId
  // designer.workbench.sidebarVisible = true
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
