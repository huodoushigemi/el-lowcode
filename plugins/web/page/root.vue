<template>
  <div ref="el" class="Page">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, toRef, PropType } from 'vue'
import { useParentElement, useElementSize } from '@vueuse/core'
// import { importJs } from '../../../components/_utils'
import { useFit } from './hooks'

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
// custom components
// watchEffect(() => {
//   Object.entries(props.customComponents ?? {}).forEach(([name, id]) => {
//     ins.appContext.app.component(name, defineAsyncComponent(async () => (await importJs(id)).default))
//   })
// })

// todo
// const winSize = useWindowSize()
const parentSize = useElementSize(useParentElement())

const { el } = useFit({
  fit: toRef(props, 'fit'),
  // target: useWindowSize()
  target: parentSize
})
</script>

<style>
.Page {

}
</style>