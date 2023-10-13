<template>
  <div
    class="Grid"
    :style="{
      display: 'grid',
      gridTemplateColumns: _cols,
      gap: gap + 'px'
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'Grid'
})

const props = defineProps({
  cols: [String, Number],
  gap: Number
})

const _cols = computed(() => +props.cols ? `repeat(${props.cols}, minmax(0, 1fr))` : props.cols)
</script>