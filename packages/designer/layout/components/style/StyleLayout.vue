<template>
  <div wfull>
    <el-segmented v-model="layout" :options="[{ label: '—', value: void 0 }, { label: 'flex', value: 'flex' }, { label: 'grid', value: 'grid' }, { label: 'free', value: 'lcd-absolute-layout' }]" block />

    <StyleFlexLayout v-if="layout == 'flex'" :obj="obj" mt16 />
    <StyleGridLayout v-if="layout == 'grid'" :obj="obj" mt12 />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTransformer } from 'el-form-render'
import StyleFlexLayout from './StyleFlexLayout.vue'
import StyleGridLayout from './StyleGridLayout.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  modelValue: Object,
  obj: Object
})

const layout = useTransformer(() => props.obj, 'style.display', {
  get: v => props.obj['lcd-absolute-layout'] ? 'lcd-absolute-layout' : v,
  set: v => v == 'lcd-absolute-layout' ? (props.obj['lcd-absolute-layout'] = true, void 0) : (props.obj['lcd-absolute-layout'] = void 0, v),
})
</script>