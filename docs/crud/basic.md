# CRUD 增删改查

支持 [`el-table`](https://element-plus.gitee.io/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7) 所有属性

## 基础用法

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'sex']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age', 'sex', 'is']"
    :operation="{ width: 200 }"
  />
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['性别', 'sex'], type: 'radio-group', options: [{ label: '男', value: 0 }, { label: '女', value: 1 }] },
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
    :hasOperation="false"
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
  { id: '1', name: 'aaa', age: 18, sex: '男', is: false },
  { id: '2', name: 'bbb', age: 17, sex: '男', is: false },
  { id: '3', name: 'ccc', age: 16, sex: '男', is: false },
  { id: '4', name: 'ddd', age: 15, sex: '男', is: false },
  { id: '5', name: 'eee', age: 14, sex: '男', is: false },
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
    :operation="{ width: 300 }"
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

## options

`options` 属性支持多种类型，[详见](/el-form-render/options.html)

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'sex', 'age', 'type']"
    :searchItems="['name', 'sex', 'type']"
    :formItems="['id', 'name', 'sex', 'age', 'type']"
    :operation="{ width: 200 }"
  />
</template>

<script setup lang="ts">
import CRUD from '@el-lowcode/crud'

const schema = [
  { lp: ['id', 'id'], el: { disabled: true } },
  { lp: ['姓名', 'name'] },
  { lp: ['年龄', 'age'] },
  { lp: ['性别', 'sex'], type: 'select', options: [{ label: '男', value: 0 }, { label: '女', value: 1 }] },
  {
    lp: ['Activity type', 'type'],
    type: 'checkbox-group',
    options: [
      { label: 'Online activities' },
      { label: 'Promotion activities' },
      { label: 'Offline activities' },
      { label: 'Simple brand exposure' },
    ]
  },
]
</script>
```