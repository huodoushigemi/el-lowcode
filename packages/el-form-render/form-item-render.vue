<script setup lang="ts">
import { createVNode, resolveDynamicComponent, inject, computed } from 'vue'
import { hyphenate, isString } from '@vue/shared'
import { ElFormItem, ElOption, ElCheckbox, ElCheckboxButton, ElRadio, ElRadioButton, formItemProps, formContextKey } from 'element-plus'
import { label, prop, optValue, solveOptions, showOpt, elIs, formItemRenderProps } from './form-render'
import { unFn, toArr, ks, get, set } from '@el-lowcode/utils'
import { objectPick } from '@vueuse/core'

defineOptions({ name: 'ElFormItemRender' })

const item = defineProps(formItemRenderProps)

const formItemKs = ks(formItemProps)

const formContext = inject(formContextKey)
const model = computed(() => formContext?.model || {})

const _elIs = computed(() => {
  const is = elIs(item)
  return isString(is) ? hyphenate(is) : is
})

const placeholder = () => item.el?.placeholder || (`${item.type === 'select' ?  '请选择' : '请输入'}` + label(item))

const onInput = (val) => {
  if (item.set) set(model.value, prop(item)!, item.set!(val, model.value))
  else set(model.value, prop(item)!, val)
  if (item.out) Object.assign(model.value!, item.out!(val, model.value))
  val = get(model.value, prop(item)!)
  if (item.displayValue !== undefined && val === unFn(item.displayValue)) set(model.value, prop(item)!, undefined)
}

const calcVal = () => {
  let v = get(model.value, prop(item)!)
  if (item.get) v = item.get(v, model.value)
  if (item.defaultValue !== undefined && (v === undefined || v === '')) set(model.value, prop(item), v = unFn(item.defaultValue))
  if (item.displayValue !== undefined && (v === undefined || v === '')) v = unFn(item.displayValue)
  return v
}

// same as <component :is="is" v-bind="props" />
const Comp = ({ is, hasChild, ...props }, { slots }) => createVNode(resolveDynamicComponent(is), props, hasChild ? slots : undefined)
</script>

<template>
  <ElFormItem
    v-if="!unFn(hide, model, item)"
    v-bind="objectPick(item, formItemKs)"
    :label="label(item)"
    :prop="prop(item)"
    :rules="toArr(rules).map(e => unFn(e, model))"
  >
    <template #label="scope">
      <slot name="label" v-bind="scope">{{ scope.label }}</slot>
    </template>
    <slot>
      <Comp
        :is="_elIs"
        :hasChild="!!options"
        :placeholder="placeholder()"
        v-bind="el"
        :modelValue="calcVal()"
        @update:modelValue="onInput($event)"
      >
        <template v-for="opt in solveOptions(options)" :key="optValue(opt)">
          <el-option v-if="_elIs == 'el-select'" v-bind="opt" :value="optValue(opt)" />

          <el-checkbox-button v-else-if="_elIs == 'el-checkbox-group' && el?.type === 'button'" v-bind="opt" :label="optValue(opt)">{{ showOpt(opt) }}</el-checkbox-button>
          <el-checkbox v-else-if="_elIs == 'el-checkbox-group'" v-bind="opt" :label="optValue(opt)">{{ showOpt(opt) }}</el-checkbox>

          <el-radio-button v-else-if="_elIs == 'el-radio-group' && el?.type === 'button'" v-bind="opt" :label="optValue(opt)">{{ showOpt(opt) }}</el-radio-button>
          <el-radio v-else-if="_elIs == 'el-radio-group'" v-bind="opt" :label="optValue(opt)">{{ showOpt(opt) }}</el-radio>
        </template>
      </Comp>
    </slot>
  </ElFormItem>
</template>