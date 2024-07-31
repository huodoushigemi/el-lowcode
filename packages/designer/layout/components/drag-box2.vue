<script setup lang="ts">
const props = defineProps({
  el: Object
})

onBeforeUnmount(() => {
  for (const k in propsCtx) propsCtx[k] = void 0
})

defineRender(() => {
  return [
    Render(props.el!),
    h(DragLine)
  ]
})
</script>

<script lang="ts">
import { computed, defineComponent, h, inject, mergeProps, nextTick, onBeforeUnmount, reactive, ref, toRef, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { isArray, remove } from '@vue/shared'
import { computedEager, unrefElement, useEventListener } from '@vueuse/core'
// import { useSortable } from '@vueuse/integrations/useSortable'
import { createRender } from '@el-lowcode/render'
import { deepClone, execExp, treeUtils } from '@el-lowcode/utils'
import { parseAttrs, sloveConfig } from '../../components/_utils'
import type { DesignerCtx } from '../interface'
import type { BoxProps } from '../../components/type'

const wm = new WeakMap()
const REMOVE = Symbol()

const Render = createRender({
  defaultIs: 'div',
  processProps: (_props: any) => {
    if (_props.class?.includes('drag-wrapper')) return _props
    const designer = inject('designerCtx') as DesignerCtx
    // const { state } = inject('pageCtx', _props)
    return wm.get(_props)?.value || wm.set(_props, computed(() => {
      // console.log(_props)
      const { state } = designer.root
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
          children = [{ ref: ctx.boxRef, is: 'div', class: 'drag-wrapper empty-placeholder', children }]
        }
        else {
          sortAbsolute(children)
        }
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
  
  const elRef = ref(), boxRef = ref()
  const config = computed(() => sloveConfig(props))
  const absolute = computed(() => props.style?.position == 'absolute')
  const absoluteLayout = () => props['data-absolute-layout']

  let cloned: HTMLElement

  const box = computed(() => {
    if (!config.value || config.value.sortablePut == false) return
    if (!isArray(props.children)) return
    return unrefElement(boxRef.value || elRef.value)
  })

  watch(elRef, el => {
    if (!el) return
    el[REMOVE] = () => (remove(treeUtils.findParent([designer.root], props._id, { key: '_id' })!.children as BoxProps[], props), props)
  })
  
  let sortable
  // watch(() => absoluteLayout() ? void 0 : box.value, el => {
  // watch(box, el => {
  //   sortable?.stop()
  //   if (!el) return
  //   if (props['data-absolute-layout']) return
  //   const children = () => props.children as BoxProps[]
  //   sortable = useSortable(el, children, {
  //     group: 'shared',
  //     animation: 150,
  //     draggable: '.drag',
  //     // filter: '.moveable',
  //     ghostClass: 'ghostClass',
  //     invertSwap: true,
  //     // dataIdAttr: '_id',
  //     onAdd(e) {
  //       console.log({...e}, props);
  //       if (props['data-absolute-layout']) {
  //         return e.item.remove()
  //       }
  //       const si = children().length ? [...e.to.children].findIndex(e => e.getAttribute('_id') == children()[0]._id) : e.to.children.length
  //       if (e.pullMode == 'clone') {
  //         e.item.remove()
  //         const is = e.item.getAttribute('data-is')!
  //         if (!is) return
  //         const cloned = parseAttrs(designer.widgets[is]!)
  //         children().splice(e.newIndex! - si, 0, cloned)
  //         designer.activeId = cloned._id
  //       } else {
  //         e.item.remove()
  //         const cloned = e.item[REMOVE]()
  //         children().splice(e.newIndex! - si, 0, cloned)
  //       }
  //     },
  //     onStart(e) {
  //       const i = children().findIndex(item => item._id == e.item.getAttribute('_id'))
  //       designer.draggedId = children()[i]._id
  //       cloned = e.item.cloneNode(true) as HTMLElement
  //       cloned.classList.remove('ghostClass', 'drag')
  //       cloned.classList.add('outline-1', 'outline-solid', 'outline-[--el-color-primary]', 'outline-offset--1')
  //       cloned.removeAttribute('draggable')
  //       cloned.removeAttribute('_id')
  //       e.item.parentElement!.insertBefore(cloned, e.item)
  //     },
  //     onEnd(e) {
  //       cloned.remove()
  //       designer.draggedId = undefined
  //       // 处理 sortablejs 与 moveable 拖动冲突问题
  //       for (const el of [...e.from.children, ...e.to.children]) {
  //         const x = el.style.getPropertyValue('--x'), y = el.style.getPropertyValue('--y')
  //         if (x && y) el.style.setProperty('transform', `translate(${x}, ${y})`)
  //       }
  //     },
  //     onUpdate(e) {
  //       const si = e.oldIndex! - children().findIndex(item => item._id == e.item.getAttribute('_id'))
  //       const newIndex = e.newIndex! - si, oldIndex = e.oldIndex! - si
  //       const node = children().splice(oldIndex, 1)[0]
  //       children().splice(newIndex > oldIndex ? newIndex - 1 : newIndex, 0, node)
  //     }
  //   })
  // })

  useDrop(props, box, designer)
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
    absolute,
    attrs: reactive({
      key: props._id,
      class: computedEager(() => absolute.value ? 'moveable' : config.value?.drag == false ? '' : 'drag'),
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

function useDrop(props: BoxProps, elRef: Ref<HTMLElement>, designer: DesignerCtx) {
  const target = () => isArray(props.children) ? unrefElement(elRef) : void 0
  useEventListener(target, 'dragover', e => {
    const is = e.dataTransfer?.getData('data-is')
    const _id = e.dataTransfer?.getData('_id')
    if (!is && !_id) return
    e.preventDefault()
    e.stopPropagation()

    const doc = target()!.getRootNode() as Document
    
    // 自由布局
    if (props['data-absolute-layout']) {
      
    }
    // 排序布局
    else {
      // const x = 
      const el = target()!
      const rect = el.getBoundingClientRect()
      // const inRange = (x, y, rect) => (x >= rect.x && x <= rect.x + rect.width) && (y >= rect.y && y <= rect.y + rect.height)
      const inRange = (x, y, rect) => x <= rect.x + rect.width && y <= rect.y + rect.height
      let i = 0
      for (; i < el.children.length; i++) {
        if (!inRange(e.x, e.y, el.children[i].getBoundingClientRect())) break
      }
      const nill = doc.createElement('div')
      !el.children.length || i > el.children.length
        ? el.append(nill)
        : el.children[i].after(nill)
      const nillRect = nill.getBoundingClientRect()
      // const horizontal = 
    }
  })
  useEventListener(target, 'drop', async (e) => {
    const is = e.dataTransfer?.getData('data-is')
    const _id = e.dataTransfer?.getData('_id')
    if (!is && !_id) return
    e.preventDefault()
    e.stopPropagation()

    const children = props.children as BoxProps[]
    const doc = target()!.getRootNode() as Document
    let cloned: BoxProps = _id ? doc.querySelector(`[_id='${_id}']`)![REMOVE]() : parseAttrs(designer.widgets[is!]!)

    // 自由布局
    if (props['data-absolute-layout']) {
      cloned = mergeProps(cloned, { style: { position: 'absolute', margin: 0 } }) as any
      children.push(cloned)
      designer.activeId = cloned._id
      // 计算坐标
      await nextTick()
      const clonedEl = doc.querySelector(`[_id='${cloned._id}']`)!
      const rect = clonedEl.parentElement!.getBoundingClientRect()
      const x = Math.round(e.x - rect.x), y  = Math.round(e.y - rect.y)
      cloned = children.find(e => e._id == cloned._id)!
      // Object.assign(cloned.style, { transform: `translate(${x}px, ${y}px)`, '--x': `${x}px`, '--y': `${y}px` })
      Object.assign(cloned.style, { transform: `translate(${x}px, ${y}px)` })
    }
    // 排序布局
    else {
      // dragLineStyle.
    }
  })
}

function useDrag(props: BoxProps, elRef: Ref<HTMLElement>, designer: DesignerCtx) {
  useEventListener(elRef, 'dragstart', e => {
    e.stopPropagation()
    e.dataTransfer?.setDragImage(new Image(), 0, 0)
  })
  watch(() => props == designer.root ? void 0 : unrefElement(elRef), el => {
    el && el.setAttribute('draggable', 'true')
  })
}

document.addEventListener('dragstart', e => {
  if (e.target instanceof HTMLElement) {
    e.dataTransfer?.setData('data-is', e.target.getAttribute('data-is') || '')
    e.dataTransfer?.setData('_id', e.target.getAttribute('_id') || '')
  }
}, { passive: true })


// 
const dragLineStyle = reactive({ left: '0px', top: '0px', width: '', height: '' })
const DragLine = defineComponent({
  setup() {
    return () => h('div', { style: { ...dragLineStyle, background: '#409eff', position: 'absolute' } })
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

[draggable=true].ghostClass {
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  height: 0px !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  font-size: 0 !important;
  outline: 2px solid var(--el-color-primary) !important;
  border: 0 !important;
}

.moveable {
  // --x: 0;
  // --y: 0;
  // transform: translate(var(--x), var(--y)) !important;
}
</style>
