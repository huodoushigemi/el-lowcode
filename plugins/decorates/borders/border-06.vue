<template>
  <div
    class="border-box-07"
    :style="`
      position: relative;
      box-shadow: inset 0 0 40px ${colors[0]}; 
      border: 1px solid ${colors[1]};
      background-color: ${bg};
    `"
  >
    <svg :width="w" :height="h">
      <polyline
        class="go-border-line-w-2"
        :stroke="colors[0]"
        :points="`0, 25 0, 0 25, 0`"
      />
      <polyline
        class="go-border-line-w-2"
        :stroke="colors[0]"
        :points="`${w - 25}, 0 ${w}, 0 ${w}, 25`"
      />
      <polyline
        class="go-border-line-w-2"
        :stroke="colors[0]"
        :points="`${w - 25}, ${h} ${w}, ${h} ${w}, ${h - 25}`"
      />
      <polyline
        class="go-border-line-w-2"
        :stroke="colors[0]"
        :points="`0, ${h - 25} 0, ${h} 25, ${h}`"
      />

      <polyline
        class="go-border-line-w-5"
        :stroke="colors[1]"
        :points="`0, 10 0, 0 10, 0`"
      />
      <polyline
        class="go-border-line-w-5"
        :stroke="colors[1]"
        :points="`${w - 10}, 0 ${w}, 0 ${w}, 10`"
      />
      <polyline
        class="go-border-line-w-5"
        :stroke="colors[1]"
        :points="`${w - 10}, ${h} ${w}, ${h} ${w}, ${h - 10}`"
      />
      <polyline
        class="go-border-line-w-5"
        :stroke="colors[1]"
        :points="`0, ${h - 10} 0, ${h} 10, ${h}`"
      />
    </svg>
  </div>
</template>

<script setup>
import { useSize } from '../utils'

defineProps(['colors', 'bg'])

const { w, h } = useSize()
</script>

<style lang="scss" scoped>
.border-box-07 {
  polyline {
    fill: none;
    stroke-linecap: round;
  }
  .go-border-line-w-2 {
    stroke-width: 2;
  }
  .go-border-line-w-5 {
    stroke-width: 5;
  }
}
</style>
