import { InjectionKey } from 'vue'
import { Obj } from '@el-lowcode/utils'

export interface ElLowcodeConfig {
  is: string
  label?: string
  drag?: boolean
  sortablePut?: boolean
  cover?: string
  JSONSchemaOutput?(props: Obj): Obj
  props?: any[]
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

export interface DesignerCtx {
  activeId?: BoxProps['_id']
  readonly active?: BoxProps
  readonly activeEl?: HTMLElement | null

  hoverId?: BoxProps['_id']
  readonly hover?: BoxProps
  readonly hoverEl?: HTMLElement | null

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
    doc: Document
  }
  widgets: Record<string, ElLowcodeConfig | undefined>

  plugins: {
    url: string
    packageJSON: Record<string, any>
    contributes: Contributes
    activate()
    deactivate()
  }[]
}

export interface Contributes {
  activitybar: Activitybar[]
  views: Record<string, {
    id: string
    name: string
  }[]>
}

export interface Activitybar {
  id: string
  title: string
  icon: string
}

export const designerCtxKey: InjectionKey<DesignerCtx> = Symbol('designerCtxKey')
