<template>
  <div wfull>
    <el-segmented v-model="layout" :options="[{ label: '弹性布局', value: 'flex' }, { label: '网格布局', value: 'grid' }, { label: '自由布局', value: 'data-absolute-layout' }]" block />
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

const layout = useTransformer(style, 'display', {
  get: v => style['data-absolute-layout'] ? 'data-absolute-layout' : v,
  set: v => v == 'data-absolute-layout' ? (style['data-absolute-layout'] = true, void 0) : v
})
</script>