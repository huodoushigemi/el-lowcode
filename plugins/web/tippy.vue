<template>
  <div ref="el">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { PropType, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import tippy, { Props } from 'tippy.js'

const props = defineProps({
  target: Object,
  extra: Object as PropType<Partial<Props>>
})

const el = ref()

let ins

onMounted(() => {
  console.log(111);
})

// watchEffect(() => {
//   if (!el.value) return
//   ins?.destroy()
  
//   const target = props.target ?? el.value.parentElement
//   console.log(target);

//   ins = tippy(target, {
//     content: el.value,
//     ...props.extra
//   })
// })

watch(() => [props.target, el.value], ([target, content]) => {
  if (!content) return
  target = props.target ?? content.parentElement
  console.log(target, content);
  
  ins?.destroy()
  ins = tippy(target, {
    content,
    ...props.extra
  })
}, {
  immediate: true,
  flush: 'post'
})

onBeforeUnmount(() => ins?.destroy())
</script>