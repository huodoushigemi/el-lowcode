import { Obj } from "@el-lowcode/utils"
import { Item } from "el-form-render"

export interface ElLowcodeConfig {
  is: string
  label?: string
  layout?: boolean
  drag?: boolean
  cover?: string
  JSONSchemaOutput?(props: Obj): Obj
  props?: Item[]
  defaultProps?(): Obj
}

export interface BoxProps {
  is?: any
  _id?: string
  el?: Obj
  children?: string | number | BoxProps[]
  $?: {
    // todo
    loop: string
    // todo
    loopArgs: [string, string]
    condition: any
  }
  [k: string]: any
}
