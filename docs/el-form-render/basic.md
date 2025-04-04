# ElFormRender 表单渲染

支持 [`el-form`](https://element-plus.gitee.io/zh-CN/component/form.html#form-attributes) 所有属性

## 基础用法

```vue preview
<template>
  <el-form-render :model="model" :items="items" />
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup>
import { reactive } from 'vue'
import ElFormRender from 'el-form-render'

const model = reactive({})

const items = [
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

最基础的表单包括各种输入表单项，比如 `input`、`select`、`radio`、`checkbox` 等。

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

<script setup>
import { reactive } from 'vue'
import ElFormRender from 'el-form-render'

const model = reactive({})

const items = [
  { lp: ['name', 'name'] },
  { lp: ['Activity zone', 'region'] },
  { lp: ['time', 'date'], type: 'time-picker' },
  { lp: ['Instant delivery', 'delivery'], type: 'switch' },
  {
    lp: ['Activity type', 'type'],
    type: 'checkbox-group',
    options: [
      { value: 'Online activities' },
      { value: 'Promotion activities' },
      { value: 'Offline activities' },
      { value: 'Simple brand exposure' },
    ]
  },
  { lp: ['Resources', 'resource'], type: 'radio-group', options: [{ value: 'Sponsor' }, { value: 'Venue' }] },
  { lp: ['Activity form', 'desc'], el: { type: "textarea" } },
]

const onSubmit = () => {
  alert('submit!')
}
</script>
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

<script setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import ElFormRender from 'el-form-render'

const form = ref<FormInstance>()
const model = reactive({})

const items = [
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

## 动态校验

性别为 `男` 时 `介绍` 必填

```vue preview
<template>
  <el-form-render ref="form" :model="model" :items="items" label-width="120px">
    <el-form-item>
      <el-button type="primary" @click="$refs.form.validate()">Submit</el-button>
      <el-button @click="$refs.form.resetFields()">Reset</el-button>
    </el-form-item>

    <el-form-item>
      <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
    </el-form-item>
  </el-form-render>
</template>

<script setup>
import { reactive } from 'vue'
import ElFormRender from 'el-form-render'

const model = reactive({})

const items = [
  { lp: ['姓名', 'name'] },
  { lp: ['性别', 'sex'], type: 'select', options: [{ value: '男' }, { value: '女' }] },
  {
    lp: ['介绍', 'intro'],
    rules: (row) => ({ required: row.sex === '男', message: '必填 ' }),
    el: { type: 'textarea' }
  },
]
</script>
```

## 隐藏项

通过设置 `hide` 动态隐藏表单项。

```vue preview
<template>
  <el-form-render :model="model" :items="items" label-width="60" label-position="left" />
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup>
import { reactive } from 'vue'
import ElFormRender from 'el-form-render'

const model = reactive({})

const items = [
  { lp: 'control', options: ['show', 'hide'] },
  { lp: 'name', hide: () => model.control != 'show' }
]
</script>
```

## value-format

通过设置 `get` `set` `out` 控制值。

```vue preview
<template>
  <el-form-render :model="model" :items="items" label-width="60" />
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup>
import { reactive } from 'vue'
import ElFormRender from 'el-form-render'

const model = reactive({})

const items = [
  {
    lp: ['range', 'time'],
    type: 'date-picker',
    el: { type: 'daterange', valueFormat: 'YYYY-MM-DD' },
    get: (val, row) => [row.start, row.end],
    set: (val, row) => null,
    out: (val, row) => ({ start: val?.[0], end: val?.[1] }),
  }
]
</script>
```
