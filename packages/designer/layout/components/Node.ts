import { computed, Ref, shallowRef } from 'vue'
import { remove } from '@vue/shared'
import { treeUtils } from '@el-lowcode/utils'

export abstract class Node<T = any> {
  #data: Ref<T>
  get data() { return this.#data.value }
  set data(v) { this.#data.value = v }

  abstract get id(): string
  abstract get label(): string
  abstract get data_children(): any[] | undefined

  get root() { let node = this; while(node.parent) node = node.parent; return node }
  get isRoot() { return !this.parent }

  #parent = shallowRef<typeof this>()
  get parent() { return this.#parent.value }
  set parent(v) { this.#parent.value = v }

  #parents = computed(() => { let arr = [] as typeof this[], node = this; while (node = node.parent!) arr.push(node); return arr })
  get parents() { return this.#parents.value }

  get path() { return [this, ...this.parents].reverse() }

  constructor(data) {
    this.#data = shallowRef(data)
  }

  #deep = computed(() => (this.parent?.deep ?? -1) + 1)
  get deep(): number { return this.#deep.value }

  #index = computed(() => this.parent!.children?.indexOf(this) ?? 0)
  get index(): number { return this.#index.value }

  #wm: WeakMap<any, typeof this> | undefined
  
  // #children = computed(() => {
  //   // const wm = this.root.#wm
  //   return this.data_children?.map(e => {
  //     // @ts-ignore
  //     // const node = wm.get(e) ?? wm.set(e, new this.constructor(e)).get(e)!
  //     const node = new this.constructor(e)
  //     node.parent = this
  //     return node
  //   })
  // })
  // get children() { return this.#children.value }
  get children() {
    const wm = this.root.#wm ??= new WeakMap
    return this.data_children?.map(e => {
      // @ts-ignore
      const node = wm.get(e) ?? wm.set(e, new this.constructor(e)).get(e)!
      node.parent = this
      return node
    })
  }

  get previousSibling(): typeof this | undefined { return this.parent?.children![this.index - 1] }
  get nextSibling(): typeof this | undefined { return this.parent?.children![this.index + 1] }
  get siblings(): typeof this[] { return this.parent?.children?.filter(e => this != e) || [] }

  get descendants() {
    return treeUtils.flat(this.children || [])
  }

  remove() {
    const wm = this.root.#wm!
    this.descendants.forEach(e => wm.delete(e.data))
    wm.delete(this.data)
    this.doRemove()
    this.parent = void 0
  }

  doRemove() {
    this.parent && remove(this.parent.data_children!, this.data)
  }

  empty() {
    this.children?.forEach(e => e.remove())
  }

  insertBefore(node: Node, refer?: Node) {
    if (node == refer) return
    if (!this.insertable(node)) throw ''
    node.doRemove()
    node.parent = this
    this.data_children!.splice(refer ? refer.index : this.data_children!.length, 0, node.data)
  }

  before(node: Node) {
    this.parent!.insertBefore(node, this)
  }

  after(node: Node) {
    this.parent!.insertBefore(node, this.nextSibling)
  }

  contains(node: Node) {
    do { if (node == this) return true } while(node = node.parent!)
    return false
  }

  insertable(node: Node) {
    return !node.contains(this)
  }
}