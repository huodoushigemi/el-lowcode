<template>
  <div class="infinite-viewer" ref="el" relative @mousedown.middle.prevent="middlePressed = true" @mouseup.middle.prevent="middlePressed = false">
    <div absolute w20 h20 z-1 @click="viewer.scrollCenter(); viewer.setZoom(1); viewer.emit('pinch', { zoom: 1 })" />
    <div class="guides-x" absolute left-20 right-0 h20 z-1 />
    <div class="guides-y" absolute top-20 bottom-0 w20 z-1 />
    <div
      class="infinite-viewer-wrapper left-20! top-20! outline-0"
      style="width: calc(100% - 20px); height: calc(100% - 20px)"
      tabindex="-1"
      @keydown.space.prevent
      @keyup.space.prevent
      @mousedown="e => e.currentTarget.focus()"
    >
      <div :class="['infinite-viewer-scroll-area', grab && 'cursor-grab z-1']"></div>
      <slot />
    </div>
    <div class="infinite-viewer-scroll-bar infinite-viewer-vertical-scroll-bar">
      <div class="infinite-viewer-scroll-thumb"></div>
    </div>
    <div class="infinite-viewer-scroll-bar infinite-viewer-horizontal-scroll-bar">
      <div class="infinite-viewer-scroll-thumb"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watchEffect, computed } from 'vue'
import { useElementHover, useResizeObserver, useMagicKeys } from '@vueuse/core'
import Guides from '@scena/guides'
import InfiniteViewer, { EVENTS, OPTIONS, METHODS } from 'infinite-viewer'
import { pick } from '@el-lowcode/utils'

const props = defineProps([...OPTIONS, 'x', 'y'])

const emit = defineEmits([...EVENTS, 'update:zoom', 'update:x', 'update:y'])

const el = ref()

const middlePressed = ref(false)
const { space } = useMagicKeys(), hover = useElementHover(el)
const grab = computed(() => middlePressed.value || (space.value && hover.value))

let viewer
let guidesX, guidesY

onMounted(() => {
  guidesX = new Guides(el.value.querySelector(".guides-x"), {
    type: "horizontal",
    displayDragPos: true,
    textOffset: [0, 8],
    segment: 5,
    dragPosFormat: v => `${v}px`,
  })

  guidesY = new Guides(el.value.querySelector(".guides-y"), {
    type: "vertical",
    displayDragPos: true,
    textOffset: [8, 0],
    segment: 5,
    dragPosFormat: v => `${v}px`,
  })

  viewer = new InfiniteViewer(el.value, el.value.querySelector(".viewport"), {
    useMouseDrag: true,
    usePinch: true,
    useWheelScroll: true,
    useAutoZoom: true,
    zoomRange: [0.6, 2.5],
    rangeX: [-innerWidth / 2, innerWidth / 3],
    rangeY: [-innerHeight / 2, innerHeight],
    preventWheelClick: false,
    maxPinchWheel: 10,
    useResizeObserver: true,
  }).on("dragStart", e => {
    const target = e.inputEvent.target
    if (target.nodeName === "A") {
        e.stop()
    }
  }).on("scroll", e => {
    const zoom = viewer.zoom
    guidesX.scroll(e.scrollLeft, zoom)
    guidesX.scrollGuides(e.scrollTop, zoom)
    guidesY.scroll(e.scrollTop, zoom)
    guidesY.scrollGuides(e.scrollLeft, zoom)
    emit('update:x', e.scrollLeft)
    emit('update:y', e.scrollTop)
    emit('update:zoom', zoom)
  })

  EVENTS.forEach(name => viewer.on(name, e => emit(name, e)))

  useResizeObserver(el, () => {
    guidesX.resize()
    guidesY.resize()
  })

  onBeforeMount(() => {
    viewer.destroy()
    guidesX.destroy()
    guidesY.destroy()
  })
  
  if (['x', 'y'].every(k => props[k] == null)) {
    requestAnimationFrame(() => {
      viewer.scrollCenter()
    })
  }

  watchEffect(() => viewer.setTo(pick(props, ['x', 'y', 'zoom'])))
})
</script>