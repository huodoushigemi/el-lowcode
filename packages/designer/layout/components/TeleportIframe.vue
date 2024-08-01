<template>
  <iframe ref="iframeRef" v-bind="$attrs" @loadstart="loaded = false" @load="loaded = true" />

  <Teleport v-if="loaded" :to="doc().body">
    <slot />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

defineOptions({
  inheritAttrs: false
})

const loaded = ref(false)

const iframeRef = ref()
const doc = () => iframeRef.value?.contentWindow?.document as Document

watchEffect(() => {
  if (!doc()) return
  const style = _h('style', { type: 'text/css' }, `
  html, body, .Page { width: 100%; height: 100%; }
  body { margin: 0; }`)
  doc().head.append(style)
})

const _h = (tag, props, txt) => Object.assign(doc().createElement(tag), { ...props, innerHTML: txt })
</script>