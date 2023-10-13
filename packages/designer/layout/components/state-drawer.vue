<template>
  <el-drawer v-model="designerCtx.openState" title="初始状态" w="400!" destroy-on-close :lock-scroll="false">
    <monaco-editor v-model:value="state" @save="ok" />
    <template #footer>
      <div>
        <el-button @click="designerCtx.openState">Cancel</el-button>
        <el-button type="primary" @click="ok">Crtl+S</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { ElDrawer, ElMessage } from 'element-plus'
import { designerCtxKey } from '../interface'
import MonacoEditor from './monaco-editor.vue';
import { refWithWatch } from '../../components/hooks'

const designerCtx = inject(designerCtxKey)!

const state = refWithWatch(() => JSON.stringify(designerCtx.root.state, null, '  '))

function ok() {
  designerCtx.root.state = JSON.parse(state.value)
  ElMessage.success({ message: 'save success' })
}
</script>