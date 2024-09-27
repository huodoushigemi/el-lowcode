<template>
  <div class="monaco-base" flex="~ col">
    <div pl20 pr8 text-11 lh-35 font-400 c="#bbb" truncate uppercase flex-shrink-0>
      {{ activitybar?.title }}
    </div>

    <div
      class="h0 overflow-auto"
      :style="{ flex: sizeMap[activitybar!.id]?.grow }"
      @vue:mounted="({ el }) => mount(el, activitybar!.id)"
      @vue:unmounted="({ el }) => unmount(el, activitybar!.id)"
    />

    <div v-for="pane in list" class="pane" :style="{ flex: sizeMap[pane.id]?.grow, height: expanded[pane.id] ? 0 : void 0 }">
      <div :class="['pane-header flex aic lh-22', expanded[pane.id] && 'expanded']" tabindex="0" @click="expanded[pane.id] = !expanded[pane.id]">
        <i-tdesign:chevron-right :rotate="expanded[pane.id] ? 90 : 0" ml4 />
        <div font-700 truncate uppercase>{{ pane.name }}</div>
      </div>
      <div
        v-if="expanded[pane.id]"
        class="pane-body flex-1 overflow-auto"
        @vue:mounted="({ el }) => mount(el, pane.id)"
        @vue:unmounted="({ el }) => unmount(el, pane.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, PropType, ref, reactive } from 'vue'
import { useMutationObserver, useResizeObserver } from '@vueuse/core'
import { Activitybar, Contributes, DesignerCtx } from '../interface'

const props = defineProps({
  activitybar: Object as PropType<Activitybar>,
})

const designer = inject<DesignerCtx>('designerCtx')!

const list = computed(() => designer.plugins.flatMap(e => e.contributes.views?.[props.activitybar!.id] || []))

const expanded = ref({})

// const wm = new WeakMap()
const sizeMap = reactive({})

function mount(el, id) {
  designer.viewRenderer[id]?.mount(el, designer)
  sizeMap[id] ??= {}
  const xxx = sizeMap[id]
  xxx.scrollHeight = el.scrollHeight
  xxx.sizeObs = useResizeObserver(el, () => xxx.scrollHeight = el.scrollHeight)
  xxx.childObs = useMutationObserver(el, () => xxx.scrollHeight = el.scrollHeight, { subtree: false, childList: true })
  xxx.grow = computed(() => {
    // @ts-ignore
    const t: number = Object.values(sizeMap).reduce((t, e) => t + (e?.scrollHeight || 0), 0)
    
    return t ? Math.max(xxx.scrollHeight, t * .2) / t : 0
    // return t ? xxx.scrollHeight / t : 0
  })
}

function unmount(el, id) {
  designer.viewRenderer[id]?.unmount?.(el, designer)
  sizeMap[id].sizeObs?.stop()
  sizeMap[id].childObs?.stop()
  sizeMap[id] = void 0
}
</script>

<style lang="scss">
.pane {
  display: flex;
  flex-direction: column;

  #{&}-header {
    position: relative;
    cursor: pointer;
    color: var(--vscode-activityBar-foreground, #fff);
    background: var(--vscode-activityBar-background, #333333);
  }

  #{&}-header.expanded {
    &::after{
      content: '';
      position: absolute;
      top: 100%;
      width: 100%;
      height: 3px;
      box-shadow: #000 0 6px 6px -6px inset;
    }
  }
}
</style>