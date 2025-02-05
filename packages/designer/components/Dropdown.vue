<template>
  <Tippy :trigger>
    <slot />
    <template #content>
      <slot name="dropdown" />
    </template>
  </Tippy>
</template>

<script setup>
import { provide } from 'vue'
// import tippy from 'tippy.js'
// import tippy from '../layout/components/tippy.vue'
import { Tippy } from 'vue-tippy'

const props = defineProps(['trigger', 'tippy'])

provide('dropdown', props)
</script>