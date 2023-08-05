<template>
  <!-- 搜索 -->
  <el-form-render ref="searchRef" :inline="true" :model="params" :items="_searchItems" v-bind="search" @keyup.enter="getData()" @submit.native.prevent>
    <template v-for="e in Object.keys($slots).map(e => e.split('search:')[1]).filter(e => e)" #[e]>
      <slot :name="'search:' + e" :model="row" />
    </template>
    <el-form-item>
      <el-button type="primary" @click="getData()">查询</el-button>
      <el-button @click="() => ($refs.searchRef.resetFields(), getData())">重置</el-button>
    </el-form-item>
  </el-form-render>

  <div v-if="hasNew" mb18>
    <el-button type="primary" @click="openDialog()">新增</el-button>
    <slot name="header" />
  </div>

  <slot name="header:after" />

  <!-- 表格内容展示 -->
  <el-table ref="tableRef" :border="true" v-bind="objectPick($props, Object.keys(tableProps))" :data="_data" @select="_onSelect" @select-all="onSelectAll">
    <el-table-column v-if="showSelect" type="selection" width="60" reserve-selection :selectable="selectable" />
    <el-table-column v-if="showIndex" type="index" label="序号" width="80" />

    <template v-for="col in _columns" :key="col.prop">
      <el-table-column v-bind="col">
        <template #default="{ row, $index }">
          <slot :name="col.prop" :row="row" :$index="$index">
            <Render :render="col.formatter?.(row, col, row[col.prop], $index) ?? row[col.prop]" />
          </slot>
        </template>
      </el-table-column>
    </template>

    <el-table-column v-if="hasEdit || hasDel || btns || $slots.btns" label="操作" width="300" fixed="right" v-bind="operation">
      <template #default="{ row, $index }">
        <slot name="btns" :row="row" :$index="$index" />
        <el-button v-for="btn in btns?.(row)" type="primary" size="small" v-bind="btn"><Render :render="btn.render" /></el-button>
        <el-button size="small" type="primary" @click="openDialog(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="_onDel(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination
    m20
    background
    justify-end
    v-model:current-page="params.page.page"
    v-model:page-size="params.page.pageSize"
    :total="_total"
    layout="total, sizes, prev, pager, next"
    v-bind="page"
  />

  <!-- 表单 -->
  <el-dialog v-model="visible" :title="row?.id ? '编辑' : '新增'" width="800" destroy-on-close v-bind="dialog">
    <el-form-render ref="formRef" :model="row" :items="_formItems" label-width="auto" v-bind="form">
      <template v-for="e in Object.keys($slots).map(e => e.split('form:')[1]).filter(e => e)" #[e]>
        <slot :name="'form:' + e" :model="row" :row="row" />
      </template>
    </el-form-render>

    <template #footer>
      <el-button @click="() => (visible = false, row = {})">取消</el-button>
      <el-button type="primary" @click="_onConfirm">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { ExtractPropTypes } from 'vue'
import { isObject, isString } from '@vue/shared'
import { objectPick } from '@vueuse/core'

import { PaginationProps, TableColumnCtx, ButtonProps, ElMessageBox, ElMessage, FormProps, DialogProps, ElTable, ElTableColumn, ElButton, ElPagination, ElDialog } from 'element-plus'
import tableProps from 'element-plus/es/components/table/src/table/defaults'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/pagination/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/button/style/css'

import ElFormRender, { Item, label, prop } from 'el-form-render'

// import { post } from '@/api/http'
const post = () => {}
import Render from '../render'

const solveRowKey = <T,>(fn: T | ((row) => T), row) => typeof fn === 'function' ? (fn as Function)(row) : row[fn]

defineOptions({ name: 'crud' })

export type Column = Partial<TableColumnCtx<any>> & { prop: string }

export type CRUDProps = ExtractPropTypes<typeof props>

const props = defineProps({
  ...tableProps,
  url: String,
  extraQuery: Object,
  data: Array,
  columns: Array as PropType<Array<string | TableColumnCtx<any>>[]>,
  showIndex: Boolean,
  showSelect: Boolean,
  selected: Array,
  selectable: Function as PropType<Column['selectable']>,
  multiple: Boolean,
  // 
  page: Object as PropType<PaginationProps>,
  // 
  operation: Object as PropType<Column>,
  hasNew: { type: Boolean, default: true },
  hasEdit: { type: Boolean, default: true },
  hasDel: { type: Boolean, default: true },
  btns: { type: Function as PropType<(row) => (Partial<ButtonProps> & { render: any })[]> },
  onNew: { type: Function as PropType<(row: any) => Awaited<void>> },
  onEdit: { type: Function as PropType<(row: any) => Awaited<void>> },
  onDel: { type: Function as PropType<(row: any) => Awaited<void>> },
  // 
  schema: Array as PropType<Item[]>,
  // 
  search: Object as PropType<FormProps>,
  searchItems: Array as PropType<Array<string | Item>>,
  // 
  dialog: Object as PropType<DialogProps>,
  form: Object as PropType<FormProps>,
  formItems: Array as PropType<Array<string | Item>>,
  // 
  onSelect: Function as PropType<(selected: any[], row) => void>,
})

defineExpose({
  getData
})

// 分页查询
const params = reactive({
  page: { page: 1, pageSize: 10 },
  ...props.extraQuery
})

watch(
  () => params.page,
  () => getData(),
  { deep: true, immediate: true }
)

// 选中状态
const tableRef = ref<InstanceType<typeof import('element-plus')['ElTable']>>()

watch(
  () => [...props.selected ?? []],
  async (val) => {
    await nextTick()
    tableRef.value!.clearSelection()
    val?.forEach(e => {
      e = _data.value.find(row => solveRowKey(props.rowKey, row) == solveRowKey(props.rowKey, e)) ?? e
      tableRef.value!.toggleRowSelection(e, true)
    })
  },
  { immediate: true }
)

function _onSelect(selected: any[], row) {
  setTimeout(() => {
    // 单选
    if (!props.multiple) {
      tableRef.value!.clearSelection()
      tableRef.value!.toggleRowSelection(row, selected.includes(row))
    }
    setTimeout(() => {
      props.onSelect?.(tableRef.value!.getSelectionRows(), row)
    }, 0);
  }, 0);
}
function onSelectAll() {
  // 单选
  if (!props.multiple) {
    tableRef.value!.clearSelection()
  }
}

// 
const _total = ref(0)
const _list = ref([])
const _data = computed(() => props.data ?? _list.value)

async function getData(query = params) {
  if (!props.url) return
  const { data } = await post(props.url, query)
  _list.value =  data.list
  _total.value = data.total
}

async function _onDel(row) {
  await ElMessageBox.confirm('是否删除该数据 ？', 'warning', { type: 'warning' })
  if (props.onDel) {
    await props.onDel(row)
  } else {
    const url = props.url.replace('list', 'information').replace('search', 'delete')
    await post(url, { id: row.id })
  }
  getData()
}

// dialog
const formRef = ref()
const row = ref()
const visible = ref(false)

function openDialog(e = {}) {
  row.value = e
  visible.value = true
}
async function _onConfirm() {
  await formRef.value.validate()
  await (row.value.id ? _onEdit() : _onNew())
  visible.value = false
  getData()
}

async function _onNew() {
  if (props.onNew) {
    await props.onNew(row.value)
  } else {
    const url = props.url.replace('list', 'information').replace('search', 'create')
    await post(url, row.value)
  }
  ElMessage.success({ message: '创建成功' })
}

async function _onEdit() {
  if (props.onEdit) {
    await props.onEdit(row.value)
  } else {
    const url = props.url.replace('list', 'information').replace('search', 'edit')
    await post(url, row.value)
  }
  ElMessage.success({ message: '修改成功' })
}

// form
const _schemaBy = computed(() => (props.schema || [])?.reduce((o, e) => (o[prop(e)] = e, o), {}) as Record<string, Item>)

const _searchItems = computed(() => props.searchItems?.map(_2searchItem))

const _formItems = computed(() => props.formItems?.map(e => isString(e) ? _schemaBy.value[e] : { ..._schemaBy.value[prop(e)], ...e }))

// @ts-ignore
const _columns = computed(() => props.columns?.map(_2column))

function _2column(e: string | Column): Column {
  const item = (isString(e) ? _schemaBy.value[e] : _schemaBy.value[prop(e)]) || { lp: ['', ''] }
  const col = isObject(e) ? e : {}
  return {
    label: label(item),
    prop: prop(item),
    formatter: (row, column, val, index) => {
      return (
        item.type === 'date-picker' ? new Date(val * 1000).toLocaleDateString() :
        item.el?.options ? item.el.options.find(e => e.value == val) :
        val
      )
    },
    ...col
  }
}

function _2searchItem(e: string | Item) {
  const schema = (isString(e) ? _schemaBy.value[e] : _schemaBy.value[prop(e)]) || {}
  let item = isObject(e) ? e : {}
  item = {
    ...schema,
    ...item,
    rules: undefined,
    el: { ...schema.el, ...item.el, disabled: false }
  }
  return {
    ...item,
    el: {
      clearable: true,
      ...item.el,
      type: !item.type || item.type === 'input' ? '' : item.el!.type
    }
  }
}
</script>


<style>
.is-disabled .el-checkbox__inner {
  background-color: #80808040 !important;
}
</style>