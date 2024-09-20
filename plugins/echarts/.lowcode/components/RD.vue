<template>
  <el-popover trigger="click" :width="180" :hide-after="0" :persistent="false" :teleported="false" popper-class="fixed!">
    <template #reference>
      <i-mdi:border-radius v-bind="$attrs" cursor-pointer />
    </template>
    <div flex="~ col">
      <h2 mt4 op60>圆角</h2>

      <i-radix-icons:corner-top-left />
      <input v-model.number="tl" type="range" max="20" />
      <i-radix-icons:corner-top-right />
      <input v-model.number="tr" type="range" max="20" />
      <i-radix-icons:corner-bottom-left />
      <input v-model.number="bl" type="range" max="20" />
      <i-radix-icons:corner-bottom-right />
      <input v-model.number="br" type="range" max="20" />
      
      <div flex aic mt8>
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
})

const fields = () => ({})
const displayValue = () => ({})

const tl = useT('0', { displayValue: 0 })
const tr = useT('1', { displayValue: 0 })
const bl = useT('3', { displayValue: 0 })
const br = useT('2', { displayValue: 0 })

function useT(k, opt) {
  const prop = () => [unFn(props.prefix, k), fields()[k] ?? k].filter(e => e).join('.')
  return useTransformer(() => props.model, prop, { displayValue: () => displayValue()[k], ...opt })
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