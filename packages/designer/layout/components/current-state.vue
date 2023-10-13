<template>
  <div flex="~ col">
    <monaco-editor v-model:value="state" flex-1 min-hinherit @save="ok" />
    <div p8 text-right>
      <el-button size="small" @click="onCancel">Cancel</el-button>
      <el-button size="small" type="primary" @click="ok">Crtl+S</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { ElMessage } from 'element-plus'
import { designerCtxKey } from '../interface'
import MonacoEditor from './monaco-editor.vue'
import { refWithWatch } from '../../components/hooks'

const designerCtx = inject(designerCtxKey)!

const state = refWithWatch(() => JSON.stringify(designerCtx.currentState, null, '  '))

function onCancel() {
  state.value = JSON.stringify(designerCtx.currentState, null, '  ')
}

function ok() {
  designerCtx.currentState = JSON.parse(state.value)
  ElMessage.success({ message: 'save success' })
}
</script>