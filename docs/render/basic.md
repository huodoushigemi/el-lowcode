# Render 

## 基础用法

```vue preview
<template>
  <Render v-bind="schema" />

  <br />
  
  <code><pre>schema: {{ JSON.stringify(schema, null, '  ') }}</pre></code>
</template>

<script setup lang="ts">
import Render from '@el-lowcode/render'

const schema = {
  is: 'div',
  class: 'text-red',
  children: 'render schema'
}
</script>
```

## 嵌套

```vue preview
<template>
  <Render v-bind="schema" />
</template>

<script setup lang="ts">
import Render from '@el-lowcode/render'

const schema = {
  is: 'div',
  class: 'grid grid-cols-2 gap-12',
  children: [
    'child1',
    { is: 'span', children: 'child2', class: 'font-bold text-red' },
    { is: 'p', children: 'child3' },
    { is: 'img', class: 'w-1/2', src: 'https://element-plus.gitee.io/images/element-plus-logo.svg' }
  ]
}
</script>
```
