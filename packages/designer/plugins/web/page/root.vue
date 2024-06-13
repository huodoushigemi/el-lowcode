<template>
  <div class="Page">
    <slot v-if="!loading"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, getCurrentInstance, inject, provide, reactive, watch, watchEffect, Plugin, ref } from 'vue'
import { pageCtxKey } from './interface'
import { refWithWatch } from '../../../components/hooks'
import { importJs } from '../../../components/_utils'
import { designerCtxKey } from '../../../layout/interface'
import { PropType } from 'vue'

defineOptions({
  name: 'Page'
})

const props = defineProps({
  state: { type: Object, default: () => ({}) },
  esm: Object,
  plugins: Array as PropType<string[]>,
  customComponents: Object,
  preset: [Object, String],
})

const ins = getCurrentInstance()!

const state = refWithWatch(() => JSON.parse(JSON.stringify(props.state)))

const designerCtx = inject(designerCtxKey)

watch(() => designerCtx?.currentState, val => {
  state.value = val
})
watchEffect(() => {
  if (!designerCtx) return
  designerCtx.currentState = state.value
})

provide('pageCtx', reactive({
  state
}))
provide(pageCtxKey, reactive({
  state
}))

const loading = ref(true)

// custom components
watchEffect(() => {
  Object.entries(props.customComponents ?? {}).forEach(([name, id]) => {
    ins.appContext.app.component(name, defineAsyncComponent(async () => (await importJs(id)).default))
  })
})

// load plugin
watch(() => props.plugins, async function loadPlugins(urls) {
  for (const url of urls || []) {
    const plugin = (await import(/* @vite-ignore */ url + '/index.js')).default as Plugin & { plugins?: string[] }
    await loadPlugins(plugin.plugins)
    ins.appContext.app.use(plugin)
  }
  loading.value = false
}, { immediate: true })

defineExpose({ state })
</script>

<style>
.Page {

}
</style>