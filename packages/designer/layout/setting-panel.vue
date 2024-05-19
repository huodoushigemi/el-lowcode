<template>
  <div p8 text-26 font-medium capitalize>{{ config?.label }}</div>
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
</template>

<script setup>
import { computed, inject, h, watch, watchEffect } from 'vue'
import { isArray, isObject, parseStringStyle, stringifyStyle } from '@vue/shared'
import { createRender } from '@el-lowcode/render'
import { toArr, unFn } from '@el-lowcode/utils'
import { ElFormRender, normalizeItem } from 'el-form-render'
import { designerCtxKey } from './interface'
import { sloveConfig } from '../components/_utils'
import Scriptable from './components/scriptable.vue'
import Input from './components/input.vue'

import MaterialSymbolsLightFormatBold from '~icons/material-symbols-light/format-bold'
import MaterialSymbolsLightFormatItalic from '~icons/material-symbols-light/format-italic'
import MaterialSymbolsFormatBold from '~icons/material-symbols/format-bold'
import MaterialSymbolsFormatItalic from '~icons/material-symbols/format-italic'


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
  { lp: ['position', 'style.position'], type: 'select', options: ['static', 'relative', 'absolute', 'fixed', 'sticky'], displayValue: 'static', el: { placeholder: 'static' } },
  { lp: ['layout', 'style.display'], type: 'radio-group', options: ['inline', 'block', 'flex'] },
  { lp: ['background-color', 'style.backgroundColor'], type: 'color-picker' },
  { lp: ['opacity', 'style.opacity'], type: 'slider', displayValue: 1, el: { min: 0, max: 1, step: .01, formatTooltip: val => (val * 100).toFixed(2) } },
  { lp: ['overflow', 'style.overflow'], type: 'radio-group', options: ['visible', 'auto', 'hidden'], displayValue: 'visible' },
  { is: 'h4', class: 'mb8', children: 'Text' },
  { prop: 'style.fontSize', type: 'slider', class: 'mb8', script: false, displayValue: '16px', get: v => parseInt(v), set: v => v + 'px', el: { min: 12, max: 64 } },
  { is: 'div', class: 'flex space-x-4', children: [
    { prop: 'style.color', type: 'color-picker', script: false, el: { size: 'default' } },
    { is: 'div', class: 'mla!' },
    { prop: 'style.fontWeight', script: false, el: { is: ({ modelValue: v }, { emit }) => h(MaterialSymbolsLightFormatBold, { class: 'bg-hover w28 h28', style: `background: ${v ? '#404040' : ''}`, onClick: () => emit('update:modelValue', v ? undefined : 'bold') }) } },
    { prop: 'style.fontStyle', script: false, el: { is: ({ modelValue: v }, { emit }) => h(MaterialSymbolsLightFormatItalic, { class: 'bg-hover w28 h28', style: `background: ${v ? '#404040' : ''}`, onClick: () => emit('update:modelValue', v ? undefined : 'italic') }) } },
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
  // { lp: ['slot', 'slot'] },
  // { is: 'ElCollapse', class: 'mb18', children: { is: 'ElCollapseItem', title: 'event', children: [
  //   { lp: 'onClick', script: true }
  // ] }}
  { is: 'ElDivider' },
  { is: 'h1', children: 'Event' },
  { lp: 'onClick', script: true },
  { lp: 'onChange', script: true },
].map(_normalizeItem)
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
</style>