<template>
  <div class="viewer" relative>
    <div absolute w20 h20 z-1 @click="viewer.scrollCenter(); viewer.setZoom(1)" />
    <div class="guides-x" absolute left-20 right-0 h20 z-1 />
    <div class="guides-y" absolute top-20 bottom-0 w20 z-1 />
    <div class="infinite-viewer-wrapper">
        <div class="infinite-viewer-scroll-area"></div>
        <div class="viewport" :class="bodyClass" :style="bodyStyle">
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
import Guides from '@scena/guides'
import InfiniteViewer from 'infinite-viewer'
import { onUpdated } from 'vue';
import { watchEffect } from 'vue';

const props = defineProps({
  bodyStyle: [String, Object],
  bodyClass: String
})

onUpdated(() => {
  // console.log('onUpdated');
})

watchEffect(() => console.log(props.bodyStyle, 'onUpdated'))

const el = useCurrentElement()

let viewer
let guidesX, guidesY

onMounted(() => {
  guidesX = new Guides(el.value.querySelector(".guides-x"), {
    type: "horizontal",
    snapThreshold: 5,
    snaps: [0, 300, 600],
    displayDragPos: true,
    textOffset: [0, 8],
    dragPosFormat: v => `${v}px`,
  })

  guidesY = new Guides(el.value.querySelector(".guides-y"), {
    type: "vertical",
    snapThreshold: 5,
    snaps: [0, 200, 400],
    displayDragPos: true,
    textOffset: [8, 0],
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