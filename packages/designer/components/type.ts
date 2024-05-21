import { Obj } from "@el-lowcode/utils"
import { Item } from "el-form-render"

export interface ElLowcodeConfig {
  is: string
  label?: string
  layout?: boolean
  drag?: boolean
  JSONSchemaOutput?(props: Obj): Obj
  props?: Item[]
  defaultProps?(): Obj
}

export interface BoxProps {
  is?: any
  _id?: string
  el?: Obj
  children?: string | number | BoxProps[]
  esm?: Record<string, string>
  customComponents?: Record<string, string>
  extraElLowcodeWidgets?: Record<string, string>
  presets?: string[]
  $?: {
    loop: string
    loopArgs: [string, string]
    condition: any
  }
  [k: string]: any
}

export interface Preset {
  name: string
  icon?: string
  presets?: string[]
  customComponents?: Record<string, string>
  extraElLowcodeWidgets?: Record<string, string>
}