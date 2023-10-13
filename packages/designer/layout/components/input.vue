<template>
  <el-input v-bind="{ ...$props, ...$attrs, 'onUpdate:modelValue': undefined }" v-model="val" @change="$emit('update:modelValue', val)" />
</template>

<script setup lang="ts">
import { inputProps } from 'element-plus'
import { refWithWatch } from '../../components/hooks'

const props = defineProps(inputProps)

defineEmits<{
  'update:modelValue': [string]
}>()

const val = refWithWatch(() => props.modelValue)

const aaa = (...args) => window.alert(...args)
</script>