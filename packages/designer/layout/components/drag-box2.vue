<script setup lang="ts">
const props = defineProps({
  el: Object
})

defineRender(() => {
  return Render(props.el!)
})
</script>

<script lang="ts">
import { computed, inject, mergeProps, onMounted, onUpdated, reactive, ref, toRef, watch } from 'vue'
import { isArray, isObject, normalizeClass } from '@vue/shared'
import { unrefElement, useEventListener } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'
// import { useDraggable } from 'vue-draggable-plus'
import { createRender } from '@el-lowcode/render'
import { deepClone, execExp, pick } from '@el-lowcode/utils'
import { sloveConfig } from '../../components/_utils'
import type { DesignerCtx } from '../interface'
import type { BoxProps } from '../../components/type'

const wm = new WeakMap()

const Render = createRender({
  defaultIs: 'div',
  processProps: (_props: any) => {
    if (_props.class?.includes('drag-wrapper')) return _props
    const { state } = inject('pageCtx', _props)
    const designer = inject('designerCtx') as DesignerCtx
    return wm.get(_props)?.value || wm.set(_props, computed(() => {
      // console.log(_props)
      let { children, ...props } =  _props
  
      const _execExp = (exp) => {
        try {
          return execExp(exp, { state })
        } catch (e) {
          console.error('exec expression error: ', e)
        }
      }
  
      
      props = deepClone(props, _execExp)
      
      const ctx = cache[_props._id!] ??= setup(_props, designer)
      const wgtConfig = sloveConfig(_props)
  
      if (wgtConfig) {
        if (wgtConfig.sortablePut == false) {
          // do nothing
        }
        else if (isArray(children)) {
          if (wgtConfig.layout) {
            if (!children.length) {
              children = [{ ref: ctx.boxRef, is: 'div', class: 'drag-wrapper empty-placeholder', children }]
            }
          }
          else {
            if (children.length) {
              children = [{ ref: ctx.boxRef, is: 'div', class: `drag-wrapper`, style: 'display: contents', children }]
            }
            else {
              children = [{ ref: ctx.boxRef, is: 'div', class: 'drag-wrapper empty-placeholder', children }]
            }
          }
        }
        else if (isObject(children)) {
          // todo
        }
      }

      props = mergeProps(props, pick(ctx, ['ref']), ctx.attrs)
      props.children = _execExp(children)
  
      return props
    })).get(_props).value
    
  }
})


const cache = {} as Record<string, ReturnType<typeof setup> | undefined>

function setup(props: BoxProps, designer: DesignerCtx) {
  const elRef = ref(), boxRef = ref()
  const config = computed(() => sloveConfig(props))
  const absolute = computed(() => props.style?.position == 'absolute')

  let cloned: HTMLElement

  const box = computed(() => {
    if (!config.value || config.value.sortablePut == false) return
    if (!isArray(props.children)) return
    return unrefElement(boxRef.value || elRef.value)
  })

  // const sortable = useDraggable(box, props.children, {
  //   group: 'shared',
  //   animation: 150,
  //   draggable: '.drag',
  //   filter: '.moveable',
  //   ghostClass: 'ghostClass',
  //   invertSwap: true,
  //   onStart(e) {
  //     designer.draggedId = (props.children as BoxProps[])[e.oldIndex!]._id
  //     cloned = e.item.cloneNode(true) as HTMLElement
  //     cloned.classList.remove('ghostClass', 'drag')
  //     cloned.classList.add('outline-1', 'outline-solid', 'outline-[--el-color-primary]', 'outline-offset--1')
  //     cloned.removeAttribute('draggable')
  //     e.item.parentElement!.insertBefore(cloned, e.item)
  //   },
  //   onEnd() {
  //     cloned.remove()
  //     designer.draggedId = undefined
  //   },
  // })

  // watch(box, el => {
  //   sortable.destroy()
  //   if (el) sortable.start()
  //   else cache[props._id!] = undefined
  // }, { immediate: true, flush: 'post' })

  
  let sortable
  watch(box, el => {
    sortable?.stop()
    if (!el) return
    el.$sortableClone = (i) => props.children.splice(i, 1)[0]
    sortable = useSortable(el, toRef(props, 'children'), {
      group: 'shared',
      animation: 150,
      draggable: '.drag',
      // filter: '.moveable',
      ghostClass: 'ghostClass',
      invertSwap: true,
      dataIdAttr: '_id',
      onAdd(e) {
        console.log(e)
        const cloned = e.from.$sortableClone(e.oldIndex)
        e.item.remove()
        props.children.splice(e.newIndex, 0, cloned)
      },
      onStart(e) {
        designer.draggedId = (props.children as BoxProps[])[e.oldIndex!]._id
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
    })
  })


  watch(box, el => {
    if (!el) cache[props._id!] = undefined
  }, { immediate: true, flush: 'post' })
  
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

  return {
    ref: elRef,
    boxRef,
    absolute,
    attrs: reactive({
      key: props._id,
      class: computed(() => absolute.value ? 'moveable' : config.value?.drag == false ? '' : 'drag'),
    }),
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
