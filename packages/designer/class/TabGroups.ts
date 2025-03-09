import { uid } from '@el-lowcode/utils'
import { Node } from './Node'

export class TabGroups extends Node<any, TabGroup> {
  constructor(data) {
    data.id ??= uid()
    super(data)
  }
  get id(): string { return this.data.id }
  get label(): string { return '' }
  get data_children() { return this.data.all || [] }

  override getItem(e: any) {
    return new TabGroup(e)
  }

  get all() { return this.children }
  get activeTabGroup() { return this.all?.find(e => e.id == this.data.activeTabGroupId) }
  set activeTabGroup(v) { this.data.activeTabGroupId = v?.id }
}

export class TabGroup extends Node<any, Tab, TabGroups> {
  constructor(data) {
    data.id ??= uid()
    super(data)
  }
  get id(): string { return this.data.id }
  get label(): string { return '' }
  get data_children() { return this.data.tabs || [] }

  override getItem(e: any) {
    return new Tab(e)
  }

  get isActive() { return this.parent?.activeTabGroup == this }
  set isActive(v) { v && (this.parent!.activeTabGroup = this) }
  get tabs() { return this.children }
  get activeTab() { return this.tabs?.find(e => e.id == this.data.activeTabId) }
  set activeTab(v) { this.data.activeTabId = v?.id }
  // viewColumn: number
}

export class Tab extends Node<any, Node, TabGroup> {
  constructor(data) {
    data.id ??= uid()
    super(data)
  }
  get id(): string { return this.data.id }
  get label(): string { return this.data.label }
  get data_children() { return void 0 }
  
  get isActive() { return this.parent?.activeTab == this }
  set isActive(v) { v && (this.parent!.activeTab = this) }
  // isDirty = false
  // input: any
  get group() { return this.parent }
}
