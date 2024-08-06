<template>
  <div wfull>
    <el-segmented v-model="layout" :options="['flex', 'grid']" block />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTransformer } from 'el-form-render'

defineOptions({
  inheritAttrs: false
})

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

const layout = useTransformer(style, 'display')
</script>