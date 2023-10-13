<template>
  <Render v-bind="schema" />
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { Render } from 'el-lowcode'

const route = useRoute()

const schema = computed(() => {
  const undecode = route.query.schema as string
  return undecode ? JSON.parse(decodeURIComponent(undecode)) : { is: 'h1', children: 'no more' }
})

watchEffect(() => {
  console.log(schema.value)
})
</script>