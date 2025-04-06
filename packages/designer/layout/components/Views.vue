<template>
  <aside class="vs-base vs-sidebar" flex="~ col">
    <div pl20 pr8 text-11 lh-35 font-400 c="#bbb" truncate uppercase flex-shrink-0 sticky top-0 z-1>
      {{ activitybar?.title }}
    </div>

    <Expand
      v-if="list.length > 1"
      v-for="pane in list"
      :modelValue="expanded[pane.id] ?? true"
      @update:modelValue="expanded[pane.id] = $event"
      :title="pane.name || pane.id"
      :icon="pane.icon"
      :iconClass="pane.iconClass"
      class="flex-shrink-1"
      :style="
        isFull(pane.id) ? 'flex: 1; height: 0;' :
        (expanded[pane.id] ?? 1) && pane.initialSize ? `flex: 0 1 ${unit(pane.initialSize)}; height: 0;` :
        (expanded[pane.id] ?? 1) ? 'flex: 1 0 142px; height: 0;' :
        ''
      "
    >
      <Pane :pane="pane" />
    </Expand>

    <Pane v-else-if="list.length" :pane="list[0]" />
  </aside>
</template>

<script setup lang="ts">
import { computed, h, inject, mergeProps, PropType, ref, Suspense, withDirectives } from 'vue'
import { vLoading } from 'element-plus'
import { createRender } from '@el-lowcode/render'
import { defaults, get, set } from '@el-lowcode/utils'
import { Activitybar, DesignerCtx } from '../interface'
import Expand from './Expand.vue'
import WidgetsView from './WidgetsView.vue'
import Widgets from './Widgets.vue'
import SnippetsView from '../../plugins/base/.lowcode/views/SnippetsView.vue'
import SnippetsView2 from '../../plugins/base/.lowcode/views/SnippetsView2.vue'

const is = {
  Widgets,
  WidgetsView,
  SnippetsView,
  SnippetsView2,
}

const props = defineProps({
  activitybar: Object as PropType<Activitybar>,
})

const lcd = inject<DesignerCtx>('designerCtx')!

const state = id => get(lcd.state, `views.${id}`) ?? (set(lcd.state, `views.${id}`, {}), get(lcd.state, `views.${id}`))

const list = computed(() => lcd.plugins.flatMap(e => e.contributes.views?.[props.activitybar?.id!] || []))

const expanded = ref({})

const isFull = id => (expanded.value[id] ?? 1) && list.value.every(e => e.id == id || expanded.value[e.id] === false)

function mount(el, pane, state) {
  const { id, renderer } = pane
  renderer?.mount(el, lcd, state)
}

function unmount(el, pane, state) {
  const { id, renderer } = pane
  renderer?.unmount?.(el, lcd, state)
}

function unit(n) {
  return /^\d+$/.test(String(n)) ? `${n}px` : n
}

const Render = createRender({
  processProps(props, vars) {
    if (props.is?.name == 'AsyncComponentWrapper') {
      const is = (attrs) => h(Suspense, void 0, {
        default: () => h(props.is, attrs),
        fallback: () => withDirectives(h('div', { style: 'flex: 1' }), [[vLoading, { background: 'transparent' }]])
      })
      return { ...props, is }
    }
    return props as any
  },
})

const Pane = ({ pane }) => {
  return Render(mergeProps(pane, {
    is: is[pane.is] ?? pane.is ?? 'div',
    class: 'vs-expand-body',
    state: defaults(state(pane.id), pane.state || {}),
    onVnodeMounted: ({ el }) => mount(el, pane, state(pane.id)),
    onVnodeUnmounted: ({ el }) => unmount(el, pane, state(pane.id)),
  }))
}
</script>
