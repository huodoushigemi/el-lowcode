<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem } from 'element-plus'
import 'element-plus/es/components/form/style/css'
import { Item, formRenderProps } from './form-render'

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
  const func = new Function('data', `return ${matched[1]}`)
  const val = func(props.model)
  return (props.model![prop] = val)
}

// ================================================================================

const is = (item: Item) => item.is ?? 'el-' + (item.type || 'input')

const placeholder = (item: Item) => '请输入' + label(item)

const value = (item: Item) => execExp(item.el?.value, prop(item)) ?? val(item)

const disabled = (item: Item) => isExp(item.el?.value) || item.el?.disabled

// ================================================================================

const formRef = ref()

const solveLP = (lp: string | string[] | undefined) => Array.isArray(lp) ? lp : lp?.split(' ')

const label = (item: Item) => item.label || solveLP(item.lp)![0]
const prop = (item: Item) => item.prop || solveLP(item.lp)![1]
const val = (item: Item) => props.model![prop(item)]

defineExpose({
  validate: () => formRef.value.validate(),
  resetFields: () => formRef.value.resetFields()
})
</script>

<template>
  <el-form ref="formRef" v-bind="{...props, ...$attrs}" :items="undefined">
    <template v-for="item in items" :key="item[1]">
      <el-form-item
        v-if="!exec(item.hide)"
        v-bind="item"
        :label="label(item)"
        :prop="prop(item)"
        :wrap="undefined"
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
            :is="is(item)"
            :placeholder="placeholder(item)"
            v-bind="item.el"
            :model-value="item.get ? item.get(val(item)) : value(item)"
            @update:modelValue="model![prop(item)] = item.set ? item.set($event) : $event"
            :disabled="disabled(item)"
          />
        </slot>
      </el-form-item>
    </template>

    <slot />
  </el-form>
</template>
