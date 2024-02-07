# CRUD 增删改查

本章介绍插槽的使用

## 自定义列

通过设置 `#$xxx` 自定义列内容。

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age', 'is']"
    :operation="{ width: 200 }"
  >
    <template #$is="{ row }">
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

## 自定义操作列

通过设置 `#btns` 自定义操作列按钮。

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age', 'is']"
    :operation="{ width: 250 }"
  >
    <template #btns="{ row }">
      <el-button link type="primary">xxx</el-button>
      <el-button link type="primary">ooo</el-button>
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
</script>
```

## 自定义搜索

通过设置 `#search:xxx` 自定义搜索。

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age', 'is']"
    :formItems="['id', 'name', 'age', 'is']"
    :operation="{ width: 200 }"
  >
    <template #search:name="{ row }">
      <input v-model="row.name" style="border: solid;" />
    </template>
    <template #search:age="{ row }">
      <input v-model="row.age" type="range" />
      {{ row.age }}
    </template>
  </CRUD>
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['是否', 'is'], type: 'checkbox' },
]
</script>
```

## 自定义表单

通过设置 `#form:xxx` 自定义表单。

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age', 'is']"
    :formItems="['id', 'name', 'age', 'is']"
    :operation="{ width: 200 }"
  >
    <template #form:name="{ row }">
      <input v-model="row.name" style="border: solid;" />
    </template>
    <template #form:age="{ row }">
      <input v-model="row.age" type="range" />
      {{ row.age }}
    </template>
  </CRUD>
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['是否', 'is'], type: 'checkbox' },
]
</script>
```
