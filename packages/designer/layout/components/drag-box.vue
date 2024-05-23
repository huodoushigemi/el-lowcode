<template>
  <component v-if="condition" ref="elRef" :is="el.is" v-bind="_el" :class="[absolute ? 'moveable' : 'drag', config?.layout && 'container-box']"
    @mouseover.stop="mouseover" @native:mouseover.stop="mouseover"
    @mousedown.left.stop="mousedown" @native:mousedown.left.stop="mousedown"
    @mouseleave.stop="mouseleave"
  >

    <template v-if="config?.layout">
      <drag-box v-if="isArray(el.children) && el.children.length" v-for="item in (el.children as BoxProps[])" :key="item._id" :el="item" />
      <div v-else-if="emptyChildren" ref="empty" class="empty-placeholder" />
      <template v-else-if="el.children != null">{{ _execExp(el.children) }}</template>
    </template>

    <div v-else-if="isArray(el.children)" ref="boxRef" class="container-box">
      <drag-box v-for="item in el.children" :key="item._id" :el="item" />
      <div v-if="emptyChildren" ref="empty" class="empty-placeholder" />
      <template v-if="!el.children"></template>
    </div>
    
    <template v-else-if="el.children != null">
      {{ _execExp(el.children) }}
    </template>

    <Moveable v-if="absolute && actived" :target="unrefElement(elRef)" :draggable="true" :resizable="true" :rotatable="true" :origin="false" :useResizeObserver="true" :useMutationObserver="true" :hideDefaultLines="true" @drag="onDrag" @dragEnd="onDragEnd" @resize="onResize" @resizeEnd="onResizeEnd" @rotate="onDrag" @rotateEnd="onDragEnd" />

  </component>
</template>

<script setup lang="ts">
import { PropType, computed, inject, ref, watch, watchEffect, onUpdated } from 'vue'
import { isArray } from '@vue/shared'
import { unrefElement, useEventListener } from '@vueuse/core'
import { UseDraggableReturn, useDraggable } from 'vue-draggable-plus'
import Moveable from './Moveable.vue'
import { deepClone, execExp, get, pick, set } from '@el-lowcode/utils'
import { sloveConfig } from '../../components/_utils'
import { designerCtxKey } from '../../layout/interface'
import { pageCtxKey } from '../../components/page/interface'
import { BoxProps } from '../../components/type'

defineOptions({
  name: 'DragBox'
})

const props = defineProps({
  el: { type: Object as PropType<BoxProps>, default: (() => ({})) }
})

const designerCtx = inject(designerCtxKey)!
const pageCtx = inject(pageCtxKey)!

const config = computed(() => sloveConfig(props.el))
const emptyChildren = computed(() => isArray(props.el.children) ? !props.el.children.length : false)
const actived = computed(() => props.el._id == designerCtx.activeId)
const absolute = computed(() => props.el.style?.position == 'absolute')

// 拖拽
const elRef = ref<HTMLElement>()
const boxRef = ref<HTMLElement>()
const empty = ref<HTMLElement>()
const drag = computed(() => emptyChildren.value ? empty.value : (config.value?.layout ? elRef.value : boxRef.value))
let useDraggableReturn: UseDraggableReturn

let cloned: HTMLElement

watchEffect(() => {
  useDraggableReturn?.destroy()
  if (!isArray(props.el.children)) return
  if (!drag.value) return
  
  // @ts-ignore
  useDraggableReturn = useDraggable(drag, props.el.children, {
    group: 'shared',
    animation: 150,
    draggable: '.drag',
    // filter: '.moveable',
    ghostClass: 'ghostClass',
    onStart(e) {
      designerCtx.draggedId = (props.el.children as BoxProps[])[e.oldIndex]._id
      cloned = e.item.cloneNode(true)
      cloned.classList.remove('ghostClass', 'drag')
      cloned.classList.add('outline-1', 'outline-solid', 'outline-[--el-color-primary]', 'outline-offset--1')
      cloned.removeAttribute('draggable')
      e.item.parentElement.insertBefore(cloned, e.item)
    },
    onEnd() {
      cloned.remove()
      designerCtx.draggedId = undefined
    }
  })
})

// moveable
function onDrag(e) {
  e.target.style.transform = e.transform
}
function onDragEnd(e) {
  (props.el.style ??= {}).transform = e.target.style.transform
}
function onResize({ target, width, height, transform }) {
  const setw = width != target.offsetWidth
  const seth = height != target.offsetHeight
  setw && (target.style.width = `${width}px`)
  seth && (target.style.height = `${height}px`)
  target.style.transform = transform
}
function onResizeEnd(e) {
  Object.assign(props.el.style ??= {}, pick(e.target.style, ['width', 'height', 'transform']))
}

onUpdated(() => console.log('onUpdated'))

// 选中状态处理
function mouseover() {
  if (designerCtx.draggedId) return
  designerCtx.hoverId = props.el._id
}
function mousedown() {
  if (designerCtx.draggedId) return
  designerCtx.activeId = props.el._id
}
function mouseleave() {
  if (designerCtx.root._id != props.el._id) return
  designerCtx.hoverId = undefined
}

// 执行 JS 表达式
const _execExp = (exp) => {
  try {
    const { state } = pageCtx || props.el
    return execExp(exp, { state })
  } catch (e) {
    console.error('exec expression error: ', e)
  }
}

const _el = computed(() => {
  let el: BoxProps = { ...props.el }
  delete el.is
  delete el.children
  delete el.$
  el = deepClone(el, _execExp)
  return el
})

const _$ = computed(() => deepClone(props.el.$, _execExp) as BoxProps['$'])

const condition = computed(() => props.el.$?.condition == null || !!_$.value?.condition)
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
}
</style>
