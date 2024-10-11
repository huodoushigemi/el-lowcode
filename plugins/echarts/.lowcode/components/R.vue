<template>
  <div style="padding: 1px; width: 24px; height: 24px; box-sizing: border-box;" v-slide="[_value, { min: -180, max: 180 }]">
    <div style="position: relative; width: 100%; height: 100%; border: 1px solid currentColor; border-radius: 50%;">
      <div :style="`position: absolute; width: 50%; height: 50%; border-bottom: 1px solid currentColor; transform: translate(100%,0) rotate(${360 - value}deg); transform-origin: 0 100%;`" />
      <!-- <div style="transform: translate(100%,6px); padding-left: 4px; line-height: 12px; font-size: 12px; font-weight: lighter;">{{ value }}</div> -->
      <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 5px; height: 5px; background: currentColor" />
    </div>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { vSlide } from '@el-lowcode/utils'

const props = defineProps({
  modelValue: Number
})

const value = useVModel(props, 'modelValue')

const _value = {
  get value() { return value.value },
  set value(v) { value.value = v }
}
</script>