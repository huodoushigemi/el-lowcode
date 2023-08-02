<script setup lang="ts">
import { ref } from 'vue'
import { formRenderProps } from './form-render'

defineOptions({ name: 'ElFormRender' })

const props = defineProps(formRenderProps)

function exec(e) {
  return typeof e === 'function' ? e() : e
}

function isExp(exp) {
  return exp?.trim().match(/^\{(.*?)\}$/)
}

function execExp(exp, prop) {
  const matched = isExp(exp)
  if (!matched) return exp
  const func = new Function('data', `return ${matched[1]}`)
  const val = func(props.model)
  return (props.model[prop] = val)
}

// ================================================================================

const is = item => item.is ?? 'el-' + (item.type || 'input')

const placeholder = item => '请输入' + label(item)

const value = item => execExp(item.el?.value, prop(item)) ?? props.model[prop(item)]

const disabled = item => isExp(item.el?.value) || item.el?.disabled

// ================================================================================

const formRef = ref()

const label = (item) => item.wrap[0] || item.label
const prop = (item) => item.wrap[1] || item.prop
const val = (item) => props.model[prop(item)]

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
        v-bind="item.wrap[2] || item"
        :label="label(item)"
        :prop="prop(item)"
        :wrap="undefined"
        :el="undefined"
        :is="undefined"
        :type="undefined"
        :hide="undefined"
        :set="undefined"
        :get="undefined"
        :rules="exec(item.rules || item.wrap[2]?.rules)"
      >
        <slot :name="prop(item)">
          <component
            :is="is(item)"
            :placeholder="placeholder(item)"
            v-bind="item.el"
            :model-value="item.get ? item.get(val(item)) : value(item)"
            @update:modelValue="model[prop(item)] = item.set ? item.set($event) : $event"
            :disabled="disabled(item)"
          />
        </slot>
      </el-form-item>
    </template>

    <slot />
  </el-form>
</template>
