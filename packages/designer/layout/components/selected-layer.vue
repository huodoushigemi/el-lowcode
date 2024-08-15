<template>
  <div class="selected-layer" absolute inset-0 pointer-events-none select-none z-9>
    <!-- <selected-rect v-if="!designerCtx.draggedId" :el="designerCtx.hover" absolute outline="1 dashed [--el-color-primary]" outline-offset--1 :style="calcStyle(hoverEl())" /> -->
    <div v-if="!designerCtx.draggedId" absolute outline="1 dashed [--el-color-primary]" outline-offset--1 :style="calcStyle(designerCtx.hoverEl)">
      <div class="absolute bottom-[100%] px8 text-12 c-white bg-[--el-color-primary]">
        {{ designerCtx.hover?.['data-layer'] || hoverConfig?.label }}
      </div>
    </div>
    <!-- <selected-rect :el="designerCtx.active" absolute outline="1.5 solid [--el-color-primary]" outline-offset--1.5 :style="calcStyle(activeEl())" /> -->
    <div v-if="active" absolute outline="1.5 solid [--el-color-primary]" outline-offset--1.5 :style="calcStyle(designerCtx.activeEl)">
      <div v-if="active.style?.position != 'absolute' && designerCtx.draggedId == null" class="actions absolute bottom-[100%] flex text-15 text-nowrap pointer-events-auto c-white bg-[--el-color-primary]">  
        <div flex aic px12 bg="#17d57e">{{ active['data-layer'] || activeConfig?.label }}</div>
        <i-solar:arrow-to-top-right-bold v-if="activeCtx?.active2parent" class="icon" @click="activeCtx?.active2parent" />
        <i-solar:arrow-up-linear v-if="activeCtx?.moveUp" class="icon" @click="activeCtx?.moveUp" />
        <i-solar:arrow-down-linear v-if="activeCtx?.moveDown" class="icon" @click="activeCtx?.moveDown" />
        <i-solar:copy-line-duotone v-if="activeCtx?.copy" class="icon" @click="activeCtx?.copy" />
        <i-solar:trash-bin-minimalistic-linear v-if="activeCtx?.remove" class="icon" hover="c-red" @click="activeCtx?.remove" />

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
      <div v-if="active.style?.position == 'absolute'" class="actions absolute bottom-[100%] flex text-15 text-nowrap pointer-events-auto c-white bg-[--el-color-primary]" :op="designerCtx.draggedId ? 0 : 100" @mouseenter="designerCtx.hoverId = active._id" @mouseover="designerCtx.hoverId = active._id">
        <div flex aic px12 bg="#17d57e">{{ active['data-layer'] || activeConfig?.label }}</div>
        <i-solar:arrow-to-top-right-bold v-if="activeCtx?.active2parent" class="icon" @click="activeCtx?.active2parent" />
        <i-bi:arrows-move ref="moveHandle" class="icon" text-16="!" cursor-move />
        <i-solar:copy-line-duotone v-if="activeCtx?.copy" class="icon" @click="activeCtx?.copy" />

        <Moveable :target="active == designerCtx.root ? undefined : designerCtx.activeEl" :dragTarget="unrefElement(moveHandle)" :draggable="true" :origin="false" :hideDefaultLines="true" :useResizeObserver="true" :useMutationObserver="true" :throttleDrag="1" @dragStart="onDragStart" @drag="onDrag" @dragEnd="onDragEnd" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, computed, ref, watchEffect } from 'vue'
import { isString, remove } from '@vue/shared'
import { unrefElement, useMutationObserver, useResizeObserver } from '@vueuse/core'
import Moveable from 'vue3-moveable'
import { deepClone, treeUtils } from '@el-lowcode/utils'
import { v4 as uuidv4 } from 'uuid'
import { designerCtxKey } from '../interface'
import { sloveConfig } from '../../components/_utils'
import { BoxProps } from '../../index'

const designerCtx = inject(designerCtxKey)!

// new MouseEvent()
// document.addEventListener('pointerdown', e => {})
document.addEventListener('mouseup', e => {})
PointerEvent

const active = computed(() => designerCtx.active)

const activeCtx = computed(() => {
  const { root, activeId, active } = designerCtx
  if (!activeId) return
  const parent = treeUtils.findParent([root], activeId, { key: '_id' })
  if (!parent) return
  const children = parent?.children as BoxProps[]
  const i = children.findIndex(e => e._id == activeId)
  const swap = (arr: any[], i1, i2) => [arr[i1], arr[i2]] = [arr[i2], arr[i1]]
  return {
    parent,
    moveUp: i != 0 ? () => swap(children, i, i -1) : undefined,
    moveDown: i != children.length - 1 ? () => swap(children, i, i + 1) : undefined,
    active2parent: () => designerCtx.activeId = parent._id,
    remove: () => designerCtx.activeId = (remove(children, designerCtx.active), void 0),
    copy: () => children.splice(i + 1, 0, deepClone(active, (v, k) => k == '_id' ? uuidv4() : v))
  }
})


const calcStyle = (el?: HTMLElement | null) => {
  if (!el) return { display: 'none' }
  const rect = el.getBoundingClientRect()
  return { top: rect.top + 'px', left: rect.left + 'px', width: rect.width + 'px', height: rect.height + 'px' }
}

const hoverConfig = computed(() => designerCtx.hover ? sloveConfig(designerCtx.hover) : undefined)
const activeConfig = computed(() => designerCtx.active ? sloveConfig(designerCtx.active) : undefined)

// moveable
const moveHandle = ref()
function onDragStart(e) {
  designerCtx.draggedId = e.target.getAttribute('_id')
}
function onDrag(e) {
  e.target.style.transform = e.transform
}
function onDragEnd(e) {
  const style = designerCtx.active!.style ??= {}
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
    height: 36px;
    > .icon {
      padding: 0 6px;
      box-sizing: content-box;
      font-size: 18px;
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