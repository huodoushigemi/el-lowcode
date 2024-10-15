<template>
  <div v-html="md.render(content)" />
</template>

<script setup>
import MarkdownIt from 'markdown-it'
import { computed } from 'vue';

const props = defineProps({
  content: String,
  options: null
})

const md = computed(() => MarkdownIt(props.options))
</script>