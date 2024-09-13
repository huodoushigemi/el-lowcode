<template>
  <div class="flex aic flex-wrap gap-2">
    <template v-for="k in enable">
      <div v-if="!k" style="margin: 0 6px" />
      <div v-else-if="!map[k]" style="margin: 0 6px; align-self: stretch; width: 1px; background: #ccc; opacity: .4" />
      <component v-else-if="!disabled?.includes(k)" :is="map[k]" v-bind="options?.[k]" />
    </template>
  </div>
</template>

<script setup lang="jsx">
import { useTransformer, solveOptions } from 'el-form-render'
import { ElColorPicker, ElSelect, ElOption } from 'element-plus'
import { unFn } from '@el-lowcode/utils'
import R from './R.vue'
import Shadow from './Shadow.vue'

const props = defineProps({
  model: Object,
  fields: Object,
  displayValue: Object,
  prefix: String,
  options: Object,
  enable: Array,
  disabled: Array
})

const FONT_FAMILYS = solveOptions([['—', void 0], 'sans-serif', 'serif', 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei'])

const enable = props.enable || ['size', 'family', 'c', 'b', 'i', 'r', 'shadow']
const fields = () => Object.assign({ size: 'fontSize', c: 'color', b: 'fontWeight', i: 'fontStyle', r: 'rotate', family: 'fontFamily' }, props.fields)
const displayValue = () => Object.assign({ size: 12, r: 0 }, props.displayValue)

const r = useT('r')

const map = {
  size: () => <InputNumber v-model={useT('size').v} class='has-b' style="width: 34px" noUnit min={12} max={64} />,
  family: () => <ElSelect v-model={useT('family').v} placeholder='字体' class='has-b no-suffix' style="width: 65px">{FONT_FAMILYS.map(e => <ElOption {...e} />)}</ElSelect>,
  c: () => <ElColorPicker v-model={useT('c').v} class='has-b' showAlpha />,
  b: () => <i-material-symbols-light-format-bold {...useToggle('b', 'bold')} />,
  i: () => <i-material-symbols-light-format-italic {...useToggle('i', 'italic')} />,
  r: () => <R v-model={r.v} />,
  shadow: () => <Shadow class="w24 h24 bg-hover" model={props.model} prefix={props.prefix} fields={{ x: 'textShadowOffsetX', y: 'textShadowOffsetY', r: 'textShadowBlur', c: 'textShadowColor' }} displayValue={props.displayValue} />,
}

function useT(k) {
  const prop = () => [unFn(props.prefix, k), fields()[k] ?? k].filter(e => e).join('.')
  return useTransformer(() => props.model, prop, { displayValue: () => displayValue()[k] })
}

function useToggle(k, v) {
  const t = useT(k)
  return {
    class: 'bg-hover w24 h24',
    style: [t.v == v && 'background: #404040', 'border-radius: 0'],
    onClick: () => t.v = t.v == v ? void 0 : v
  }
}
</script>

<style scoped>
* > :deep(.has-b + .has-b) {
  margin-left: -3px;
}
</style>