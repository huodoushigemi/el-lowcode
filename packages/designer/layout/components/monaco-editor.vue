<template>
  <VueMonacoEditor
    @mount="onMount"
    @keydown="onKeydown"
    v-loading="!isMount"
    v-bind="{...$props, ...$attrs}"
    :value="_val"
    :modelValue="void 0"
    @update:value="emit('update:modelValue', _val = $event)"
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

<script setup>
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import { vLoading } from 'element-plus'
import { refWithWatch } from '../../components/hooks'


const props = defineProps({
  // ...VueMonacoEditor.props as { [k in keyof EditorProps]: any },
  modelValue: String,
  language: String,
  options: Object,
  // autoFormat: { type: Boolean, default: true },
  tsExtraLibs: Object,
  autofocus: Boolean,
  onSave: Function
})

let _val = refWithWatch(() => props.modelValue || '')

const emit = defineEmits(['save', 'update:modelValue'])

// const isDark = useDark({ storageKey: 'vitepress-theme-appearance' })
const isDark = true

async function onMount(_editor, monaco) {
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    lib: ["es2020"],
    allowNonTsExtensions: true
  })
  
  isMount.value = true

  window._editor = _editor
  
  setTimeout(() => {
    if (props.autofocus) _editor.focus()
  }, 100);
  const { languages } = monaco
  if (props.tsExtraLibs) {
    Object.entries(props.tsExtraLibs).forEach(([k, v]) => {
      languages.typescript.typescriptDefaults.addExtraLib(v, k)
      languages.typescript.javascriptDefaults.addExtraLib(v, k)
    })
  }
}

function onKeydown(e) {
  if (props.onSave && e.key.toLowerCase() == 's' && e.ctrlKey) {
    e.preventDefault()
    e.stopPropagation()
    emit('save', _val.value)
  }
}
</script>

<script>
import { defineAsyncComponent } from 'vue'

const VueMonacoEditor = defineAsyncComponent(async () => {
  const vs = 'https://unpkg.com/monaco-editor@0.52.2/min/vs'

  const { VueMonacoEditor, loader } = await import('@guolao/vue-monaco-editor')
  // loader.config({ monaco })
  loader.config({ paths: { vs } })
  return VueMonacoEditor
})

const isMount = ref(false)
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