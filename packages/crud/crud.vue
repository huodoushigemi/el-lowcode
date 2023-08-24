<template>
  <div class="crud">
      <!-- 搜索 -->
    <el-form-render v-if="needReq" ref="searchRef" class="crud-search" :inline="true" :model="params" :items="_searchItems" v-bind="searchAttrs" @keyup.enter="getData()">
      <template v-for="e in Object.keys($slots).map(e => e.split('$search:')[1]).filter(e => e)" #[e]>
        <slot :name="'$search:' + e" :row="params" :model="params" />
      </template>
      <slot name="$search" :row="params" :model="params" />
      <el-form-item>
        <el-button type="primary" @click="getData()">查询</el-button>
        <el-button @click="resetSearch()">重置</el-button>
      </el-form-item>
    </el-form-render>

    <div v-if="hasNew || $slots.$header" class="crud-header" v-bind="headerAttrs">
      <el-button v-if="hasNew" type="primary" @click="openDialog()">新增</el-button>
      <slot name="$header" />
    </div>

    <slot name="$table-above" />

    <!-- 表格内容展示 -->
    <el-table ref="tableRef" class="crud-table" v-bind="tableAttrs" :data="_data" @select="_onSelect" @select-all="onSelectAll">
      <el-table-column v-if="selection && !unFn(selection.hide)" type="selection" width="60" reserve-selection v-bind="selection" :selectable="_selectable" />
      <el-table-column v-if="showIndex" type="index" label="序号" width="80" />

      <template v-for="col in _columns" :key="col.prop">
        <el-table-column v-bind="col">
          <template #default="{ row, column, $index }">
            <slot :name="col.prop" v-bind="{ row, column, $index }">
              {{ column.formatter ? column.formatter(row, column, row[column.property], $index) : row[column.property] }}
            </slot>
          </template>
        </el-table-column>
      </template>

      <el-table-column v-if="hasOperation && (hasEdit || hasDel || btns || $slots.$btns)" label="操作" width="auto" fixed="right" v-bind="operation">
        <template #default="scope">
          <slot name="$btns" v-bind="scope" />
          <el-button v-for="btn in btns?.(scope.row)" type="primary" size="small" v-bind="btn"><Render :render="btn.render" /></el-button>
          <el-button v-if="hasEdit" size="small" type="primary" @click="openDialog(scope.row)">编辑</el-button>
          <el-button v-if="hasDel" size="small" type="danger" @click="_onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="hasPagination"
      class="crud--pagination"
      style="justify-content: flex-end; margin: 20px;"
      background
      :total="_total"
      layout="total, sizes, prev, pager, next"
      v-bind="pagination"
      v-model:current-page="_page"
      v-model:page-size="_pageSize"
    />

    <!-- 表单 -->
    <el-dialog v-model="visible" :title="row?.id ? '编辑' : '新增'" width="800" destroy-on-close v-bind="dialogAttrs">
      <el-form-render ref="formRef" :model="row" :items="_formItems" label-width="auto" v-bind="formAttrs">
        <template v-for="e in Object.keys($slots).map(e => e.split('$form:')[1]).filter(e => e)" #[e]>
          <slot :name="'$form:' + e" :row="row" :model="row" />
        </template>
        <slot name="$form" :row="row" :model="row" />
      </el-form-render>

      <template #footer>
        <el-button @click="() => (visible = false, row = {})">取消</el-button>
        <el-button type="primary" @click="_onConfirm">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, h, nextTick, reactive, ref, watch } from 'vue'
import { isObject, isString } from '@vue/shared'

import { ElMessageBox, ElMessage, ElTable, ElTableColumn, TableColumnCtx, ElButton, ElPagination, ElDialog, FormInstance } from 'element-plus'
// import 'element-plus/es/components/table/style/css'
// import 'element-plus/es/components/pagination/style/css'
// import 'element-plus/es/components/dialog/style/css'
// import 'element-plus/es/components/button/style/css'

import ElFormRender, { Item, label, prop, showOpt, solveOptions } from 'el-form-render'
import Render from '@el-lowcode/render'
import { get, set, unFn } from  '@el-lowcode/utils'

import config from './config'
import { crudProps, Column } from './crud'

// utils
const fn_true = () => true
const isSelected = (row) => props.selected?.some(e => get(e, props.tableAttrs!.rowKey!) == get(row, props.tableAttrs!.rowKey!))

defineOptions({ name: 'crud' })
const emit = defineEmits(['update:search', 'update:form', 'update:selected'])

const props = defineProps(crudProps)
const _request = props.request || config.request
const _field = computed(() => ({ ...props.field, ...config.field }))
const _pagination = computed(() => ({ ...props.pagination, ...config.pagination }))

const remainSeletable = () => props.selection?.limit != null ? props.selection.limit > (props.selected?.length || 0) : true
const _selectable = ((row, i) => (
  remainSeletable() && (props.selection?.selectable || fn_true)(row, i)) ||
  isSelected(row)
) as TableColumnCtx<any>['selectable']

const needReq = computed(() => props.url || props.request)

defineExpose({
  getData,
  getList: getData,
  resetSearch
})

// 分页查询
const searchRef = ref<FormInstance>()
const params = reactive<Record<string, any>>(props.search ?? {})
const _total = ref(0)
const _list = ref([])
const _data = computed(() => props.data ?? _list.value)

const _page = computed({
  get() { return get(params, _field.value.page) },
  set(val) { set(params, _field.value.page, val) }
})
const _pageSize = computed({
  get() { return get(params, _field.value.pageSize) },
  set(val) { set(params, _field.value.pageSize, val) }
})

_page.value = 1
_pageSize.value = _pagination.value?.pageSize ?? _pagination.value.pageSize

Object.assign(params, props.extraQuery)

watch(
  () => [_page.value, _pageSize.value],
  () => getData(),
  { immediate: true }
)

async function getData(query = params) {
  if (!needReq.value) return
  const data = await _request(props.url, query, 'list')
  _list.value =  get(data, _field.value.list)
  _total.value = get(data, _field.value.total)
}

function resetSearch() {
  searchRef.value!.resetFields()
  return getData()
}

async function _onDel(row) {
  await ElMessageBox.confirm('是否删除该数据 ？', 'warning', { type: 'warning' })
  if (props.onDel) {
    await props.onDel(row)
  } else if (props.url) {
    await _request(props.url, row, 'del')
  }
  ElMessage.success({ message: '删除成功' })
  getData()
}

// 选中状态
const tableRef = ref<InstanceType<typeof import('element-plus')['ElTable']>>()

watch(
  () => [...props.selected ?? []],
  async (val) => {
    await nextTick()
    tableRef.value?.clearSelection()
    val?.forEach(e => {
      e = _data.value.find(row => get(row, props.tableAttrs!.rowKey!) == get(e, props.tableAttrs!.rowKey!)) ?? e
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
      emit('update:selected', tableRef.value!.getSelectionRows())
    }, 0);
  }, 0);
}
function onSelectAll() {
  // 单选
  if (!props.multiple) {
    tableRef.value!.clearSelection()
  }
}

// dialog
const formRef = ref<FormInstance>()
const row = ref()
const visible = ref(false)

watch(visible, val => emit('update:form', val ? row.value : null))

function openDialog(e = {}) {
  row.value = JSON.parse(JSON.stringify(e))
  visible.value = true
  emit('update:form', row.value)
}
async function _onConfirm() {
  await formRef.value!.validate()
  await (row.value.id ? _onEdit() : _onNew())
  visible.value = false
  getData()
}

async function _onNew() {
  if (props.onNew) {
    await props.onNew(row.value)
  } else if (props.url) {
    await _request(props.url, row.value, 'new')
  }
  ElMessage.success({ message: '创建成功' })
}

async function _onEdit() {
  if (props.onEdit) {
    await props.onEdit(row.value)
  } else if (props.url) {
    await _request(props.url, row.value, 'edit')
  }
  ElMessage.success({ message: '修改成功' })
}

// form
const _schemaBy = computed(() => (props.schema || [])?.reduce((o, e) => (o[prop(e)!] = e, o), {}) as Record<string, Item>)

const _searchItems = computed(() => props.searchItems?.map(_2searchItem))

const _formItems = computed(() => props.formItems?.map(e => isString(e) ? _schemaBy.value[e] : { ..._schemaBy.value[prop(e)!], ...e }))

const _columns = computed(() => props.columns?.map(_2column))

function _2column(e: string | Column): Column {
  const item = (isString(e) ? _schemaBy.value[e] : _schemaBy.value[prop(e)!]) || { lp: [] }
  const col = isObject(e) ? e : {}
  return {
    label: label(item) ?? label(col),
    prop: prop(item) ?? prop(col),
    formatter: (_row, _column, val, _index) => {
      return (
        item.el?.options ? showOpt(solveOptions(item.el!.options)!.find(e => e.value == val)) :
        item.options ? showOpt(solveOptions(item.options)!.find(e => e.value == val)) :
        val
      ) ?? val
    },
    ...col
  }
}

function _2searchItem(e: string | Item) {
  const schema = (isString(e) ? _schemaBy.value[e] : _schemaBy.value[prop(e)!]) || {}
  let item = isObject(e) ? e : {}
  const type = item.type || schema.type
  const elType = item.el?.type || schema.el?.type
  return {
    ...schema,
    ...item,
    rules: undefined,
    type: (
      type === 'checkbox-group' ? 'select' :
      type === 'radio-group' ? 'select' :
      type
    ),
    el: {
      clearable: true,
      ...schema.el,
      ...item.el,
      multiple: (
        type === 'checkbox-group' ? true :
        type === 'radio-group' ? false :
        item.el?.multiple
      ),
      disabled: false,
      type: (!elType || elType === 'input') ? '' : item.el?.type
    }
  }
}
</script>

<style scoped>
:deep(.is-disabled .el-checkbox__inner) {
  background-color: #80808040 !important;
}

.crud-search {
  padding-top: 10px;
  padding-left: 8px;
  background-color: var(--el-bg-color);
}

.crud-search.el-form--inline :deep(.el-form-item) {
  margin-bottom: 10px;
  margin-right: 14px;
}

.crud-search.el-form--inline :deep(.el-form-item__label) {
  padding-right: 8px;
}

.crud-search.el-form--inline :deep(.el-input__suffix) {
  position: absolute;
  right: 11px;
}

.crud-header {
  margin: 6px 0 0;
  padding: 14px 8px;
  background-color: var(--el-bg-color);
}
</style>