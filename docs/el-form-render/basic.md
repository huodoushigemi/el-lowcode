# el-form-render 表单渲染组件

## 基础用法

```vue preview
<template>
  <el-form-render :model="model" :items="items" />
  
  <div>model: {{ model }}</div>
</template>

<script setup lang="ts">
import ElFormRender, { Item } from 'el-form-render'

const model = ref({})

const items: Item = [
  { lp: ['姓名', 'name'] },
  { label: '年龄', prop: 'age' },
  { lp: ['性别', 'sex'], type: 'switch' },
  { lp: ['是否', 'is'], type: 'checkbox' },
]
</script>
```

::: tip
`lp` 是 `label  prop` 的缩写

如果不指定 `type` 则默认为 `input`
:::

## 典型表单

```vue preview
<template>
  <el-form-render :model="model" :items="items" label-width="120px">
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>

    <el-form-item>
      <code>
        <pre>model: {{ JSON.stringify(model, null, '  ') }}</pre>
      </code>
    </el-form-item>
  </el-form-render>
</template>

<script setup lang="ts">
import ElFormRender, { Item } from 'el-form-render'

const model = ref({})

const items: Item = [
  { lp: ['name', 'name'] },
  { lp: ['Activity zone', 'region'] },
  { lp: ['time', 'date'], type: 'time-picker' },
  { lp: ['Instant delivery', 'delivery'], type: 'switch' },
  {
    lp: ['Activity type', 'type'],
    type: 'checkbox-group',
    options: [
      { label: 'Online activities' },
      { label: 'Promotion activities' },
      { label: 'Offline activities' },
      { label: 'Simple brand exposure' },
    ]
  },
  { lp: ['Resources', 'resource'], type: 'radio-group', options: [{ label: 'Sponsor' }, { label: 'Venue' }] },
  { lp: ['Activity form', 'desc'], el: { type: "textarea" } },
]
</script>

<style scoped>
pre {
  margin: 0;
  line-height: 1.5;
}
</style>
```