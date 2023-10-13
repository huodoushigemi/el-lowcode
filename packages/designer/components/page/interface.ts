import { InjectionKey } from 'vue'
import { Obj } from '@el-lowcode/utils'

export const pageCtxKey: InjectionKey<PageCtx> = Symbol('pageCtxKey')

export interface PageCtx {
  state: Obj
}
