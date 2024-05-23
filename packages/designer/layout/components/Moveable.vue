<template></template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { unrefElement } from '@vueuse/core'
import VanillaMoveable, { MoveableOptions, EVENTS, PROPERTIES, METHODS, MoveableProperties, MoveableInterface, MoveableEvents } from 'moveable'

const props = defineProps(PROPERTIES)
const emit = defineEmits(EVENTS)

let moveable: VanillaMoveable

PROPERTIES.forEach((name) => {
  watch(() => props[name], v => moveable && (moveable[name] = v))
})

watch(() => props.target, v => {
  v = unrefElement(v )
  moveable?.destroy()
  if (!v) return
  moveable = new VanillaMoveable(v.parentElement, props)
  EVENTS.forEach(name => moveable.on(name, e => emit(name, e)))
}, { immediate: true })

onBeforeUnmount(() => {
  moveable?.destroy()
})
</script>
