<template>
  <div class="selected-layer" absolute inset-0 pointer-events-none select-none z-9>
    <div v-if="!designerCtx.dragged" absolute outline="1 dashed [--vs-focus-b-c]" op75 outline-offset--1 :style="calcStyle(designerCtx.hover?.el)">
      <div class="absolute bottom-full px8 text-12 c-white bg-[--vs-focus-b-c]">
        {{ designerCtx.hover?.label }}
      </div>
    </div>
    
    <div v-if="active" absolute outline="1.5 solid [--vs-focus-b-c]" outline-offset--1.5 :style="calcStyle(designerCtx.active?.el)">
      <div v-if="active.parent && !active.isAbs && !designerCtx.dragged" class="actions absolute bottom-[100%] flex text-14 text-nowrap pointer-events-auto c-white bg-[--vs-focus-b-c]">  
        <div flex aic px12 bg="#17d57e">{{ active.label }}</div>
        <i-solar:arrow-to-top-right-bold class="icon" @click="active2parent" />
        <i-solar:arrow-up-linear class="icon" @click="moveUp" />
        <i-solar:arrow-down-linear class="icon" @click="moveDown" />
        <i-solar:copy-line-duotone class="icon" @click="copy" />
        <i-solar:trash-bin-minimalistic-linear class="icon" hover="c-red" @click="remove" />
      </div>

      <div v-if="active.parent && active.isAbs" class="actions absolute bottom-full flex text-14 text-nowrap pointer-events-auto c-white bg-[--vs-focus-b-c]" :op="designerCtx.dragged ? 0 : 100" @mouseenter="designerCtx.hoverId = active.id" @mouseover="designerCtx.hoverId = active.id">
        <div flex aic px12 bg="#17d57e">{{ active.label }}</div>
        <i-solar:arrow-to-top-right-bold class="icon" @click="active2parent" />
        <i-bi:arrows-move ref="moveHandle" class="icon" text-16="!" cursor-move />
        <i-solar:copy-line-duotone class="icon" @click="copy" />

        <Moveable :target="active.isRoot ? undefined : designerCtx.active?.el" :dragTarget="unrefElement(moveHandle)" :draggable="true" :origin="false" :hideDefaultLines="true" :useResizeObserver="true" :useMutationObserver="true" :throttleDrag="1" @dragStart="onDragStart" @drag="onDrag" @dragEnd="onDragEnd" />
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

const rootEl = () => designerCtx.rootCtx.el?.ownerDocument.body

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