# CRUD 增删改查

本章介绍 **自定义属性** 的使用

## 表单属性

通过 `formAttrs` 设置弹窗表单属性，[详见 el-form](https://element-plus.gitee.io/zh-CN/component/form.html#form-attributes)

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age', 'is']"
    :formAttrs="{
      labelSuffix: '🎃',
      labelWidth: 400
    }"
  >
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

## 弹窗属性

通过 `dialogAttrs` 设置弹窗属性，[详见 el-dialog](https://element-plus.gitee.io/zh-CN/component/dialog.html#attributes)

此示例演示了 *全屏弹窗*

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age', 'is']"
    :dialogAttrs="{ fullscreen: true }"
  >
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

## 搜索表单属性

通过 `searchAttrs` 设置搜索表单属性，[详见 el-form](https://element-plus.gitee.io/zh-CN/component/form.html#form-attributes)

此示例演示了 *非内联搜索表单*

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age', 'is']"
    :searchAttrs="{ inline: false }"
  >
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

## 美化样式

通过 `searchAttrs` 设置搜索表单属性，[详见 el-form](https://element-plus.gitee.io/zh-CN/component/form.html#form-attributes)

此示例演示了 **非内联搜索表单**

```vue preview
<template>
  <CRUD
    url="/user"
    :schema="schema"
    :columns="['id', 'name', 'age', 'is']"
    :searchItems="['name', 'age']"
    :formItems="['id', 'name', 'age', 'is']"
    :searchAttrs="{
      style: 'padding: 18px 0 0 32px; background: #151515'
    }"
    class="asd"
    style="padding: 18px; background: #151515"
  >
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