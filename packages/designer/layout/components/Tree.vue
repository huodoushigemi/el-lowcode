<template>
  <div ref="elRef" :class="['vs-tree vs-ul hfull', selected && 'element-selection']" :data-id="rootNode.id" tabindex="0" @click="onClick" @pointerdown="onPointerdown" @pointerover="onHover" @pointerleave="onHover" v-list-focus>
    <template v-for="(node, i) in expandTree" :key="node.id">
      <div
        :ref="v => node.ref.value = v"
        :class="['vs-li group relative flex aic h22 lh-22', node.selected && 'selected', node.inDrop && 'drop-target']"
        :style="`padding-left: ${4 + (indent * node.deep)}px`"
        :data-index="i"
        :data-id="node.id"
        draggable="true"
        :aria-expanded="node.dir ? node.expand : void 0"
      >
        <!-- indent guide -->
        <div v-if="node.expand && node.children!.length" :class="['indent-guide', (node.selected || selected.some(e => e.parent?.id == node.id && !e.expand)) && 'active']" :style="`left: ${(node.deep + 1) * indent}px; height: ${node.expandCount * 22}px`" />

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
import { computed, reactive, ref, toRaw, watch, watchEffect, watchPostEffect } from 'vue'
import { isArray } from '@vue/shared'
import { useVModel } from '@vueuse/core'
import { findret, unFn, useDraggable, vListFocus } from '@el-lowcode/utils'
import { Node } from './Node'

type Props = {
  data: any[]
  Node: { new (...args: ConstructorParameters<typeof Node>): Node }
  indent?: number
  showLine?: boolean
  expandKeys?: Record<string, boolean>
  selectedKeys?: Array<string>

  draggable?: boolean | ((node: $_Node) => boolean)
  dropable?: boolean | ((e: DropEvent) => boolean)
  dragstate?: Dragstate
}

type Dragstate = {
  drag?: string
  dragover?: string
  rel?: string
  direction?: 'T' | 'B' | 'L' | 'R'
}

type DropEvent = { from: $_Node; to: $_Node; node: $_Node; oldIndex: number; newIndex: number }

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  expandKeys: () => reactive({}),
  indent: 12,
  dropable: true,
  dragstate: () => ({})
})

const emit = defineEmits(['node-click', 'node-down', 'node-hover', 'update:selectedKeys'])

class $_Node extends props.Node {
  ref = ref<HTMLElement>()
  get root() { return rootNode as typeof this }
  get isRoot() { return this.root == this }
  get dir() { return isArray(this.data_children) }
  get expand() { return props.expandKeys[this.id] }
  get expandCount(): number { return this.expand ? this.children!.reduce((t, e) => t + e.expandCount, this.children!.length) : 0 }
  get selected() { return selectedKeys.value?.includes(this.id) }

  #dropTarget = ref(false)
  get dropTarget() { return this.#dropTarget.value }
  set dropTarget(v) { this.#dropTarget.value = v }

  #inDrop = computed(() => this.dropTarget || this.parent?.inDrop)
  get inDrop() { return this.#inDrop.value }
}

const elRef = ref()
const rootNode = new $_Node({ get children() { return props.data } })
rootNode.ref = elRef

// todo: bug
// const xxx = useCurrentElement()
// watchEffect(() => {
//   console.log(xxx.value);
// })

const selectedKeys = useVModel(props, 'selectedKeys', void 0, { passive: true, defaultValue: [] })
const selected = computed(() => selectedKeys.value!.map(e => rootNode.keyed[e]).filter(e => e))

const expandTree = computed(() => {
  const ret = [...rootNode.children!]
  for (let i = 0; i < ret.length; i++) {
    if (ret[i].expand) ret.splice(i + 1, 0, ...ret[i].children!)
  }
  return ret
})

function onClick(e: MouseEvent) {
  const node = getNode(e)
  if (node) {
    if (node.dir) props.expandKeys[node.id] = !node.expand
    emit('node-click', node)
  } else {
    selectedKeys.value = []
    emit('node-click', void 0)
  }
}

function onPointerdown(e: PointerEvent) {
  const node = getNode(e)
  if (node) {
    selectedKeys.value = [node.id]
    emit('node-down', node)
  } else {
    selectedKeys.value = []
    emit('node-down', void 0)
  }
}

function onHover(e: MouseEvent) {
  const node = getNode(e)
  emit('node-hover', node)
}

const dragjs = useDraggable(rootNode.ref, {
  dragstart(e) {
    e.dataTransfer!.setDragImage(new Image(), 0, 0)
  },
  dragover(el, drag, { path }) {
    const id = findret(path, e => e.nodeType == 1 ? e.getAttribute('data-id') : void 0)
    const node = [rootNode.keyed[id], ...rootNode.keyed[id].parents].find(e => props.dropable?.({
      to: e,
      node: rootNode.keyed[drag!.getAttribute('data-id')!]
    }))
    return node?.ref.value
  },
  children(el) {
    return rootNode.keyed[el.getAttribute('data-id')!].children!.flatMap(e => e.ref.value ?? [])
  },
  getRect(el) {
    const rect = el.getBoundingClientRect()
    // const h = rect.height * (rootNode.keyed[el.getAttribute('data-id')!].expandCount + 1)
    // return DOMRect.fromRect({ x: rect.x, y: rect.y, width: rect.width, height: h })
    // getNode(el)
    const node = rootNode.keyed[el.getAttribute('data-id')!]
    const x = (node.deep - 1) * props.indent
    return DOMRect.fromRect({ x: rect.x + x, y: rect.y, width: rect.width - x, height: rect.height })
  },
  drop(el, drag, type, e) {
    const node = rootNode.keyed[el.getAttribute('data-id')!]
    const dragNode = rootNode.keyed[drag!.getAttribute('data-id')!]
    type == 'prev' ? node.before(dragNode) :
    type == 'next' ? node.after(dragNode) :
    type == 'inner' ? node.insertBefore(dragNode) : void 0
  },
  curosr: {
    size: 2
  }
})

watchEffect(cb => {
  const { rel, type } = dragjs.state
  if (rel) {
    // console.log({...dragjs.state});
    const id = rel.getAttribute('data-id')!
    if (type == 'inner') {
      // rel.style.background = `var(--vs-li-inactiveSelectionBg)`
      rootNode.keyed[id].dropTarget = true
      dragjs.cursor.style.background = ''
    } else {
      // rel.style.background = ''
      dragjs.cursor.style.background = `var(--vs-focus-b-c)`
    }
    cb(() => {
      rootNode.keyed[id].dropTarget = false
      // rel.style.background = ``
      dragjs.cursor.style.background = ``
    })
  }
})


watchPostEffect(() => {
  dragjs.state = {
    ...props.dragstate,
    drag: rootNode.ref.value?.querySelector(`& > [data-id="${props.dragstate.drag}"]`) as HTMLElement,
    rel: rootNode.ref.value?.querySelector(`& > [data-id="${props.dragstate.rel}"]`) as HTMLElement,
  }
})

function getNode(e: Event) {
  const id = e.composedPath().find(e => e.getAttribute?.('data-id'))?.getAttribute?.('data-id')
  return rootNode.keyed[id]
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
  & > .drop-target {
    background: var(--vs-li-inactiveSelectionBg)
  }
}
</style>