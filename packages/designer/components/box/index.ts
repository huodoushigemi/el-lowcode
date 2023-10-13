import { Obj } from "@el-lowcode/utils"

export interface BoxProps {
  is?: any
  _id?: string
  el?: Obj
  children?: string | number | BoxProps[]
  [k: string]: any
}