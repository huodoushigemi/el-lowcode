<template>
  <div flex="~ col" wfull space-y--1>
    <div v-for="(item, i) in modelValue" class="focus:z-1 focus:relative" flex aic tabindex="-1">
      <pair-input :model-value="[item[L], item[V]]" :placeholder="[L, V]" @update:modelValue="onInput(item, $event)" />
      <i-mdi:close ml6 p4 w22 h22 bg-hover @click="modelValue.splice(i, 1)" />
    </div>
    <el-button mt4="!" mr32 text bg rd="0!" @click="onPlus">Add</el-button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PairInput from './pair-input.vue'

defineOptions({
  name: 'OptionsInput'
})

const props = defineProps({
  modelValue: Array,
  props: Object,
  new: Function
})

const L = computed(() => props.props?.L ?? props.props?.label ?? 'label')
const V = computed(() => props.props?.V ?? props.props?.value ?? 'value')

const emit = defineEmits(['update:modelValue'])

function onInput(opt, e) {
  opt[L.value] = e[0]
  opt[V.value] = e[1]
}

function onPlus() {
  const modelValue = [...props.modelValue || []]
  if (props.new) modelValue.push(props.new(props.modelValue.length))
  else modelValue.push({ [L.value]: `opt${modelValue.length + 1}`, [V.value]: `${modelValue.length + 1}` })
  emit('update:modelValue', modelValue)
}
</script>