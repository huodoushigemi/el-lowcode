# FormRender 表单渲染

表单包含 `输入框`, `单选框`, `下拉选择`, `多选框` 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。

## 基础用法

```vue preview
<template>
  <el-form-render :model="model" :items="items" />
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup lang="ts">
import ElFormRender, { Item } from 'el-form-render'

const model = reactive({})

const items: Item[] = [
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
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

最基础的表单包括各种输入表单项，比如`input`、`select`、`radio`、`checkbox`等。

```vue preview
<template>
  <el-form-render :model="model" :items="items" label-width="120px">
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>

    <el-form-item>
      <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
    </el-form-item>
  </el-form-render>
</template>

<script setup lang="ts">
import ElFormRender, { Item } from 'el-form-render'

const model = reactive({})

const items: Item[] = [
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

const onSubmit = () => {
  alert('submit!')
}
</script>
```

## 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

通过设置 `inline` 属性为 `true` 可以让表单域变为行内的表单域。

```vue preview
<template>
  <el-form-render inline :model="model" :items="items" class="demo-form-inline">
    <el-form-item>
      <el-button type="primary">Query</el-button>
    </el-form-item>
  </el-form-render>
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup lang="ts">
import ElFormRender, { Item } from 'el-form-render'

const model = reactive({})

const items: Item[] = [
  {
    lp: ['Approved by', 'user']
  },
  {
    lp: ['Activity zone', 'region'],
    type: 'select',
    options: [{ value: 'shanghai' }, { value: 'beijing' }]
  },
  {
    lp: ['Activity time', 'date'],
    type: 'date-picker',
    el: { type: 'date', clearable: true }
  }
]
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 180px;
}
</style>
```

## 表单校验

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

```vue preview
<template>
  <el-form-render ref="form" :model="model" :items="items" label-width="120px" :autocomplete="false">
    <el-form-item>
      <el-button type="primary" @click="submitForm()">Submit</el-button>
      <el-button @click="form.resetFields()">Reset</el-button>
    </el-form-item>

    <el-form-item>
      <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
    </el-form-item>
  </el-form-render>
  
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import ElFormRender, { Item } from 'el-form-render'

const form = ref<FormInstance>()
const model = reactive({})

const items: Item[] = [
  {
    lp: ['Password', 'pass'],
    rules: {
      validator(rule, val, cb) {
        if (!val) {
          cb('Please input the password')
        } else if (!model.checkPass) {
          form.value.validateField('checkPass')
        }
      }
    },
    el: { type: 'password' }
  },
  {
    lp: ['Confirm', 'checkPass'],
    rules: {
      validator(rule, val, cb) {
        if (!val) {
          cb('Please input the password again')
        } else if (val !== model.pass) {
          cb(`Two inputs don't match!`)
        }
      }
    },
    el: { type: 'password' }
  },
  {
    lp: ['Age', 'age'],
    rules: {
      validator(rule, val, cb) {
        if (!val) return cb('Please input the age')
        if (!Number.isInteger(val)) return cb('Please input digits')
        if (+val < 18) return cb('Age must be greater than 18')
      }
    }
  }
]

const submitForm = () => {
  form.value!.validate(bool => {
    if (bool) {
      alert('submit!')
    } else {
      console.log('error submit!')
    }
  })
}
</script>
```

## 隐藏项

通过设置 `hide` 动态隐藏表单项。

```vue preview
<template>
  <el-form-render :model="model" :items="items" label-width="60" label-position="left" />
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup lang="ts">
import ElFormRender, { Item } from 'el-form-render'

const model = reactive({})

const items: Item[] = [
  {
    lp: ['control', 'control'],
    type: 'select',
    options: [{ value: 'show' }, { value: 'hide' }]
  },
  {
    lp: ['name', 'name'],
    hide: () => model.control !== 'show'
  }
]
</script>
```

## value-format

## 自定义组件

<style>
  .mdp-demo__preview code {
    display: inline-block;
  }
  .mdp-demo__preview pre {
    margin: 0;
    line-height: 1.5;
  }
</style>