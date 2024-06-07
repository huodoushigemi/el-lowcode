<template>
  <div flex="~ col" wfull space-y--1>
    <div v-for="(item, i) in modelValue" class="focus:z-1 focus:relative" flex aic tabindex="-1">
      <pair-input :model-value="[item.label, item.value]" :placeholder="['label', 'value']" @update:modelValue="onInput(item, $event)" />
      <i-mdi:close ml6 p4 w22 h22 bg-hover @click="modelValue.splice(i, 1)" />
    </div>
    <el-button mt4="!" mr32 text bg rd="0!" @click="onPlus">Add</el-button>
  </div>
</template>

<script setup lang="ts">
import PairInput from './pair-input.vue'

defineOptions({
  name: 'OptionsInput'
})

type Opt = { label: string; value: string }

const props = defineProps<{
  modelValue: Opt[]
}>()

const emit = defineEmits<{
  'update:modelValue': [Opt[]]
}>()

function onInput(item: Opt, e: string[]) {
  item.label = e[0]
  item.value = e[1]
  console.log(123);
  
}

function onPlus() {
  const modelValue = [...props.modelValue || []]
  modelValue.push({ label: `opt${modelValue.length + 1}`, value: `${modelValue.length + 1}` })
  emit('update:modelValue', modelValue)
}
</script>