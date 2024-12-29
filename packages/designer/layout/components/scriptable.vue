<template>
  <el-form-item-render class="el-form-item--label-truncate" v-bind="{ ...$props, ...$attrs }">

    <template v-if="_script" #label="{ label }">
      <template v-if="label">
        {{ label }}
        <el-tag v-if="script !== true" class="exp-flag" :effect="isScript ? 'dark' : 'plain'" :type="isScript ? 'primary' : 'info'" size="small" ml8 cursor-pointer @click.prevent="visible = !isScript; value = isScript ? '' : value">JS</el-tag>
      </template>
    </template>

    <div v-if="isScript || script === true" flex justify-between px8 wfull lh-24 bg="[--el-fill-color-light]" cursor-pointer :c="exp || '[--el-text-color-placeholder]'" style="outline: var(--el-border); outline-offset: -1px" @click="visible = true">
      <span>{{ `{\{` }}</span>
      <span mx12 truncate class="empty:after:content-['JS_Expression']">{{ exp }}</span>
      <span>{{ `}\}` }}</span>
    </div>
    <slot v-else />
  </el-form-item-render>

  <template v-if="script === true || isScript || visible">
    <el-dialog v-model="visible" title="JS Expression" destroy-on-close>
      <monaco-editor v-model:value="code" @save="onSave" :tsExtraLibs="tsExtraLibs" language="typescript" height="500px" autofocus />
      <template #footer>
        <el-button size="default" @click="visible = false">Cancel</el-button>
        <el-button size="default" type="primary" @click="onSave">Crtl+S</el-button>
      </template>
    </el-dialog>
  </template>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { isOn, isString } from '@vue/shared'
import { ElDialog, ElTag, formContextKey, formItemProps } from 'element-plus'
import { ElFormItemRender, formItemRenderPropsBase, useTransformer } from 'el-form-render'
import { designerCtxKey } from '../interface'
import MonacoEditor from './monaco-editor.vue'
import { refWithWatch } from '../../components/hooks'
import { isExp, unExp, wrapExp } from '@el-lowcode/utils'

const props = defineProps({
  ...formItemProps,
  ...formItemRenderPropsBase,
  labelLeft: Boolean,
  script: { type: Boolean, default: undefined },
})

const _script = computed(() => props.script === undefined ? true : props.script)

const formCtx = inject(formContextKey)
const model = computed(() => formCtx.model)
const value = useTransformer(model, () => props.prop, props)

const designerCtx = inject(designerCtxKey)

const isScript = computed(() => isExp(value.value))

const tsExtraLibs = computed(() => (console.log(JSON.stringify(designerCtx.currentState)), {
  'state.ts': `const state = ${JSON.stringify(designerCtx.currentState)}`
}))

const interpolation = computed(() => isExp(value.value) ? value.value : '{{}}')
const code = refWithWatch(() => unExp(interpolation.value) || (isOn(props.prop) ? `(e) => {\n  \n}` : ''))
const exp = computed(() => unExp(interpolation.value))

const visible = ref(false)

function onSave() {
  value.value = code.value ? wrapExp(code.value) : void 0
  visible.value = false
}
</script>

<style lang="scss">
.el-form-item {
  &:hover .exp-flag { display: unset; }
  .exp-flag { display: none; }

  & > .el-form-item__label:empty {
    display: none;
  }
}

.no-scriptable {
  .exp-flag { display: none !important; }
}

.el-form-item--label-truncate {
  > .el-form-item__label {
    @apply pr0 truncate;
  }
}
</style>