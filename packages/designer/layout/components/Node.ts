import { computed, Ref, shallowRef } from 'vue'
import { get } from '@el-lowcode/utils'
import { isString, remove } from '@vue/shared'

const wm = new WeakMap<any, Node>()

export abstract class Node {
  _data: Ref<any>
  get data() { return this._data.value }
  set data(v) { this._data.value = v }

  abstract get data_children(): any[] | undefined

  _parent = shallowRef<typeof this>()
  get parent() { return this._parent.value }
  set parent(v) { this._parent.value = v }

  constructor(data) {
    this._data = shallowRef(data)
    wm.set(data, this)
  }

  _deep = computed(() => (this.parent?.deep ?? -1) + 1)
  get deep(): number { return this._deep.value }

  _index = computed(() => this.parent!.children?.indexOf(this) ?? 0)
  get index(): number { return this._index.value }

  _children = computed(() => this.data_children?.map(e => {
    // @ts-ignore
    const node = wm.get(e) ?? new this.constructor(e)
    node.parent = wm.get(this.data)

    return node as typeof this
  }))
  get children() { return this._children.value }

  remove() {
    remove(this.parent!.data_children!, this.data)
  }

  insertBefore(node: Node, refer?: Node) {
    node.remove()
    node.parent = this
    this.data_children!.splice(refer ? refer.index : this.data_children!.length, 0, node.data)
  }

  contains(node: Node) {
    do { if (node == this) return true } while(node = node.parent!)
    return false
  }
}
