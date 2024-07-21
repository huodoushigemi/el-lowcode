import { Obj } from "@el-lowcode/utils"
import { Item } from "el-form-render"

export interface ElLowcodeConfig {
  is: string
  label?: string
  drag?: boolean
  sortablePut?: boolean
  cover?: string
  JSONSchemaOutput?(props: Obj): Obj
  props?: Item[]
  defaultProps?(): Obj
}

export interface BoxProps {
  is?: any
  _id: string
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

export interface BoxCtx {
  parent?: BoxProps
  node: BoxProps
  index: number
  active2parent?: undefined | (() => void)
  swap?: undefined | ((d?: number) => void)
  remove?: undefined | (() => void)
  copy?: undefined | (() => void)
  config: ElLowcodeConfig
}