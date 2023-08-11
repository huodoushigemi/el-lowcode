<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem, ElOption, ElCheckbox, ElCheckboxButton, ElRadio, ElRadioButton, FormContext, FormInstance } from 'element-plus'
// import 'element-plus/es/components/form/style/css'
import { Item, formRenderProps, label, prop } from './form-render'

defineOptions({ name: 'ElFormRender' })

const props = defineProps(formRenderProps)

function exec<T>(e: T | (() => T)): T {
  return typeof e === 'function' ? (e as Function)() : e
}

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

const value = (item: Item) => execExp(item.el?.value, prop(item)) ?? val(item)

const disabled = (item: Item) => isExp(item.el?.value) || item.el?.disabled

// ================================================================================

const formRef = ref<FormInstance>()

const val = (item: Item) => props.model![prop(item)]

defineExpose(new Proxy({}, {
  get(t, k) {
    return formRef.value?.[k]
  },
  has(t, k) {
      return k in (formRef.value || {})
  }
}))
</script>

<template>
  <el-form ref="formRef" v-bind="props" :items="undefined">
    <template v-for="item in items" :key="item[1]">
      <el-form-item
        v-if="!exec(item.hide)"
        v-bind="item"
        :label="label(item)"
        :prop="prop(item)"
        :lp="undefined"
        :el="undefined"
        :is="undefined"
        :type="undefined"
        :hide="undefined"
        :set="undefined"
        :get="undefined"
        :rules="exec(item.rules)"
      >
        <slot :name="prop(item)">
          <component
            :is="item.is ?? 'el-' + (item.type || 'input')"
            :placeholder="placeholder(item)"
            v-bind="item.el"
            :model-value="item.get ? item.get(val(item)) : value(item)"
            @update:modelValue="model![prop(item)] = item.set ? item.set($event) : $event"
            :disabled="disabled(item)"
          >

            <template v-for="opt in item.options">
              <el-option v-if="item.type === 'select'" v-bind="opt" />

              <el-checkbox-button v-else-if="item.type === 'checkbox-group' && item.el?.type === 'button'" v-bind="opt" :label="'value' in opt ? opt.value : opt.label">{{ opt.label }}</el-checkbox-button>
              <el-checkbox v-else-if="item.type === 'checkbox-group'" v-bind="opt" :label="'value' in opt ? opt.value : opt.label">{{ opt.label }}</el-checkbox>

              <el-radio-button v-else-if="item.type === 'radio-group' && item.el?.type === 'button'" v-bind="opt" :label="'value' in opt ? opt.value : opt.label">{{ opt.label }}</el-radio-button>
              <el-radio v-else-if="item.type === 'radio-group'" v-bind="opt" :label="'value' in opt ? opt.value : opt.label">{{ opt.label }}</el-radio>
            </template>
          </component>
        </slot>
      </el-form-item>
    </template>

    <slot />
  </el-form>
</template>
