<template>
  <OL :items="items" @contextmenu.prevent />
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
  ref = ref<HTMLElement>()

  #hovered = computed(() => this.state.hover?.path.includes(this))
  get hovered() { return this.#hovered.value }

  onHover(e: MouseEvent) {
    e.stopPropagation()
    this.state.hover = markRaw(this)
  }
}

const OL = defineComponent({
  props: ['items'],
  setup(props) {
    return () => <UL>{ props.items?.map(e => Render(e)) }</UL>
  }
})

const UL = defineComponent({
  props: ['label', 'value'],
  setup(props, { slots }) {
    const root = useRoot()!
    const node = root.keyed[props.value]
    const subItem = debouncedRef(computedEager(() => root.state.hover?.path.find(e => node.children?.includes(e))), 200)
    const vis = ref(false), subMenuRef = ref()

    watchEffect(async (cb) => {
      const el = unrefElement(subItem.value?.ref)
      if (!el) return
      if (!subItem.value?.data_children) return
      vis.value = true
      await nextTick()
      const ins = tippy(document.body, { interactive: true, content: unrefElement(subMenuRef.value), offset: [-6, 5], delay: [100, 300], duration: 0, placement: 'right-start', trigger: 'manual',  appendTo: document.body, ...node.state.tippy })
      ins.setProps({ getReferenceClientRect: () => el.getBoundingClientRect() })
      ins.show()
      cb(() => {
        ins.destroy()
        vis.value = false
      })
    })

    return () => (
      <div class='vs-menu'>
        { renderSlot(slots, 'default', void 0, () => [<div class='px12 op20'>Empty</div>]) }
        { vis.value && <UL ref={subMenuRef} key={subItem.value!.id} value={subItem.value!.id}>{ subItem.value?.data_children?.map(e => Render(e)) }</UL> }
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
      <div class={['vs-menu-li', node.hovered && 'hover']} ref={node.ref} onMouseenter={e => node.onHover(e)}>
        { node.label }
        { slots.default && <div class='flex aic mla'><i-mdi-chevron-right class='ml20' /></div> }
      </div>
    )
  }
})

const Render = createRender({ defaultIs: LI })
</script>

<script setup lang="tsx">
import { computed, defineComponent, inject, InjectionKey, markRaw, nextTick, provide, reactive, ref, renderSlot, shallowReactive, shallowRef, toRef, ToRefs, watchEffect, watchPostEffect } from 'vue'
import { computedEager, unrefElement, debouncedRef } from '@vueuse/core'
import { createRender } from '@el-lowcode/render'
import tippy from 'tippy.js'
import { Node } from '../layout/components/Node'

const props = defineProps({
  items: Array,
  tippy: Object,
})

const state = reactive<ToRefs<State>>({
  hover: void 0,
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