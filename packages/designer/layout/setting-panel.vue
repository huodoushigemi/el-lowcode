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
  </el-tabs>
</template>

<script setup>
import { computed, inject } from 'vue'
import { parseStringStyle, stringifyStyle } from '@vue/shared'
import { createRender } from '@el-lowcode/render'
import { ElFormRender, normalizeItem } from 'el-form-render'
import { designerCtxKey } from './interface'
import { sloveConfig } from '../components/_utils'
import Scriptable from './components/scriptable.vue'
import Input from './components/input.vue'

const _normalizeItem = (item) => {
  item = normalizeItem(item)
  item.el ??= {}
  if (item.type == 'radio-group') item.el.type ??= 'button'
  if (item.type == 'color-picker') {
    item.el.size ??= 'default'
    item.el.showAlpha ??= true
  }
  item.el.clearable ??= true
  item.el.placeholder ??= ''
  return item
}

const Render = createRender({ defaultIs: Scriptable })

const designerCtx = inject(designerCtxKey)

const model = computed(() => designerCtx.active)

const config = computed(() => {
  if (!model.value) return
  return sloveConfig(model.value)
})

const _items = computed(() => config.value?.props?.map(_normalizeItem))

const styles = [
  { lp: 'class' },
  { lp: ['position', 'style.position'], type: 'select', options: ['static', 'relative', 'absolute', 'fixed', 'sticky'], el: { placeholder: 'static' } },
  { lp: ['layout', 'style.display'], type: 'radio-group', options: ['inline', 'block', 'flex'] },
  { lp: ['background-color', 'style.backgroundColor'], type: 'color-picker' },
  { lp: ['opacity', 'style.opacity'], type: 'slider', el: { min: 0, max: 1, step: .01, formatTooltip: val => (val * 100).toFixed(2) } },
  { lp: ['overflow', 'style.overflow'], type: 'radio-group', options: ['visible', 'auto', 'hidden'] },
  { lp: ['font-size', 'style.fontSize'] },
  { lp: ['font-color', 'style.color'], type: 'color-picker' },
  { lp: ['border', 'style.border'], el: { placeholder: '0px solid #00' } },
  { lp: ['rounded', 'style.borderRadius'], type: 'slider', get: v => parseInt(v), set: v => v + 'px' },
  { lp: 'style', get: val => stringifyStyle(val).replace(/;/g, ';\n'), set: val => parseStringStyle(val), el: { is: Input, type: 'textarea', placeholder: 'font-size: inherit;\ncolor: inherit;', autosize: { minRows: 4, maxRows: 12 } } },
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