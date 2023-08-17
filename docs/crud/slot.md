# CRUD 增删改查

本章介绍插槽的使用

## 自定义列

通过设置 `#xxx` 自定义列内容。

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age', 'is']"
  >
    <template #is="{ row }">
      <el-switch v-model="row.is" @change="onEdit(row)" />
    </template>
  </CRUD>
</template>

<script setup lang="ts">
import axios from 'axios'
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['是否', 'is'], type: 'checkbox' },
]

async function onEdit(row) {
  await axios.post('/user/edit', row)
  alert('修改成功')
}
</script>
```

## 自定义搜索

通过设置 `#$search:xxx` 自定义搜索。

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age', 'is']"
    :formItems="['id', 'name', 'age', 'is']"
  >
    <template #is="{ row }">
      <el-switch v-model="row.is" />
    </template>
    <template #$search:is="{ row }">
      <el-switch v-model="row.is" />
    </template>
  </CRUD>
</template>

<script setup lang="ts">
import axios from 'axios'
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['是否', 'is'], type: 'checkbox' },
]

async function onEdit(row) {
  await axios.post('/user/edit', row)
  alert('修改成功')
}
</script>
```
