<script setup lang="ts">
import { cloneVNode, computed, defineComponent, getCurrentInstance, h, inject, mergeProps, nextTick, onBeforeUnmount, reactive, ref, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { isArray, remove } from '@vue/shared'
import { unrefElement, useEventListener } from '@vueuse/core'
import { createRender } from '@el-lowcode/render'
import { deepClone, execExp, treeUtils } from '@el-lowcode/utils'
import { parseAttrs, sloveConfig } from '../../components/_utils'
import type { DesignerCtx } from '../interface'
import type { BoxProps } from '../../components/type'

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
const REMOVE = Symbol(), NILL = Symbol(), EMPTY = Symbol()

const Render = createRender({
  defaultIs: 'div',
  processProps: (_props: any) => {
    console.log(_props.is, getCurrentInstance());
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
        children = [{ ref: ctx.nillRef, is: 'div', class: 'hidden!', [NILL]: 1, }, ...children]
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
  const config = computed(() => sloveConfig(props))

  const box = computed(() => {
    if (!config.value || config.value.sortablePut == false) return
    if (!isArray(props.children)) return
    return unrefElement(boxRef.value || elRef.value)
  })
  
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
  const target = () => isArray(props.children) ? nillRef.value?.parentElement : void 0
  let x = 0, y = 0
  useEventListener(target, 'dragover', e => {
    if (!dragEl || dragEl.contains(e.currentTarget as Node)) return
    const is = dragEl.getAttribute('data-is')
    const _id = dragEl.getAttribute('_id')
    if (!is && !_id) return

    e.preventDefault()
    e.stopPropagation()

    if (e.x == x && e.y == y) return
    x = e.x
    y = e.y

    const el = e.currentTarget as HTMLElement
    const doc = el.getRootNode() as Document
    const win = doc.defaultView!
    
    // 自由布局
    if (props['data-absolute-layout']) {
      
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

      const rect2 = designer.viewport.getBoundingClientRect()
      Object.assign(dragLineStyle, {
        transform: `translate(${style.left - rect2.left}px, ${style.top - rect2.top}px)`,
        width: `${style.width}px`,
        height: `${style.height}px`,
      })
    }
  })

  useEventListener(target, 'drop', async (e) => {
    if (!dragEl || dragEl.contains(e.currentTarget as Node)) return
    const is = dragEl.getAttribute('data-is')
    const _id = dragEl.getAttribute('_id')
    if (!is && !_id) return
    e.stopPropagation()

    const el = e.currentTarget as HTMLElement
    const doc = el.getRootNode() as Document
    const children = props.children as BoxProps[]
    
    // 自由布局
    if (props['data-absolute-layout']) {
      // 获取初始坐标
      const empty = doc.createElement('div')
      nillRef.value.before(empty)
      const { x, y } = empty.getBoundingClientRect()
      empty.remove()
      // 计算坐标
      let cloned: BoxProps = _id ? doc.querySelector(`[_id='${_id}']`)![REMOVE]() : parseAttrs(designer.widgets[is!]!)
      cloned = mergeProps(cloned, { style: { position: 'absolute', transform: `translate(${e.x - x}px, ${e.y - y}px)`, margin: 0 } }) as any
      children.push(cloned)
      designer.activeId = cloned._id
    }
    // 排序布局
    else {
      const newIndex = dragRelated
        ? children.findIndex(e => e._id == dragRelated.getAttribute('_id')) + (dragRelatedDir == 'L' || dragRelatedDir == 'T' ? 0  : 1)
        : 0
      const isMove = e.currentTarget == dragEl.parentElement
      if (isMove) {
        const oldIndex = children.findIndex(e => e._id == _id)
        if (oldIndex >= newIndex) {
          children.splice(newIndex, 0, children.splice(oldIndex, 1)[0])
        } else {
          children.splice(newIndex - 1, 0, children.splice(oldIndex, 1)[0])
        }
      }
      else {
        const cloned: BoxProps = _id ? doc.querySelector(`[_id='${_id}']`)![REMOVE]() : parseAttrs(designer.widgets[is!]!)
        children.splice(newIndex, 0, cloned)
        designer.activeId = cloned._id
      }
    }

    dragEnd()
  })
}

function useDrag(props: BoxProps, elRef: Ref, designer: DesignerCtx) {
  const target = () => props == designer.root || props.style?.position == 'absolute' ? void 0 : unrefElement<HTMLElement>(elRef)
  useEventListener(target, 'dragstart', e => {
    e.stopPropagation()
    dragStart(e)
    e.dataTransfer!.setDragImage(new Image(), 0, 0)
  })
  watchEffect(() => {
    const el = target()
    if (!el) return
    el.setAttribute('draggable', 'true')
    el.setAttribute('_id', props._id)
    el[REMOVE] = () => (remove(treeUtils.findParent([designer.root], props._id, { key: '_id' })!.children as BoxProps[], props), props)
  })
}

// 
document.addEventListener('dragstart', dragStart)
document.addEventListener('dragend', dragEnd)

let dragEl: HTMLElement | undefined
let dragRelated: HTMLElement
let dragRelatedDir: 'L' | 'R' | 'T' | 'B'

function dragStart(e: DragEvent) {
  dragEl = e.target instanceof HTMLElement ? e.target : void 0
}

function dragEnd() {
  dragEl = void 0
  dragRelated = void 0 as any
  dragLineStyle.width = ''
  dragLineStyle.height = ''
}

const dragLineStyle = reactive({ transform: '',  width: '', height: '' })
const DragLine = defineComponent({
  setup() {
    return () => h('div', { class: 'bg-#E6A23C/40 pointer-events-none z-10', style: { ...dragLineStyle, position: 'absolute' } })
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
