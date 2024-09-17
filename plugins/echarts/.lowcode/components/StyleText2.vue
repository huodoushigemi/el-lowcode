<template>
   <Moreable>
    <template v-for="k in enable">
      <component v-if="!disabled?.includes(k)" :is="map[k]" v-bind="options?.[k]" />
    </template>
  </Moreable>
</template>

<script setup lang="jsx">
import { isString } from '@vue/shared'
import { useTransformer, solveOptions } from 'el-form-render'
import { ElColorPicker, ElSelect, ElOption } from 'element-plus'
import { unFn } from '@el-lowcode/utils'
import R from './R.vue'
import Shadow from './Shadow.vue'
import OffsetXY from './OffsetXY.vue'
import Moreable from './Moreable'

const props = defineProps({
  model: Object,
  fields: Object,
  displayValue: Object,
  prefix: String,
  options: Object,
  enable: [Array, String],
  disabled: Array,
  sort: Function,
})

const FONT_FAMILYS = solveOptions([['—', void 0], 'sans-serif', 'serif', 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei'])

const enable = isString(props.enable) ? props.enable.split(' ') : props.enable || 'size c b i oxy family r shadow'.split(' ')
const fields = () => Object.assign({ size: 'fontSize', c: 'color', b: 'fontWeight', i: 'fontStyle', r: 'rotate', family: 'fontFamily', 'oxy.0': 'offset.0', 'oxy.1': 'offset.1' }, props.fields)
const displayValue = () => Object.assign({ size: 12, r: 0, 'oxy.0': 0, 'oxy.1': 0 }, props.displayValue)

const r = useT('r')
const c = useT('c')
const family = useT('family')
const ox = useT('oxy.0')
const oy = useT('oxy.1')

const map = {
  size: () => <InputNumber v-model={useT('size').v} class='has-b' style="width: 40px" noUnit min={12} max={64} />,
  family: () => <ElSelect v-model={family.v} placeholder='字体' class='has-b no-suffix' style="width: 65px">{FONT_FAMILYS.map(e => <ElOption {...e} />)}</ElSelect>,
  c: () => <ElColorPicker v-model={c.v} class='has-b' showAlpha />,
  b: () => <i-material-symbols-light-format-bold {...useToggle('b', 'bold')} />,
  i: () => <i-material-symbols-light-format-italic {...useToggle('i', 'italic')} />,
  r: () => <R v-model={r.v} />,
  shadow: () => <Shadow class="w24 h24 bg-hover" model={props.model} prefix={props.prefix} fields={{ x: 'textShadowOffsetX', y: 'textShadowOffsetY', r: 'textShadowBlur', c: 'textShadowColor' }} displayValue={props.displayValue} />,
  oxy: () => (
    <div>
      <el-popover trigger="click" hide-after={0} width={180} popper-class='fixed!' teleported={false} persistent={false}>{{
        reference: <i-tabler-math-xy class='block w24 h24 bg-hover' />,
        default: () => <>
          <h2 class='mt4 op60'>偏移</h2>
          <div class='grid' style="grid-template-columns: min-content 25px auto;">
            <OffsetXY v-model:x={ox.v} v-model:y={oy.v} class='row-span-2' />
            <div class='mr8 text-right'>x</div>
            <InputNumber v-model={ox.v} noUnit class='rd-0' />
            <div class='mr8 text-right'>y</div>
            <InputNumber v-model={oy.v} noUnit class='rd-0' />
          </div>
        </>
      }}
      </el-popover>
    </div>
  )
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
  margin-left: -5px;
}
</style>