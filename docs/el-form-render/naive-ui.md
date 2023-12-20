# NFormRender 表单渲染

支持 [`n-form`](https://element-plus.gitee.io/zh-CN/component/form.html#form-attributes) 所有属性

## 基础用法

```vue preview
<template>
  <n-config-provider :theme="isDark ? darkTheme : undefined">

    <!-- 表单渲染 -->
    <n-form-render ref="form" :model="model" :items="items" label-placement="left" label-width="auto">
      <div style="text-align: right">
        <n-button type="primary" @click="$refs.form.validate()">Submit</n-button>
      </div>
    </n-form-render>

  </n-config-provider>
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup>
import { reactive, watchEffect, getCurrentInstance } from 'vue'
import { useDark } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
import NFormRender from 'el-form-render/naive-ui'

// 全量注册 naive-ui
import Naive from 'naive-ui'
const app = getCurrentInstance().appContext.app
app.use(Naive)

// 是否深色模式
const isDark = useDark({ storageKey: 'vitepress-theme-appearance' })

const model = reactive({})

const items = [
  { label: '姓名', path: 'name' },
  { lp: ['地址', 'address'], rule: { required: true } },
  { lp: ['年龄', 'age'], type: 'slider' },
  { lp: ['区域', 'area'], options: ['Beijing', 'Shanghai'] },
  { lp: ['性别', 'sex'], type: 'radio-group', options: ['男', '女'] },
  { lp: ['爱好', 'like'], type: 'checkbox-group', options: ['CODE', 'LOL'] },
  { lp: ['是否', 'is'], type: 'checkbox' },
]
</script>
```

## Results

::: tip
`lp` 是 `label  path` 的缩写

如果不指定 `type` 则默认为 `input`
:::
