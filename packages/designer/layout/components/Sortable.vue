<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { useCurrentElement } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'

const props = defineProps({
  option: Object,
  modelValue: Array
})

const el = useCurrentElement()
useSortable(el, () => props.modelValue, props.option)
</script>