import { computed, InjectionKey, mergeProps, reactive, ref, shallowRef, toRaw, toRef } from 'vue'
import { isArray, isObject, isPlainObject, isString, normalizeStyle } from '@vue/shared'
import { Fn, unrefElement } from '@vueuse/core'
import { Arrable, Assign, deepClone, Fnable, getRects, isExp, mergeRects, Obj, pick, set, toArr, uid } from '@el-lowcode/utils'
import { processProps } from 'el-lowcode'
import { Props } from '@el-lowcode/render'
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
  getEl?(node: DisplayNode): Arrable<Element>
  // getParent?(node: DisplayNode): Arrable<Element>
  getDropEl?(node: DisplayNode): Arrable<Element>
  getRect?(node: DisplayNode): Arrable<DOMRect | Element>
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

export interface Snippet {
  id: string
  title: string
  schema: () => BoxProps
}

export type BoxProps = Props

export abstract class DisplayNode extends Node<BoxProps> {
  abstract designerCtx: DesignerCtx

  get root() { return this.designerCtx.rootNode as typeof this }
  get isRoot() { return this.designerCtx.rootNode == this }

  constructor(data) {
    const raw = toRaw(data)
    raw._id ??= uid()
    super(data)
  }

  get id () { return this.data._id! }
  get is() { return this.data.is }
  get icon() { return this.config?.icon }
  get label () { return (this.vslot && `#${this.vslot}`) || this.$data['lcd-label'] || this.config?.label || this.data.is }
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
      isArray(this.data.children) ? this.data.children :
      isPlainObject(this.data.children) ? Object.values(this.data.children).filter(e => e) :
      void 0
    )
  }

  ref = ref<HTMLElement>()
  emptyRef = shallowRef<Element>()

  get el(): Element | undefined {
    return this.els?.[0]
  }

  get els() {
    if (this.vslot) return
    void this.ref.value
    if (this.config?.getEl) {
      const ret = toArr(this.config?.getEl?.(this)).filter(e => e != null)
      if (ret.length != this.parsedEls?.length || !this.parsedEls.every(e => ret.includes(e))) this.parsedEls = ret
      return this.parsedEls
    }
    const ret = unrefElement(this.ref)
    return ret ? [ret] : void 0
  }

  #parsedEls = shallowRef<Element[]>()
  get parsedEls() { return this.#parsedEls.value }
  set parsedEls(v) { this.#parsedEls.value = v }

  // ignore v-slot:default
  get id$() { return this.vslot == 'default' ? this.parent!.id : this.id }
  get is$() { return this.vslot == 'default' ? this.parent!.is : this.is }
  get parent$(): typeof this | undefined { return this.parent?.vslot == 'default' ? this.parent.parent : this.parent }
  get children$(): typeof this[] | undefined { return isPlainObject(this.data.children) ? this.children?.find(e => e.vslot == 'default')?.children : this.children }

  get dropEls(): Element[] {
    return toArr(
      this.config?.getDropEl?.(this) ??
      this.emptyRef.value ??
      this.children$?.[0]?.el?.parentElement
    ).filter(e => e != null)
  }

  #vars = shallowRef()
  get vars() { return this.#vars.value ?? this.designerCtx.rootNode.vars }
  set vars(v) { this.#vars.value = v }

  #$data = computed(() => this.processProps(this.vars))
  get $data() { return this.#$data.value as BoxProps }

  processProps(vars?: Record<string, any>) {
    let { children, ...props } = this.data
    // 移除值为 undefuned 的属性
    props = JSON.parse(JSON.stringify(props))
    props.children = children
    props = processProps(props, vars)
    // todo $
    if (this.config?.devProps) props = mergeProps(props, this.config?.devProps(this.data, this.designerCtx)) as any
    if (this.indexInFor > 0) props = mergeProps(props, { style: 'pointer-events: none;' }) as any
    return props
  }

  get itemInFor() { return this.data.$?.for ? this.vars[this.data.vFor?.[1] || 'item'] : this.parent?.itemInFor }
  get indexInFor() { return this.data.$?.for ? this.vars[this.data.vFor?.[2] || 'index'] : this.parent?.indexInFor }

  // 自由拖拽
  get isAbs() { return this.data.style?.position == 'absolute' }
  set isAbs(bool) { this.data.style = bool ? normalizeStyle([this.data.style, { position: 'absolute', margin: 0 }]) : normalizeStyle([this.data.style, { position: void 0, transform: void 0, margin: void 0 }]) }

  get x() { return parseTransform(this.data.style?.transform)[0] }
  set x(v) { set(this.data, 'style.transform', `translate(${v}px, ${this.y}px)`) }

  get y() { return parseTransform(this.data.style?.transform)[1] }
  set y(v) { set(this.data, 'style.transform', `translate(${this.x}px, ${v}px)`) }

  get inline() { return this.el ? window.getComputedStyle(this.el).display.includes('inline') : false }
  set inline(v) { v ? set(this.data, 'style.display', (this.flex && 'inline-flex') || (this.grid || 'inline-grid')) : void 0 }

  get flex() { return this.el ? window.getComputedStyle(this.el).display.includes('flex') : false }
  set flex(v) { v ? set(this.data, 'style.display', this.inline ? 'inline-flex' : 'flex') : void 0 }

  get grid() { return this.el ? window.getComputedStyle(this.el).display.includes('grid') : false }
  set grid(v) { v ? set(this.data, 'style.display', this.inline ? 'inline-grid' : 'grid') : void 0 }

  // 自由布局
  get isAbsLayout() { return !!this.data['data-absolute-layout'] }
  set isAbsLayout(bool) { this.data['data-absolute-layout'] = bool || void 0 }

  get text() { return isString(this.data.children) && !isExp(this.data.children) ? this.data.children : void 0 }
  
  // 插槽化 children
  #vSlots
  get vSlots() {
    return this.#vSlots ??= new Proxy({}, {
      get: (target, p, receiver) => {
        return p == 'default' && isArray(this.data.children) ? reactive({ children: toRef(this.data, 'children') }) : this.data.children?.[p]
      },
      set: (target, p, val, receiver) => {
        if (isArray(this.data.children) && p == 'default' && isArray(val)) {
          this.data.children = val
        } else {
          let children = this.data.children as any
          children = isArray(children) ? { default: { children } } : { ...children }
          // 
          if (val == null) delete children[p]
          else children[p] = isArray(val) ? { children: val } : val == true ? { children: [] } : val
          // 最小化 children
          if (Object.values(children).every(e => e == null)) {
            children = void 0
          } else if (Object.entries(children).every(([k, v]) => k == 'default' || v == null) && children.default.vSlot == null) {
            children = children.default.children
          }
          this.data.children = children
        }
        return true
      },
    })
  }

  get drag(): WidgetDrag {
    if (this.vslot == 'default') return this.parent!.drag
    const drag = { ...this.config?.drag, ...this.$data['lcd-drag'] }
    drag.disabled ||= !this.selectable
    return drag
  }
  get selectable() { return this.$data['lcd-selectable'] !== false }

  get lock() { return this.$data['lcd-lock'] }
  set lock(bool) { this.data['lcd-lock'] = bool || void 0 }

  get hidden() { return this.$data['lcd-hidden'] }
  set hidden(bool) { this.data['lcd-hidden'] = bool || void 0 }

  getRect() {
    const rects = this.getRects()
    if (!rects.length) return
    return mergeRects(rects)
  }

  getRects(): DOMRect[] {
    return getRects(this.config?.getRect?.(this) ?? this.els)
  }

  clone() {
    const data = deepClone(this.data, (v, k) => k == '_id' ? uid() : v)
    // @ts-ignore
    const node = new this.constructor(data)
    return node
  }

  setAttrs(obj) {
    for (const e of this.els || []) {
      for (const k in obj) obj[k] == null ? e.removeAttribute(k) : e.setAttribute(k, obj[k])
    }
  }

  override insertable(node: DisplayNode) {
    if (!isArray(this.data.children)) return false
    if (node.drag.to && !node.drag.to.includes(this.is$)) return false
    if (this.drag.from && !this.drag.from.includes(node.is)) return false
    if (node.drag.ancestor && !this.path.some(e => node.drag.ancestor!.includes(e.is))) return false
    if (this.lock) return false
    return super.insertable(node)
  }

  override remove() {
    this.designerCtx.activeId = this.prev?.id ?? this.next?.id ?? this.parent?.id
    this.isRoot ? this.empty() : super.remove()
  }

  override doRemove() {
    this.vslot ? (delete this.parent!.data.children![this.vslot]) : super.doRemove()
  }

  override click() {
    this.designerCtx.activeId = this.id
  }

  override hover() {
    this.designerCtx.hoverId = this.id
  }
}

export interface DesignerCtx {
  DisplayNode: { new (...args: ConstructorParameters<typeof DisplayNode>): DisplayNode }
  
  activeId?: string
  readonly active?: DisplayNode

  hoverId?: string
  readonly hover?: DisplayNode

  draggedId?: string
  readonly dragged?: DisplayNode

  root: BoxProps
  rootNode: DisplayNode
  keyedNode: Record<string, DisplayNode>

  currentState: Obj
  // readonly viewport: HTMLElement
  canvas: {
    x: number
    y: number
    w: number
    h: number
    zoom: number
    style?: Record<string, any>
  }

  newProps(is: string): BoxProps
  widgets: Record<string, Widget | undefined>
  snippets: Snippet[]

  plugins: {
    url: string
    packageJSON: Record<string, any>
    widgets: Widget[]
    snippets?: Snippet[]
    contributes: Contributes
    isActive: boolean
    activate()
    deactivate()
  }[]

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
    icon?: string
    iconClass?: string
    initialSize?: number
    renderer?: Renderer
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
