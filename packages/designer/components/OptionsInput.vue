<template>
  <div flex="~ col" wfull space-y--1>
    <Intable
      class="el-table"
      :index="true"
      :border="true"
      :columns="[{ id: L, name: L }, { id: V, name: V }].map(e => ({ ...e, editable: true }))"
      size="small"
      :newRow="newRow"
      :data="modelValue"
      @update:data="v => emit('update:modelValue', v)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Intable from '@intable/vue'
import 'intable/theme/element-plus.scss'

const props = defineProps({
  modelValue: Array,
  props: Object,
  new: Function
})

const L = computed(() => props.props?.L ?? props.props?.label ?? 'label')
const V = computed(() => props.props?.V ?? props.props?.value ?? 'value')

const emit = defineEmits(['update:modelValue'])

function newRow(i) {
  const modelValue = [...props.modelValue || []]
  return props.new
    ? props.new(i)
    : { [L.value]: `opt ${modelValue.length + 1}`, [V.value]: `${Date.now()}` }
}
</script>