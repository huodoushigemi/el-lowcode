<template>
  <el-date-picker v-bind="{...$props, ...$attrs}" type="datetime" value-format="YYYY-MM-DDTHH:mm:ss.SSSZ" />
</template>

<script setup lang="ts">
import { ElDatePicker, datePickerProps } from 'element-plus'

defineOptions({
  name: 'ElDateTime-lcd'
})

defineProps(datePickerProps)
</script>
