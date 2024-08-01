<template>
  <div ref="el" class="selected-layer" absolute inset-0 pointer-events-none select-none z-9>
    <!-- <selected-rect v-if="!designerCtx.draggedId" :el="designerCtx.hover" absolute outline="1 dashed [--el-color-primary]" outline-offset--1 :style="calcStyle(hoverEl())" /> -->
    <div v-if="!designerCtx.draggedId" absolute outline="1 dashed [--el-color-primary]" outline-offset--1 :style="calcStyle(hoverEl())">
      <div class="absolute bottom-[100%] px8 text-12 c-white bg-[--el-color-primary]">
        {{ designerCtx.hover?.['data-layer'] || hoverConfig?.label }}
      </div>
    </div>
    <!-- <selected-rect :el="designerCtx.active" absolute outline="1.5 solid [--el-color-primary]" outline-offset--1.5 :style="calcStyle(activeEl())" /> -->
    <div v-if="active" absolute outline="1.5 solid [--el-color-primary]" outline-offset--1.5 :style="calcStyle(activeEl())">
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
      <div v-if="active.style?.position == 'absolute'" class="actions absolute bottom-[100%] flex text-15 text-nowrap pointer-events-auto c-white bg-[--el-color-primary]" @mouseenter="designerCtx.hoverId = active._id" @mouseover="designerCtx.hoverId = active._id">
        <div flex aic px12 bg="#17d57e">{{ active['data-layer'] || activeConfig?.label }}</div>
        <i-solar:arrow-to-top-right-bold v-if="activeCtx?.active2parent" class="icon" @click="activeCtx?.active2parent" />
        <i-bi:arrows-move id="moveable-handle" class="icon" text-16="!" cursor-move />
        <i-solar:copy-line-duotone v-if="activeCtx?.copy" class="icon" @click="activeCtx?.copy" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, ref, computed } from 'vue'
import { isString, remove } from '@vue/shared'
import { useMutationObserver, useResizeObserver } from '@vueuse/core'
import { deepClone, treeUtils } from '@el-lowcode/utils'
import { v4 as uuidv4 } from 'uuid'
import { designerCtxKey } from '../interface'
import { sloveConfig } from '../../components/_utils'
import { BoxProps } from '../../components/type'

const designerCtx = inject(designerCtxKey)!

const el = ref<HTMLDivElement>()
const active = computed(() => designerCtx.active)

const hoverEl = () => {
  const id = designerCtx.hoverId
  return designerCtx.viewport?.querySelector<HTMLElement>(`[_id='${id}']`)
}

const activeEl = () => {
  const id = designerCtx.activeId
  return designerCtx.viewport?.querySelector<HTMLElement>(`[_id='${id}']`)
}

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

const rootEl = () => designerCtx.viewport?.querySelector<HTMLElement>(`[_id='${designerCtx.root._id}']`)

const calcStyle = (el?: HTMLElement | null) => {
  if (!el) return { display: 'none' }
  // 提取 transform 的 xy
  const transform = el.style.transform
  const offset = (transform.match(/translate\(([^\)]+?)\)/)?.[1].split(',').map(e => parseInt(e)) ?? [0, 0])
  // 计算位置
  const v   p = designerCtx.viewport
  const zoom = designerCtx.canvas.zoom
  const rect1 = vp.getBoundingClientRect()
  const rect2 = el.getBoundingClientRect()
  // return { top: (rect2.top - rect1.top) / zoom - offset[1] + 'px', left: (rect2.left - rect1.left) / zoom - offset[0] + 'px', width: el.offsetWidth + 'px', height: el.offsetHeight + 'px', transform }
  return { top: (rect2.top - rect1.top) / zoom + vp.scrollTop + 'px', left: (rect2.left - rect1.left) / zoom + vp.scrollLeft + 'px', width: rect2.width / zoom + 'px', height: rect2.height / zoom + 'px' }
}

const hoverConfig = computed(() => designerCtx.hover ? sloveConfig(designerCtx.hover) : undefined)
const activeConfig = computed(() => designerCtx.active ? sloveConfig(designerCtx.active) : undefined)

const ins = getCurrentInstance()!
const fu = () => ins.proxy!.$forceUpdate()

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