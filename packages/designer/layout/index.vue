<template>
  <div class="designer" flex="~ col" @keydown="onKeydown" tabindex="0" style="outline: 0">
    <div flex flex-1 h0>
      <Activitybar v-model="activitybar" :list="activitybars" />

      <KeepAlive>
        <Views v-if="activitybar" :activitybar="activitybars.find(e => e.id == activitybar)" :key="activitybar" w300 />
      </KeepAlive>

      <div relative flex-1 w0 hfull>
        <!-- v-model:x="canvas.x" v-model:y="canvas.y" -->
        <IV wfull hfull :disabled="lcd.state.infiniteViewer.disabled" style="background: var(--vs-panel-bg)" @click="lcd.activeId = undefined" v-model:zoom="canvas.zoom">
          <div ref="viewport" class="viewport" :style="lcd.canvas?.style" @click.stop @mouseleave="lcd.dragged || (lcd.hoverId = undefined)">
            <iframe-canvas
              v-if="!lcd.pluginsLoading"
              class="wfull hfull"
              style="user-select: none"
            />
          </div>
        </IV>

        <!-- Breadcrumb -->
        <div class="absolute top-20 left-35 flex aic text-13px lh-32" @mouseleave="lcd.hoverId = void 0">
          <div v-for="node in active?.path" class="vs-breadcrumb-li" @click="node.click()" @mouseenter="node.hover()">
            <div class="max-w150 truncate">{{ node.label }}</div>
            <div v-if="node != active" mx4> > </div>
          </div>
        </div>

        <!-- <div class="absolute top-0 wfull">
          <Tabs3 v-for="group in lcd.state.tabGroups?.all">
            <div v-for="tab in group.tabs" :label="tab.label"></div>
          </Tabs3>
        </div> -->
      </div>
      
      <!-- Setting -->
      <aside w256 b-l="1px solid [--el-border-color]" overflow-overlay @contextmenu.prevent>
        <setting-panel />
      </aside>
    </div>

    <Statusbar />
  </div>
</template>

<script setup lang="ts">
import { watch, computed, provide, ref, getCurrentInstance, PropType, reactive, onUnmounted, toRaw, triggerRef, toRef, toRefs, nextTick, h, defineComponent, watchEffect, defineAsyncComponent } from 'vue'
import { computedAsync, Fn, useElementSize, useEventListener } from '@vueuse/core'

import { eq, get, pick, set, uid } from '@el-lowcode/utils'
import { useTransformer } from 'el-form-render'
import { designerCtxKey } from './interface'
import Activitybar from './components/Activitybar.vue'
import Views from './components/Views.vue'
import SettingPanel from './setting-panel.vue'
import Statusbar from './components/Statusbar.vue'
// import { vue2esm } from './vue2esm'
import { createDesignerCtx } from '../utils'
// import IframeCanvas from './components/iframe-canvas'
const IframeCanvas = defineAsyncComponent(() => import('./components/iframe-canvas'))

import OptionsInput from '../components/OptionsInput.vue'
import PairInput from '../components/PairInput.vue'
import InputNumber from '../components/InputNumber.vue'
import InputNumbers from '../components/InputNumbers.vue'
import Collapse from '../components/Collapse.vue'
import EditTable from '../components/EditTable.vue'
import Tabs from '../components/Tabs.vue'
import MonacoEditor from './components/monaco-editor.vue'
import ElFormRender from 'el-form-render'
import Tabs3 from '../components/Tabs3.vue'

const app = getCurrentInstance()!.appContext.app
app.component('OptionsInput', OptionsInput)
app.component('PairInput', PairInput)
app.component('InputNumber', InputNumber)
app.component('InputNumbers', InputNumbers)
app.component('Collapse', Collapse)
app.component('EditTable', EditTable)
app.component('Tabs', Tabs)
app.component('MonacoEditor', MonacoEditor)
app.use(ElFormRender)

const IV = defineComponent({
  setup(props, { slots }) {
    const InfiniteViewer = defineAsyncComponent(() => import('./components/infinite-viewer.vue'))
    const elRef = ref()
    const o1 = reactive(useElementSize(elRef))
    const o2 = reactive(useElementSize(viewport))
    return () => lcd.state.infiniteViewer.disabled
      ? h('div', { class: `flex ${o2.width <= o1.width && 'jcc'} ${o2.height <= o1.height && 'aic'} p22 scrollbar-hidden overflow-auto`, ref: elRef }, slots.default!())
      : h(InfiniteViewer, { class: 'overflow-hidden', onWheel: e => (e.preventDefault(), e.stopPropagation()) }, () => slots.default?.())
  },
})

const props = defineProps({
  json: Object,
  extraPlugins: Array as PropType<string[]>,
})

const initial = () => ({ _id: uid(), is: 'Page', children: [], state: { count: 0 }, plugins: [] })

// 根节点
// const root = useLocalStorage(
//   '@el-lowcode/designer-page',
//   props.json ?? initial(),
//   { listenToStorageChanges: false, deep: true, shallow: false }
// )

const root = ref(props.json ?? initial())

const lcd = createDesignerCtx(root, () => props.extraPlugins)
const { canvas } = lcd
const { active } = toRefs(lcd)

provide(designerCtxKey, lcd)
provide('designerCtx', lcd)
defineExpose(lcd)

console.log(window.lcd = window.designerCtx = lcd)

const viewport = ref<HTMLElement>()

const activitybars = computed(() => lcd.plugins.flatMap(e => e.contributes.activitybar || []))
const activitybar = useTransformer(lcd, 'state.activitybar.id', {
  get: v => lcd.state.sidebar.visible ? v : void 0,
  set: v => (lcd.state.sidebar.visible = activitybar.value != v, v)
})

const views = computed(() => lcd.plugins.map(e => e.contributes.views || {}))
const viewsCbs = [] as Fn[]
onUnmounted(() => viewsCbs.forEach(e => e()))
watch(views, (val) => {
  viewsCbs.forEach(e => e())
  val.forEach(views => {
    for (const k in views) {
      views[k].forEach(view => {
        viewsCbs.push(lcd.commands.on(`state.view.${view.id}`, () => {
          // todo find viewsContainers
          lcd.state.activitybar.id = k
          lcd.state.sidebar.visible = true
        }))
      })
    }
  })
}, { immediate: true })


// 快捷键
function onKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement
  if (target.tagName == 'INPUT' ) e.key == 'Enter' && target.dispatchEvent(new Event('change'))
  if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return
  const key = e.key.toLocaleLowerCase()

  const kb = [
    // 按 Delete 删除当前选中元素
    [() => key == 'delete', () => {
      active!.value?.remove()
    }],
    // ↑ → ↓ ←
    [() => ['arrowup', 'arrowleft', 'arrowdown', 'arrowright'].includes(key), () => {
      const node = active!.value
      if (!node || node.isRoot) return
      const offset = e.shiftKey ? 10 : 1
      if (node.isAbs) {
        if (key == 'arrowup') node.y += -offset
        if (key == 'arrowleft') node.x += -offset
        if (key == 'arrowdown') node.y += offset
        if (key == 'arrowright') node.x += offset
      }
      else {
        const plus = (prop, v) => set(node, `data.style.${prop}`, parseInt(get(node, `data.style.${prop}`) || 0) + v + 'px')
        if (key == 'arrowup') plus('marginTop', -offset)
        if (key == 'arrowleft') plus('marginLeft', -offset)
        if (key == 'arrowdown') plus('marginTop', offset)
        if (key == 'arrowright') plus('marginLeft', offset)
      }
    }],
    // ctrl z / y
    [() => e.ctrlKey && ['z', 'y'].includes(key), () => {
      switch (key) {
        case 'z': return lcd.commands.emit('undo')
        case 'y': return lcd.commands.emit('redo')
      }
    }]
  ]

  const cb = kb.find(e => e[0]())?.[1]
  if (cb) {
    cb()
    e.stopPropagation()
    e.preventDefault()
  }
}
</script>

<style lang="scss">
.designer {
  .viewport {
    position: relative;
    flex-shrink: 0;
    width: 768px;
    height: 1024px;
    background: var(--el-fill-color-extra-light);
  }

  .scrollbar-hidden::-webkit-scrollbar {
    width: 0;
    &-thumb {
      display: none;
    }
  }
  
  .el-collapse {
    > .el-collapse-item .el-collapse-item__content {
      padding-bottom: 10px;
    }
  }
}
</style>

<style lang="scss">
[overflow-overlay] {
  overflow: auto;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
    background: rgba(gray, .1);
    width: 4px;
    height: 4px;
  }
  &:hover::-webkit-scrollbar-thumb {
    display: block;
  }
}
</style>
