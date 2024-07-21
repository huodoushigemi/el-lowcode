<script setup lang="ts">
const props = defineProps({
  el: Object
})

onBeforeUnmount(() => {
  for (const k in cache) cache[k] = void 0
})

defineRender(() => {
  return Render(props.el!)
})
</script>

<script lang="ts">
import { computed, inject, mergeProps, onBeforeUnmount, reactive, ref, toRef, watch, watchEffect } from 'vue'
import { isArray } from '@vue/shared'
import { computedEager, unrefElement, useEventListener } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'
import { createRender } from '@el-lowcode/render'
import { deepClone, execExp, mapValues, pick } from '@el-lowcode/utils'
import { sloveConfig } from '../../components/_utils'
import type { DesignerCtx } from '../interface'
import type { BoxProps } from '../../components/type'

const wm = new WeakMap()

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
      
      // 移除值为 undefuned 的属性
      props = JSON.parse(JSON.stringify(props))
      // 执行表达式
      props = deepClone(props, _execExp)

      const ctx = setup(_props, designer)

      if (isArray(children)) {
        if (!children.length) {
          children = [{ ref: ctx.boxRef, is: 'div', class: 'drag-wrapper empty-placeholder', children }]
        }
        else {
          sortAbsolute(children)
        }
      }

      props = mergeProps(props, { ref: ctx.ref }, ctx.attrs)
      props.children = _execExp(children)
  
      return props
    })).get(_props).value
    
  }
})


const cache = new WeakMap()

function setup(props: BoxProps, designer: DesignerCtx) {
  if (cache.has(props)) cache.get(props)
  
  const elRef = ref(), boxRef = ref()
  const config = computed(() => sloveConfig(props))
  const absolute = computed(() => props.style?.position == 'absolute')

  let cloned: HTMLElement

  const box = computed(() => {
    if (!config.value || config.value.sortablePut == false) return
    if (!isArray(props.children)) return
    return unrefElement(boxRef.value || elRef.value)
  })
  
  let sortable
  watch(box, el => {
    sortable?.stop()
    if (!el) return
    const children = props.children as BoxProps[]
    el.$sortableRemove = (key) => children.splice(children.findIndex(item => item._id == key), 1)[0]
    sortable = useSortable(el, toRef(props, 'children'), {
      group: 'shared',
      animation: 150,
      draggable: '.drag',
      // filter: '.moveable',
      ghostClass: 'ghostClass',
      invertSwap: true,
      // dataIdAttr: '_id',
      onAdd(e) {
        const si = children.length ? [...e.to.children].findIndex(e => e.getAttribute('_id') == children[0]._id) : e.to.children.length
        if (e.pullMode == 'clone') {
          e.item.remove()
          const cloned = e.from.$sortableClone(e.oldIndex)
          children.splice(e.newIndex - si, 0, cloned)
        } else {
          const key = e.item.getAttribute('_id')
          const cloned = e.from.$sortableRemove(key)
          e.item.remove()
          children.splice(e.newIndex - si, 0, cloned)
        }
      },
      onStart(e) {
        const i = children.findIndex(item => item._id == e.item.getAttribute('_id'))
        designer.draggedId = children[i]._id
        cloned = e.item.cloneNode(true) as HTMLElement
        cloned.classList.remove('ghostClass', 'drag')
        cloned.classList.add('outline-1', 'outline-solid', 'outline-[--el-color-primary]', 'outline-offset--1')
        cloned.removeAttribute('draggable')
        e.item.parentElement!.insertBefore(cloned, e.item)
      },
      onEnd(e) {
        cloned.remove()
        designer.draggedId = undefined
        // 处理 sortablejs 与 moveable 拖动冲突问题
        for (const el of [...e.from.children, ...e.to.children]) {
          const x = el.style.getPropertyValue('--x'), y = el.style.getPropertyValue('--y')
          if (x && y) el.style.setProperty('transform', `translate(${x}, ${y})`)
        }
      },
      onUpdate(e) {
        const si = e.oldIndex - children.findIndex(item => item._id == e.item.getAttribute('_id'))
        const newIndex = e.newIndex - si, oldIndex = e.oldIndex - si
        const node = children.splice(oldIndex, 1)[0]
        children.splice(newIndex > oldIndex ? newIndex - 1 : newIndex, 0, node)
      }
    })
  })
  
  useEventListener(elRef, 'mousedown', e => {
    if (e.button != 0) return
    e.stopPropagation()
    if (designer.draggedId) return
    designer.activeId = props._id
  }, { passive: false })

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
      onVnodeBeforeUnmount: () => cache.delete(props)
    }),
  }
  
  cache.set(props, ret)
  
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

.drag.ghostClass {
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
  --x: 0;
  --y: 0;
  transform: translate(var(--x), var(--y)) !important;
}
</style>
