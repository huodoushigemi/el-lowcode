<template>
  <div grid="~ cols-2" gap-x-8>
    <Item label="cols" prop="gridTemplateColumns" :get="getCols" :set="setCols" type="input-number" :el="{ min: 1 }" />
    <Item label="gap" prop="gap" :get="getGap" :set="setGap" :el="{ is: 'inputNumbers', len: 2, placeholder: ['↕', '↔'], noUnit: true, min: 0 }" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTransformer } from 'el-form-render'
import { ElFormItemRender as Item } from 'el-form-render'

const props = defineProps({
  obj: Object
})

const { get: getCols, set: setCols } = useTransformer(() => props.obj, 'style.gridTemplateColumns', {
  get: v => parseInt(v?.replace(/repeat\((\d+)?.*/, '$1')) || 1,
  set: v => v > 1 ? `repeat(${v}, minmax(0, 1fr))` : void 0
})

const { get: getGap, set: setGap } = useTransformer(() => props.obj, 'style.gap', {
  get: v => v?.split(' ').map(e => parseInt(e)),
  set: v => v.map(e => `${e || 0}px`)?.join(' ')
})
</script>