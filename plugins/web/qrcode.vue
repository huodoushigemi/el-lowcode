<template>
  <img :src alt="QR Code" style="display: inline-block; object-fit: contain;" />
</template>

<script setup>
import { useAttrs } from 'vue'
import { computedAsync } from '@vueuse/core'
import qr from 'qrcode'

const props = defineProps(['text', 'options'])
const attrs = useAttrs()

const src = computedAsync(() => new Promise((resolve, reject) => {
  if (props.options.type == 'svg') {
    qr.toString(props.text, { ...props.options }, (err, val) => resolve('data:image/svg+xml;base64,' + window.btoa(val)))
  }
  else {
    qr.toDataURL(props.text, { ...props.options, width: parseInt(attrs.style?.width) }).then(resolve)
  }
}))
</script>