<template>
  <OL :items="items" @contextmenu.prevent />
</template>

<script lang="tsx">
const ROOT = Symbol() as InjectionKey<MenuNode>

const useRoot = () => inject(ROOT)

interface State {
  tippy?: object
  hover?: MenuNode
}

abstract class MenuNode extends Node {
  get id() { return this.data.value }
  get label() { return this.data.label }
  get data_children() { return this.data.children }

  abstract state: State
  ref = ref<HTMLElement>()
  get el() { return unrefElement(this.ref) }

  #hovered = computed(() => this.state.hover?.path.includes(this))
  get hovered() { return this.#hovered.value }

  get checked() { return unFn(this.data.checked) }
  get disabled() { return unFn(this.data.disabled) }

  #loading = ref(false)
  get loading() { return  this.#loading.value }

  onHover(e: MouseEvent) {
    this.state.hover = markRaw(this)
  }

  click() {
    const ret = this.data.click?.()
    if (isPromise(ret)) {
      this.#loading.value = true
      ret.finally(() => this.#loading.value = false)
    }
  }
}

const OL = defineComponent({
  props: ['items'],
  setup(props) {
    return () => <UL node={useRoot()}>{ useRoot()!.children?.map(e => Render(e)) }</UL>
  }
})

const UL = defineComponent({
  props: ['node'],
  setup(props, { slots }) {
    const root = useRoot()!
    const node = unref$(() => props.node as MenuNode)
    const el = useCurrentElement()
    const subItem = unref$(debouncedRef(computed(() => root.state.hover?.path.find(e => node.children?.includes(e))), 200))
    const vis = ref(false), subMenuRef = ref()

    let ins
    watchEffect(async (cb) => {
      if (!subItem?.children) {
        return
      }
      vis.value = true
      await nextTick()
      ins = tippy(document.body, { interactive: true, content: unrefElement(subMenuRef.value), offset: [-6, 5], delay: [100, 300], duration: 0, placement: 'right-start', trigger: 'mouseenter click', ...node.state.tippy, appendTo: unrefElement(el)! })
      ins.setProps({ getReferenceClientRect: () => subItem!.el!.getBoundingClientRect() })
      ins.show()
      cb(() => {
        ins.destroy()
        vis.value = false
      })
    })

    return () => (
      <div>
        <div class='vs-menu max-h-60vh overflow-auto' tabindex={0}>
          { renderSlot(slots, 'default', void 0, () => [<div class='px12 op20'>Empty</div>]) }
        </div>
        { vis.value && <UL ref={subMenuRef} key={subItem!.id} node={subItem}>{ subItem!.children!.map(e => Render(e)) }</UL> }
      </div>
    )
  }
})

const LI = defineComponent({
  props: ['node', 'label', 'icon', 'checked', 'disabled', 'click'],
  setup(props, { slots }) {
    const node = unref$(() => props.node as MenuNode)
    
    return () => (
      <div class={['vs-menu-li', node.hovered && 'hover']} ref={node.ref} disabled={node.disabled} onMouseenter={e => node.onHover(e)} onClick={node.click}>
        { 
          node.loading ? <i-svg-spinners-bars-rotate-fade class='absolute left-0 ml4 w18 h18' /> :
          node.checked ? <i-mdi-check class='absolute left-0 ml4 w18 h18' /> :
          <Icon class='absolute left-0 ml4 w17 h17' src={props.icon} />
        }
        { props.label }
        { slots.default && <i-mdi-chevron-right class='absolute right-0 mr6' /> }
      </div>
    )
  }
})

const Render = createRender({
  defaultIs: LI,
  processProps(node) {
    const { data } = node
    return data.is ? data : { ...data, node }
  },
})
</script>

<script setup lang="tsx">
import { computed, defineComponent, inject, InjectionKey, markRaw, nextTick, provide, reactive, ref, renderSlot, shallowRef, toRef, ToRefs, watchEffect } from 'vue'
import { unrefElement, debouncedRef, useCurrentElement } from '@vueuse/core'
import { createRender } from '@el-lowcode/render'
import { unFn } from '@el-lowcode/utils'
import tippy from 'tippy.js'
import { Node } from '../layout/components/Node'
import Icon from './Icon.vue'
import { unref$ } from './hooks'
import { isPromise } from '@vue/shared'

const props = defineProps({
  items: Array,
  tippy: Object,
})

const state = reactive<ToRefs<State>>({
  hover: void 0,
  tippy: toRef(() => props.tippy),
}) as State

defineExpose(state)

class MN extends MenuNode {
  // state = state
  get state() { return state }
  get root() { return root as this }
  get isRoot() { return root == this }
}

const root = new MN({ get children() { return props.items } })

provide(ROOT, root)
</script>