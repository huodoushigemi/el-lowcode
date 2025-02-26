<template>
  <h1 v-if="loading">Loading……</h1>
  <Render v-else v-bind="schema" />
</template>

<script setup>
import { isString } from '@vue/shared'
import { Render } from 'el-lowcode'
import { useRequest } from '@el-lowcode/utils'

const props = defineProps(['src', 'schema'])

const { data: schema, loading } = useRequest(() =>
  props.src ? fetch(props.src).then(e => e.json()) :
  isString(props.schema) ? JSON.parse(props.schema) :
  props.schema
)
</script>