<template>
  <div flex="~ col" hfull>
    <monaco-editor v-model:value="schema" flex-1 @save="ok" />
    <div p8 text-right>
      <ElButton size="small" @click="onCancel">Cancel</ElButton>
      <ElButton size="small" type="primary" @click="ok">Crtl+S</ElButton>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watchEffect } from 'vue'
import { ElMessage, ElButton } from 'element-plus'
import MonacoEditor from '../../../../layout/components/monaco-editor.vue'

const designerCtx = inject('designerCtx')

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