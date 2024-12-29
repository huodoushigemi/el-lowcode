<template>
  <div flex aic p8 text-26 font-medium capitalize>
    <div mra>{{ config?.label }}</div>
    <i-mdi:cursor-move v-if="model && designerCtx.root != model" bg-hover w28 h28 p4 mr8 :bg="node.isAbs ? '#404040' : ''" @click="node.isAbs = true" />
    <i-material-symbols-light:code bg-hover w28 h28 p4 @click="visible = true" />
  </div>
  <el-tabs v-if="config" class="tabs">
    <el-tab-pane label="attrs" :key="node.id">
      <el-form-render :model="model" label-width="auto" size="small" label-position="top" @submit.prevent>
        <RenderItems :items="_items" />
      </el-form-render>
    </el-tab-pane>

    <el-tab-pane label="style" lazy>
      <el-form-render :model="model" label-width="auto" size="small" label-position="top" @submit.prevent>
        <RenderItems :items="styles" />
      </el-form-render>
    </el-tab-pane>

    <el-tab-pane label="common" lazy>
      <el-form-render :model="model" label-width="auto" size="small" label-position="top" @submit.prevent>
        <RenderItems :items="commons" />
      </el-form-render>
    </el-tab-pane>
  </el-tabs>

  <MonacoEditorDialog
    v-model="editModel" language="json"
    v-model:visible="visible" :dialog="{ is: 'el-drawer', modalClass: 'props', title: config?.label, size: 500 }"
  />
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { isArray, parseStringStyle, stringifyStyle, isOn, isPlainObject } from '@vue/shared'
import { createRender } from '@el-lowcode/render'
import { mapValues, omit, pick, unFn } from '@el-lowcode/utils'
import { ElFormRender, normalizeItem } from 'el-form-render'
import { designerCtxKey } from './interface'
import Scriptable from './components/scriptable.vue'
import Input from './components/input.vue'
import MonacoEditorDialog from './components/MonacoEditorDialog.vue'
import BoxModel from './components/style/BoxModel.vue'
import StyleFlexLayout from './components/style/StyleFlexLayout.vue'
import StyleText from './components/style/StyleText.vue'
import StyleLayout from './components/style/StyleLayout.vue'

const visible = ref(false)
const internalProps = ['_id', 'is', 'children']
const editModel = computed({
  get: () => JSON.stringify(omit(model.value, internalProps), null, '  '),
  set: v => Object.assign(model.value, mapValues(model.value, () => void 0), pick(model.value, internalProps), JSON.parse(v))
})

const Render = createRender({
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

const RenderItems = ({ items }) => items?.map(e => isPlainObject(e) && Render(e))

const designerCtx = inject(designerCtxKey)

const node = computed(() => designerCtx.active ?? designerCtx.rootNode)
const model = computed(() => node.value.data)
const config = computed(() => node.value?.config)

const _items = computed(() => unFn(config.value?.props, model.value, designerCtx, { node: node.value }))

const styles = computed(() => [
  { is: 'div', class: 'grid grid-cols-3', children: [
    { lp: ['W', 'style.width'], el: { is: 'InputNumber', min: 0 } },
    { lp: ['H', 'style.height'], el: { is: 'InputNumber', min: 0 } },
    // { is: MSLClose, class: 'bg-hover w28 h28 ml4', onClick: () => Object.assign(model.value.style || {}, { width: undefined, height: undefined }) }
  ] },
  { is: 'div', class: 'p20 pb1 bg-gray/5 mb12', children: [
    { prop: 'style', script: false, el: { is: BoxModel } }
  ] },
  { lp: ['position', 'style.position'], options: [['—', 'static'], 'relative', 'absolute', 'fixed', 'sticky'], displayValue: 'static' },
  // { lp: ['layout', 'style.display'], type: 'radio-group', options: ['inline', 'block', 'flex'] },
  { is: 'div', class: 'mx--8 b-b-1' },
  { is: 'h4', class: 'my12', children: 'Layout' },
  { prop: 'style', script: false, el: { is: StyleLayout, obj: model.value } },
  // { prop: 'style', script: false, el: { is: StyleFlexLayout }  },
  // { lp: ['width', 'style.width'], type: 'input-number', get: v => v != null ? parseInt(v) : null, set: v => v != null ? v + 'px' : undefined },
  // { lp: ['height', 'style.height'], type: 'input-number', get: v => v != null ? parseInt(v) : null, set: v => v != null ? v + 'px' : undefined },
  { is: 'div', class: 'mx--8 b-b-1' },
  { is: 'h4', class: 'my12', children: 'Background' },
  { prop: 'style.backgroundColor', type: 'color-picker', script: false },
  { is: 'div', class: 'mx--8 b-b-1' },
  { is: 'h4', class: 'my12', children: 'Text' },
  { prop: 'style', script: false, el: { is: StyleText } },
  { is: 'div', class: 'mx--8 b-b-1' },
  { is: 'h4', class: 'my12', children: 'Border' },
  { lp: ['border', 'style.border'], el: { placeholder: '0px solid #00' } },
  { lp: ['rounded', 'style.borderRadius'], type: 'slider', get: v => parseInt(v), set: v => v + 'px' },
  { is: 'div', class: 'mx--8 b-b-1' },
  { is: 'h4', class: 'my12', children: 'Other' },
  { lp: ['opacity', 'style.opacity'], type: 'slider', displayValue: 1, el: { min: 0, max: 1, step: .01, formatTooltip: val => (val * 100).toFixed(2) } },
  { lp: ['overflow', 'style.overflow'], type: 'segmented', options: [['—', 'visible'], ['scroll', 'auto'], 'hidden'], displayValue: 'visible', el: { class: 'wfull' } },
  { lp: 'style', get: val => stringifyStyle(val).replace(/;/g, ';\n'), set: val => parseStringStyle(val), el: { is: Input, type: 'textarea', placeholder: 'font-size: inherit;\ncolor: inherit;', autosize: { minRows: 4, maxRows: 12 } } },
])

const commons = computed(() => [
  { is: 'div', class: 'grid grid-cols-5 gap-x-8', children: [
    { lp: 'id', class: 'col-span-2' },
    { lp: 'class', class: 'col-span-3' },
  ] },
  { is: 'hr' },
  { is: 'div', class: 'grid grid-cols-4 space-x--1', children: [
    { lp: ['v-for', 'vFor.0'], class: 'col-span-2', script: true, out: v => (v ? {} : { vFor: void 0 }) },
    { lp: ['ㅤ', 'vFor.1'], script: false, el: { placeholder: 'item' } },
    { lp: ['ㅤ', 'vFor.2'], script: false, el: { placeholder: 'index' } },
  ] },
  { lp: 'v-if', type: 'switch', displayValue: true },
  { is: 'hr' },
  { is: 'h1', children: 'Event' },
  { lp: 'onClick' },
  { lp: 'onChange' },
  { is: 'el-divider' },
  { lp: ['onMounted','onVnodeMounted'] },
  { lp: ['onBeforeMount', 'onVnodeBeforeMount'] },
])
</script>

<style scoped lang="scss">
:deep(.el-tabs__header) {
  position: sticky;
  top: 0;
  z-index: 9;
  background: var(--el-bg-color);
}
:deep(.el-tabs__nav) {
  padding: 0 8px;
}
:deep(.el-slider) {
  @apply mx10;
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