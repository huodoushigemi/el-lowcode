import { CSSProperties, InjectionKey } from 'vue'
import { BoxProps } from '../components/type'
import { Obj } from '@el-lowcode/utils'

export interface DesignerCtx {
  activeId?: BoxProps['_id']
  readonly active?: BoxProps
  hoverId?: BoxProps['_id']
  readonly hover?: BoxProps
  draggedId?: BoxProps['_id'],
  readonly dragged?: BoxProps,
  root: BoxProps
  openState: boolean
  currentState: Obj
  readonly viewport: HTMLElement
  canvas: {
    style: Partial<CSSProperties>
  }
}

export const designerCtxKey: InjectionKey<DesignerCtx> = Symbol('designerCtxKey')
