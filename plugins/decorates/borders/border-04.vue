<template>
  <div class="border-04" style="position: relative">
    <svg :width="w" :height="h">
      <defs>
        <filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology
            operator="dilate"
            radius="2"
            in="SourceAlpha"
            result="thicken"
          />
          <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
          <feFlood :flood-color="colors[1]" result="glowColor" />
          <feComposite
            in="glowColor"
            in2="blurred"
            operator="in"
            result="softGlowColored"
          />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <polygon
        :fill="bg"
        :points="`
        20, 32 ${w * 0.5 - titleWidth / 2}, 32 ${w * 0.5 - titleWidth / 2 + 20}, 53
        ${w * 0.5 + titleWidth / 2 - 20}, 53 ${w * 0.5 + titleWidth / 2}, 32
        ${w - 20}, 32 ${w - 8}, 48 ${w - 8}, ${h - 25} ${w - 20}, ${h - 8}
        20, ${h - 8} 8, ${h - 25} 8, 50
      `"
      />

      <polyline
        :fill="bg"
        :stroke="colors[0]"
        :filter="`url(#${filterId})`"
        :points="`
          ${(w - titleWidth) / 2}, 30
          20, 30 7, 50 7, ${50 + (h - 167) / 2}
          13, ${55 + (h - 167) / 2} 13, ${135 + (h - 167) / 2}
          7, ${140 + (h - 167) / 2} 7, ${h - 27}
          20, ${h - 7} ${w - 20}, ${h - 7} ${w - 7}, ${h - 27}
          ${w - 7}, ${140 + (h - 167) / 2} ${w - 13}, ${135 + (h - 167) / 2}
          ${w - 13}, ${55 + (h - 167) / 2} ${w - 7}, ${50 + (h - 167) / 2}
          ${w - 7}, 50 ${w - 20}, 30 ${(w + titleWidth) / 2}, 30
          ${(w + titleWidth) / 2 - 20}, 7 ${(w - titleWidth) / 2 + 20}, 7
          ${(w - titleWidth) / 2}, 30 ${(w - titleWidth) / 2 + 20}, 52
          ${(w + titleWidth) / 2 - 20}, 52 ${(w + titleWidth) / 2}, 30
        `"
      />

      <polygon
        :stroke="colors[0]"
        fill="transparent"
        :points="`
          ${(w + titleWidth) / 2 - 5}, 30 ${(w + titleWidth) / 2 - 21}, 11
          ${(w + titleWidth) / 2 - 27}, 11 ${(w + titleWidth) / 2 - 8}, 34
        `"
      />

      <polygon
        :stroke="colors[0]"
        fill="transparent"
        :points="`
          ${(w - titleWidth) / 2 + 5}, 30 ${(w - titleWidth) / 2 + 22}, 49
          ${(w - titleWidth) / 2 + 28}, 49 ${(w - titleWidth) / 2 + 8}, 26
        `"
      />

      <polygon
        :stroke="colors[0]"
        :fill="colors[1]"
        :filter="`url(#${filterId})`"
        :points="`
          ${(w + titleWidth) / 2 - 11}, 37 ${(w + titleWidth) / 2 - 32}, 11
          ${(w - titleWidth) / 2 + 23}, 11 ${(w - titleWidth) / 2 + 11}, 23
          ${(w - titleWidth) / 2 + 33}, 49 ${(w + titleWidth) / 2 - 22}, 49
        `"
      />

      <polygon
        :filter="`url(#${filterId})`"
        :fill="colors[0]"
        opacity="1"
        :points="`
          ${(w - titleWidth) / 2 - 10}, 37 ${(w - titleWidth) / 2 - 31}, 37
          ${(w - titleWidth) / 2 - 25}, 46 ${(w - titleWidth) / 2 - 4}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="1;0.7;1"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${filterId})`"
        :fill="colors[0]"
        opacity="0.7"
        :points="`
          ${(w - titleWidth) / 2 - 40}, 37 ${(w - titleWidth) / 2 - 61}, 37
          ${(w - titleWidth) / 2 - 55}, 46 ${(w - titleWidth) / 2 - 34}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="0.7;0.4;0.7"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${filterId})`"
        :fill="colors[0]"
        opacity="0.5"
        :points="`
          ${(w - titleWidth) / 2 - 70}, 37 ${(w - titleWidth) / 2 - 91}, 37
          ${(w - titleWidth) / 2 - 85}, 46 ${(w - titleWidth) / 2 - 64}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="0.5;0.2;0.5"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${filterId})`"
        :fill="colors[0]"
        opacity="1"
        :points="`
          ${(w + titleWidth) / 2 + 30}, 37 ${(w + titleWidth) / 2 + 9}, 37
          ${(w + titleWidth) / 2 + 3}, 46 ${(w + titleWidth) / 2 + 24}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="1;0.7;1"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${filterId})`"
        :fill="colors[0]"
        opacity="0.7"
        :points="`
          ${(w + titleWidth) / 2 + 60}, 37 ${(w + titleWidth) / 2 + 39}, 37
          ${(w + titleWidth) / 2 + 33}, 46 ${(w + titleWidth) / 2 + 54}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="0.7;0.4;0.7"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${filterId})`"
        :fill="colors[0]"
        opacity="0.5"
        :points="`
          ${(w + titleWidth) / 2 + 90}, 37 ${(w + titleWidth) / 2 + 69}, 37
          ${(w + titleWidth) / 2 + 63}, 46 ${(w + titleWidth) / 2 + 84}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="0.5;0.2;0.5"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :fill="colors[0]"
        :filter="`url(#${filterId})`"
        :points="`
          7, ${53 + (h - 167) / 2} 11, ${57 + (h - 167) / 2}
          11, ${133 + (h - 167) / 2} 7, ${137 + (h - 167) / 2}
        `"
      />

      <polygon
        :fill="colors[0]"
        :filter="`url(#${filterId})`"
        :points="`
          ${w - 7}, ${53 + (h - 167) / 2} ${w - 11}, ${57 + (h - 167) / 2}
          ${w - 11}, ${133 + (h - 167) / 2} ${w - 7}, ${137 + (h - 167) / 2}
        `"
      />
    </svg>

    <div ref="headerRef" :style="{ position: 'absolute', left: '50%', top: '18px', transform: 'translate(-50%, 0)' }">
      <slot name="title">
        <div style="padding: 0 8px">{{ title }}</div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import { v4 } from 'uuid'
import { useSize } from '../utils'

const props = defineProps(['colors', 'title', 'bg'])

const filterId = v4()
const { w, h } = useSize()

const headerRef = ref()
const { width } = useElementSize(headerRef)
const titleWidth = computed(() => Math.max(width.value + 64, 130))
</script>
