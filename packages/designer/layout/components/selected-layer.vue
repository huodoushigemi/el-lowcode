<template>
  <div class="selected-layer" absolute inset-0 pointer-events-none select-none z-9>
    <div v-if="!designerCtx.draggedId" absolute outline="1 dashed [--el-color-primary]" outline-offset--1 :style="calcStyle(designerCtx.hoverEl)">
      <div class="absolute bottom-[100%] px8 text-12 c-white bg-[--el-color-primary]">
        {{ designerCtx.hover?.label }}
      </div>
    </div>
    <!-- <selected-rect :el="designerCtx.active" absolute outline="1.5 solid [--el-color-primary]" outline-offset--1.5 :style="calcStyle(activeEl())" /> -->
    <div v-if="active" absolute outline="1.5 solid [--el-color-primary]" outline-offset--1.5 :style="calcStyle(designerCtx.activeEl)">
      <div v-if="active.parent && !active.isAbs && designerCtx.draggedId == null" class="actions absolute bottom-[100%] flex text-14 text-nowrap pointer-events-auto c-white bg-[--el-color-primary]">  
        <div flex aic px12 bg="#17d57e">{{ active.label }}</div>
        <i-solar:arrow-to-top-right-bold class="icon" @click="active2parent" />
        <i-solar:arrow-up-linear class="icon" @click="moveUp" />
        <i-solar:arrow-down-linear class="icon" @click="moveDown" />
        <i-solar:copy-line-duotone class="icon" @click="copy" />
        <i-solar:trash-bin-minimalistic-linear class="icon" hover="c-red" @click="remove" />

        <!-- <template v-if="isString(active!.children)">
          <div mx12 w1 bg="#000/20" />
          <i-solar:align-left-bold class="icon" :bg="active!.style?.textAlign == 'left' && active!.style?.textAlign == null ? '#000/10' : ''" />
          <i-solar:align-horizontal-center-bold class="icon" :bg="active!.style?.textAlign == 'center' ? '#000/10' : ''" />
          <i-solar:align-right-bold class="icon" :bg="active!.style?.textAlign == 'right' ? '#000/10' : ''" />
          <i-solar:text-bold-bold class="icon" :bg="active!.style?.fontWeight == 'bold' ? '#000/10' : ''" />
          <i-solar:text-italic-bold class="icon" :bg="active!.style?.fontStyle == 'italic' ? '#000/10' : ''" />
          <i-solar:text-underline-bold class="icon" :bg="active!.style?.textDecoration == 'underline' ? '#000/10' : ''" />
          <el-color-picker show-alpha size="small" self-center />
        </template> -->
      </div>
      <div v-if="active.parent && active.isAbs" class="actions absolute bottom-[100%] flex text-14 text-nowrap pointer-events-auto c-white bg-[--el-color-primary]" :op="designerCtx.draggedId ? 0 : 100" @mouseenter="designerCtx.hoverId = active.id" @mouseover="designerCtx.hoverId = active.id">
        <div flex aic px12 bg="#17d57e">{{ active.label }}</div>
        <i-solar:arrow-to-top-right-bold class="icon" @click="active2parent" />
        <i-bi:arrows-move ref="moveHandle" class="icon" text-16="!" cursor-move />
        <i-solar:copy-line-duotone class="icon" @click="copy" />

        <Moveable :target="active.isRoot ? undefined : designerCtx.activeEl" :dragTarget="unrefElement(moveHandle)" :draggable="true" :origin="false" :hideDefaultLines="true" :useResizeObserver="true" :useMutationObserver="true" :throttleDrag="1" @dragStart="onDragStart" @drag="onDrag" @dragEnd="onDragEnd" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, computed, ref } from 'vue'
import { unrefElement, useMutationObserver, useResizeObserver } from '@vueuse/core'
import Moveable from 'vue3-moveable'
import { designerCtxKey } from '../interface'

const designerCtx = inject(designerCtxKey)!

const active = computed(() => designerCtx.active)

const moveUp = () => designerCtx.active!.previousSibling ? designerCtx.active!.previousSibling.before(designerCtx.active!) : void 0
const moveDown = () => designerCtx.active!.nextSibling ? designerCtx.active!.nextSibling!.after(designerCtx.active!) : void 0
const active2parent = () => designerCtx.activeId = designerCtx.active!.parent!.id
const remove = () => designerCtx.active!.remove()
const copy = () => designerCtx.active!.after(designerCtx.active?.clone())


const calcStyle = (el?: HTMLElement | null) => {
  if (!el) return { display: 'none' }
  const rect = el.getBoundingClientRect()
  return { top: rect.top + 'px', left: rect.left + 'px', width: rect.width + 'px', height: rect.height + 'px' }
}

// moveable
const moveHandle = ref()
function onDragStart(e) {
  designerCtx.draggedId = active.value?.id
}
function onDrag(e) {
  e.target.style.transform = e.transform
}
function onDragEnd(e) {
  const style = designerCtx.active!.data.style ??= {}
  style.transform = e.target.style.getPropertyValue('transform')
  designerCtx.draggedId = undefined
}

// 监听 dom 变化
const ins = getCurrentInstance()!
const fu = () => ins.proxy!.$forceUpdate()

const rootEl = () => designerCtx.canvas.doc?.body

useMutationObserver(rootEl, fu, { subtree: true, childList: true, attributes: true, characterData: true })
useResizeObserver(rootEl, fu)
</script>

<style lang="scss">
.selected-layer {
  .actions {
    height: 26px;
    > .icon {
      padding: 0 6px;
      box-sizing: content-box;
      font-size: 16px;
      height: 100%;

      &:hover {
        background: rgba(0, 0, 0, .075);
      }
      &:active {
        background: rgba(0, 0, 0, .15);
      }
    }
  }
}
</style>