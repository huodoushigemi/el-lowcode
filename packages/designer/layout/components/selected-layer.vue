<template>
  <div class="selected-layer" absolute inset-0 pointer-events-none select-none z-9 @mouseover="lcd.hoverId = active!.id">
    <!-- hover rect -->
    <template v-for="(rect, i) in lcd.hover?.getRects()">
      <div v-if="lcd.hover != active && !lcd.dragged" :class="infixed(lcd.hover!) ? 'fixed' : 'absolute'" :style="calcStyle(lcd.hover, rect)">
        <div class="absolute inset-0 op50" outline="1 dashed [--vs-focus-b-c] offset--1" />
        <div class="-translate-y-full flex aic px8 max-w8em text-12 truncate c-white op50 bg-[--vs-focus-b-c]">
          <i-mdi:cursor-move v-if="lcd.hover?.isAbs" class="-ml4 mr4" />
          {{ lcd.hover?.label }}
        </div>
      </div>
    </template>

    <!-- active rect -->
    <template v-if="active" v-for="rect in active?.getRects()">
      <div :class="infixed(active) ? 'fixed' : 'absolute'" outline="1 solid [--vs-focus-b-c] offset--1" :style="calcStyle(lcd.active, rect)" @mousedown.stop>
        <div class="vs-actions absolute bottom-full right-0 flex text-14 pointer-events-auto bg-#333" :class="!!lcd.dragged && 'op0 pointer-events-none!'" style="box-shadow: 0 0 12px #00000080" @mousedown.stop draggable="true" @dragstart="dispatchDrag">
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
import { designerCtxKey, DisplayNode } from '../interface'
import Menu from '../../components/Menu.vue'

const lcd = inject(designerCtxKey)!

const active = computed(() => lcd.active)

const infixed = (node: DisplayNode) => node?.path.some(node => node.el && getComputedStyle(node.el).position == 'fixed')
const scroll = (node: DisplayNode) => (win => infixed(node) ? { x: 0, y: 0 } : ({ x: win?.scrollX || 0, y: win?.scrollY || 0 }))(lcd.rootNode.el?.ownerDocument.defaultView)

const calcStyle = (node: DisplayNode, rect: DOMRect) => {
  return { top: scroll(node).y + rect.top + 'px', left: scroll(node).x + rect.left + 'px', width: rect.width + 'px', height: rect.height + 'px' }
}

const log = (v) => (console.log(v), v)

// moveable
const moveHandle = ref()
function onDragStart(e) {
  lcd.draggedId = active.value?.id
}
function onDrag(e) {
  e.target.style.transform = e.transform
}
function onDragEnd(e) {
  const style = lcd.active!.data.style ??= {}
  style.transform = e.target.style.getPropertyValue('transform')
  lcd.draggedId = undefined
}

function dispatchDrag(e: DragEvent) {
  e.stopPropagation()
  e.dataTransfer!.setDragImage(new Image(), 0, 0)
  requestAnimationFrame(() => {
    lcd.active!.el?.dispatchEvent(new DragEvent('dragstart'))
  })
}

// 监听 dom 变化
const ins = getCurrentInstance()!
const fu = () => ins.proxy!.$forceUpdate()

const rootEl = () => lcd.rootNode.el?.ownerDocument.body

useMutationObserver(rootEl, fu, { subtree: true, childList: true, attributes: true, characterData: true })
useResizeObserver(rootEl, fu)
useResizeObserver(() => lcd.active?.el, fu)
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