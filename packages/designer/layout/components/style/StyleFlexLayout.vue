<template>
  <div grid="~ cols-2" gap-8 wfull>
    <!-- <Item label="direction" prop="style.flexDirection"  />
    <Item label="gap" prop="gap" :get="getGap" :set="setGap" :el="{ is: 'inputNumbers', len: 2, placeholder: ['↕', '↔'], noUnit: true, min: 0 }" />
    <Item label="wrap" prop="style.flexWrap"  /> -->
    <el-segmented v-model="dir" :options="[{ label: 'row', value: 'row' }, { label: 'col', value: 'column' }]" />
    <InputNumbers v-model="gap" :len="2" :placeholder="['↕', '↔']" noUnit :min="0" />
    <el-checkbox v-model="wrap" true-value="wrap" false-value="nowrap" label="wrap" border />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTransformer } from 'el-form-render'
import { ElFormItemRender as Item } from 'el-form-render'

const props = defineProps({
  modelValue: Object,
  obj: Object
})

const dir = useTransformer(() => props.obj, 'style.flexDirection', { displayValue: 'row' })
const wrap = useTransformer(() => props.obj, 'style.flexWrap', { displayValue: 'nowrap' })

const gap = useTransformer(() => props.obj, 'style.gap', {
  get: v => v?.split(' ').map(e => parseInt(e)),
  set: v => v.map(e => `${e || 0}px`)?.join(' ')
})
</script>