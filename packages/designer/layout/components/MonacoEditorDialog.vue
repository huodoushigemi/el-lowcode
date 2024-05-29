<template>
  <component :modelValue="visible" :is="dialog.is" @update:modelValue="emit('update:visible', $event)" destroy-on-close v-bind="dialog">
    <MonacoEditor v-model:value="value" @save="ok" />
    <template #footer>
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="ok">Crtl+S</el-button>
    </template>
  </component>
</template>

<script setup>
import MonacoEditor from './monaco-editor.vue'
import { refWithWatch } from '../../components/hooks'

const props = defineProps({
  visible: Boolean,
  modelValue: String,
  language: String,
  height: String,
  options: Object,
  tsExtraLibs: Object,
  dialog: { default: ()=> ({ is: 'el-dialog' }) }
})

const emit = defineEmits(['update:modelValue', 'update:visible'])

const value = refWithWatch(() => props.modelValue)

function ok() {
  emit('update:modelValue', value.value)
  emit('update:visible', false)
}

function cancel() {
  value.value = props.value
  emit('update:visible', false)
}
</script>