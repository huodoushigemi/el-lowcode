<template>
  <div flex aic p8 text-26 font-medium capitalize>
    {{ config?.label }}
    <div v-if="model" bg-hover w28 h28 ml8 :bg="model.style?.position == 'absolute' ? '#404040' : ''" @click="add2absolute(model)"></div>
    <i-material-symbols-light:code bg-hover mla w28 h28 p4 @click="visible = true" />
  </div>
  <el-tabs v-if="config">
    <el-tab-pane label="attrs">
      <el-form-render :model="model" label-width="auto" size="small" label-position="top">
        <Render v-for="item in _items" v-bind="item" />
      </el-form-render>
    </el-tab-pane>

    <el-tab-pane label="style" lazy>  
      <el-form-render :model="model" label-width="auto" size="small" label-position="top">
        <Render v-for="item in styles" v-bind="item" />
      </el-form-render>
    </el-tab-pane>

    <el-tab-pane label="common" lazy>
      <el-form-render :model="model" label-width="auto" size="small" label-position="top">
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
import LcSlider from './components/LcSlider.vue'

import MSLBold from '~icons/material-symbols-light/format-bold'
import MSLItalic from '~icons/material-symbols-light/format-italic'
import MSLLeft from '~icons/material-symbols-light/align-horizontal-left'
import MSLCenter from '~icons/material-symbols-light/align-horizontal-center'
import MSLRight from '~icons/material-symbols-light/align-horizontal-right'
import MSLClose from '~icons/material-symbols-light/close-small-outline-rounded'

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

const _normalizeItem = (item) => {
  if (isObject(item) && !item.is) {
    item = normalizeItem(item)
    item.el ??= {}
    if (item.type == 'radio-group') item.el.type ??= 'button'
    if (item.type == 'color-picker') {
      item.el.size ??= 'default'
      item.el.showAlpha ??= true
      item.displayValue ??= '#000000ff'
      item.set ??= v => v ?? undefined
    }
    item.el.clearable ??= true
    item.el.placeholder ??= ''
    if (isOn(item.prop)) item.script ??= true
  }
  if (isArray(item.children)) item.children = item.children.map(_normalizeItem)
  return item
}

const Render = createRender({ defaultIs: Scriptable })

const designerCtx = inject(designerCtxKey)

const model = computed(() => designerCtx.active)

const config = computed(() => {
  if (!model.value) return
  return sloveConfig(model.value)
})

const _items = computed(() => unFn(config.value?.props, model.value)?.map(_normalizeItem))

const styles = [
  { lp: 'xxx', el: { is: LcSlider, label: '大小' } },
  { lp: ['position', 'style.position'], type: 'select', options: ['static', 'relative', 'absolute', 'fixed', 'sticky'], displayValue: 'static', el: { placeholder: 'static' } },
  { lp: ['layout', 'style.display'], type: 'radio-group', options: ['inline', 'block', 'inline-block', 'flex'] },
  // { lp: ['width', 'style.width'], type: 'input-number', get: v => v != null ? parseInt(v) : null, set: v => v != null ? v + 'px' : undefined },
  // { lp: ['height', 'style.height'], type: 'input-number', get: v => v != null ? parseInt(v) : null, set: v => v != null ? v + 'px' : undefined },
  { is: 'h4', class: 'flex aic mb8', children: 'Size' },
  { is: 'div', class: 'flex aic mb18', children: [
    { prop: 'style.width', type: 'input-number', script: false, class: 'mb0', get: v => v != null ? parseInt(v) : null, set: v => v != null ? v + 'px' : undefined, el: { class: 'w90' } },
    { prop: 'style.height', type: 'input-number', script: false, class: 'ml8 mb0', get: v => v != null ? parseInt(v) : null, set: v => v != null ? v + 'px' : undefined, el: { class: 'w90' } },
    { is: MSLClose, class: 'bg-hover w28 h28 ml4', onClick: () => Object.assign(model.value.style || {}, { width: undefined, height: undefined }) }
  ] },
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
  ] },
  { is: 'h4', class: 'mb8', children: 'Border' },
  { lp: ['border', 'style.border'], el: { placeholder: '0px solid #00' } },
  { lp: ['rounded', 'style.borderRadius'], type: 'slider', get: v => parseInt(v), set: v => v + 'px' },
  { lp: 'style', get: val => stringifyStyle(val).replace(/;/g, ';\n'), set: val => parseStringStyle(val), el: { is: Input, type: 'textarea', placeholder: 'font-size: inherit;\ncolor: inherit;', autosize: { minRows: 4, maxRows: 12 } } },
].map(_normalizeItem)

const commons = [
  { lp: 'id' },
  { lp: 'class' },
  { lp: ['condition', '$.condition'], type: 'switch', displayValue: true },
  { is: 'ElDivider' },
  { is: 'h1', children: 'Event' },
  { lp: 'onClick' },
  { lp: 'onChange' },
].map(_normalizeItem)

function add2absolute(node) {
  const { root } = designerCtx
  const flated = treeUtils.flat([root])
  const parent = flated.find(e => isArray(e.children) ? e.children.includes(node) : false)
  if (parent._id == 'moveable-layer') return
  
  remove(parent.children, node)
  
  if (root.children[root.children.length - 1]._id != 'moveable-layer') designerCtx.root.children.push({ is: 'div', _id: 'moveable-layer', id: 'moveable-layer', style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }, children: [] })
  const moveableLayer = root.children[root.children.length - 1]
  moveableLayer.children.push(node)
  set(node, 'style.position', 'absolute')
}
</script>

<style scoped>
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
:deep(.el-tabs__content) {
  padding: 8px;
}
:deep(.el-collapse) {
  --el-transition-duration: 100ms;
}
</style>