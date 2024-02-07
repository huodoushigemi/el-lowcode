# AFormRender 表单渲染

支持 [`a-form`](https://www.antdv.com/components/form-cn/) 所有属性

## 基础用法

```vue preview
<template>
  <a-config-provider :theme="{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }">

    <!-- 表单渲染 -->
    <a-form-render ref="form" :model="model" :items="items" :label-col="{ span: 2 }" @finish="onFinish">
      <a-form-item :wrapper-col="{ offset: 2 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
        <a-button @click="$refs.form.resetFields()">Reset</a-button>
      </a-form-item>
    </a-form-render>

  </a-config-provider>
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup>
import { reactive, watchEffect, getCurrentInstance } from 'vue'
import { useDark } from '@vueuse/core'
import { theme } from 'ant-design-vue'
import AFormRender from 'el-form-render/antdv4'

// 全量注册 antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
const app = getCurrentInstance().appContext.app
app.use(Antd)

// 是否深色模式
const isDark = useDark({ storageKey: 'vitepress-theme-appearance' })

const model = reactive({})

const items = [
  { label: '姓名', name: 'name' },
  { lp: ['地址', 'address'], required: true },
  { lp: ['年龄', 'age'], type: 'slider' },
  { lp: ['区域', 'area'], options: ['Beijing', 'Shanghai'] },
  { lp: ['性别', 'sex'], type: 'radio-group', options: ['男', '女'] },
  { lp: ['爱好', 'like'], type: 'checkbox-group', options: ['CODE', 'LOL'] },
  { lp: ['是否', 'is'], type: 'checkbox' },
]

function onFinish() {
  alert('Success')
}
</script>
```

## Results

::: tip
`lp` 是 `label  name` 的缩写

如果不指定 `type` 则默认为 `input`
:::

<style>
  .ant-btn + .ant-btn {
    margin-left: 10px;
  }
</style>