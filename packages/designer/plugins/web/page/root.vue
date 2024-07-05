<template>
  <div ref="el" class="Page">
    <slot v-if="!loading"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, getCurrentInstance, inject, provide, reactive, watch, watchEffect, Plugin, ref, PropType, nextTick } from 'vue'
import { useWindowSize, useParentElement, useElementSize } from '@vueuse/core'
import { pageCtxKey } from './interface'
import { refWithWatch } from '../../../components/hooks'
import { importJs } from '../../../components/_utils'
import { designerCtxKey } from '../../../layout/interface'
import { useFit } from './hooks'
import { computed } from 'vue'
import { toRef } from 'vue'
import { useAttrs } from 'vue'

defineOptions({
  name: 'Page'
})

const props = defineProps({
  state: { type: Object, default: () => ({}) },
  esm: Object,
  plugins: Array as PropType<string[]>,
  customComponents: Object,
  fit: String
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

provide('pageCtx', reactive({ state }))
provide(pageCtxKey, reactive({ state }))

const loading = ref(false)

// custom components
watchEffect(() => {
  Object.entries(props.customComponents ?? {}).forEach(([name, id]) => {
    ins.appContext.app.component(name, defineAsyncComponent(async () => (await importJs(id)).default))
  })
})

// load plugin
watch(() => props.plugins, async (urls, old) => {
  if (JSON.stringify(urls) == JSON.stringify(old)) return
  
  try {
    loading.value = true
    await loadPlugins(urls)
  } finally {
    loading.value = false
  }
}, { immediate: true })

async function loadPlugins(urls) {
  for (const url of urls || []) {
    const plugin = (await import(/* @vite-ignore */ url + '/index.js')).default as Plugin & { plugins?: string[] }
    await loadPlugins(plugin.plugins)
    ins.appContext.app.use(plugin)
  }
}

// todo
const winSize = useWindowSize()
const parentSize = useElementSize(useParentElement())

const { el } = useFit({
  fit: toRef(props, 'fit'),
  // target: useWindowSize()
  target: parentSize
})

defineExpose({ state })
</script>

<style>
.Page {

}
</style>