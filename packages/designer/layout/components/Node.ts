import { computed, Ref, shallowRef } from 'vue'
import { isString, remove } from '@vue/shared'

export const createNode = <T>() => {
  const wm = new WeakMap<any, Node>()

  abstract class Node {
    #data: Ref<T>
    get data() { return this.#data.value }
    set data(v) { this.#data.value = v }
  
    abstract get data_children(): any[] | undefined
  
    #parent = shallowRef<typeof this>()
    get parent() { return this.#parent.value }
    set parent(v) { this.#parent.value = v }

    #parents = computed(() => { let arr = [] as typeof this[], node = this; while (node = node.parent!) arr.push(node); return arr })
    get parents() { return this.#parents.value }

    get path() { return [this, ...this.parents].reverse() }
  
    constructor(data) {
      this.#data = shallowRef(data)
      wm.set(data, this)
    }
  
    #deep = computed(() => (this.parent?.deep ?? -1) + 1)
    get deep(): number { return this.#deep.value }
  
    #index = computed(() => this.parent!.children?.indexOf(this) ?? 0)
    get index(): number { return this.#index.value }
  
    _children = computed(() => this.data_children?.map(e => {
      // @ts-ignore
      const node = wm.get(e) ?? new this.constructor(e)
      node.parent = wm.get(this.data)
  
      return node as typeof this
    }))
    get children() { return this._children.value }

    get previousSibling() { return this.parent?.children![this.index - 1] }
    get nextSibling() { return this.parent?.children![this.index + 1] }
  
    remove() {
      return this.parent ? (remove(this.parent.data_children!, this.data), this.parent = void 0, this) : this
    }
  
    insertBefore(node: Node, refer?: Node) {
      node.remove()
      node.parent = this
      this.data_children!.splice(refer ? refer.index : this.data_children!.length, 0, node.data)
    }

    before(node: Node) {
      if (node.contains(this)) throw ''
      this.parent!.insertBefore(node, this)
    }

    after(node: Node) {
      if (node.contains(this)) throw ''
      this.parent!.insertBefore(node, this.nextSibling)
    }
  
    contains(node: Node) {
      do { if (node == this) return true } while(node = node.parent!)
      return false
    }
  }

  return Node
}

export const Node = createNode()