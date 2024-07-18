<template>
  <ElFormRender :model="modelValue" flex="~ col" wfull>
    <el-table
      size="small"
      v-bind="props"
      :columns="undefined"
      :data="modelValue"
      table-layout="fixed"
      style="--el-table-border: 0; --el-table-row-hover-bg-color: unset; --el-table-header-bg-color: var(--el-fill-color-light)"
      class="[&>.el-table\_\_inner-wrapper]:before:hidden"
      row-class-name="[&+&>td>.cell]:mt--1"
      cell-class-name="py0! b-b-0! [&>.cell]:px0 [&>.cell]:lh-0 [&+&>.cell]:ml--1"
    >
      <el-table-column v-for="col in columns" :label="col.prop" v-bind="col">
        <template #default="{ $index }">
          <ElFormItemRender :label="col.label" v-bind="col.formItem" :prop="`${$index}.${col.prop}`" />
        </template>
      </el-table-column>

      <el-table-column width="24" class-name="[&>.cell]:px0 bg-#00000000!">
        <template #default="{ $index }">
          <i-mdi:close ml2 p4 w22 h22 bg-hover @click="modelValue.splice($index, 1)" />
        </template>
      </el-table-column>
    </el-table>

    <el-button mt4="!" mr24 text bg rd="0!" @click="onPlus">Add</el-button>
  </ElFormRender>
</template>

<script setup>
import { ElTable } from 'element-plus'
import { ElFormRender, ElFormItemRender } from 'el-form-render'

const props = defineProps({
  ...ElTable.props,
  columns: Array,
  modelValue: Array,
  new: Function
})

function onPlus() {
  const modelValue = props.modelValue || []
  if (props.new) modelValue.push(props.new(props.modelValue.length))
  else modelValue.push({})
  emit('update:modelValue', modelValue)
}
</script>