<template>
  <div class="flex aic flex-wrap gap-x-4">
    <el-select v-model="type" class="has-b" style="width: 60px">
      <el-option label="实线" value="solid" />
      <el-option label="虚线" value="dashed" />
      <el-option label="斑点" value="dotted" />
    </el-select>

    <InputNumber v-model="width" class="has-b" noUnit style="width: 36px" :min="0" :max="22" :step=".5" />
    
    <el-color-picker v-model="color" class="has-b" showAlpha />

    <Shadow :model :prefix :fields :displayValue w24 h24 bg-hover />
  </div>
</template>

<script setup>
import { useTransformer } from 'el-form-render'
import { unFn } from '@el-lowcode/utils'
import Shadow from './Shadow.vue'

const props = defineProps({
  model: Object,
  prefix: [String, Function],
  fields: Object,
  displayValue: Object
})

const fields = () => Object.assign({}, props.fields)
const displayValue = () => Object.assign({ type: 'solid', width: 1, color: null }, props.displayValue)

const type = useT('type')
const width = useT('width')
const color = useT('color')

function useT(k) {
  const prop = () => [unFn(props.prefix, k), fields()[k] ?? k].filter(e => e).join('.')
  return useTransformer(() => props.model, prop, { displayValue: () => displayValue()[k] })
}
</script>

<style scoped>
* > :deep(.has-b + .has-b) {
  margin-left: -5px;
}
</style>