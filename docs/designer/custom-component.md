# 自定义组件

本节将介绍如何在设计器中使用 **自定义组件** [DEMO](http://httpsgiteecomepalserver.gitee.io/el-lowcode/designer/#/?templateId=custom-component)

你可以使用 `.vue` `.js` 文件 **自定义组件**

比如自定义一个音频组件

> audio.js

```ts
export const el_lowcode = {
  is: 'audio',
  label: '音频',
  props: [
    { lp: 'src' },
    { lp: 'autoplay', type: 'switch' },
    { lp: 'loop', type: 'switch' },
    { lp: 'muted', type: 'switch' },
  ],
  defaultProps: () => ({
    controls: true,
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    style: { padding: '20px' }
  })
}
```

你只需将 `audio.js` 拖入到设计器左侧的组件栏即可

<br />

> MyAudio.vue

```vue
<template>
  <div style="padding: 20px">
    <p>我是自定义的 audio 组件</p>
    <audio v-bind="$attrs" />
  </div>
</template>

<script setup>
defineOptions({ name: 'MyAudio' })
</script>

<script>
export const el_lowcode = {
  is: 'MyAudio',
  label: '音频',
  props: [
    { lp: 'src' },
    { lp: 'autoplay', type: 'switch' },
    { lp: 'loop', type: 'switch' },
    { lp: 'muted', type: 'switch' },
  ],
  defaultProps: () => ({
    controls: true,
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
  })
}
</script>
```

你只需将 `MyAudio.vue` 拖入到设计器左侧的组件栏即可

::: warning
`.vue` 暂不支持 `lang="ts"` `lang="scss"`
:::

---

更多示例请参照：

- AntdV: <a download>`AntButton.vue`</a> <a download>`AntQrcode.vue`</a> <a download>`AntSegmented.vue`</a>
- Shoelace: <a download>`SlSplitPanel.vue`</a> <a download>`MyCard.vue`</a>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'

const ins = getCurrentInstance()

onMounted(() => {
  ;[...ins.ctx.$el.querySelectorAll('a[download]')].forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      download(`https://raw.githubusercontent.com/huodoushigemi/el-lowcode/main/public/${el.textContent}`)
    })
  })
})

async function download(url) {
  const filename = url.split('/').at(-1)
  const res = await fetch(url)
  const blob = await res.blob()
  url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.target = '_blank'
  a.click()
  URL.revokeObjectURL(blob)
}
</script>