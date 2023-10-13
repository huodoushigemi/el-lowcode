<template>
  <ElDescriptions v-bind="$props" :options="undefined">
    <ElDescriptionsItem v-for="item in options" :label="item.label">{{ item.value }}</ElDescriptionsItem>
  </ElDescriptions>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ElDescriptions, ElDescriptionsItem, descriptionProps } from 'element-plus'

defineOptions({
  name: 'Descriptions'
})

defineProps({
  ...descriptionProps,
  options: Array as PropType<{ label: string; value: string }[]>
})
</script>