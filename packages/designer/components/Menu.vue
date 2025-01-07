<template>
  <OL :items="items" />
</template>

<script lang="tsx">
const ROOT = Symbol() as InjectionKey<MenuNode>

const useRoot = () => inject(ROOT)

interface State {
  hover?: MenuNode,
  tippy?: object
}

abstract class MenuNode extends Node {
  get id() { return this.data.value }
  get label() { return this.data.label }
  get data_children() { return this.data.children }

  abstract state: State

  #hovered = computed(() => this.state.hover?.path.includes(this))
  get hovered() { return this.#hovered.value }

  onHover(e: MouseEvent) {
    e.stopPropagation()
    this.state.hover = this
  }
}

const OL = defineComponent({
  props: ['items'],
  setup(props) {
    return () => (
      <div class='vs-menu'>
        { props.items?.map(e => Render(e)) }
      </div>
    )
  }
})

const LI = defineComponent({
  props: ['label', 'value'],
  setup(props, { slots }) {
    const root = useRoot()!
    const node = root.keyed[props.value]
    
    return () => (
      <div class={['vs-menu-li', node.hovered && 'focused']} onMouseenter={e => node.onHover(e)}>
        { node.label }
        { slots.default && <div class='flex aic mla'><i-mdi-chevron-right class='ml20' /></div> }
        { slots.default && (
          <Tippy class='vs-menu' extra={{ interactive: true, offset: [-6, 5], delay: [100, 300], duration: 0, placement: 'right-start', ...node.state.tippy }}>
            { renderSlot(slots, 'default', void 0, () => [<div class='px12 op20'>Empty</div>]) }
          </Tippy>
        ) }
      </div>
    )
  }
})

const Render = createRender({ defaultIs: LI })
</script>

<script setup lang="tsx">
import { computed, defineComponent, inject, InjectionKey, provide, reactive, renderSlot, shallowReactive, shallowRef, toRef, ToRefs } from 'vue'
import { createRender } from '@el-lowcode/render'
import { Node } from '../layout/components/Node'
import Tippy from '../layout/components/tippy.vue'

const props = defineProps({
  items: Array,
  tippy: Object,
})

const state = reactive<ToRefs<State>>({
  hover: shallowRef(),
  tippy: toRef(() => props.tippy)
}) as State

class MN extends MenuNode {
  // state = state
  get state() { return state }
  get root() { return root as this }
  get isRoot() { return root == this }
}

const root = new MN({ get children() { return props.items } })

provide(ROOT, root)
</script>