import { computed, defineComponent, inject, InjectionKey, markRaw, nextTick, provide, reactive, ref, renderSlot, shallowRef, toRef, ToRefs, watchEffect } from 'vue'
import { isPromise } from '@vue/shared'
import { unrefElement, debouncedRef, useCurrentElement } from '@vueuse/core'
import { createRender } from '@el-lowcode/render'
import { unFn } from '@el-lowcode/utils'
import tippy from 'tippy.js'
import { Node } from '../layout/components/Node'
import Icon from './Icon.vue'
import { unref$ } from './hooks'

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

const UL = defineComponent({
  props: ['node'],
  setup(props, { slots }) {
    const root = useRoot()!
    const node = unref$(() => props.node as MenuNode)
    const el = useCurrentElement()
    const subItem = unref$(debouncedRef(computed(() => root.state.hover?.path.find(e => node.children?.includes(e))), 200))
    const vis = ref(false), subMenuRef = ref()

    watchEffect(async (cb) => {
      if (!subItem?.children) return
      vis.value = true
      await nextTick()
      const ins = tippy(document.body, { interactive: true, content: unrefElement(subMenuRef.value), offset: [-6, 5], delay: [100, 300], duration: 0, placement: 'right-start', trigger: 'mouseenter click', ...node.state.tippy, appendTo: unrefElement(el)! })
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
        { vis.value && Render({ is: UL, ref: subMenuRef, key: subItem!.id, node: subItem, children: subItem!.children }) }
      </div>
    )
  }
})

const LI = defineComponent({
  props: ['node'],
  setup(props, { slots }) {
    const node = unref$(() => props.node as MenuNode)
    
    return () => (
      <div class={['vs-menu-li', node.hovered && 'hover']} ref={node.ref} disabled={node.disabled} onMouseenter={e => node.onHover(e)} onClick={node.click}>
        { 
          node.loading ? <i-svg-spinners-bars-rotate-fade class='absolute left-0 ml4 w18 h18' /> :
          node.checked ? <i-mdi-check class='absolute left-0 ml4 w18 h18' /> :
          <Icon class='absolute left-0 ml4 w17 h17' src={node.icon} />
        }
        { node.label }
        { slots.default && <i-mdi-chevron-right class='absolute right-0 mr6' /> }
      </div>
    )
  }
})

const Render = createRender({
  defaultIs: LI,
  processProps: e => e.is ? e : { ...e.data, node: e }
})

const Menu = defineComponent({
  props: {
    items: Array,
    tippy: Object,
  },
  setup(props, { expose }) {
    const state = reactive<ToRefs<State>>({
      hover: void 0,
      tippy: toRef(() => props.tippy),
    }) as State

    expose(state)

    class MN extends MenuNode {
      get state() { return state }
      get root() { return root as this }
      get isRoot() { return root == this }
    }

    const root = new MN({ get children() { return props.items } })

    provide(ROOT, root)

    return () => Render({ is: UL, node: root, children: root.children })
  }
})

export default Menu