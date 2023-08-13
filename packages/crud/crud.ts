import type { ExtractPropTypes, PropType } from 'vue'
import { ButtonProps, DialogProps, FormProps, TableColumnCtx } from 'element-plus'
import tableProps from 'element-plus/es/components/table/src/table/defaults'
import type { Item } from 'el-form-render'
import config, { Config } from './config'

export type Column = Partial<TableColumnCtx<any>> & { prop: string }

export type CRUDProps = ExtractPropTypes<typeof crudProps>

export const crudProps = {
  ...tableProps,
  request: Function as PropType<Config['request']>,
  url: String,
  extraQuery: Object,
  data: Array,
  columns: Array as PropType<Array<string | TableColumnCtx<any>>[]>,
  showIndex: Boolean,
  showSelect: Boolean,
  selected: Array,
  selectable: Function as unknown as PropType<Column['selectable']>,
  multiple: Boolean,
  //
  field: { type: Object, default: () => config.field },
  pagination: { type: Object, default: () => config.pagination },
  hasPagination: { default: true },
  //
  operation: Object as PropType<Column>,
  hasNew: { default: true },
  hasEdit: { default: true },
  hasDel: { default: true },
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
  onSelect: Function as PropType<(selected: any[], row) => void>
}
