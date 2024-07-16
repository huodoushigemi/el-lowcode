<template>
  <div flex aic p8 text-26 font-medium capitalize>
    <div mra>{{ config?.label }}</div>
    <i-mdi:cursor-move v-if="model && designerCtx.root != model" bg-hover w28 h28 p4 mr8 :bg="model.style?.position == 'absolute' ? '#404040' : ''" @click="add2absolute(model)" />
    <i-material-symbols-light:code bg-hover w28 h28 p4 @click="visible = true" />
  </div>
  <el-tabs v-if="config" class="tabs">
    <el-tab-pane label="attrs">
      <el-form-render :model="model" label-width="auto" size="small" label-position="top" @submit.prevent>
        <Render v-for="item in _items" v-bind="item" />
      </el-form-render>
    </el-tab-pane>

    <el-tab-pane label="style" lazy>
      <el-form-render :model="model" label-width="auto" size="small" label-position="top" @submit.prevent>
        <Render v-for="item in styles" v-bind="item" />
      </el-form-render>
    </el-tab-pane>

    <el-tab-pane label="common" lazy>
      <el-form-render :model="model" label-width="auto" size="small" label-position="top" @submit.prevent>
        <Render v-for="item in commons" v-bind="item" />
      </el-form-render>
    </el-tab-pane>
  </el-tabs>

  <MonacoEditorDialog
    v-model="editModel" language="json"
    v-model:visible="visible" :dialog="{ is: 'el-drawer', title: config?.label, size: 500 }"
  />
</template>

<script setup>
import { computed, inject, h, ref, getCurrentInstance } from 'vue'
import { isArray, isObject, parseStringStyle, stringifyStyle, isOn, remove } from '@vue/shared'
import { createRender } from '@el-lowcode/render'
import { mapValues, pick, set, toArr, treeUtils, unFn } from '@el-lowcode/utils'
import { ElFormRender, normalizeItem } from 'el-form-render'
import { designerCtxKey } from './interface'
import { sloveConfig } from '../components/_utils'
import Scriptable from './components/scriptable.vue'
import Input from './components/input.vue'
import MonacoEditorDialog from './components/MonacoEditorDialog.vue'
import BoxModel from './components/style/BoxModel.vue'

import MSLBold from '~icons/material-symbols-light/format-bold'
import MSLItalic from '~icons/material-symbols-light/format-italic'
import MSLLeft from '~icons/material-symbols-light/align-horizontal-left'
import MSLCenter from '~icons/material-symbols-light/align-horizontal-center'
import MSLRight from '~icons/material-symbols-light/align-horizontal-right'
import MSLClose from '~icons/material-symbols-light/close-small-outline-rounded'
import MSLUnderlined from '~icons/material-symbols-light/format-underlined'

import OptionsInput from '../components/options-input'
import PairInput from '../components/pair-input'

const ins = getCurrentInstance()
ins.appContext.app.use(OptionsInput)
ins.appContext.app.use(PairInput)

const visible = ref(false)
const internalProps = ['_id', 'is', 'children']
const editModel = computed({
  get: () => JSON.stringify({ ...model.value, _id: void 0, is: void 0, children: isArray(model.value?.children) ? void 0 : model.value?.children }, null, '  '),
  set: v => Object.assign(model.value, mapValues(model.value, () => void 0), pick(model.value, internalProps), JSON.parse(v))
})

const Render = createRender({
  defaultIs: 'ElFormItemRender',
  defaultIs: Scriptable,
  processProps(props) {
    if (!props.is) {
      props = normalizeItem(props)
      props.el ??= {}
      if (props.type == 'radio-group') props.el.type ??= 'button'
      if (props.type == 'color-picker') {
        props.el.size ??= 'default'
        props.el.showAlpha ??= true
        // props.displayValue ??= '#000000ff'
        props.set ??= v => v ?? undefined
      }
      props.el.clearable ??= true
      props.el.placeholder ??= ''
      if (isOn(props.prop)) props.script ??= true
    }
    return props
  }
})

const designerCtx = inject(designerCtxKey)

const model = computed(() => designerCtx.active ?? designerCtx.root)

const config = computed(() => {
  if (!model.value) return
  return sloveConfig(model.value)
})

const _items = computed(() => unFn(config.value?.props, model.value))

const styles = [
  { is: 'div', class: 'grid grid-cols-3', children: [
    { lp: ['W', 'style.width'], el: { is: 'InputNumber' } },
    { lp: ['H', 'style.height'], el: { is: 'InputNumber' } },
    // { is: MSLClose, class: 'bg-hover w28 h28 ml4', onClick: () => Object.assign(model.value.style || {}, { width: undefined, height: undefined }) }
  ] },
  { is: 'div', class: 'p20 pb1 bg-gray/5 mb12', children: [
    { prop: 'style', script: false, el: { is: BoxModel } }
  ] },
  { lp: ['position', 'style.position'], type: 'select', options: ['static', 'relative', 'absolute', 'fixed', 'sticky'], displayValue: 'static', el: { placeholder: 'static' } },
  { lp: ['layout', 'style.display'], type: 'radio-group', options: ['inline', 'block', 'flex'] },
  // { lp: ['width', 'style.width'], type: 'input-number', get: v => v != null ? parseInt(v) : null, set: v => v != null ? v + 'px' : undefined },
  // { lp: ['height', 'style.height'], type: 'input-number', get: v => v != null ? parseInt(v) : null, set: v => v != null ? v + 'px' : undefined },
  { is: 'h4', class: 'mb8', children: 'Background' },
  { prop: 'style.backgroundColor', type: 'color-picker', script: false },
  { lp: ['opacity', 'style.opacity'], type: 'slider', displayValue: 1, el: { min: 0, max: 1, step: .01, formatTooltip: val => (val * 100).toFixed(2) } },
  { lp: ['overflow', 'style.overflow'], type: 'radio-group', options: ['visible', 'auto', 'hidden'], displayValue: 'visible' },
  { is: 'h4', class: 'mb8', children: 'Text' },
  { prop: 'style.fontSize', type: 'slider', class: 'mb8', script: false, displayValue: '16px', get: v => parseInt(v), set: v => v + 'px', el: { min: 12, max: 64 } },
  { is: 'div', class: 'flex space-x-4', children: [
    { prop: 'style.color', type: 'color-picker', script: false, el: { size: 'default' } },
    { is: 'div', class: 'mla!' },
    { prop: 'style.textAlign', script: false, el: { is: ({ modelValue: v }, { emit }) => [
      h(MSLLeft, { class: 'bg-hover w28 h28 p2', style: `background: ${v == 'left' ? '#404040' : ''}`, onClick: () => emit('update:modelValue', v == 'left' ? undefined : 'left') }),
      h(MSLCenter, { class: 'bg-hover w28 h28 p2', style: `background: ${v == 'center' ? '#404040' : ''}`, onClick: () => emit('update:modelValue', v == 'center' ? undefined : 'center') }),
      h(MSLRight, { class: 'bg-hover w28 h28 p2', style: `background: ${v == 'right' ? '#404040' : ''}`, onClick: () => emit('update:modelValue', v == 'right' ? undefined : 'right') }),
    ] } },
    { is: 'div', class: 'mla!' },
    { prop: 'style.fontWeight', script: false, el: { is: ({ modelValue: v }, { emit }) => h(MSLBold, { class: 'bg-hover w28 h28', style: `background: ${v ? '#404040' : ''}`, onClick: () => emit('update:modelValue', v ? undefined : 'bold') }) } },
    { prop: 'style.fontStyle', script: false, el: { is: ({ modelValue: v }, { emit }) => h(MSLItalic, { class: 'bg-hover w28 h28', style: `background: ${v ? '#404040' : ''}`, onClick: () => emit('update:modelValue', v ? undefined : 'italic') }) } },
    { prop: 'style.textDecoration', script: false, el: { is: ({ modelValue: v }, { emit }) => h(MSLUnderlined, { class: 'bg-hover w28 h28', style: `background: ${v ? '#404040' : ''}`, onClick: () => emit('update:modelValue', v ? undefined : 'underline') }) } },
  ] },
  { is: 'h4', class: 'mb8', children: 'Border' },
  { lp: ['border', 'style.border'], el: { placeholder: '0px solid #00' } },
  { lp: ['rounded', 'style.borderRadius'], type: 'slider', get: v => parseInt(v), set: v => v + 'px' },
  { lp: 'style', get: val => stringifyStyle(val).replace(/;/g, ';\n'), set: val => parseStringStyle(val), el: { is: Input, type: 'textarea', placeholder: 'font-size: inherit;\ncolor: inherit;', autosize: { minRows: 4, maxRows: 12 } } },
]

const commons = [
  { lp: 'id' },
  { lp: 'class' },
  { lp: ['condition', '$.condition'], type: 'switch', displayValue: true },
  { is: 'ElDivider' },
  { is: 'h1', children: 'Event' },
  { lp: 'onClick' },
  { lp: 'onChange' },
  { is: 'el-divider' },
  { lp: ['onMounted','onVnodeMounted'] },
  { lp: ['onBeforeMount', 'onVnodeBeforeMount'] },
]

function add2absolute(node) {
  set(node, 'style.position', 'absolute')
}
</script>

<style scoped lang="scss">
:deep(.el-tabs__header) {
  position: sticky;
  top: 0;
  z-index: 9;
  background: var(--vp-c-bg);
}
:deep(.el-tabs__nav) {
  padding: 0 8px;
}
:deep(.el-slider) {
  margin: 0 10px;
}

.tabs {
  --el-collapse-border-color: var(--el-border-color-lighter);
  --el-collapse-header-height: 36px;
  --el-collapse-header-bg-color: var(--el-fill-color-blank);
  --el-collapse-header-text-color: var(--el-text-color-primary);
  --el-collapse-header-font-size: 13px;
  --el-collapse-content-bg-color: var(--el-fill-color-blank);
  --el-collapse-content-font-size: 13px;
  --el-collapse-content-text-color: var(--el-text-color-primary);

  :deep(> .el-tabs__content) {
    padding: 8px;
  }
}

:deep(.enable) {
  > .el-collapse-item__header {
    > .el-collapse-item__arrow { display: none; }
  }

  > .el-collapse-item__wrap > .el-collapse-item__content {
    padding-bottom: 0;
  }
}

.tabs {
  --el-border-radius-base: 0;
  --el-border-radius-small: 0;

  :deep(.el-color-picker--small) {
    > .el-color-picker__trigger {
      padding: 2px;
    }
  }

  :deep(.el-color-picker__trigger) {
    border-radius: 0;
  }
}
</style>