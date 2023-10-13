<template>
  <div class="selected-rect">
    <div :class="[
      'absolute bottom-[100%] px8 text-12 c-white bg-[--el-color-primary] pointer-events-auto',
      second && 'op75'
    ]">{{ config?.label }}</div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, watchEffect } from 'vue'
import { BoxProps } from '../../components/box'
import { sloveConfig } from '../../components/_utils'

const props = defineProps({
  el: Object as PropType<BoxProps>,
  second: Boolean
})

const config = computed(() => props.el ? sloveConfig(props.el) : undefined)
</script>

<style scoped lang="scss">
.selected-rect {
  
}
</style>