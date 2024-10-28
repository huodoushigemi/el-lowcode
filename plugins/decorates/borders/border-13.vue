<template>
  <div class="border-13" style="position: relative">
    <svg :width="w" :height="h">
      <polygon
        :fill="bg"
        :points="`
        7, 7 ${w - 7}, 7 ${w - 7}, ${h - 7} 7, ${h - 7}
      `"
      />

      <polyline
        :stroke="colors[0]"
        :points="`2, 2 ${w - 2} ,2 ${w - 2}, ${h - 2} 2, ${h - 2} 2, 2`"
      />
      <polyline
        :stroke="colors[1]"
        :points="`6, 6 ${w - 6}, 6 ${w - 6}, ${h - 6} 6, ${h - 6} 6, 6`"
      />
      <circle :fill="colors[0]" cx="11" cy="11" r="1" />
      <circle :fill="colors[0]" :cx="w - 11" cy="11" r="1" />
      <circle :fill="colors[0]" :cx="w - 11" :cy="h - 11" r="1" />
      <circle :fill="colors[0]" cx="11" :cy="h - 11" r="1" />
    </svg>
  </div>
</template>

<script setup>
import { useSize } from '../utils'

defineProps(['colors', 'bg'])

const { w, h } = useSize()
</script>

<style lang="scss" scoped>
.border-13 {
  polyline {
    fill: none;
  }
}
</style>
