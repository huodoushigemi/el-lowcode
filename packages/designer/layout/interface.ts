import { computed, ComputedRef, InjectionKey, ref, Ref, shallowRef } from 'vue'
import { Obj } from '@el-lowcode/utils'
import { isArray, isObject, isString, remove } from '@vue/shared'
import { Node } from './components/Node'
import { sloveConfig } from '../components/_utils'

export interface Widget {
  is: string
  label?: string
  drag?: boolean
  sortablePut?: boolean
  cover?: string
  props?: any[]
  defaultProps?(): Obj
  JSONSchemaOutput?(props: Obj): Obj
  purify?(props: Obj): Obj
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

export abstract class DisplayNode extends Node<BoxProps> {
  abstract designerCtx: DesignerCtx

  get id () { return this.data._id }
  get label () { return this.data['data-layer'] || (isString(this.data.children) && this.data.children) || this.config?.label || this.data.is }
  get data_children () { return isObject(this.data.children) ? this.data.children : void 0 }
  get dir() { return isArray(this.data_children) }
  get config() { return sloveConfig(this.data, this.designerCtx.widgets) }

  // 自由拖拽
  get isAbs() { return this.data.style?.position == 'absolute' }
  // 自由布局
  get isAbsLayout() { return this.data['data-absolute-layout'] }

  get isRoot() { return !this.parent }
}

export interface DesignerCtx {
  DisplayNode: { new (...args: ConstructorParameters<typeof DisplayNode>): DisplayNode }
  activeId?: string
  readonly active?: DisplayNode
  readonly activeEl?: HTMLElement | null

  hoverId?: string
  readonly hover?: DisplayNode
  readonly hoverEl?: HTMLElement | null

  draggedId?: string
  readonly dragged?: DisplayNode

  root: BoxProps
  flated: BoxProps[]
  keyed: Record<string, BoxProps>
  rootCtx: DisplayNode
  keyedCtx: Record<string, DisplayNode>

  currentState: Obj
  readonly viewport: HTMLElement
  canvas: {
    x: number
    y: number
    zoom: number
    style?: Record<string, any>
    doc: Document
  }
  widgets: Record<string, Widget | undefined>

  plugins: {
    url: string
    packageJSON: Record<string, any>
    widgets: Widget[]
    contributes: Contributes
    isActive: boolean
    activate()
    deactivate()
  }[]

  viewRenderer: Record<string, Renderer>
}

export interface Contributes {
  activitybar?: Activitybar[]
  views?: Record<string, {
    id: string
    name: string
  }[]>
}

export interface Renderer {
  mount: (container: HTMLElement) => any
  unmount?: (container: HTMLElement) => any
}

export interface Activitybar {
  id: string
  title: string
  icon: string
}

export const designerCtxKey: InjectionKey<DesignerCtx> = Symbol('designerCtxKey')
