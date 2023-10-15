# 快速开始

本节将介绍如何在项目中使用 **Schema渲染器** `@el-lowcode/render`

## 安装

```shell
npm i @el-lowcode/render
```

## 使用

```vue
<template>
  <Render v-bind="schema" />
</template>

<script setup lang="ts">
import Render from '@el-lowcode/render'

const schema = {
  is: 'div',
  children: 'render schema'
}
</script>
```