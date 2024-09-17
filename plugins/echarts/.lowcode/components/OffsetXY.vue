<template>
  <svg :width="w" :height="h" @mousedown="startDrag">
    <!-- 坐标轴 -->
    <line :x1="0" :y1="0" :x2="w" :y2="0" stroke="currentColor" stroke-dasharray="3 2" op20 />
    <line :x1="0" :y1="h" :x2="w" :y2="h" stroke="currentColor" stroke-dasharray="3 2" op20 />
    <line :x1="0" :y1="0" :x2="0" :y2="h" stroke="currentColor" stroke-dasharray="3 2" op20 />
    <line :x1="w" :y1="0" :x2="w" :y2="h" stroke="currentColor" stroke-dasharray="3 2" op20 />
    <line :x1="0" :y1="centerY" :x2="w" :y2="centerY" stroke="currentColor" stroke-dasharray="3 2" op20 />
    <line :x1="centerX" :y1="0" :x2="centerX" :y2="h" stroke="currentColor" stroke-dasharray="3 2" op20 />
    
    <!-- 从坐标轴中心到圆点的连线 -->
    <line :x1="centerX" :y1="centerY" :x2="centerX + x" :y2="centerY + y" stroke="red" />

    <!-- 圆点 -->
    <circle :cx="centerX + x" :cy="centerY + y" r="6" fill="#0e639c" />
  </svg>
</template>

<script setup>
import { ref } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  x: Number,
  y: Number,
  w: { type: Number, default: 80 },
  h: { type: Number, default: 80 },
})

const emit = defineEmits(['update:x', 'update:y'])

// 定义 SVG 的宽高和坐标轴的中心点
const centerX = props.w / 2
const centerY = props.h / 2

let scx = 0, scy = 0
let sx = 0, sy = 0

// 定义圆点的位置和是否正在拖动
// const x = ref(props.x || 0)
// const y = ref(props.y || 0)
const x = useVModel(props, 'x', void 0, { defaultValue: 0 })
const y = useVModel(props, 'y', void 0, { defaultValue: 0 })
const isDragging = ref(false)

// 启动拖动事件
const startDrag = e => {
  e.preventDefault()
  isDragging.value = true
  scx = e.clientX
  scy = e.clientY
  x.value = sx = e.offsetX - centerX
  y.value = sy = e.offsetY - centerY
  
  function move(e) {
    x.value = sx + e.clientX - scx
    y.value = sy + e.clientY - scy
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', () => document.removeEventListener('mousemove', move), { once: true })
}
</script>