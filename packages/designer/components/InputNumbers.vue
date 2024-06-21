<template>
  <div class="input-numbers wfull flex">
    <InputNumber
      v-for="i in len"
      :modelValue="modelValue?.[i - 1]"
      @update:modelValue="emit('update:modelValue', Array(len).fill(undefined).map((e, ei) => ei == i - 1 ? $event : modelValue?.[ei]))"
      :placeholder="placeholder?.[i - 1]"
      :min :max :step :unit :units :hideUnit
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InputNumber from './InputNumber.vue'
import { watchEffect } from 'vue';

const props = defineProps({
  modelValue: Array,
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
  len: Number,
  unit: String,
  units: Array,
  hideUnit: Boolean,
  placeholder: Array,
  label: String
})

const emit = defineEmits(['update:modelValue'])

const len = computed(() => props.len ?? props.modelValue?.length ?? 0)
</script>

<style lang="scss">

</style>