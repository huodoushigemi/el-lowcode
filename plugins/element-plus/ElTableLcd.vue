<template>
  <el-table ref="tableRef" @select="select" @select-all="select" v-bind="{ ...$props, ...$attrs }">
    <slot />
  </el-table>
</template>

<script setup>
import { ref, watchEffect, nextTick } from 'vue'
import { ElTable as Table } from 'element-plus'
import { keyBy } from '@el-lowcode/utils'

const props = defineProps({
  ...Table.props,
  selected: Array,
})

const emit = defineEmits(['update:selected'])

const tableRef = ref()

function select(arr) {
  emit('update:selected', arr)
}

watchEffect(async () => {
  if (!tableRef.value) await nextTick()
  if (!props.rowKey) return
  tableRef.value.clearSelection()
  const keyed = keyBy(props.data, props.rowKey)
  props.selected?.forEach(row => {
    row = keyed[row[props.rowKey]] || row
    tableRef.value.toggleRowSelection(row, true)
  })
})
</script>