# CRUD 获取表单值

本章介绍如何获取 **表单的值**

## 基础使用

通过 `v-model:search` 获取搜索表单的值

通过 `v-model:form` 获取弹窗表单的值

```vue preview
<template>  
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age', 'is']"
    :operation="{ width: 200 }"
    v-model:search="searchModel"
    v-model:form="formModel"
  />

  <p>v-model:search</p>
  <code><pre>{{ JSON.stringify(searchModel, null, '  ') }}</pre></code>
  
  <p>v-model:form</p>
  <code><pre>{{ JSON.stringify(formModel, null, '  ') }}</pre></code>
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const formModel = ref(null)
const searchModel = ref({})

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['是否', 'is'], type: 'checkbox' },
]
</script>
```