<template>
  <div ref="el">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { PropType, onBeforeUnmount, ref, watch } from 'vue'
import tippy, { Props } from 'tippy.js'

const props = defineProps({
  target: Object,
  extra: Object as PropType<Partial<Props>>
})

const el = ref()

let ins

watch(() => [props.target, el.value], ([target, content]) => {
  if (!content) return
  target ??= content.parentElement
  
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