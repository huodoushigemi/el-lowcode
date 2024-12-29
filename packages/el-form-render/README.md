# el-form-render

## 📖 介绍

### What

`el-form-render` 基于 [element-plus](https://element-plus.gitee.io/zh-CN/component/form.html)，但不限于 [element-plus](https://element-plus.gitee.io/zh-CN/component/form.html) 组件。在完全继承 `el-form` 属性的基础上，进行扩展。一些非表单组件或自定义组件，例如图片上传和富文本编辑器，也可以集成，因此，用户可以使用一段json来呈现完整的表单。

### Why

在我们的日常开发中，有很多带有表单的页面，通常形式结构相似，逻辑重复。`el-form-render` 没有复杂的逻辑。它仅将JSON转换为呈现表单项，节省编写业务逻辑的时间和精力，并减少重复代码。

## 📃 特征

- 使用 json 渲染表单
- 支持与自定义组件集成
- 支持使用更新表单方法批量更新表单数据
- 支持设置选项方法，动态更改选择选项
- 内容支持 `get`、`set`、`out` ，用于处理组件的输入和输出值

## 🔗 链接

- [文档](http://httpsgiteecomepalserver.gitee.io/el-lowcode)
- [自定义组件](http://httpsgiteecomepalserver.gitee.io/el-lowcode/el-form-render/is.html)

## 🦄 快速开始

```shell
pnpm add el-form-render
```

```html
<template>
  <el-form-render :model="model" :items="items" />
  
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup>
import ElFormRender from 'el-form-render'

const model = reactive({})

const items = [
  { label: '姓名' prop: 'name' },
]
</script>
```

## 💡 Inspiration

thanks to [el-form-renderer](https://github.com/FEMessage/el-form-renderer)

## 👏 Contributing

If you have any questions or requests or want to contribute, please write the issue or give me a Pull Request freely.

