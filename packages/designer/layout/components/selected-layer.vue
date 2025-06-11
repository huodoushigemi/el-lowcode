<template>
  <div class="selected-layer" absolute inset-0 pointer-events-none select-none z-9 @mouseover="designerCtx.hoverId = active!.id">
    <!-- hover rect -->
    <template v-for="(rect, i) in designerCtx.hover?.getRects()">
      <div v-if="designerCtx.hover != active && !designerCtx.dragged" absolute outline="1 dashed [--vs-focus-b-c] offset--1" op50 :style="calcStyle(rect)" />
      <div v-if="i == 0" class="absolute -translate-y-full flex aic px8 max-w8em text-12 truncate c-white op50 bg-[--vs-focus-b-c]" :style="{ ...calcStyle(rect), width: '', height: '' }">
        <i-mdi:cursor-move v-if="designerCtx.hover?.isAbs" class="-ml4 mr4" />
        {{ designerCtx.hover?.label }}
      </div>
    </template>

    <!-- active rect -->
    <template v-if="active" v-for="rect in active?.getRects()">
      <div absolute outline="1 solid [--vs-focus-b-c] offset--1" :style="calcStyle(rect)" @mousedown.stop>
        <div class="vs-actions absolute bottom-full right-0 flex text-14 pointer-events-auto bg-#333" :class="!!designerCtx.dragged && 'op0 pointer-events-none!'" style="box-shadow: 0 0 12px #00000080" @mousedown.stop draggable="true" @dragstart="dispatchDrag">
          <div v-if="active.isAbs" class="vs-li">
            <i-mdi:cursor-move ref="moveHandle" w16 h16 cursor-move />
            <Moveable v-if="active.el" :key="active.id" :target="active.el" :dragTarget="unrefElement(moveHandle?.[0])" :draggable="true" :origin="false" :hideDefaultLines="true" :useResizeObserver="true" :useMutationObserver="true" :throttleDrag="1" @dragStart="onDragStart" @drag="onDrag" @dragEnd="onDragEnd" />
          </div>
          <Tippy class="vs-li" interactive :offset="[0, 0]" :delay="[0, 300]" placement="right-start" :duration="0">
            <i-mdi:dots-vertical w16 h16 />
            <template #content>
              <Menu ref="menu" :items="active.menus" :tippy="{ delay: 100 }" />
            </template>
          </Tippy>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, computed, ref } from 'vue'
import { unrefElement, useMutationObserver, useResizeObserver } from '@vueuse/core'
import Moveable from 'vue3-moveable'
import { Tippy } from 'vue-tippy'
import { designerCtxKey } from '../interface'
import Menu from '../../components/Menu.vue'

const designerCtx = inject(designerCtxKey)!

const active = computed(() => designerCtx.active)

const calcStyle = (rect: DOMRect) => {
  return { top: rect.top + 'px', left: rect.left + 'px', width: rect.width + 'px', height: rect.height + 'px' }
}

const log = (v) => (console.log(v), v)

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

function dispatchDrag(e: DragEvent) {
  e.stopPropagation()
  e.dataTransfer!.setDragImage(new Image(), 0, 0)
  requestAnimationFrame(() => {
    designerCtx.active!.el?.dispatchEvent(new DragEvent('dragstart'))
  })
}

// 监听 dom 变化
const ins = getCurrentInstance()!
const fu = () => ins.proxy!.$forceUpdate()

const rootEl = () => designerCtx.rootNode.el?.ownerDocument.body

useMutationObserver(rootEl, fu, { subtree: true, childList: true, attributes: true, characterData: true })
useResizeObserver(rootEl, fu)
useResizeObserver(() => designerCtx.active?.el, fu)
// useResizeObserver(() => designerCtx.active?.el, fu)
</script>

<style lang="scss">
.selected-layer {
  .actions {
    height: 26px;
    line-height: 26px;
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