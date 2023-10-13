<template>
  <div class="Page">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, provide, reactive, watch, watchEffect } from 'vue'
import { pageCtxKey } from './interface'
import { refWithWatch } from '../hooks'
import { designerCtxKey } from '../../layout/interface'

defineOptions({
  name: 'Page'
})

const props = defineProps({
  state: { type: Object, default: () => ({}) }
})

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

defineExpose({ state })
</script>

<style>
.Page {

}
</style>