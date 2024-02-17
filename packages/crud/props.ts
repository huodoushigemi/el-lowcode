import type { ExtractPropTypes, PropType } from 'vue'
import { ButtonProps, DialogProps, FormProps, TableProps, TableColumnCtx, PaginationProps } from 'element-plus'
import type { Item } from 'el-form-render'
import { Fnable } from '@el-lowcode/utils'
import config, { Config } from './config'

export type Column = Partial<TableColumnCtx<any>>
export type Schema = Item

export type CRUDProps = ExtractPropTypes<typeof crudProps>

export const crudProps = {
  request: Function as PropType<Config['request']>,
  url: String,
  extraQuery: Object,
  data: Array,
  tableAttrs: Object as PropType<Partial<TableProps<any>>>,
  columns: Array as PropType<(string | (TableColumnCtx<any> & { lp?: [string, string?] }))[]>,
  showIndex: Boolean,
  selected: Array,
  selection: Object as PropType<Column & { limit?: number; hide: Fnable<boolean> }>,
  multiple: Boolean,
  //
  field: { type: Object as PropType<Config['field']>, default: () => config.field },
  pagination: { type: Object as PropType<PaginationProps>, default: () => config.pagination },
  hasPagination: { default: true },
  //
  hasNew: { default: true },
  hasEdit: { default: true },
  hasDel: { default: true },
  btns: { type: Function as PropType<(row) => (Partial<ButtonProps> & { children: string })[]> },
  onNew: { type: Function as PropType<(row: any) => Awaited<void>> },
  onEdit: { type: Function as PropType<(row: any) => Awaited<void>> },
  onDel: { type: Function as PropType<(row: any) => Awaited<void>> },
  // 
  hasOperation: { default: true },
  operation: Object as PropType<Column>,
  //
  schema: Array as PropType<Schema[]>,
  //
  search: Object,
  searchAttrs: Object as PropType<FormProps>,
  searchItems: Array as PropType<(string | Item)[]>,
  //
  dialogAttrs: Object as PropType<DialogProps>,
  form: Object,
  formAttrs: Object as PropType<FormProps>,
  formItems: Array as PropType<(string | Item)[]>,
  // 
  headerAttrs: Object
}
