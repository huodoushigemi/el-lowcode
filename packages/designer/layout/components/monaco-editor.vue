<template>
  <div v-if="!isMount" v-loading="!isMount" absolute inset-0 z-1 />
  <div v-if="!isMount" v-bind="$attrs" />
  <VueMonacoEditor
    @mount="onMount"
    @keydown="onKeydown"
    @update:value="_val = $event"
    v-bind="{...$props, ...$attrs}"
    :class="language"
    :language="language || 'json'"
    :theme="isDark ? 'vs-dark' : 'vs'"
    :options="{
      lineNumbers: 'off',
      minimap: { enabled: false },
      formatOnType: true,
      tabSize: 2,
      wordWrap: 'off',
      ...options,
    }"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDark, useSessionStorage } from '@vueuse/core'
import { refWithWatch } from '../../components/hooks'

// ==========================================================================================

const VueMonacoEditor = defineAsyncComponent(async () => {
  const monaco = window.monaco = await import('monaco-editor')
  self.MonacoEnvironment = {
    getWorker: async (_, label) => new (await {
      editorWorkerService: () => import("monaco-editor/esm/vs/editor/editor.worker?worker"),
      typescript: () => import('monaco-editor/esm/vs/language/typescript/ts.worker?worker'),
      json: () => import('monaco-editor/esm/vs/language/json/json.worker?worker'),
      html: () => import('monaco-editor/esm/vs/language/html/html.worker?worker'),
    }[label]()).default
  }
  const { VueMonacoEditor, loader } = await import('@guolao/vue-monaco-editor')
  loader.config({ monaco })
  return VueMonacoEditor
})
// ==========================================================================================


const props = defineProps({
  // ...VueMonacoEditor.props as { [k in keyof EditorProps]: any },
  value: String,
  language: String,
  options: Object,
  // autoFormat: { type: Boolean, default: true },
  tsExtraLibs: Object
})

let editorIns

let _val = refWithWatch(() => props.value || '')

const emit = defineEmits<{ (e: 'save', val: string): void }>()

const isMount = useSessionStorage('monaco-editor-is-mounted', false)
const isDark = useDark({ storageKey: 'vitepress-theme-appearance' })

async function onMount(_editor) {
  isMount.value = true
  editorIns = _editor
  setTimeout(() => {
    // if (props.autoFormat) editor.getAction('editor.action.formatDocument').run()
    editorIns.focus()
  }, 100);
  // const { languages } = await import('monaco-editor')
  const { languages } = self.monaco
  // const languages: any = {}
  if (props.tsExtraLibs) {
    Object.entries(props.tsExtraLibs).forEach(([k, v]) => {
      languages.typescript.typescriptDefaults.addExtraLib(v, k)
    })
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key.toLowerCase() == 's' && e.ctrlKey) {
    e.preventDefault()
    e.stopPropagation()
    emit('save', _val.value)
  }
}
</script>

<style lang="scss">
.typescript {
  .monaco-editor.vs .mtk1 {
    color: #a31515;
  }
  .monaco-editor.vs-dark .mtk1 {
    color: #9cdcfe; 
  }
}
</style>