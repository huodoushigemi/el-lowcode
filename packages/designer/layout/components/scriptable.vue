<template>
  <el-form-item-render v-bind="$props">
    <template v-if="_scriptable" #label="{ label }">
      {{ label }}
      <el-tag v-if="scriptable !== true" :effect="isScript ? 'dark' : 'plain'" :type="isScript ? 'primary' : 'info'" size="small" ml8 cursor-pointer @click="isScript = !isScript">JS</el-tag>
    </template>
    <template v-if="scriptable === true || isScript">
      <div flex justify-between px8 wfull bg="[--el-fill-color-light]" bg-hover cursor-pointer :c="exp || '[--el-text-color-placeholder]'" style="border: var(--el-border)" @click="visible = true">
        <span>{{ '\{\{' }}</span>
        <span mx12 line-clamp-2 class="empty:after:content-['JS_Expression']">{{ exp }}</span>
        <span>{{ '\}\}' }}</span>
      </div>
      <el-dialog v-model="visible" title="JS Expression" class="[&_.el-dialog\_\_footer]:pt0" destroy-on-close>
        <monaco-editor v-model:value="code" @save="onSave" :tsExtraLibs="tsExtraLibs" language="typescript" height="300px" />
        <template #footer>
          <el-button size="default" @click="visible = false">Cancel</el-button>
          <el-button size="default" type="primary" @click="onSave">Crtl+S</el-button>
        </template>
      </el-dialog>
    </template>
    <el-form-item-render v-else v-bind="$props" class="[&_.el-form-item\_\_label]:hidden!" wfull />
  </el-form-item-render>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { isString } from '@vue/shared'
import { ElDialog, ElTag, formContextKey } from 'element-plus'
import { ElFormItemRender, formItemRenderProps } from 'el-form-render'
import { get, set } from '@el-lowcode/utils'
import { sloveConfig } from '../../components/_utils'
import { designerCtxKey } from '../interface'
import MonacoEditor from './monaco-editor.vue'
import { refWithWatch } from '../../components/hooks'

const props = defineProps({
  ...formItemRenderProps,
  scriptable: { type: Boolean, default: undefined }
})

const formCtx = inject(formContextKey)
const model = computed(() => formCtx.model)
const value = computed({
  get: () => get(model.value, props.prop || ''),
  set: val => set(model.value, props.prop, val)
})

const designerCtx = inject(designerCtxKey)
const config = computed(() => sloveConfig(designerCtx.active))
const defaultValue = computed(() => get(config.value?.defaultProps?.() || {}, props.prop) ?? props.defaultValue)

const _scriptable = computed(() => (
  props.scriptable === undefined ? true : props.scriptable
))

const expReg = /^\{\{([\d\D]*)\}\}$/

const isScript = computed({
  get() {
    return isString(value.value) ? expReg.test(value.value) : false
  },
  set(val) {
    value.value = val ? '{{}}' : defaultValue.value
  }
})

const tsExtraLibs = computed(() => (console.log(JSON.stringify(designerCtx.currentState)), {
  'state.ts': `const state = ${JSON.stringify(designerCtx.currentState)}`
}))

const interpolation = computed(() => isScript.value ? value.value : '{{}}')
const code = refWithWatch(() => interpolation.value.match(expReg)[1])
const exp = computed(() => interpolation.value.match(expReg)[1])

const visible = ref(false)

function onSave() {
  console.log(code.value);
  value.value = `{{${code.value}}}`
  visible.value = false
}
</script>
