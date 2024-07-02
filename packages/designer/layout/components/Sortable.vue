<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { useCurrentElement } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'
import { watchEffect } from 'vue';

const props = defineProps({
  option: Object,
  clone: Function,
  modelValue: Array
})

const el = useCurrentElement()
useSortable(el, () => props.modelValue, props.option)

watchEffect(() => {
  if (!el.value) return
  el.value.$sortableClone = (i) => props.clone(props.modelValue[i])
})
</script>