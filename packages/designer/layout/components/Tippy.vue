<template>
  <div ref="el">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import tippy, { Props, Instance } from 'tippy.js'

const props = defineProps({
  target: Object,
  extra: Object as PropType<Partial<Props>>
})

const el = ref()

watch(() => [props.target, el.value], ([target, content], old, cleaup) => {
  if (!content) return
  target ??= content.parentElement

  const ins = tippy(target, {
    content,
    ...props.extra
  }) as unknown as Instance
  
  cleaup(() => ins.destroy())
}, {
  immediate: true,
  flush: 'post'
})
</script>