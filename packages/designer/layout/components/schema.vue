<template>
  <monaco-editor v-model:value="schema" flex-1 @save="ok" />
  <div p8 text-right>
    <el-button size="small" @click="onCancel">Cancel</el-button>
    <el-button size="small" type="primary" @click="ok">Crtl+S</el-button>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import { designerCtxKey } from '../interface'
import MonacoEditor from './monaco-editor.vue'

const designerCtx = inject(designerCtxKey)!

const schema = ref('')
watchEffect(() => {
  schema.value = JSON.stringify(designerCtx.root, null, '  ')
})

function onCancel() {
  schema.value = JSON.stringify(designerCtx.root, null, '  ')
}

function ok() {
  designerCtx.root = JSON.parse(schema.value)
  ElMessage.success({ message: 'save success' })
}
</script>