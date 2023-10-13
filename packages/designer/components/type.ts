import { Fnable, Obj } from "@el-lowcode/utils"
import { Item } from "el-form-render"

export interface ElLowcodeConfig {
  is?: string
  label?: string
  layout?: boolean
  drag?: boolean
  JSONSchemaOutput?(props: Obj): Obj
  props?: Item[]
  defaultProps?(): Obj
}