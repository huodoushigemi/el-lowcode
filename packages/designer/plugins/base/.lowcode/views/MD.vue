<template>
  <iframe ref="elRef" :height="Math.ceil(height)" />
</template>

<script setup>
import { ref, watchSyncEffect } from 'vue'
import { computedAsync, useElementSize } from '@vueuse/core'
import MarkdownIt from 'markdown-it'
import css from 'github-markdown-css/github-markdown.css?inline'

const props = defineProps({
  url: String,
  text: String
})

const md = new MarkdownIt({ html: true })
const elRef = ref()

// 给链接添加 target="_blank"
md.renderer.rules.link_open = (tokens, idx, opts, env, slef) => {
  const aI = tokens[idx].attrIndex('target')
  if (aI < 0) {
    tokens[idx].attrPush(['target', '_blank'])
  } else {
    tokens[idx].attrs[aI][1] = '_blank'
  }
  return slef.renderToken(tokens, idx, opts)
}

const html = computedAsync(async () => {
  const text = await (props.text || fetch(props.url).then(e => e.text()))
  let html = md.render(text)
  html =
`<body class="markdown-body">
    ${html}
  </body>
`
  return html
}, '', { onError: console.error })

watchSyncEffect(() => {
  const doc = elRef.value?.contentDocument
  if (!doc) return
  if (!doc.querySelector('#css')) doc.head.innerHTML = `<style id="css">body { padding: 45px; margin: 0 auto !important; max-width: 980px; box-sizing: border-box; overflow: hidden; }\n ${css}</style>`
  doc.body.outerHTML = html.value
})

const { height } = useElementSize(() => (html.value, elRef.value?.contentDocument.body), undefined, { box: 'border-box' })
</script>