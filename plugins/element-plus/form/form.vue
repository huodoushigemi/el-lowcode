<template>
  <ElFormRender ref="formRef" v-bind="{ ...$props, ...$attrs }" @submit.prevent="onSubmit" @reset="formRef.resetFields()">
    <slot />
  </ElFormRender>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElFormRender, formRenderProps } from 'el-form-render'

defineOptions({
  name: 'ElForm-c'
})

defineProps(formRenderProps)
const emit = defineEmits(['submit'])

const formRef = ref()

async function onSubmit() {
  await formRef.value.validate()
  emit('submit')
}
</script>
