<template>
  <div class=".border-05"  :style="`position: relative; box-shadow: inset 0 0 25px 3px ${colors[0]}`">
    <svg :width="w" :height="h">
      <polygon :fill="bg" :points="`
        4, 0 ${w - 4}, 0 ${w}, 4 ${w}, ${h - 4} ${w - 4}, ${h}
        4, ${h} 0, ${h - 4} 0, 4
      `"/>
    </svg>

    <svg
      :width="w"
      :height="h"
      :key="item"
      v-for="item in border"
      :class="`border-item ${item}`"
    >
      <polygon
        :fill="colors[1]"
        points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"
      />
    </svg>
  </div>
</template>

<script setup>
import { useSize } from '../utils'

defineProps(['colors', 'bg'])

const { w, h } = useSize()
</script>

<style lang="scss">
.border-05 {
  > .border-item {
    position: absolute;
    top: 0;
    left: 0;
  }
  > .right-top {
    right: 0;
    transform: rotateY(180deg);
  }
  > .left-bottom {
    bottom: 0;
    transform: rotateX(180deg);
  }
  > .right-bottom {
    right: 0;
    bottom: 0;
    transform: rotateX(180deg) rotateY(180deg);
  }
}
</style>
