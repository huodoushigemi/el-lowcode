import { computed, Ref, shallowRef } from 'vue'
import { get } from '@el-lowcode/utils'
import { isString, remove } from '@vue/shared'

interface Props {
  id: string | ((item) => any)
  label: string | ((item) => string)
  icon?: string | ((item) => string)
  children: string | ((item) => any[] | undefined)
}

// interface Node {
//   data: any
//   parent?: Node
//   readonly children?: Node[]
//   readonly deep: number
//   readonly index: number

//   readonly data_children?: any[]

//   remove()
//   insertBefore()
// }

const wm = new WeakMap<any, Node>()

// const prototype = {
//   remove() {
//     this.data_children
//   }
// }

// function Node(data, props) {
//   const node: Node = reactive({
//     data,
//     parent: void 0,

//     deep: computed(() => (node.parent?.deep ?? -1) + 1),
//     index: computed(() => node.parent?.children!.indexOf(node) ?? 0),

//     get children() {
//       const { children }  = props
//       const _children = isString(children) ? get(data, children) : children?.(data)
//       return []
//     }
//   })

//   return node
// }

export class Node {
  _data: Ref<any>
  get data() { return this._data.value }
  set data(v) { this._data.value = v }

  _props: Ref<Props>
  get props() { return this._props.value }
  set props(v) { this._props.value = v }

  _parent = shallowRef<Node>()
  get parent() { return this._parent.value }
  set parent(v) { this._parent.value = v }

  constructor(data, props: Props) {
    if (wm.has(data)) wm.get(data)
    this._data = shallowRef(data)
    this._props = shallowRef(props)
    wm.set(data, this)
  }

  _deep = computed(() => (this.parent?.deep ?? -1) + 1)
  get deep(): number { return this._deep.value }

  _index = computed(() => this.data_children?.indexOf(this.data) ?? 0)
  get index(): number { return this._index.value }

  _children = computed(() => this.data_children?.map(e => {
    const node = new this.constructor(e, this.props)
    node.parent = this
    node.props = this.props
    return node as typeof this
  }))
  get children() { return this._children.value }

  get data_children(): any[] | undefined {
    const children = this.props.children
    return isString(children) ? get(this.data, children) : children?.(this.data) 
  }

  remove() {
    remove(this.data_children!, this.data)
  }

  insertBefore(node: Node, refer?: Node) {
    node.remove()
    node.parent = wm.get(this.data)
    this.data_children!.splice(refer ? refer.index : this.data_children!.length, 0, node.data)
  }
}
