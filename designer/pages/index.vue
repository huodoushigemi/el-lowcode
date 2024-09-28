<script setup lang="ts">
import { onMounted, ref, watch, watchEffect, watchSyncEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { watchDebounced } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import { v4 as uuid } from 'uuid'
import Designer, { DesignerCtx } from '@el-lowcode/designer'

const designer = ref<DesignerCtx>()

const initial = (children: any = []) => ({
  _id: uuid(),
  is: 'Page',
  state: { count: 0 },
  children,
  plugins: ['/plugins/web'],
  designer: {
    canvas: { style: { width: '768px', height: '1024px' } }
  }
})

const json = window.__LCD_JSON__ ?? initial()


onMounted(() => {
  designer.value!.dict.plugins.push(...[
    "/plugins/web",
    "/plugins/element-plus",
    "/plugins/echarts",
    "/plugins/chatgpt",
    "/plugins/ant-design-vue",
    "/plugins/naive-ui",
    "/plugins/shoelace",
    "/plugins/mdui",
    "/plugins/threejs",

    // "/plugins/threejs",
    // "/plugins/threejs",
    // "/plugins/threejs",
    // "/plugins/threejs",
    // "/plugins/threejs",
    // "/plugins/threejs",
    // "/plugins/threejs",
  ])
})

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
const file = useRouteQuery<string | undefined>('file')
// watch([schema, designer], ([val, designer]) => {
//   if (!val || !designer) return
//   const json = JSON.parse(val)
//   designer.root = json
//   schema.value = undefined
// }, { immediate: true, flush: 'post' })
watchEffect(async () => {
  console.log(111, file.value, 111);
  if (!designer.value) return
  if (schema.value) {
    designer.value.root = JSON.parse(schema.value)
    schema.value = undefined
  }
  else if (file.value) {
    designer.value.root = await fetch(file.value).then(e => e.status == 200 ? e.json() : Promise.reject()).catch(() => initial([{ _id: uuid(), is: 'h1', children: '404' }]))
    file.value = undefined
  }
})
</script>

<template>
  <Designer
    ref="designer"
    :json="json"
    :extra-plugins="['/plugins/template']"
    h100vh
  />
</template>
