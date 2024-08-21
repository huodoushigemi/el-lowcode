<script setup lang="ts">
import { computed, defineComponent, h, inject, mergeProps, nextTick, onBeforeUnmount, reactive, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { isArray, isObject } from '@vue/shared'
import { unrefElement, useEventListener } from '@vueuse/core'
import { createRender } from '@el-lowcode/render'
import { deepClone, execExp } from '@el-lowcode/utils'
import { parseAttrs } from '../../components/_utils'
import { DisplayNode, type DesignerCtx } from '../interface'
import type { BoxProps } from '../..'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  el: Object
})

onBeforeUnmount(() => {
  for (const k in propsCtx) propsCtx[k] = void 0
})

defineRender(() => {
  return [
    h(DragLine),
    Render(props.el!),
  ]
})

const wm = new WeakMap()
const NILL = Symbol(), EMPTY = Symbol()

const Render = createRender({
  defaultIs: 'div',
  processProps: (_props: any) => {
    if (_props[EMPTY]) return _props
    if (_props[NILL]) return _props
    const designer = inject('designerCtx') as DesignerCtx
    const { state } = inject('pageCtx', _props)
    return wm.get(_props)?.value || wm.set(_props, computed(() => {
      let { children, ...props } = _props
  
      const _execExp = (exp) => {
        try {
          return execExp(exp, { state })
        } catch (e) {
          console.error('exec expression error: ', e)
        }
      }

      const ctx = setup(_props, designer)

      if (isArray(children)) {
        if (!children.length) {
          children = [{ ref: ctx.boxRef, is: 'div', class: 'empty-placeholder', [EMPTY]: 1, children }]
        }
        else {
          sortAbsolute(children)
        }
        children = [{ ref: ctx.nillRef, is: 'div', hidden: 1, [NILL]: 1, }, ...children]
      }
      else if (isObject(children)) {
        // 插槽
      }

      // 移除值为 undefuned 的属性
      props = JSON.parse(JSON.stringify(props))
      // 执行表达式
      props = deepClone(props, _execExp)
      // 合并属性
      props = mergeProps(props, { ref: ctx.ref }, ctx.attrs)
      props.children = _execExp(children)
      
      return props
    })).get(_props).value
    
  }
})


const propsCtx = new WeakMap()

function setup(props: BoxProps, designer: DesignerCtx) {
  if (propsCtx.has(props)) propsCtx.get(props)
  
  const elRef = ref(), boxRef = ref(), nillRef = ref()
  
  useDrop(props, elRef, boxRef, nillRef, designer)
  useDrag(props, elRef, designer)
  
  useEventListener(elRef, 'mousedown', e => {
    if (e.button != 0) return
    e.stopPropagation()
    if (designer.draggedId) return
    designer.activeId = props._id
  })

  useEventListener(elRef, 'mouseover', e => {
    e.stopPropagation()
    if (designer.draggedId) return
    designer.hoverId = props._id
  })

  const ret = {
    ref: elRef,
    boxRef,
    nillRef,
    attrs: reactive({
      key: props._id,
      onVnodeBeforeUnmount: () => propsCtx.delete(props)
    }),
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

function useDrop(props: BoxProps, elRef: Ref, emptyRef: Ref<HTMLElement>, nillRef: Ref<HTMLElement>, designer: DesignerCtx) {
  const node = designer.keyedCtx[props._id]
  const target = () => isArray(props.children) ? nillRef.value?.parentElement : void 0
  let x = 0, y = 0
  useEventListener(target, 'dragover', e => {
    if (dragEl?.contains(e.currentTarget as Node)) return
    e.preventDefault()
    e.stopPropagation()

    if (e.x == x && e.y == y) return
    x = e.x
    y = e.y
    
    dragRelated = void 0
    dragRelatedDir = void 0

    const el = e.currentTarget as HTMLElement
    
    // 自由布局
    if (node.isAbsLayout) {
      
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
          dragRelated = draggables[i]
          dragRelatedDir = 'L'
          closestDistance = d
          style = { left: rect.x - 3, top: rect.y, width: 6, height: rect.height }
        }
        // R
        x = rect.x + rect.width; y = rect.y + rect.height / 2
        d = Math.sqrt(Math.pow(x - e.x, 2) + Math.pow(y - e.y, 2))
        if (d < closestDistance) {
          dragRelated = draggables[i]
          dragRelatedDir = 'R'
          closestDistance = d
          style = { left: x - 3, top: rect.y, width: 6, height: rect.height }
        }
        // T
        x = rect.x + rect.width / 2; y = rect.y
        d = Math.sqrt(Math.pow(x - e.x, 2) + Math.pow(y - e.y, 2))
        if (d < closestDistance) {
          dragRelated = draggables[i]
          dragRelatedDir = 'T'
          closestDistance = d
          style = { left: rect.x, top: rect.top - 3, width: rect.width, height: 6 }
        }
        // B
        x = rect.x + rect.width / 2; y = rect.y + rect.height
        d = Math.sqrt(Math.pow(x - e.x, 2) + Math.pow(y - e.y, 2))
        if (d < closestDistance) {
          dragRelated = draggables[i]
          dragRelatedDir = 'B'
          closestDistance = d
          style = { left: rect.x, top: y - 3, width: rect.width, height: 6 }
        }
      })

      if (!rects.length) {
        const { x, y, width, height } = emptyRef.value.getBoundingClientRect()
        style = { left: x, top: y, width, height }
      }

      Object.assign(dragLineStyle, {
        transform: `translate(${style.left}px, ${style.top}px)`,
        width: `${style.width}px`,
        height: `${style.height}px`,
      })
    }
  })

  useEventListener(target, 'drop', async (e) => {
    if (dragEl?.contains(e.currentTarget as Node)) return
    if (dragEl == dragRelated) return
    const is = dragEl?.getAttribute('data-is') ?? e.dataTransfer?.getData('data-is')
    const _id = dragEl?.getAttribute('_id')
    
    if (!is && !_id) return dragEnd()
    e.stopPropagation()

    const el = e.currentTarget as HTMLElement
    const doc = el.ownerDocument
    let dragNode: DisplayNode
    
    // 自由布局
    if (node.isAbsLayout) {
      // 获取初始坐标
      const empty = doc.createElement('div')
      nillRef.value.before(empty)
      const { x, y } = empty.getBoundingClientRect()
      empty.remove()
      // 计算坐标
      dragNode = _id ? designer.keyedCtx[_id] : new designer.DisplayNode(parseAttrs(designer.widgets[is!]!))
      dragNode.data = mergeProps(dragNode.data, { style: { position: 'absolute', transform: `translate(${e.x - x}px, ${e.y - y}px)`, margin: 0 } }) as any
      node.insertBefore(dragNode)
    }
    // 排序布局
    else {
      dragNode = _id ? designer.keyedCtx[_id] : new designer.DisplayNode(parseAttrs(designer.widgets[is!]!))
      const before = dragRelatedDir == 'L' || dragRelatedDir == 'T'
      dragRelated
        ? designer.keyedCtx[dragRelated!.getAttribute('_id')!][before ? 'before' : 'after'](dragNode)
        : node.insertBefore(dragNode)
    }

    nextTick(() => designer.activeId = dragNode.id)

    dragEnd()
  })
}

function useDrag(props: BoxProps, elRef: Ref, designer: DesignerCtx) {
  const node = designer.keyedCtx[props._id]
  const target = () => node.isRoot || node.isAbs ? void 0 : unrefElement<HTMLElement>(elRef)
  useEventListener(target, 'dragstart', e => {
    e.stopPropagation()
    dragStart(e)
    e.dataTransfer!.setDragImage(new Image(), 0, 0)
  })
  watchEffect(() => {
    const el = unrefElement<HTMLElement>(elRef)
    if (!el) return
    el.setAttribute('draggable', (!node.isRoot && !node.isAbs) + '')
    el.setAttribute('_id', props._id)
  })
}

// 
useEventListener('dragstart', dragStart)
useEventListener('dragend', dragEnd)
if (frameElement) {
  const doc = frameElement.ownerDocument
  // useEventListener(doc, 'dragstart', dragStart)
  useEventListener(doc, 'dragend', dragEnd)
}

let dragEl: HTMLElement | undefined
let dragRelated: HTMLElement | undefined
let dragRelatedDir: 'L' | 'R' | 'T' | 'B' | undefined

function dragStart(e: DragEvent) {
  dragEl = e.target as any
}

function dragEnd() {
  dragEl = void 0
  dragRelated = void 0
  dragRelatedDir = void 0
  dragLineStyle.width = ''
  dragLineStyle.height = ''
}

const dragLineStyle = reactive({ transform: '',  width: '', height: '' })
const DragLine = defineComponent({
  setup() {
    return () => h('div', { style: { ...dragLineStyle, position: 'absolute', zIndex: 99, pointerEvents: 'none', background: '#e6a23c66' } })
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
</style>
