<template>
  <div :class="['vs-tree vs-ul hfull', selected && 'element-selection']" tabindex="0" @dragstart="onDragstart" @dragover="onDragover" @drop="onDrop" @dragend="onDragend" @click="onClick" @pointerover="onHover" @pointerleave="onHover">
    <div class="drag-guide" :style="dragGuideStyle" />
    
    <template v-for="(node, i) in expandTree" :key="node.id">
      <div
        :class="['vs-li group relative flex aic h22 lh-22', node.selected && 'selected']"
        :style="`padding-left: ${4 + (indent * node.deep)}px`"
        :data-index="i"
        :data-id="node.id"
        draggable="true"
        :aria-expanded="node.dir ? node.expand : void 0"
      >
        <!-- indent guide -->
        <div v-if="node.expand && node.children!.length" :class="['indent-guide', (node.selected || (node.id == selected?.parent.id && !selected.expand)) && 'active']" :style="`left: ${(node.deep + 1) * indent}px; height: ${node.expandCount * 22}px`" />

        <!-- arrow -->
        <i-tdesign:chevron-right v-if="node.dir" :rotate="node.expand ? 90 : 0" class='mr2 w18 h18' />

        <!-- content -->
        <slot v-bind="{ node, data: node.data }">
          <div flex-1 w0 pr4 truncate>{{ node.label }}</div>
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, toRaw, shallowRef, ref } from 'vue'
import { isArray } from '@vue/shared'
import { toReactive } from '@vueuse/core'
import { keyBy, unFn } from '@el-lowcode/utils'
import { Node } from './Node'

type Props = {
  data: any[]
  Node: { new (...args: ConstructorParameters<typeof Node>): Node }
  indent?: number
  showLine?: boolean
  expandKeys?: Record<string, boolean>

  draggable?: boolean | ((node: $_Node) => boolean)
  dropable?: boolean | ((e: DropEvent) => boolean)
}

type DropEvent = { from: $_Node; to: $_Node; node: $_Node; oldIndex: number; newIndex: number }

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  expandKeys: () => reactive({}),
  indent: 12,
  dropable: true
})

const emit = defineEmits(['node-click', 'node-hover'])

class $_Node extends props.Node {
  get dir() { return isArray(this.data_children) }
  get expand() { return props.expandKeys[this.id] }
  get expandCount(): number { return this.expand ? this.children!.reduce((t, e) => t + e.expandCount, this.children!.length) : 0 }
  get selected() { return selected.value?.id == this.id }
  get siblingSelected() { return selected.value?.id == this.parent?.id }
}

const rootNode = computed(() => {
  const root = new $_Node({})
  Object.defineProperty(root, 'data_children', { get() { return props.data } })
  return root
})

const selected = shallowRef()

const dragGuideStyle = reactive({ left: '', top: '', height: '', width: '' })

const expandTree = computed(() => {
  const ret = [...rootNode.value.children!]
  for (let i = 0; i < ret.length; i++) {
    if (ret[i].expand) ret.splice(i + 1, 0, ...ret[i].children!)
  }
  return ret
})

const keyed = toRaw(toReactive(computed(() => keyBy(expandTree.value, 'id'))))

function onClick(e: MouseEvent) {
  const node = getNode(e)
  if (node) {
    if (node.dir) props.expandKeys[node.id] = !node.expand
    selected.value = node
    emit('node-click', node)
  } else {
    selected.value = void 0
    emit('node-click', void 0)
  }
}

function onHover(e: MouseEvent) {
  const node = getNode(e)
  emit('node-hover', node)
}

let dragLi: $_Node | undefined
let dropEl: HTMLElement | undefined
let dropEvent: DropEvent | undefined

function onDragstart(e: DragEvent) {
  const node = getNode(e)
  if (!node) return
  if (!unFn(props.draggable, node)) return e.preventDefault()
  e.stopPropagation()
  dragLi = node
  e.dataTransfer!.setDragImage(new Image(), 0, 0)
}

function onDragover(e: DragEvent) {
  dropEl?.classList.remove('drop-inner')
  if (!dragLi) return
  const drop = getNode(e)
  if (!drop) return
  if (dragLi != drop && dragLi.contains(drop)) return
  dropEl = e.composedPath().find(e => e.getAttribute?.('data-id')) as HTMLElement
  const dropRect = dropEl.getBoundingClientRect()

  let type: 'inner' | 'prev' | 'next'
  let dropBool = false
  dropEvent = { from: dragLi.parent!, to: drop.parent!, node: dragLi, oldIndex: dragLi.index, newIndex: 0 }

  const lte = (r: number) => e.y <= dropRect.y + (dropRect.height * r)

  if (lte(.25)) {
    type = 'prev'
    dropEvent.to = drop.parent!
    dropEvent.newIndex = drop.index
    dropBool = unFn(props.dropable, dropEvent)
  }
  else if (lte(.75)) {
    if (dragLi != drop) {
      type = 'inner'
      dropEvent.to = drop
      dropEvent.newIndex = drop.children?.length ?? 0
      dropBool = unFn(props.dropable, dropEvent)
    }
    if (!dropBool) {
      type = lte(.5) ? 'prev' : 'next'
      dropEvent.to = drop.parent!
      dropEvent.newIndex = drop.index + (lte(.5) ? 0 : 1)
      dropBool = unFn(props.dropable, dropEvent)
    }
  }
  else {
    type = 'next'
    dropEvent.to = drop.parent!
    dropEvent.newIndex = drop.index + 1
    dropBool = unFn(props.dropable, dropEvent)
  }
  
  if (!dropBool) {
    for (const k in dragGuideStyle) dragGuideStyle[k] = ''
    dropEvent = void 0
    return
  } else {
    if (type == 'prev') {
      Object.assign(dragGuideStyle, { left: `${dropRect.left + parseInt(dropEl.style.paddingLeft)}px`, top: `${dropRect.top}px`, width: `${dropRect.width - parseInt(dropEl.style.paddingLeft)}px`, height: `2px` })
    }
    else if (type == 'next') {
      Object.assign(dragGuideStyle, { left: `${dropRect.left + parseInt(dropEl.style.paddingLeft)}px`, top: `${dropRect.bottom - 2}px`, width: `${dropRect.width - parseInt(dropEl.style.paddingLeft)}px`, height: `2px` })
    }
    else if (type == 'inner') {
      for (const k in dragGuideStyle) dragGuideStyle[k] = ''
      dropEl.classList.add(`drop-inner`)
    }
  }

  e.preventDefault()
  e.stopPropagation()
}

function onDrop(e: DragEvent) {
  if (dropEvent) {
    dropEvent.to.insertBefore(dropEvent.node, dropEvent.to.children![dropEvent.newIndex])
  }
  onDragend()
}

function onDragend() {
  dragLi = void 0
  dropEl?.classList.remove('drop-inner')
  dropEl = void 0
  dropEvent = void 0
  for (const k in dragGuideStyle) dragGuideStyle[k] = ''
}

function getNode(e: Event) {
  const id = e.composedPath().find(e => e.getAttribute?.('data-id'))?.getAttribute?.('data-id')
  return keyed[id]
}
</script>

<style lang="scss">
.vs-tree:hover .indent-guide {
  opacity: .4;
}

.vs-tree .indent-guide {
  position: absolute;
  top: 22px;
  border-left: 1px solid var(--vs-tree-indentGuidesStroke);
  opacity: 0;
  z-index: 1;
  transition: .1s opacity;
  pointer-events: none;

  &.active {
    opacity: 100% !important;
  }
}

.vs-tree {
  > .drag-guide {
    position: fixed;
    background: var(--vs-focus-b-c);
    z-index: 1;
  }
  > .drop-inner {
    background: var(--vs-li-inactiveSelectionBg) !important;
  }
}
</style>