import { CSSProperties, InjectionKey } from 'vue'
import { BoxProps, BoxCtx, ElLowcodeConfig } from '../components/type'
import { Obj } from '@el-lowcode/utils'

export interface DesignerCtx {
  activeId?: BoxProps['_id']
  readonly active?: BoxProps
  hoverId?: BoxProps['_id']
  readonly hover?: BoxProps
  draggedId?: BoxProps['_id'],
  readonly dragged?: BoxProps,

  root: BoxProps
  flated: BoxProps[]
  keyed: Record<string, BoxProps>
  // keyedCtx: Record<string, BoxCtx> // todo

  currentState: Obj
  readonly viewport: HTMLElement
  canvas: {
    x: number
    y: number
    zoom: number
    style?: Record<string, any>
  }
  widgets: Record<string, ElLowcodeConfig | undefined>
}

export const designerCtxKey: InjectionKey<DesignerCtx> = Symbol('designerCtxKey')
