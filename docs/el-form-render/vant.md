# VanFormRender 表单渲染

支持 [`van-form`](https://vant-contrib.gitee.io/vant/#/zh-CN/form) 所有属性

## 基础用法

```vue preview
<template>
  <van-config-provider :theme="isDark ? 'dark' : ''">

    <!-- 表单渲染 -->
    <van-form-render class="max-w350 bg-black overflow-hidden" :model="model" @submit="onFinish">
      <van-cell-group class="mt16!" inset>
        <van-form-item-render :lp="['开关', 'switch']" type="switch" />
        <van-form-item-render :lp="['是否', 'is']" type="checkbox" :el="{ shape: 'square' }" />
        <van-form-item-render :lp="['爱好', 'like']" type="checkbox-group" :options="['CODE', 'LOL']" :el="{ direction: 'horizontal', shape: 'square' }" />
        <van-form-item-render :lp="['性别', 'sex']" type="radio-group" :options="['男', '女']" :el="{ direction: 'horizontal' }" />
        <van-form-item-render :lp="['步进器', 'stepper']" type="stepper" />
        <van-form-item-render :lp="['评分', 'rate']" type="rate" />
        <van-form-item-render :lp="['滑块', 'slider']" type="slider" />
        <van-form-item-render :lp="['文本', 'text']" :el="{ placeholder: '请输入文本' }" />
      </van-cell-group>
      <div class="m16">
        <van-button round block type="primary" native-type="submit">Submit</van-button>
      </div>
    </van-form-render>

  </van-config-provider>
  
  <br />
  <code><pre>model: {{ JSON.stringify(model, null, '  ') }}</pre></code>
</template>

<script setup>
import { reactive, watchEffect, getCurrentInstance } from 'vue'
import { useDark } from '@vueuse/core'
import VanFormRender, { VanFormItemRender } from 'el-form-render/vant4'

// 全量注册 vant
import Vant from 'vant'
import 'vant/lib/index.css'
const app = getCurrentInstance().appContext.app
app.use(Vant)

// 是否深色模式
const isDark = useDark({ storageKey: 'vitepress-theme-appearance' })

const model = reactive({
  slider: 50,
  rate: 3,
  sex: '男'
})

function onFinish() {
  alert('Success')
}
</script>
```

## Results

::: tip
`lp` 是 `label  name` 的缩写

如果不指定 `type` 则默认为 `input`
:::

<style>
  .ant-btn + .ant-btn {
    margin-left: 10px;
  }
</style>