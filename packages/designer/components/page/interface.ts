import { FunctionPlugin, InjectionKey } from 'vue'
import { Obj } from '@el-lowcode/utils'
import { BoxProps, ElLowcodeConfig } from '../type'

export const pageCtxKey: InjectionKey<PageCtx> = Symbol('pageCtxKey')

export interface PageCtx extends BoxProps {
  state: Obj
  plugins?: string[]
  customComponents?: Record<string, string | undefined>
  extraElLowcodeWidgets?: Record<string, string>
}

