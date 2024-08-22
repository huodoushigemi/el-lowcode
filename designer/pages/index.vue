<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { computedAsync, watchDebounced } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import Designer, { DesignerCtx } from '@el-lowcode/designer'

import TemplatePluginUrl from '../plugins/template?url'

const designer = ref<DesignerCtx>()

const json = window.__LCD_JSON__

// @ts-ignore
// vscode extension
const vscode = window.acquireVsCodeApi?.()
if (vscode) {
  onMounted(() => {
    watchDebounced(() => JSON.stringify(designer.value!.root), txt => {
      if (!txt) return
      console.log('updateText')
      vscode.postMessage(['updateText', txt])
    }, { debounce: 200 })
  })
}

// // query.templateId
// templatesPromise().then(async templates => {
//   watch(() => route.query.templateId, id => {
//     const temp = templates.find(e => e.id == id)
//     if (temp) onEdit(temp)
//     router.replace({ query: { ...route.query, templateId: null } })
//   }, { immediate: true, flush: 'post' })
// })

// query.schema
const schema = useRouteQuery<string | undefined>('schema')
watch([schema, designer], ([val, designer]) => {
  if (!val || !designer) return
  const json = JSON.parse(val)
  designer.root = json
  schema.value = undefined
}, { immediate: true, flush: 'post' })
</script>

<template>
  <Designer ref="designer" :json="json" :extra-plugins="[TemplatePluginUrl.replace('/index.js', '')]" h100vh />
</template>
