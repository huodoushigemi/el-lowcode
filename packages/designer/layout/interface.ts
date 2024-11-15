import { computed, InjectionKey, mergeProps, ref, toRaw } from 'vue'
import { isArray, isObject, isPlainObject, isString, normalizeStyle } from '@vue/shared'
import { Fn, unrefElement } from '@vueuse/core'
import { Arrable, Assign, deepClone, Fnable, Obj, pick, set, uid } from '@el-lowcode/utils'
import { processProps } from 'el-lowcode'
import { solveOptions } from 'el-form-render'
import { Node } from './components/Node'
import { parseTransform } from './components/utils'

export interface Widget {
  is: string
  label?: string
  icon?: string
  drag: WidgetDrag
  hidden?: boolean
  cover?: string // todo
  // slots: { label?: string; value: string }[]
  // vSlots: { label?: string; value: string; args?: any[] }[]
  slots: any[]
  vSlots: any[]
  props?: any[] | ((props: Obj, ctx: DesignerCtx, arg: { node: DisplayNode }) => any[])
  defaultProps?(ctx: DesignerCtx): Obj
  devProps: (props: Obj, ctx: DesignerCtx) => Obj
  purify?(props: Obj): Obj
  JSONSchemaOutput?(props: Obj, ctx: DesignerCtx): Obj
}

export type UserWidget = Assign<Widget, {
  slots?: any[]
  drag?: boolean | Assign<WidgetDrag, {
    to?: Arrable<string>
    from?: Arrable<string>
    ancestor?: Arrable<string>
  }>
}>

export interface WidgetDrag {
  to?: string[]
  from?: string[]
  ancestor?: string[]
  disabled?: boolean
}

export interface BoxProps {
  is?: any
  _id: string
  el?: Obj
  children?: string | number | BoxProps[] | { [k: string]: BoxProps }
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

  constructor(data) {
    const raw = toRaw(data)
    raw._id ??= uid()
    super(data)
  }

  get id () { return this.data._id }
  get is() { return this.data.is || 'Fragment' }
  get label () { return this.data.is }
  get dir() { return isArray(this.data_children) }
  get vslot() { return isPlainObject(this.parent?.data.children) ? Object.entries(this.parent!.data.children).find(([k, v]) => v == this.data)?.[0] : void 0 }
  get config() {
    if (!this.designerCtx.widgets[this.is]) console.error(`${this.is}: Unable to find a matching el_lowcode configuration of ${this.is}`, this.data)
    return this.designerCtx.widgets[this.is]
  }

  // #data_children = computed(() => {
  //   return (
  //     isArray(this.$data.children) ? this.$data.children :
  //     isPlainObject(this.$data.children) ? Object.values(this.$data.children) :
  //     void 0
  //   )
  // })
  // get data_children () {
  //   return this.#data_children.value
  // }
  get data_children() {
    return (
      isArray(this.$data.children) ? this.$data.children :
      isPlainObject(this.$data.children) ? Object.values(this.$data.children) :
      void 0
    )
  }

  ref = ref()

  get el(): HTMLElement | undefined {
    // if (this.vslot) return
    let el = unrefElement(this.ref)
    return el?.nodeType == 3
      ? el.nextElementSibling == 3 ? void 0 : el.nextElementSibling
      : el
  }

  #$data = computed(() => {
    let { children, ...props } = this.data
    // 移除值为 undefuned 的属性
    props = JSON.parse(JSON.stringify(props))
    props.children = children
    props = processProps(props, this.designerCtx.pageCtx)
    if (this.config?.devProps) props = mergeProps(props, this.config?.devProps(this.data, this.designerCtx)) as any
    return props
  })
  get $data() { return this.#$data.value as BoxProps }

  // 自由拖拽
  get isAbs() { return this.$data.style?.position == 'absolute' }
  set isAbs(bool) { this.data.style = bool ? normalizeStyle([this.data.style, { position: 'absolute', margin: 0 }]) : normalizeStyle([this.data.style, { position: void 0, transform: void 0, margin: void 0 }]) }

  get xy() { return parseTransform(this.data.style?.transform) }
  set xy([x, y]) { set(this.data, 'style.transform', `translate(${x}px, ${y}px)`) }
  get x() { return parseTransform(this.data.style?.transform)[0] }
  set x(v) { set(this.data, 'style.transform', `translate(${v}px, ${this.y}px)`) }
  get y() { return parseTransform(this.data.style?.transform)[1] }
  set y(v) { set(this.data, 'style.transform', `translate(${this.x}px, ${v}px)`) }

  get inline() { return this.el ? window.getComputedStyle(this.el).display == 'inline' : false }

  get slots() {
    if (this.config?.slots) return solveOptions(this.config.slots)
    if (this.config?.vSlots) return solveOptions(this.config.vSlots)
  }

  get vSlots() { return isPlainObject(this.$data.children) ? Object.keys(this.$data.children) : void 0 }
  set vSlots(v) {
    const vslots =
      isArray(this.data.children) ? { default: { children: this.data.children } } :
      isPlainObject(this.data.children) ? this.data.children :
      {}
    if (!v?.length) {
      this.data.children = vslots.default.children
    } else {
      const defaults = Object.fromEntries(v.map(e => [e, { children: [] }]))
      this.data.children = pick({ ...defaults, ...vslots }, [...v, 'default'])
    }
  }

  // 自由布局
  get isAbsLayout() { return !!this.$data['data-absolute-layout'] }
  set isAbsLayout(bool) { this.data['data-absolute-layout'] = bool || void 0 }

  get isRoot() { return !this.parent }

  get drag(): WidgetDrag {
    const drag = { ...this.config?.drag, ...this.data['lcd-drag'], ...this.$data['lcd-drag'] }
    drag.disabled ||= !this.selectable
    return drag
  }
  get selectable() { return this.$data['lcd-selectable'] !== false && this.data['lcd-selectable'] !== false }

  get lock() { return this.$data['lcd-lock'] }
  set lock(bool) { this.data['lcd-lock'] = bool || void 0 }

  get hidden() { return this.$data['lcd-hidden'] }
  set hidden(bool) { this.data['lcd-hidden'] = bool || void 0 }

  clone() {
    const data = deepClone(this.data, (v, k) => k == '_id' ? uid() : v)
    // @ts-ignore
    return new this.constructor(data)
  }

  override insertable(node: DisplayNode) {
    if (!isArray(this.$data.children)) return false
    if (node.drag.to && !node.drag.to.includes(this.is)) return false
    if (this.drag.from && !this.drag.from.includes(node.is)) return false
    if (node.drag.ancestor && !this.path.some(e => node.drag.ancestor!.includes(e.is))) return false
    if (this.lock) return false
    return super.insertable(node)
  }

  override remove() {
    this.designerCtx.activeId = this.previousSibling?.id ?? this.nextSibling?.id ?? this.parent?.id
    return super.remove()
  }

  override doRemove() {
    this.vslot ? (delete this.parent!.data.children![this.vslot]) : super.doRemove()
  }
}

export interface DesignerCtx {
  DisplayNode: { new (...args: ConstructorParameters<typeof DisplayNode>): DisplayNode }
  pageCtx: { state: any }
  
  activeId?: string
  readonly active?: DisplayNode

  hoverId?: string
  readonly hover?: DisplayNode

  draggedId?: string
  readonly dragged?: DisplayNode

  root: BoxProps
  rootCtx: DisplayNode
  keyedCtx: Record<string, DisplayNode>

  currentState: Obj
  // readonly viewport: HTMLElement
  canvas: {
    x: number
    y: number
    zoom: number
    style?: Record<string, any>
  }

  newProps(is: string): BoxProps
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

  commands: {
    on(command: string, cb: (...args: any[]) => any): Fn
    off(command: string, cb: (...args: any[]) => any): void
    emit(command: string | CallCommand, ...args: any[]): Promise<any>
  }

  dict: Record<string, any> & { plugins: string[] }
}

export interface Contributes {
  activitybar?: Activitybar[]
  views?: Record<string, {
    id: string
    name: string
  }[]>
  statusbar?: StatusBarItem[]
  commands?: Command[]
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
  command?: string | CallCommand
  renderer?: Renderer
}

export interface CallCommand {
  command: string
  arguments?: any[]
}

export interface Command {
  command: string
  title: string
  icon?: string
  cb?: (ctx: DesignerCtx) => void | Promise<void>
}

export interface ExtensionContext {
  subscriptions: Disposable[]
}

type Disposable = Fn | { dispose() }

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
