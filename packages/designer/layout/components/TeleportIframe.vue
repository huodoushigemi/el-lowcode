<template>
   <iframe ref="iframeRef" :src="url" />
</template>

<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import url from './iframe-temp.html?url'

const designerCtx = inject('designerCtx')

const iframeRef = ref()

watchEffect(() => {
  if (iframeRef.value?.contentWindow) iframeRef.value.contentWindow.designerCtx = designerCtx
})
</script>