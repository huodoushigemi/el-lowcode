# CRUD 增删改查

支持 [`el-table`](https://element-plus.gitee.io/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7) 所有属性

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
    pageSize: 10
  }
})
```

## 基础用法

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age']"
  />
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['性别', 'sex'], type: 'switch' },
  { lp: ['是否', 'is'], type: 'checkbox' },
]
</script>
```

## 纯表格

```vue preview
<template>
  <CRUD
    :data="data"
    :columns="schema"
    :hasNew="false"
    :hasDel="false"
    :hasEdit="false"
    :hasPagination="false"
  />
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'] },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['性别', 'sex'] },
  { lp: ['是否', 'is'] },
]

const data = [
  { id: '1', name: 'aaa', age: 18, sex: '男', is: '否' },
  { id: '2', name: 'bbb', age: 17, sex: '男', is: '否' },
  { id: '3', name: 'ccc', age: 16, sex: '男', is: '否' },
  { id: '4', name: 'ddd', age: 15, sex: '男', is: '否' },
  { id: '5', name: 'eee', age: 14, sex: '男', is: '否' },
]
</script>
```

## xxx

```vue preview
<template>
  <CRUD
    :data="data"
    :schema="schema"
    :columns="['id', 'name', 'age']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age']"
  />
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['性别', 'sex'], type: 'switch' },
  { lp: ['是否', 'is'], type: 'checkbox' },
]

const data = [
  { id: '1', name: 'aaa', age: 18, sex: true, is: false },
  { id: '2', name: 'bbb', age: 17, sex: true, is: false },
  { id: '3', name: 'ccc', age: 16, sex: true, is: false },
  { id: '4', name: 'ddd', age: 15, sex: true, is: false },
  { id: '5', name: 'eee', age: 14, sex: true, is: false },
]
</script>
```

## www

```vue preview
<template>
  <CRUD
    :data="data"
    :schema="schema"
    :columns="['id', 'name', 'age']"
    :searchItems="['name', 'age', ...searchItems]"
    :formItems="['id', 'name', 'age']"
  />
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['性别', 'sex'], type: 'switch' },
  { lp: ['是否', 'is'], type: 'checkbox' },
]

const data = [
  { id: '1', name: 'aaa', age: 18, sex: true, is: false },
  { id: '2', name: 'bbb', age: 17, sex: true, is: false },
  { id: '3', name: 'ccc', age: 16, sex: true, is: false },
  { id: '4', name: 'ddd', age: 15, sex: true, is: false },
  { id: '5', name: 'eee', age: 14, sex: true, is: false },
]

const searchItems = [
  { lp: ['asd', 'xxx'], type: 'date-picker', el: { type: 'daterange', valueFormat: 'x' }, get1(val, row) { return [row.start, row.end] } }
]
</script>
```