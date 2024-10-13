<template>
  <div class="wangeditor" @keydown.stop>
    <Toolbar
      v-if="toolbar?.show ?? true"
      :key="key"
      :editor="editorRef"
      :defaultConfig="{ ...toolbar }"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :key="key"
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      :defaultConfig="editorConfig"
      :mode="mode"
      style="height: 100%"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, shallowRef, watch, watchEffect } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { omit } from '@el-lowcode/utils'

const props = defineProps(['modelValue', 'placeholder', 'toolbar', 'autoFocus', 'scroll', 'maxLength', 'disabled', 'mode'])
const emit = defineEmits(['update:modelValue'])

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

const editorConfig = {
  readOnly: props.disabled,
  placeholder: props.placeholder,
  autoFocus: props.autoFocus,
  scroll: props.scroll ?? true,
  maxLength: props.maxLength
}

watchEffect(() => props.disabled ? editorRef.value?.disable() : editorRef.value?.enable())

const key = ref(0)
watch(() => JSON.stringify(omit(props, 'modelValue')), () => {
  key.value++
  editorRef.value?.destroy()
  editorRef.value = void 0
})

onBeforeUnmount(() => {
  editorRef.value?.destroy()
})

// 编辑器回调函数
const handleCreated = editor => {
  editorRef.value = editor // 记录 editor 实例，重要！
  console.log(editor);
  
}
const handleChange = editor => {
  console.log('change:', editor.getHtml())
}
const handleDestroyed = editor => {
  console.log('destroyed', editor)
}
const handleFocus = editor => {
  console.log('focus', editor)
}
const handleBlur = editor => {
  console.log('blur', editor)
}
const customAlert = (info, type) => {
  alert(`【自定义提示】${type} - ${info}`)
}
const customPaste = (editor, event, callback) => {
  // console.log('ClipboardEvent 粘贴事件对象', event)

  // 自定义插入内容
  // editor.insertText('xxx')

  // 返回值（注意，vue 事件的返回值，不能用 return）
  // callback(false) // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
}
</script>

<style>
.wangeditor {
  display: flex;
  flex-direction: column;
  height: 400px;
  /* --w-e-textarea-color: initial;
  --w-e-textarea-bg-color: transparent;
  --w-e-toolbar-color: inherit;
  --w-e-toolbar-bg-color: transparent; */
}
</style>