# ElFormRender 表单渲染

::: info
`el-form-render` 的 `type` 有限, 默认只能渲染普通的表单项, 假如现在要渲染一个上传组件, `type` 就不够用了, 那怎么办呢? 这时候 `el.is` 选项就派上用场了
:::

本章介绍 `el.is` 属性自定义组件的使用

## 接入标准

自定义组件接入的关键是在组件内部实现 `v-model`

- `props` 需要接收 `modelValue`
- 对外触发 `update:modelValue` 事件

```vue preview
<template>
  <el-form-render :model="model" :items="items" />
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup lang="ts">
import ElFormRender, { Item } from 'el-form-render'

const model = reactive({})

// 自定义 input
const MyInput = ({ modelValue, ...attrs }, { emit }) => (
  h('input', { value: modelValue, onInput: e => emit('update:modelValue', e.target.value), ...attrs })
)

// 自定义 sider
const MyRange = ({ modelValue, ...attrs }, { emit }) => (
  h('input', { type: 'range', value: modelValue, onInput: e => emit('update:modelValue', e.target.value), ...attrs })
)

// 自定义 checkbox
const MyCheckbox = ({ modelValue, ...attrs }, { emit }) => (
  h('input', { type: 'checkbox', checked: modelValue, onInput: e => emit('update:modelValue', e.target.checked), ...attrs })
)

const items: Item[] = [
  { lp: ['姓名', 'name'], el: { is: MyInput, placeholder: '这是一个原生输入框' } },
  { lp: ['年龄', 'age'], el: { is: MyRange } },
  { lp: ['性别', 'sex'], type: 'switch' },
  { lp: ['是否', 'is'], el: { is: MyCheckbox } },
  { lp: ['是否', 'is'], type: 'checkbox' },
]
</script>
```

## 关于 `el.is` 属性的更多用法详见 [`<component>`](https://vuejs.org/api/built-in-special-elements.html#component)