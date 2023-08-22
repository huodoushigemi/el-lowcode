<script setup lang="ts">
import { ref, createVNode, resolveDynamicComponent } from 'vue'
import { ElForm, ElFormItem, ElOption, ElCheckbox, ElCheckboxButton, ElRadio, ElRadioButton, FormInstance, formItemProps } from 'element-plus'
// import 'element-plus/es/components/form/style/css'
import { Item, formRenderProps, label, prop, optValue, solveOptions, showOpt } from './form-render'
import { unFn, toArr, ks } from '@el-lowcode/utils';
import { objectPick } from '@vueuse/core';

defineOptions({ name: 'ElFormRender' })

const formItemKs = ks(formItemProps)

const props = defineProps(formRenderProps)

function isExp(exp: string) {
  return exp?.trim().match(/^\{(.*?)\}$/)
}

function execExp(exp: string, prop: string) {
  const matched = isExp(exp)
  if (!matched) return exp
  const func = new Function('$', `return ${matched[1]}`)
  const val = func(props.model)
  return (props.model![prop] = val)
}

// ================================================================================

const placeholder = (item: Item) => `${item.type === 'select' ?  '请选择' : '请输入'}` + label(item)

const value = (item: Item) => execExp(item.el?.value, prop(item)!) ?? val(item)

const onInput = (item: Item, val) => {
  if (item.set) props.model![prop(item)!] = item.set!(val, props.model)
  else props.model![prop(item)!] = val
  if (item.out) Object.assign(props.model!, item.out!(val, props.model))
}

// todo
const disabled = (item: Item) => isExp(item.el?.value) || item.el?.disabled

// == defineExpose ==============================================================================

const formRef = ref<FormInstance>()

const val = (item: Item) => props.model![prop(item)!]

defineExpose(new Proxy({}, {
  get(t, k) {
    return formRef.value?.[k]
  },
  has(t, k) {
    return k in (formRef.value || {})
  }
}))

// <component :is="is" v-bind="props" />
const Comp = ({ is, hasChild, ...props }, { slots }) => createVNode(resolveDynamicComponent(is), props, hasChild ? slots : undefined)
</script>

<template>
  <el-form ref="formRef" v-bind="props" :items="undefined" @submit.prevent="formRef!.validate()">
    <template v-for="item in items" :key="prop(item)">
      <component
        v-if="!unFn(item.hide, model, item)"
        v-bind="objectPick(item, formItemKs)" 
        :is="item.is ?? ElFormItem"
        :label="label(item)"
        :prop="prop(item)"
        :rules="toArr(item.rules).map(e => unFn(e, model))"
      >
        <slot :name="prop(item)">
          <Comp
            :is="item.el?.is ?? 'el-' + (item.type || 'input')"
            :hasChild="!!item.options"
            :placeholder="placeholder(item)"
            v-bind="item.el"
            :modelValue="item.get ? item.get(val(item), model) : value(item)"
            @update:modelValue="onInput(item, $event)"
            :disabled="disabled(item)"
          >
            <template v-for="opt in solveOptions(item.options)">
              <el-option v-if="item.type === 'select'" v-bind="opt" :value="optValue(opt)" />

              <el-checkbox-button v-else-if="item.type === 'checkbox-group' && item.el?.type === 'button'" v-bind="opt" :label="optValue(opt)">{{ showOpt(opt) }}</el-checkbox-button>
              <el-checkbox v-else-if="item.type === 'checkbox-group'" v-bind="opt" :label="optValue(opt)">{{ showOpt(opt) }}</el-checkbox>

              <el-radio-button v-else-if="item.type === 'radio-group' && item.el?.type === 'button'" v-bind="opt" :label="optValue(opt)">{{ showOpt(opt) }}</el-radio-button>
              <el-radio v-else-if="item.type === 'radio-group'" v-bind="opt" :label="optValue(opt)">{{ showOpt(opt) }}</el-radio>
            </template>
          </Comp>
        </slot>
      </component>
    </template>

    <slot />
  </el-form>
</template>
