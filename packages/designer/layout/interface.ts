import { computed, InjectionKey, ref } from 'vue'
import { isArray, isObject, isString, normalizeStyle, remove } from '@vue/shared'
import { unrefElement } from '@vueuse/core'
import { v4 as uuid } from 'uuid'
import { Arrable, Assign, deepClone, Fnable, Obj, set } from '@el-lowcode/utils'
import { processProps } from 'el-lowcode'
import { Node } from './components/Node'
import { sloveConfig } from '../components/_utils'
import { parseTransform } from './components/utils'

export interface Widget {
  is: string
  label?: string
  drag: WidgetDrag
  hidden?: boolean
  sortablePut?: boolean // todo
  cover?: string // todo
  props?: any[] | ((props: any, ctx: DesignerCtx, arg: { node: DisplayNode }) => any[])
  defaultProps?(ctx: DesignerCtx): Obj
  JSONSchemaOutput?(props: Obj, ctx: DesignerCtx): Obj
  purify?(props: Obj): Obj
}

export type UserWidget = Assign<Widget, { drag?: boolean | WidgetDrag }>

export interface WidgetDrag {
  to?: Arrable<string>
  from?: Arrable<string>
  disabled?: boolean
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
  get is() { return this.data.is }
  get label () { return this.data['data-layer'] || (isString(this.data.children) && this.data.children) || this.config?.label || this.data.is }
  get data_children () { return isObject(this.data.children) ? this.data.children : void 0 }
  get dir() { return isArray(this.data_children) }
  get config() { return sloveConfig(this.data, this.designerCtx.widgets) }

  ref = ref()

  get el(): HTMLElement | undefined {
    let el = unrefElement(this.ref)
    return el?.nodeType == 3 ? el.nextElementSibling : el
  }

  #$data = computed(() => {
    let { children, ...props } = this.data
    // 移除值为 undefuned 的属性
    props = JSON.parse(JSON.stringify(props))
    props.children = children
    return processProps(props, this.designerCtx.pageCtx)
  })
  get $data() { return this.#$data.value }

  // 自由拖拽
  get isAbs() { return this.data.style?.position == 'absolute' }
  set isAbs(bool) { this.data.style = bool ? normalizeStyle([this.data.style, { position: 'absolute', margin: 0 }]) : normalizeStyle([this.data.style, { position: void 0, transform: void 0, margin: void 0 }]) }

  get xy() { return parseTransform(this.data.style?.transform) }
  set xy([x, y]) { set(this.data, 'style.transform', `translate(${x}px, ${y}px)`) }

  // 自由布局
  get isAbsLayout() { return !!this.data['data-absolute-layout'] }
  set isAbsLayout(bool) { this.data['data-absolute-layout'] = bool }

  get isRoot() { return !this.parent }

  get drag(): WidgetDrag { return this.data['lcd-drag'] || this.config?.drag || {} }

  get lock() { return this.data['lcd-lock'] }
  set lock(bool) { this.data['lcd-lock'] = bool }

  get hidden() { return this.data['lcd-hidden'] }
  set hidden(bool) { this.data['lcd-hidden'] = bool }

  clone() {
    const data = deepClone(this.data, (v, k) => k == '_id' ? uuid() : v)
    // @ts-ignore
    return new this.constructor(data)
  }
}

export interface DesignerCtx {
  DisplayNode: { new (...args: ConstructorParameters<typeof DisplayNode>): DisplayNode }
  pageCtx: { state: any }
  
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
  // readonly viewport: HTMLElement
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

  dict: Record<string, any> & { plugins: string[] }
}

export interface Contributes {
  activitybar?: Activitybar[]
  views?: Record<string, {
    id: string
    name: string
  }[]>
  statusbar?: StatusBarItem[]
}

export interface StatusBarItem {
  icon?: Fnable<string>
  text?: Fnable<string>
  tooltip?: Fnable<string>
  hidden?: Fnable<boolean>
  align: 'left' | 'right'
  priority?: number
  class?: any
  style?: any
  onClick?: (ctx: DesignerCtx) => void
  command?: string | Command
  renderer?: Renderer
}

export interface Command {
  command: string
  arguments: any[]
}

export interface Renderer {
  mount: (container: HTMLElement, ctx: DesignerCtx) => any
  unmount?: (container: HTMLElement, ctx: DesignerCtx) => any
}

export interface Activitybar {
  id: string
  title: string
  icon: string
}

export const designerCtxKey: InjectionKey<DesignerCtx> = Symbol('designerCtxKey')
