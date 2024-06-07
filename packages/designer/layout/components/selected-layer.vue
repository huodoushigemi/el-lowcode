<template>
  <div ref="el" class="selected-layer" absolute inset-0 pointer-events-none z-9>
    <selected-rect v-if="!designerCtx.draggedId" :el="designerCtx.hover" absolute outline="1 dashed [--el-color-primary]" outline-offset--1 :style="calcStyle(hoverEl())" />
    <selected-rect :el="designerCtx.active" absolute outline="1.5 solid [--el-color-primary]" outline-offset--1.5 :style="calcStyle(activeEl())" />
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, ref } from 'vue'
import { useMutationObserver, useResizeObserver } from '@vueuse/core'
import SelectedRect from './selected-rect.vue'
import { designerCtxKey } from '../interface'
import { onUpdated } from 'vue';

const designerCtx = inject(designerCtxKey)!

const el = ref<HTMLDivElement>()

const hoverEl = () => {
  const id = designerCtx.hoverId
  return designerCtx.viewport?.querySelector<HTMLElement>(`[_id='${id}']`)
}

const activeEl = () => {
  const id = designerCtx.activeId
  return designerCtx.viewport?.querySelector<HTMLElement>(`[_id='${id}']`)
}

const rootEl = () => designerCtx.viewport?.querySelector<HTMLElement>(`[_id='${designerCtx.root._id}']`)

const calcStyle = (el?: HTMLElement | null) => {
  if (!el) return { display: 'none' }
  // 提取 transform 的 xy
  const transform = el.style.transform
  const offset = (transform.match(/translate\(([^\)]+?)\)/)?.[1].split(',').map(e => parseInt(e)) ?? [0, 0])
  // 计算位置
  const vp = designerCtx.viewport
  const zoom = designerCtx.canvas.zoom
  const rect1 = vp.getBoundingClientRect()
  const rect2 = el.getBoundingClientRect()
  return { top: (rect2.top - rect1.top) / zoom - offset[1] + 'px', left: (rect2.left - rect1.left) / zoom - offset[0] + 'px', width: el.offsetWidth + 'px', height: el.offsetHeight + 'px', transform }
}

const ins = getCurrentInstance()!
const fu = () => ins.proxy!.$forceUpdate()

useMutationObserver(rootEl, fu, { subtree: true, childList: true, attributes: true, characterData: true })

useResizeObserver(rootEl, fu)
</script>
