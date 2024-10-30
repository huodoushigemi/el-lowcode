<template>
  <div ref="elRef" />
</template>

<script setup>
import { watch, onMounted, ref, onUnmounted, onBeforeUnmount } from 'vue'
import { useResizeObserver } from '@vueuse/core'

const { S2Event, PivotSheet, TableSheet, getPalette, generatePalette } = S2

const props = defineProps(['dataCfg', 'options', 'themeCfg', 'brandColor'])

const elRef = ref()

let s2

onMounted(() => update())
onBeforeUnmount(() => s2.destroyed())

useResizeObserver(elRef, ([e]) => {
  s2.changeSheetSize(e.borderBoxSize[0].inlineSize, e.borderBoxSize[0].blockSize)
  s2.render(false)
})

watch(() => JSON.parse(JSON.stringify(props)), update)

function update() {
  const { dataCfg, options, themeCfg, brandColor } = props
  s2?.destroy()
  s2 = new PivotSheet(elRef.value, dataCfg, {
    width: s2?.options.width,
    height: s2?.options.height,
    ...options,
  })
  ;(themeCfg || brandColor) && s2.setThemeCfg({
    palette: brandColor ? generatePalette({ ...getPalette(themeCfg.name), brandColor }) : void 0,
    ...themeCfg,
  })
  s2.render()
}
</script>