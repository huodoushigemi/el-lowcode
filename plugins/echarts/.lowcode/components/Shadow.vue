<template>
  <el-popover trigger="click" :width="180" :hide-after="0" :persistent="false" :teleported="false" popper-class="fixed!">
    <template #reference>
      <i-radix-icons:shadow-inner v-bind="$attrs" cursor-pointer />
    </template>
    <div flex="~ col">
      <h2 mt4 op60>阴影</h2>

      <div>偏移 X：{{ x }}</div>
      <input v-model.number="x" type="range" min="-20" max="20" />
      <div>偏移 Y：{{ y }}</div>
      <input v-model.number="y" type="range" min="-20" max="20" />
      <div>模糊 &ensp;：{{ r }}</div>
      <input v-model.number="r" type="range" min="0" max="30" />
      
      <div flex aic mt8>
        <el-color-picker v-model="c" size="default" showAlpha popper-class="fixed!" :teleported="false" />

        <div mla w32 h32 bg-hover @click="x = y = r = c = void 0" title="清除">
          <i-tdesign:clear wfull hfull p6 op40 cursor-pointer />
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
import { useTransformer } from 'el-form-render'
import { unFn } from '@el-lowcode/utils'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  model: Object,
  prefix: [String, Function],
  fields: Object,
  displayValue: Object
})

const fields = () => Object.assign({ x: 'shadowOffsetX', y: 'shadowOffsetY', r: 'shadowBlur', c: 'shadowColor' }, props.fields)
const displayValue = () => Object.assign({ x: 0, y: 0, r: 0, c: null }, props.displayValue)

const x = useT('x')
const y = useT('y')
const r = useT('r')
const c = useT('c')

function useT(k) {
  const prop = () => [unFn(props.prefix, k), fields()[k] ?? k].filter(e => e).join('.')
  return useTransformer(() => props.model, prop, { displayValue: () => displayValue()[k] })
}
</script>

<style lang="scss" scoped>
input[type=range] {
  appearance: none;
  height: 4px;
  margin: 8px 0 12px;
  background: #cccccc40;

  &:focus {
    outline: none;
  }
}
</style>