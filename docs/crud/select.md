# CRUD 增删改查

本章介绍如何启用 **勾选行**

## 基础使用

通过设置 `selection` 启用勾选功能

通过设置 `v-model:selected` 获取选中的行

```vue preview
<template>  
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age', 'is']"
    :operation="{ width: 200 }"
    :tableAttrs="{ rowKey: 'id' }"
    multiple
    :selection="{ limit: 3, selectable: row => row.id != 1 }"
    v-model:selected="selected"
  />

  <p>v-model:selected</p>
  <code><pre>{{ JSON.stringify(selected, null, '  ') }}</pre></code>
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const selected = ref([])

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['是否', 'is'], type: 'checkbox' },
]
</script>
```