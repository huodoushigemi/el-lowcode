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
  customComponents?: Record<string, string>
  extraElLowcodeWidgets?: Record<string, string>
  presets?: string[]
  $?: {
    // todo
    loop: string
    // todo
    loopArgs: [string, string]
    condition: any
  }
  [k: string]: any
}

export interface Preset {
  name: string
  description?: string
  icon?: string
  presets?: string[]
  extraElLowcodeWidgets?: Record<string, string>
}