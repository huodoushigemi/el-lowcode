<template>
  <div class="viewer" relative>
    <div absolute w30 h30 z-1 @click="viewer.scrollCenter()" />
    <div class="guides-x" absolute left-30 right-0 h30 z-1 />
    <div class="guides-y" absolute top-30 bottom-0 w30 z-1 />
    <div class="infinite-viewer-wrapper">
        <div class="infinite-viewer-scroll-area"></div>
        <div class="viewport">
          <slot />
        </div>
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
import { ref, onMounted, onBeforeMount } from 'vue'
import { useCurrentElement, useResizeObserver } from '@vueuse/core'

const el = useCurrentElement()

let viewer
let guidesX, guidesY

onMounted(() => {
  guidesX = new Guides(el.value.querySelector(".guides-x"), {
    type: "horizontal",
    snapThreshold: 5,
    snaps: [0, 300, 600],
    displayDragPos: true,
    dragPosFormat: v => `${v}px`,
  })

  guidesY = new Guides(el.value.querySelector(".guides-y"), {
    type: "vertical",
    snapThreshold: 5,
    snaps: [0, 200, 400],
    displayDragPos: true,
    dragPosFormat: v => `${v}px`,
  })

  viewer = new InfiniteViewer(el.value, el.value.querySelector(".viewport"), {
    useMouseDrag: true,
    useWheelScroll: true,
    useAutoZoom: true,
    zoomRange: [0.4, 2.5],
    maxPinchWheel: 10,
  }).on("dragStart", e => {
      const target = e.inputEvent.target
      if (target.nodeName === "A") {
          e.stop()
      }
  }).on("scroll", e => {
    console.log('xx');
      const zoom = viewer.zoom
      guidesX.scroll(e.scrollLeft, zoom)
      guidesX.scrollGuides(e.scrollTop, zoom)
      guidesY.scroll(e.scrollTop, zoom)
      guidesY.scrollGuides(e.scrollLeft, zoom)
  }).on("pinch", e => {
      const zoom = Math.max(0.1, e.zoom)
      guidesY.zoom = zoom
      guidesX.zoom = zoom
  })

  requestAnimationFrame(() => {
    viewer.scrollCenter()
  })

  useResizeObserver(el, () => {
    guidesX.resize()
    guidesY.resize()
  })

  onBeforeMount(() => {
    viewer.destroy()
    guidesX.destroy()
    guidesY.destroy()
  })

})
</script>