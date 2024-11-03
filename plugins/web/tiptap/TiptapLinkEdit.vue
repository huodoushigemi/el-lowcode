<template>
  <form style="display: flex; flex-direction: column;" @submit="e => (e.preventDefault(), model = _attrs)">
    <a v-if="attrs.href" :href="attrs.href" target="_blank" style="display: block; margin-bottom: 8px;"><u>{{ attrs.href }}</u></a>
    <div>
      <input v-model="_attrs.href" style="outline: 0; padding: 4px;" placeholder="Enter URL" />
      <button style="margin-left: 4px; padding: 4px" type="submit">OK</button>
    </div>
    <label style="margin-top: 4px;">
      Open in new tab
      <input type="checkbox" :checked="_attrs.target == '_blank'" @change="e => _attrs.target = e.target.checked ? '_blank' : void 0" />
    </label>
  </form>
</template>

<script setup>
const props = defineProps(['attrs'])

const model = defineModel('attrs')

const _attrs = props.attrs
</script>