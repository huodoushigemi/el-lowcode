<template>
  <div class="vs-base vs-sidebar" flex="~ col">
    <div pl20 pr8 text-11 lh-35 font-400 c="#bbb" truncate uppercase flex-shrink-0>
      {{ activitybar?.title }}
    </div>

    <Expand v-if="list.length > 1" v-for="pane in list" :modelValue="expanded[pane.id]" @update:modelValue="expanded[pane.id] = $event" :title="pane.name || pane.id" class="h0" :style="{ flex: expanded[pane.id] ? 1 : '0 content', height: `${pane.initialSize}px` }">
      <div
        class="vs-expand-body"
        @vue:mounted="({ el }) => mount(el, pane)"
        @vue:unmounted="({ el }) => unmount(el, pane)"
      />
    </Expand>

    <div
      v-else-if="list.length"
      class="vs-expand-body"
      @vue:mounted="({ el }) => mount(el, list[0])"
      @vue:unmounted="({ el }) => unmount(el, list[0])"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, PropType, ref } from 'vue'
import { Activitybar, DesignerCtx } from '../interface'
import Expand from './Expand.vue'

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
</script>
