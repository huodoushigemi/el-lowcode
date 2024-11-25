<template>
  <div class="selected-layer" absolute inset-0 pointer-events-none select-none z-9 @mouseover="designerCtx.hoverId = active!.id">
    <div v-if="!designerCtx.dragged" absolute outline="1 dashed [--vs-focus-b-c] offset--1" op75 :style="calcStyle(designerCtx.hover?.el)">
      <div class="absolute bottom-full px8 max-w8em text-12 truncate c-white bg-[--vs-focus-b-c]">
        {{ designerCtx.hover?.label }}
      </div>
    </div>
    
    <div v-if="active" absolute outline="1 solid [--vs-focus-b-c] offset--1" :style="calcStyle(designerCtx.active?.el)" @mousedown.stop>
      <div v-if="active.parent && !active.isAbs" :key="active.id" class="vs-actions absolute bottom-full right-0 flex text-14 pointer-events-auto bg-#333" :class="!!designerCtx.dragged && 'op0 pointer-events-none!'" style="box-shadow: 0 0 12px #00000080" @mousedown.stop draggable="true" @dragstart="dispatchDrag">
        <div class="vs-li">
          <i-mdi:dots-vertical w16 h16 />
          <Tippy class="vs-menu" :extra="{ interactive: true, offset: [0, 0], delay: [0, 300], duration: 0, placement: 'right-start' }">
            <div class="vs-menu-li" :disabled="!active.prev" @click="active.after(active.prev!)"><i-solar:arrow-up-linear mr6 />上移</div>
            <div class="vs-menu-li" :disabled="!active.next" @click="active.before(active.next!)"><i-solar:arrow-down-linear mr6 />下移</div>
            <div class="vs-menu-li" @click="active.after(active.clone())"><i-solar:copy-line-duotone mr6 />拷贝</div>
            <div class="vs-menu-li" @click="active.empty()" hover="c-red"><i-solar:broom-broken mr6 />清空</div>
            <div class="vs-menu-li" @click="active.remove()" hover="c-red"><i-solar:trash-bin-minimalistic-linear mr6 />删除</div>
            <hr />
            <!-- v-slots -->
            <div v-if="active.config?.vSlots" class="vs-menu-li" @click="active.remove()">
              <i-fa6-solid:check-to-slot mr6 />v-slots
              <Tippy class="vs-menu" :extra="{ interactive: true, offset: [-6, 5], delay: [0, 150], duration: 0, placement: 'right-start' }">
                <div v-for="slot in active.config?.vSlots" class="vs-menu-li" @click="active.vSlots[slot] = active.vSlots[slot] ? void 0 : []"><i-mdi:check mr6 :op="active.vSlots[slot] ? 100 : 0" />{{ slot }}</div>
              </Tippy>
            </div>
            <!-- slots -->
            <!-- <div v-if="active.config?.slots" class="vs-menu-li" @click="active.remove()">
              <i-fa6-solid:check-to-slot mr6 />v-slots
              <Tippy class="vs-menu" :extra="{ interactive: true, offset: [-6, 5], delay: [0, 150], duration: 0, placement: 'right-start' }">
                <div v-for="slot in active.config?.slots" class="vs-menu-li" @click="active.vSlots[slot] = active.vSlots[slot] ? void 0 : []"><i-mdi:check mr6 :op="active.vSlots[slot] ? 100 : 0" />{{ slot }}</div>
              </Tippy>
            </div> -->
            <!-- slot -->
            <div v-if="active.parent?.config?.slots" class="vs-menu-li" @click="active.remove()">
              <i-fa6-solid:check-to-slot mr6 />slot
              <Tippy class="vs-menu" :extra="{ interactive: true, offset: [-6, 5], delay: [0, 150], duration: 0, placement: 'right-start' }">
                <div v-for="slot in active.parent.config.slots" class="vs-menu-li" @click="active.data.slot = active.data.slot == slot ? void 0 : slot"><i-mdi:check mr6 :op="active.data.slot == slot ? 100 : 0" />{{ slot }}</div>
              </Tippy>
            </div>
          </Tippy>
        </div>
      </div>

      <div v-if="active.parent && active.isAbs" class="actions absolute bottom-full right-0 flex text-14 text-nowrap pointer-events-auto c-white bg-[--vs-focus-b-c]" :op="designerCtx.dragged && 0" @mouseenter="designerCtx.hoverId = active.id" @mouseover="designerCtx.hoverId = active.id">
        <div px12 max-w12em truncate bg="#17d57e">{{ active.label }}</div>
        <i-bi:arrows-move ref="moveHandle" class="icon" text-16="!" cursor-move />
        <i-solar:copy-line-duotone class="icon" @click="active.after(active.clone())" />

        <Moveable v-if="active.el" :key="active.id" :target="active.el" :dragTarget="unrefElement(moveHandle)" :draggable="true" :origin="false" :hideDefaultLines="true" :useResizeObserver="true" :useMutationObserver="true" :throttleDrag="1" @dragStart="onDragStart" @drag="onDrag" @dragEnd="onDragEnd" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, computed, ref } from 'vue'
import { remove } from '@vue/shared'
import { unrefElement, useMutationObserver, useResizeObserver } from '@vueuse/core'
import Moveable from 'vue3-moveable'
import { designerCtxKey } from '../interface'
import Tippy from './tippy.vue'

const designerCtx = inject(designerCtxKey)!

const active = computed(() => designerCtx.active)

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

const rootEl = () => designerCtx.rootCtx.el?.ownerDocument.body

useMutationObserver(rootEl, fu, { subtree: true, childList: true, attributes: true, characterData: true })
useResizeObserver(rootEl, fu)
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