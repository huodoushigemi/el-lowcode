<template>
  <Render v-bind="el" />
</template>

<script setup lang="ts">
import { computed, inject, mergeProps, reactive, ref, watch } from 'vue'
import { isArray, isObject, normalizeClass } from '@vue/shared'
import { unrefElement, useEventListener } from '@vueuse/core'
import { useDraggable } from 'vue-draggable-plus'
import { createRender } from '@el-lowcode/render'
import { deepClone, execExp, pick } from '@el-lowcode/utils'
import { DesignerCtx } from '../interface'
import { sloveConfig } from '../../components/_utils'
import { BoxProps } from '../../components/type'

defineProps({
  el: Object
})

const Render = createRender({
  defaultIs: 'div',
  processProps: _props => {
    if (_props.class?.includes('drag-wrapper')) return _props
    
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
  const absolute = computed(() => props.style?.position == 'absolute')

  let cloned: HTMLElement

  const box = computed(() => {
    if (!config.value || config.value.sortablePut == false) return
    if (!isArray(props.children)) return
    if (props._id == 'moveable-layer' || props.class?.includes('moveable-layer')) return
    return unrefElement(boxRef.value || elRef.value)
  })

  const sortable = useDraggable(box, props.children as any, {
    group: 'shared',
    animation: 150,
    draggable: '.drag',
    // filter: '.moveable',
    ghostClass: 'ghostClass',
    invertSwap: true,
    onStart(e) {
      designer.draggedId = (props.children as BoxProps[])[e.oldIndex!]._id
      cloned = e.item.cloneNode(true) as HTMLElement
      cloned.classList.remove('ghostClass', 'drag')
      cloned.classList.add('outline-1', 'outline-solid', 'outline-[--el-color-primary]', 'outline-offset--1')
      cloned.removeAttribute('draggable')
      e.item.parentElement!.insertBefore(cloned, e.item)
    },
    onEnd() {
      cloned.remove()
      designer.draggedId = undefined
    }
  })

  watch(box, el => {
    sortable.destroy()
    if (el) sortable.start()
    else cache[props._id!] = undefined
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
</style>
