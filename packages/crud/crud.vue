<template>
  <!-- 搜索 -->
  <el-form-render ref="searchRef" :inline="true" :model="params" :items="_searchItems" v-bind="search" @keyup.enter="getData()" @submit.native.prevent>
    <template v-for="e in Object.keys($slots).map(e => e.split('search:')[1]).filter(e => e)" #[e]>
      <slot :name="'search:' + e" :model="row" />
    </template>
    <el-form-item>
      <el-button type="primary" @click="getData()">查询</el-button>
      <!-- @vue-ignore -->
      <el-button @click="() => ($refs.searchRef.resetFields(), getData())">重置</el-button>
    </el-form-item>
  </el-form-render>

  <div v-if="hasNew" mb18>
    <el-button type="primary" @click="openDialog()">新增</el-button>
    <slot name="header" />
  </div>

  <slot name="header:after" />

  <!-- 表格内容展示 -->
  <el-table ref="tableRef" :border="true" v-bind="objectPick($props, ks(tableProps))" :data="_data" @select="_onSelect" @select-all="onSelectAll">
    <el-table-column v-if="showSelect" type="selection" width="60" reserve-selection :selectable="selectable" />
    <el-table-column v-if="showIndex" type="index" label="序号" width="80" />

    <template v-for="col in _columns" :key="col.prop">
      <el-table-column v-bind="col">
        <template #default="{ row, column, $index }">
          <slot :name="col.prop" :row="row" :column="column" :$index="$index">
            <Render :render="col.formatter?.(row, column, row[col.prop], $index) ?? row[col.prop]" />
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
    v-bind="pagination"
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
import { isObject, isString } from '@vue/shared'
import { objectPick } from '@vueuse/core'

import { ElMessageBox, ElMessage, ElTable, ElTableColumn, ElButton, ElPagination, ElDialog } from 'element-plus'
import tableProps from 'element-plus/es/components/table/src/table/defaults'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/pagination/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/button/style/css'

import ElFormRender, { Item, label, prop } from 'el-form-render'

import { get, ks, set } from  '../utils'
import Render from '../render'
import config from './config'
import { crudProps, Column } from './crud'

defineOptions({ name: 'crud' })

const props = defineProps(crudProps)

defineExpose({
  getData
})

// 分页查询
const params = reactive<Record<string, any>>({})
set(params, props.field.page, 1)
set(params, props.field.pageSize, props.pagination?.pageSize)
Object.assign(params, props.extraQuery)

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
      e = _data.value.find(row => get(row, props.rowKey!) == get(e, props.rowKey!)) ?? e
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
  const { data } = await config.request(props.url, query, 'get')
  _list.value =  get(data, props.field.list)
  _total.value = get(data, props.field.total)
}

async function _onDel(row) {
  await ElMessageBox.confirm('是否删除该数据 ？', 'warning', { type: 'warning' })
  if (props.onDel) {
    await props.onDel(row)
  } else if (props.url) {
    await config.request(props.url, { id: row.id }, 'delete')
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
  } else if (props.url) {
    await config.request(props.url, row.value, 'post')
  }
  ElMessage.success({ message: '创建成功' })
}

async function _onEdit() {
  if (props.onEdit) {
    await props.onEdit(row.value)
  } else if (props.url) {
    await config.request(props.url, row.value, 'put')
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
    formatter: (_row, _column, val, _index) => {
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


<!-- <style>
.is-disabled .el-checkbox__inner {
  background-color: #80808040 !important;
}
</style> -->