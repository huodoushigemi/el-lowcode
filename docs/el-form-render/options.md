# ElFormRender 表单渲染

本章介绍 `options` 属性的使用

---

`options` 属性支持多种类型：
- `Option[]`  
- `() => Option[]`  
- `Promise<Option[]>` 
- `() => Promise<Option[]>` 

```vue preview
<template>
  <el-form-render :model="model" :items="items" label-width="auto" />
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup lang="ts">
import ElFormRender, { Item } from 'el-form-render'

const opts = [
  { value: 'man' },
  { value: 'woman' },
]

const model = reactive({})

const items: Item[] = [
  { lp: ['Normal', 'normal'], type: 'select', options: opts },
  { lp: ['Function', 'function'], type: 'select', options: () => opts },
  { lp: ['Promise', 'promise'], type: 'select', options: Promise.resolve(opts) },
  { lp: ['AsynFunction', 'asynFunction'], type: 'select', options: () => Promise.resolve(opts) },
]
</script>
```

```ts
type Option = { label: string, value: string }
```