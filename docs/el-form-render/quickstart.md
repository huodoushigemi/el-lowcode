# 快速开始

本节将介绍如何在项目中使用 `el-form-render`

## 安装

```shell
npm i el-form-render
```

## 引入

引入需要的 `element-plus` 组件，[详见](https://element-plus.gitee.io/zh-CN/guide/quickstart.html)

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

## 使用

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
]
</script>
```