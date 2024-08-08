<template>
  <div class="monaco-base" flex="~ col">
    <div pl20 pr8 text-11 lh-35 font-400 c="#bbb" truncate uppercase flex-shrink-0>
      {{ activitybar?.title }}
    </div>

    <div
      tabindex="0"
      class="h0 overflow-auto"
      :style="{ flex: sizeMap[activitybar!.id]?.grow }"
      @vue:mounted="({ el }) => mount(el, activitybar!.id)"
      @vue:unmounted="({ el }) => unmount(el, activitybar!.id)"
    />

    <div v-for="pane in list" class="pane" :style="{ flex: sizeMap[pane.id]?.grow, height: expanded[pane.id] ? 0 : void 0 }">
      <div :class="['monaco-li pane-header', expanded[pane.id] && 'shadow-md']" tabindex="0" @click="expanded[pane.id] = !expanded[pane.id]">
        <i-tdesign:chevron-right :rotate="expanded[pane.id] ? 90 : 0" ml4 />
        <div font-700 truncate uppercase>{{ pane.name }}</div>
      </div>
      <!-- <el-collapse-transition> -->
        <div
          v-if="expanded[pane.id]"
          tabindex="0"
          duration="150!"
          class="pane-body flex-1 overflow-auto"
          @vue:mounted="({ el }) => mount(el, pane.id)"
          @vue:unmounted="({ el }) => unmount(el, pane.id)"
        />
      <!-- </el-collapse-transition> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, PropType, ref, FunctionDirective, reactive, shallowReactive } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { Activitybar, Contributes, DesignerCtx } from '../interface'

const props = defineProps({
  activitybar: Object as PropType<Activitybar>,
})

const designer = inject<DesignerCtx>('designerCtx')!

const list = computed(() => designer.plugins.flatMap(e => e.contributes.views[props.activitybar!.id] || []))

const expanded = ref({})

// const wm = new WeakMap()
const sizeMap = reactive({})

function mount(el, id) {
  designer.viewRenderer[id]?.mount(el)
  sizeMap[id] ??= {}
  const xxx = sizeMap[id]
  xxx.scrollHeight = 0
  xxx.ob = useResizeObserver(el, ([e]) => (xxx.scrollHeight = el.scrollHeight, console.log(e)))
  xxx.grow = computed(() => {
    // @ts-ignore
    const t: number = Object.values(sizeMap).reduce((t, e) => t + (e?.scrollHeight || 0), 0)
    console.log(t);
    
    return t ? Math.max(xxx.scrollHeight, t * .2) / t : 0
  })
  console.log(sizeMap)
}

function unmount(el, id) {
  designer.viewRenderer[id]?.unmount?.(el)
  sizeMap[id].ob.stop()
  sizeMap[id] = void 0
}
</script>

<style>

</style>