<template>
  <component ref="elRef" :is="el.is" v-bind="_el" :class="[config?.layout && 'container-box']" @mouseover.stop="designerCtx.hoverId = el._id" @mousedown.stop="designerCtx.activeId = el._id">

    <template v-if="config?.layout">
      <drag-box v-if="isArray(el.children) && el.children.length" v-for="item in (el.children as BoxProps[])" :key="item._id" :parent="el" :el="item" />
      <!-- <div v-else-if="isArray(el.children)" class="empty-placeholder">Drag and drop here</div> -->
      <template v-else-if="isArray(el.children)"></template>
      <template v-else-if="el.children != null">{{ _execExp(el.children) }}</template>
    </template>

    <div v-else-if="isArray(el.children)" ref="boxRef" class="container-box">
      <drag-box v-for="item in el.children" :key="item._id" :parent="el" :el="item" />
      <!-- <div v-if="!el.children.length" class="empty-placeholder">Drag and drop here</div> -->
      <template v-if="!el.children"></template>
    </div>
    
    <template v-else-if="el.children != null">
      {{ _execExp(el.children) }}
    </template>
    
  </component>
</template>

<script setup lang="ts">
import { PropType, computed, inject, nextTick, ref, watchEffect } from 'vue'
import { isArray } from '@vue/shared'
import { UseDraggableReturn, useDraggable } from 'vue-draggable-plus'
import { deepClone, execExp } from '@el-lowcode/utils'
import { sloveConfig } from '../../components/_utils'
import { designerCtxKey } from '../../layout/interface'
import { pageCtxKey } from '../../components/page/interface'
import { BoxProps } from '../../components/box'

defineOptions({
  name: 'DragBox'
})

const props = defineProps({
  parent: Object as PropType<BoxProps>,
  el: { type: Object as PropType<BoxProps>, default: (() => ({})) }
})

const designerCtx = inject(designerCtxKey)!
const pageCtx = inject(pageCtxKey)!

const config = computed(() => sloveConfig(props.el))

// 拖拽
const elRef = ref<HTMLDivElement>()
const boxRef = ref<HTMLDivElement>()
const drag = ref(false)
let useDraggableReturn: UseDraggableReturn

watchEffect(() => {
  if (!isArray(props.el.children)) return
  useDraggableReturn?.destroy()
  // @ts-ignore
  useDraggableReturn = useDraggable(config.value?.layout ? elRef : boxRef, props.el.children, {
    group: 'shared',
    filter: '.empty-placeholder',
    onStart: () => drag.value = true,
    onEnd: () => nextTick(() => drag.value = false)
  })
})

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
  el = deepClone(el, _execExp)
  return el
})
</script>

<style scoped lang="scss">
.container-box {
  &:empty {
    &::after {
      content: 'Drag and drop here';
      display: grid;
      place-items: center;
      min-height: inherit;
      text-align: center;
      padding: 12px;
      opacity: .4;
      box-sizing: border-box;
    }
  }
}
.empty-placeholder {
  padding: 12px;
  opacity: .4;
  // pointer-events: none;
  z-index: -9;
}
</style>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.0s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  /* transform: scaleY(0.01) translate(30px, 0); */
}

.fade-leave-active {
  position: absolute;
}
</style>
