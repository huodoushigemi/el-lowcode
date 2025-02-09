<template>
  <div class="vs-base vs-sidebar" flex="~ col">
    <div pl20 pr8 text-11 lh-35 font-400 c="#bbb" truncate uppercase flex-shrink-0>
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
      class="h0"
      :style="{ height: `${pane.initialSize}px` }"
    >
      <Pane :pane="pane" />
    </Expand>

    <Pane v-else-if="list.length" :pane="list[0]" />
  </div>
</template>

<script setup lang="ts">
import { computed, h, inject, PropType, ref } from 'vue'
import { isArray } from '@vue/shared'
import { Activitybar, DesignerCtx } from '../interface'
import Expand from './Expand.vue'

// import Widgets from './Widgets.vue'
import Widgets from './CompView.vue'

const is = {
  widgets: Widgets
}

const props = defineProps({
  activitybar: Object as PropType<Activitybar>,
})

const designer = inject<DesignerCtx>('designerCtx')!

const list = computed(() => designer.plugins.flatMap(e => e.contributes.views?.[props.activitybar?.id!] || []))

const expanded = ref({})

function mount(el, pane) {
  const { id, renderer } = pane
  renderer?.mount(el, designer)
}

function unmount(el, pane) {
  const { id, renderer } = pane
  renderer?.unmount?.(el, designer)
}

const Pane = ({ pane }) => h(is[isArray(pane.is) ? pane.is[0] : pane.is] || 'div', {
  ...isArray(pane.is) ? pane.is[1] : void 0,
  class: 'vs-expand-body',
  onVnodeMounted: ({ el }) => mount(el, pane),
  onVnodeUnmounted: ({ el }) => unmount(el, pane),
})
</script>
