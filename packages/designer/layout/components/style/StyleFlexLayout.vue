<template>
  <div grid="~ cols-3" gap-x-8 wfull>
    <el-segmented v-model="dir" :options="[{ label: 'row', value: 'row' }, { label: 'col', value: 'column' }]" class="col-span-2" />
    <el-checkbox v-model="wrap" true-value="wrap" false-value="nowrap" label="wrap" border />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTransformer } from 'el-form-render'

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue'])

const style = computed(() => {
  return props.modelValue || new Proxy({}, {
    get: (t, p, r) => Reflect.get(t, p, r), 
    set: (t, p, v, r) => emit('update:modelValue', { [p]: v })
  })
})

const dir = useTransformer(style, 'flexDirection', { displayValue: 'row' })
const wrap = useTransformer(style, 'flexWrap', { displayValue: 'nowrap' })
</script>