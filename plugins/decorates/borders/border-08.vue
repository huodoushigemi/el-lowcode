<template>
  <div class="border-08" style="position: relative">
    <svg :width="w" :height="h">
      <defs>
        <path :id="path" :d="pathD" fill="transparent" />
        <radialGradient :id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>

        <mask :id="mask">
          <circle cx="0" cy="0" r="150" :fill="`url(#${gradient})`">
            <animateMotion
              :dur="`${dur}s`"
              :path="pathD"
              rotate="auto"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>

      <polygon
        :fill="bg"
        :points="`5, 5 ${w - 5}, 5 ${w - 5} ${h - 5} 5, ${h - 5}`"
      />

      <use :stroke="colors[0]" stroke-width="1" :xlink:href="`#${path}`" />

      <use
        :stroke="colors[1]"
        stroke-width="3"
        :xlink:href="`#${path}`"
        :mask="`url(#${mask})`"
      >
        <animate
          attributeName="stroke-dasharray"
          :from="`0, ${length}`"
          :to="`${length}, 0`"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </use>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { v4 } from 'uuid'
import { useSize } from '../utils'

const props = defineProps(['colors', 'dur', 'bg', 'reverse'])

const { w, h } = useSize()

const path = v4()
const gradient = v4()
const mask = v4()

const length = computed(() => {
  return (w.value + h.value - 5) * 2
})

const pathD = computed(() => {
  if (props.reverse)
    return `M 2.5, 2.5 L 2.5, ${h.value - 2.5} L ${w.value - 2.5}, ${
      h.value - 2.5
    } L ${w.value - 2.5}, 2.5 L 2.5, 2.5`
  return `M2.5, 2.5 L${w.value - 2.5}, 2.5 L${w.value - 2.5}, ${
    h.value - 2.5
  } L2.5, ${h.value - 2.5} L2.5, 2.5`
})
</script>