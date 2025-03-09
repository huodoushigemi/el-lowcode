import { computed, ComputedRef, ref } from 'vue'
import { remove } from '@vue/shared'
import { keyBy, treeUtils } from '@el-lowcode/utils'

function _ref<T>(): T | undefined
function _ref<T>(v: T): T
function _ref(v?) { return ref(v) }

function _calc<T extends () => any>(v: T) { return computed(v) as ReturnType<T> }

export abstract class Node<T = any, Child extends Node = Node<any, any, any>, Parent extends Node = Node<any, any, any>> {
  data = _ref<T>()

  abstract get id(): string
  abstract get label(): string
  abstract get data_children(): any[] | undefined
  get icon(): any { return void 0 }

  get root() { let node: Node = this; while (node.parent) node = node.parent; return node }
  get isRoot() { return !this.parent }

  parent = _ref<Parent>()

  parents = _calc(() => { let arr = [] as Node[], node: Node = this; while (node = node.parent!) arr.push(node); return arr })

  get path() { return [this, ...this.parents].reverse() }

  get disabled() { return false }

  get detached() { return this.isRoot ? false : this.parent ? this.parent.detached : true }

  constructor(data) {
    this.data = data
  }

  deep: number = _calc(() => (this.parent?.deep ?? -1) + 1)

  index = _calc(() => this.parent?.children?.indexOf(this) ?? 0)

  private $wm: WeakMap<any, Child> | undefined

  getItem(e: T): Child {
    // @ts-ignore
    return new this.constructor(e)
  }
  
  get children(): Child[] | undefined {
    const wm = this.root.$wm ??= new WeakMap
    // @ts-ignore
    return this.data_children?.map(e => {
      // @ts-ignore
      const node = wm.get(e) ?? wm.set(e, this.getItem(e)).get(e)!
      node.parent = this
      return node
    })
  }

  get prev(): typeof this | undefined { return this.parent?.children![this.index - 1] }
  get next(): typeof this | undefined { return this.parent?.children![this.index + 1] }
  get siblings(): typeof this[] { return this.parent?.children?.filter(e => this != e) || [] }

  get descendants() {
    return treeUtils.flat(this.children || [])
  }

  private $keyed?: ComputedRef<Record<string, this>>
  get keyed() {
    return (this.root.$keyed ??= computed(() => keyBy(treeUtils.flat([this.root]), 'id'))).value
  }

  find(data: T) {
    return this.root.$wm!.get(data)
  }

  remove() {
    const wm = this.root.$wm!
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
    this.parent!.insertBefore(node, this.next)
  }

  contains(node: Node) {
    do { if (node == this) return true } while(node = node.parent!)
    return false
  }

  insertable(node: Node) {
    return !node.contains(this)
  }

  click() {
    
  }

  hover() {
    
  }
}