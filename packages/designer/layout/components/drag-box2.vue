<template>
  <Render v-bind="el" />
</template>

<script setup lang="ts">
import { computed, inject, mergeProps, onMounted, reactive, ref, watchEffect } from 'vue'
import { isArray, isObject, normalizeClass } from '@vue/shared'
import { useEventListener } from '@vueuse/core'
import { UseDraggableReturn, useDraggable } from 'vue-draggable-plus'
import { createRender } from '@el-lowcode/render'
import { deepClone, execExp, pick } from '@el-lowcode/utils'
import { DesignerCtx } from '../interface'
import { sloveConfig } from '../../components/_utils'
import { BoxProps, ElLowcodeConfig } from '../../components/type'

const Render = createRender({
  defaultIs: 'div',
  processProps: _props => {
    if (normalizeClass(_props.class).includes('drag-wrapper')) return _props
    
    // @ts-ignore
    const { state } = inject('pageCtx', _props)
    const designer = inject('designerCtx') as DesignerCtx
    let { children, ...props } =  _props

    const _execExp = (exp) => {
      try {
        return execExp(exp, { state })
      } catch (e) {
        console.error('exec expression error: ', e)
      }
    }

    const ctx = cache[_props._id!] ??= setup(_props, designer)
    
    props = deepClone(props, _execExp)
    
    const wgtConfig = sloveConfig(props)

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
        // if (children.length) {
        //   children = [{ ref: ctx.boxRef, is: 'div', class: `drag-wrapper`, style: 'display: contents', children }]
        // }
        // else {
        //   children = [{ ref: ctx.boxRef, is: 'div', class: 'drag-wrapper empty-placeholder', children }]
        // }
      }
      else if (isObject(children)) {
        // todo
      }
    }
      
    props.children = _execExp(children)

    return mergeProps(props, pick(ctx, ['ref']), ctx.attrs)
  }
})


const cache = {} as Record<string, ReturnType<typeof setup> | undefined>

function setup(props: BoxProps, designer: DesignerCtx) {
  const elRef = ref(), boxRef = ref()
  const config = computed(() => sloveConfig(props))
  // const drag = computed(() => config?.layout ? elRef.value : boxRef.value)
  // const drag = computed(() => config.value?.layout ? elRef.value : boxRef.value)
  const drag = computed(() => boxRef.value || elRef.value)
  const absolute = computed(() => props.style?.position == 'absolute')

  let useDraggableReturn: UseDraggableReturn
  let cloned: HTMLElement

  return {
    ref: elRef,
    boxRef,
    absolute,
    attrs: reactive({
      key: props._id,
      class: computed(() => absolute.value ? 'moveable' : config.value?.drag == false ? '' : 'drag'),
      onVnodeMounted() {
        watchEffect(() => {
          useDraggableReturn?.destroy()
          const config = sloveConfig(props)
          if (!config) return
          if (config.sortablePut == false) return
          if (!isArray(props.children)) return
          if (!drag.value) return
          if (props._id == 'moveable-layer') return

          // @ts-ignore
          useDraggableReturn = useDraggable(drag, props.children, {
            group: 'shared',
            animation: 150,
            draggable: '.drag',
            // filter: '.moveable',
            ghostClass: 'ghostClass',
            invertSwap: true,
            onStart(e) {
              designer.draggedId = (props.children as BoxProps[])[e.oldIndex]._id
              cloned = e.item.cloneNode(true)
              cloned.classList.remove('ghostClass', 'drag')
              cloned.classList.add('outline-1', 'outline-solid', 'outline-[--el-color-primary]', 'outline-offset--1')
              cloned.removeAttribute('draggable')
              e.item.parentElement.insertBefore(cloned, e.item)
            },
            onEnd() {
              cloned.remove()
              designer.draggedId = undefined
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
      },
      onVnodeUnmounted() {
        cache[props._id!] = undefined
      }
    }),
  }
}

// export default Render

const props = defineProps({
  el: Object
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

.drag.ghostClass {
  margin: 0 !important;
  padding: 0 !important;
  height: 0px !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  font-size: 0 !important;
  outline: 2px solid var(--el-color-primary) !important;
  border: 0 !important;
}
</style>
