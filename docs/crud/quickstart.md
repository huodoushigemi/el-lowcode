# 快速开始

本节将介绍如何在项目中使用 `crud`

## 安装

```shell
npm i @el-lowcode/crud
```

## 配置

```js
import CRUD from '@el-lowcode/crud'
import axios from 'axios'

CRUD.setConfig({
  async request(url, data, type) {
    // type = 'list' | 'new' | 'edit' | 'del' | 'get'
    return (await axios.post(`${url}/${type}`, data)).data
  },
  field: {
    page: 'page.page',
    pageSize: 'page.pageSize',
    total: 'data.total',
    list: 'data.list'
  },
  pagination: {
    pageSize: 5
  }
})
```

## 使用

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name']"
    :searchItems="['name']"
    :formItems="['id', 'name']"
  />
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] }
]
</script>
```