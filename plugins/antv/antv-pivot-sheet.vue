<template>
  <div ref="elRef" />
</template>

<script setup>
import { watch, onMounted, ref, onUnmounted, onBeforeUnmount } from 'vue'
import { useResizeObserver } from '@vueuse/core'

const { S2Event, PivotSheet, TableSheet } = S2

const props = defineProps(['dataCfg', 'options'])

const elRef = ref()

let s2

onMounted(async () => {
  s2 = new PivotSheet(elRef.value, props.dataCfg, props.options)
  s2.render()

  useResizeObserver(elRef, ([e]) => {
    s2.changeSheetSize(e.borderBoxSize[0].inlineSize, e.borderBoxSize[0].blockSize)
    s2.render(false)
  })

  onBeforeUnmount(() => {
    s2.destroyed()
  })
})

watch(() => JSON.parse(JSON.stringify(props)), e => {
  s2?.destroy()
  s2 = new PivotSheet(elRef.value, e.dataCfg, {
    width: s2.options.width,
    height: s2.options.height,
    ...e.options,
  })
  s2.render()
})
</script>