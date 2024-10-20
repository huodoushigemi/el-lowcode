<template>
   <wc-mdit :src="url" .options="{ html: true }" theme="github" body-style="padding: 45px; margin: 0 auto; max-width: 980px; box-sizing: border-box;" min-hfull />
</template>

<script setup>
import 'wc-mdit'

const props = defineProps({
  url: String,
})

// import MarkdownIt from 'markdown-it'

// const md = new MarkdownIt({ html: true })

// // 给链接添加 target="_blank"
// md.renderer.rules.link_open = (tokens, idx, opts, env, slef) => {
//   const i = tokens[idx].attrIndex('target')
//   if (i < 0) {
//     tokens[idx].attrPush(['target', '_blank'])
//   } else {
//     tokens[idx].attrs[i][1] = '_blank'
//   }
//   return slef.renderToken(tokens, idx, opts)
// }
</script>