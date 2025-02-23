<template>
  <el-form-item-render class="el-form-item--label-truncate" :data-prop="prop" v-bind="{ ...$props, ...$attrs }">

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
      <monaco-editor v-model="code" @save="onSave" :tsExtraLibs="tsExtraLibs" language="javascript" height="500px" autofocus />
      <template #footer>
        <el-button size="default" @click="visible = false">Cancel</el-button>
        <el-button size="default" type="primary" @click="onSave">Crtl+S</el-button>
      </template>
    </el-dialog>
  </template>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { isOn } from '@vue/shared'
import { ElDialog, ElTag, formContextKey, formItemProps } from 'element-plus'
import { ElFormItemRender, formItemRenderPropsBase, useTransformer } from 'el-form-render'
import { designerCtxKey } from '../interface'
import MonacoEditor from './monaco-editor.vue'
import { refWithWatch } from '../../components/hooks'
import { formatJsExp, isExp, pick, unExp, wrapExp } from '@el-lowcode/utils'
import { objStringify } from '../../utils'

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

const win = pick(window, ['alert', 'console'])

const tsExtraLibs = computed(() => ({
  'lcd.vars.d.ts': Object.entries((designerCtx.active ?? designerCtx.rootNode)?.vars || {}).map(([k, v]) => `const ${k} = ${JSON.stringify(v)} as const`).join('\n\n'),
  'lcd.dom.d.ts': `const window = ${objStringify(win, v => typeof v == 'function' ? '() => {}' : JSON.stringify(v))} as const`,
}))

const exp = computed(() => isExp(value.value) ? unExp(value.value) : '')

const visible = ref(false)
const code = refWithWatch(() => exp.value || (isOn(props.prop) ? `(e) => {\n  \n}` : ''), visible)

async function onSave() {
  value.value = code.value ? wrapExp(await formatJsExp(code.value)) : void 0
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