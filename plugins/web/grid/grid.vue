<template>
  <div
    class="Grid"
    :style="{
      display: 'grid',
      gridTemplateColumns: _cols,
      gap: isArray(gap) ? `${gap[0] || 0}px ${gap[1] || 0}px` : (gap || 0) + 'px'
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { isArray } from '@vue/shared'

defineOptions({
  name: 'Grid'
})

const props = defineProps({
  cols: [Number, String],
  gap: [Number, Array]
})

const _cols = computed(() => +props.cols ? `repeat(${props.cols}, minmax(0, 1fr))` : props.cols)
</script>
