<template>
  <ElFormRender ref="form" v-bind="{ ...$props, ...$attrs }" @submit.prevent>
    <slot />

    <el-form-item>
      <el-button type="primary" native-type="submit">Submit</el-button>
      <el-button @click="($refs.form as FormInstance).resetFields()">Reset</el-button>
    </el-form-item>
  </ElFormRender>
</template>

<script setup lang="ts">
import { ElFormItem, FormInstance } from 'element-plus'
import { ElFormRender, formRenderProps } from 'el-form-render'

defineOptions({
  name: 'Form'
})

defineProps(formRenderProps)
</script>
