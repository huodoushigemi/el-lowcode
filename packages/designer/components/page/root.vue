<template>
  <div class="Page">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, getCurrentInstance, inject, provide, reactive, watch, watchEffect } from 'vue'
import { pageCtxKey } from './interface'
import { refWithWatch } from '../hooks'
import { importJs } from '../_utils'
import { designerCtxKey } from '../../layout/interface'

defineOptions({
  name: 'Page'
})

const props = defineProps({
  state: { type: Object, default: () => ({}) },
  esm: Object,
  customComponents: Object,
  preset: [Object, String]
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

provide(pageCtxKey, reactive({
  state
}))

// 
watchEffect(() => {
  Object.values(props.esm ?? {}).forEach(js => {
    importJs(js)
  })
})

// custom components
watchEffect(() => {
  Object.entries(props.customComponents ?? {}).forEach(([name, id]) => {
    ins.appContext.app.component(name, defineAsyncComponent(async () => (await importJs(props.esm![id])).default))
  })
})

defineExpose({ state })
</script>

<style>
.Page {

}
</style>