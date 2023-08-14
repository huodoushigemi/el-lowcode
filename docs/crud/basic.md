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
    url="/user"
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
</script>
```

## 额外按钮

通过设置 `btns` 或 `#$btns` 自定义操作列按钮

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age']"
    :btns="(row) => [
      { render: 'btns', type: 'primary', onClick: () => ElMessage('btns') }
    ]"
  >
    <template #$btns="{ row }">
      <el-button type="primary" link @click="ElMessage('#$btns')">#$btns</el-button>
    </template>
  </CRUD>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
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

## www

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'sex', 'age']"
    :searchItems="['name', 'sex']"
    :formItems="['id', 'name', 'sex', 'age']"
  />
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['性别', 'sex'], type: 'select', options: [{ label: '男', value: 0 }, { label: '女', value: 1 }] },
  { lp: ['是否', 'is'], type: 'checkbox' },
]
</script>
```