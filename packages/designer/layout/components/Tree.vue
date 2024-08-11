<template>
  <div class='vs-tree' @dragstart="onDragstart" @dragover="onDragover" @drop="onDrop" @dragend="onDragend" @click="onClick">
    <div class="drag-guide" />
    
    <template v-for="(node, i) in expandTree" :key="node.id">
      <div :class="['vs-li relative flex aic lh-22', node.selected && 'selected']" :style="`padding-left: ${4 + (indent * node.deep)}px`" :tabindex="node.selected ? 0 : -1" :data-index="i" :data-id="node.id" draggable="true">
        <!-- indent guide -->
        <div v-if="node.expand && node.children!.length" :class="['indent-guide', (node.selected || (node.id == selected?.parent.id && !selected.expand)) && 'active']" :style="`left: ${(node.deep + 1) * indent}px; height: ${node.expandCount * 22}px`" />

        <!-- arrow -->
        <i-tdesign:chevron-right v-if="node.dir" :rotate="node.expand ? 90 : 0" class='mr2 w18 h18' />

        <!-- content -->
        <slot v-bind="{ node, data: node.data }">
          {{ node.label }}
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, h, reactive, ref, proxyRefs, toRaw, } from 'vue'
import { isArray, isString, remove } from '@vue/shared'
import { toReactive, extendRef } from '@vueuse/core'
import { get, keyBy, unFn } from '@el-lowcode/utils'
import { Node } from './TreeCtx'

type Props = {
  data: any[]
  props: {
    id: string | ((item) => any)
    label: string | ((item) => string)
    icon?: string | ((item) => string)
    children: string | ((item) => any[] | undefined)
  }
  indent?: number
  showLine?: boolean
  expandKeys?: Record<string, boolean>

  draggable?: boolean | ((node: DisplayNode) => boolean)
  // dropable?: boolean | ((dragNode, dropNode, type: 'prev' | 'inner' | 'next') => boolean)
  dropable?: boolean | ((e: { from: DisplayNode; to: DisplayNode; node: DisplayNode; oldIndex: number; newIndex: number }) => boolean)
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  expandKeys: () => reactive({}),
  indent: 12,
  dropable: true
})

class DisplayNode extends Node {
  // @ts-ignore
  Type = DisplayNode
  // @ts-ignore
  parent?: DisplayNode
  // @ts-ignore
  // children?: DisplayNode[]

  get id () { return isString(props.props.id) ? get(this.data, props.props.id) : props.props.id?.(this.data) }
  get label () { return isString(props.props.label) ? get(this.data, props.props.label) : props.props.label?.(this.data) }
  get dir() { console.log(this, this.props); return isArray(this.data_children) }
  get expand() { return props.expandKeys[this.id] }
  get expandCount(): number { return this.expand ? this.children!.reduce((t, e) => t + e.expandCount, this.children!.length) : 0 }
  get selected() { return selected.value?.id == this.id }
  get siblingSelected() { return selected.value?.id == this.parent?.id }
}

const selected = ref()

const rootCtx = computed(() => new DisplayNode({ children: props.data }, props.props))

console.log(rootCtx.value)

const expandTree = computed(() => {
  const ret = [...rootCtx.value.children!]
  for (let i = 0; i < ret.length; i++) {
    if (ret[i].expand) ret.splice(i + 1, 0, ...ret[i].children!)
  }
  return ret
})

// const keyed = toRaw(toReactive(computed(() => keyBy(expandTree.value, 'id'))))
// const _keyed = computed(() => keyBy(expandTree.value, 'id'))
const keyed = computed(() => keyBy(expandTree.value, 'id'))
// const keyed = new Proxy({}, { get(_, p, receiver) { return Reflect.get(_keyed.value, p, receiver) } })

// console.log(keyed[expandTree.value[0].id]);


function onClick(e: MouseEvent) {
  const node = getNode(e)
  if (!node) return
  if (node.dir) props.expandKeys[node.id] = !node.expand
  selected.value = node
}

let dragLi
let dropEvent, dropBool = false

function onDragstart(e: DragEvent) {
  const node = getNode(e)
  if (!node) return
  if (!unFn(props.draggable, node)) return e.preventDefault()
  e.stopPropagation()
  dragLi = node
  e.dataTransfer!.setDragImage(new Image(), 0, 0)
}

function onDragover(e: DragEvent) {
  if (!dragLi) return
  const drop = getNode(e)
  if (!drop) return
  const dropEl = e.composedPath().find(e => e.getAttribute?.('data-id')) as HTMLElement
  const dropRect = dropEl.getBoundingClientRect()
  const type = 
    e.x < dropRect.y + (dropRect.height * .33) ? 'prev' :
    e.x < dropRect.y + (dropRect.height * .66) ? 'inner' : 'next'
  const to = type == 'inner' ? drop.parent : drop
  const newIndex = { inner: drop.children?.length || 0, prev: drop.index, next: drop.index + 1 }[type]
  dropEvent = { from: dragLi.parent, to, node: dragLi, oldIndex: dragLi.index, newIndex }
  console.log(dropEvent);
  if (!(dropBool = unFn(props.dropable, dropEvent))) return
  e.preventDefault()
  e.stopPropagation()
}

function onDrop(e: DragEvent) {
  if (!dropBool) return
  dropEvent.to.insertBefore(dropEvent.node, dropEvent.to.children[dropEvent.newIndex])
}

function onDragend(e: DragEvent) {
  dragLi = void 0
  dropEvent = void 0
}

function getNode(e: Event) {
  const id = e.composedPath().find(e => e.getAttribute?.('data-id'))?.getAttribute?.('data-id')
  return keyed.value[id]
}
</script>

<style lang="scss">
.vs-tree:hover .indent-guide {
  opacity: .4;
}

.vs-tree {
  > .drag-guide {
    position: absolute;
    left: 0;
    height: 3px;
    background: var(--vs-focus-b-c);
  }
}

.indent-guide {
  position: absolute;
  top: 22px;
  border-left: 1px solid var(--vs-tree-indentGuidesStroke);
  opacity: 0;
  z-index: 1;
  transition: .1s opacity;

  &.active {
    opacity: 100% !important;
  }
}
</style>