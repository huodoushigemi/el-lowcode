<template>
  <form style="display: flex; flex-direction: column;" @submit="e => (e.preventDefault(), emit('update:attrs', model))">
    <a v-if="attrs.href" :href="attrs.href" target="_blank" style="display: block; margin-bottom: 8px;"><u>{{ attrs.href }}</u></a>
    <div>
      <input v-model="model.href" style="outline: 0; padding: 4px;" placeholder="Enter URL" />
      <button style="margin-left: 4px; padding: 4px" type="submit">OK</button>
    </div>
    <label style="margin-top: 4px;">
      Open in new tab
      <input type="checkbox" :checked="model.target == '_blank'" @change="e => model.target = e.target.checked ? '_blank' : null" />
    </label>
  </form>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps(['attrs'])
const emit = defineEmits(['update:attrs'])

const model = useVModel(props, 'attrs', emit, { passive: true, clone: true })
</script>