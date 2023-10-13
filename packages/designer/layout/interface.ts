import { CSSProperties, InjectionKey } from 'vue'
import { BoxProps } from '../components/box'
import { Obj } from '@el-lowcode/utils'

export interface DesignerCtx {
  activeId?: BoxProps['_id']
  readonly active?: BoxProps
  hoverId?: BoxProps['_id']
  readonly hover?: BoxProps
  root: BoxProps
  openState: boolean
  currentState: Obj
  canvas: {
    style: CSSProperties
  }
}

export const designerCtxKey: InjectionKey<DesignerCtx> = Symbol('designerCtxKey')
