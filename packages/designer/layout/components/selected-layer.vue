<template>
  <div ref="el" class="selected-layer" absolute inset-0 pointer-events-none z-9>
    <selected-rect :el="designerCtx.hover" second absolute outline="1 dashed [--el-color-primary]" outline-offset--1 :style="calcStyle(hoverEl())" />
    <selected-rect :el="designerCtx.active" absolute outline="1.5 solid [--el-color-primary]" outline-offset--1.5 :style="calcStyle(activeEl())" />
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, ref, watch } from 'vue'
import { useElementBounding, useMounted, useMutationObserver } from '@vueuse/core';
import SelectedRect from './selected-rect.vue'
import { designerCtxKey } from '../interface'

const designerCtx = inject(designerCtxKey)!
 
const isMounted = useMounted()

// todo > endless loop
// const el = useCurrentElement<HTMLElement>()
const el = ref<HTMLDivElement>()
const viewport = () => isMounted.value ? el.value!.offsetParent as HTMLElement : null

const hoverEl = () => {
  const id = designerCtx.hover?._id
  return viewport()?.querySelector<HTMLElement>(`[_id='${id}']`)
}

const activeEl = () => {
  const id = designerCtx.active?._id
  return viewport()?.querySelector<HTMLElement>(`[_id='${id}']`)
}

const calcStyle = (el?: HTMLElement | null) => {
  if (!el) return { display: 'none' }
  const vp = viewport()
  const rect1 = vp?.getBoundingClientRect()
  const rect2 = el.getBoundingClientRect()
  if (!rect1) return
  
  return { top: rect2.top - rect1.top + 'px', left: rect2.left - rect1.left + 'px', width: el.offsetWidth + 'px', height: el.offsetHeight + 'px' }
}

const ins = getCurrentInstance()!
const fu = () => requestAnimationFrame(ins.proxy!.$forceUpdate)

// const hoverRect = useElementBounding(hoverEl)
// const activeRect = useElementBounding(activeEl)
// watch([...Object.values(hoverRect), ...Object.values(activeRect), isMounted], fu, { deep: true })

useMutationObserver(viewport, () => fu(), { subtree: true, childList: true, attributes: true, characterData: true })
</script>
