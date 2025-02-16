<template>
  <div class="designer" flex="~ col" @keydown="onKeydown">
    <div flex flex-1 h0>
      <Activitybar v-model="activitybar" :list="activitybars" />

      <KeepAlive>
        <Views v-if="activitybar" :activitybar="activitybars.find(e => e.id == activitybar)" :key="activitybar" w300 />
      </KeepAlive>

      <div relative flex-1 w0 hfull>
        <!-- v-model:x="canvas.x" v-model:y="canvas.y" -->
        <IV wfull hfull :disabled="lcd.state.infiniteViewer.disabled" style="background: var(--vs-panel-bg)" @click="lcd.activeId = undefined" v-model:zoom="canvas.zoom">
          <div ref="viewport" class="viewport" :style="lcd.canvas?.style" @click.stop @mouseleave="lcd.dragged || (lcd.hoverId = undefined)">
            <iframe
              :key="srcurl + srcdoc + root._id"
              class="wfull hfull"
              style="user-select: none"
              :src="srcurl"
              :srcdoc="srcdoc"
              @vue:mounted="({ el }) => (lcd.canvas.window = el.contentWindow, el.contentWindow.designerCtx = lcd)"
              @vue:beforeUnmount="({ el }) => el.contentWindow.unmount?.()"
            />

            <selected-layer />
            <!-- resize -->
             <!-- todo -->
            <!-- <Moveable
              v-if="active && !active.isRoot && active.el && !active?.inline && active.is != 'span'"
              ref="moveable"
              :key="active.id"
              :style="`margin-top: ${-iframeScroll.y}px; margin-left: ${-iframeScroll.x}px`"
              :target="active.el"
              :resizable="true"
              :rotatable="false"
              :origin="false"
              :renderDirections="active.isAbs ? undefined : ['e', 'se', 's']"
              :hideDefaultLines="true"
              :snappable="true"
              :snapGap="false"
              :snapElement="true"
              :elementGuidelines="[active?.parent, ...active?.siblings || []].map(e => e?.el)"
              :useResizeObserver="true"
              :useMutationObserver="true"
              @resizeStart="onDragStart" @resize="onResize" @resizeEnd="onResizeEnd"
              @rotateStart="onDragStart" @rotate="onDrag" @rotateEnd="onDragEnd"
            /> -->
          </div>
        </IV>

        <!-- Breadcrumb -->
        <div class="absolute top-20 left-35 flex aic text-13 lh-32" @mouseleave="lcd.hoverId = void 0">
          <div v-for="(node, i, len) in active?.path" class="vs-breadcrumb-li" @click="node.click()" @mouseenter="node.hover()">
            <div class="max-w150 truncate">{{ node.label }}</div>
            <div v-if="node != active" mx4> > </div>
          </div>
        </div>
      </div>

      
      <!-- Setting -->
      <aside w256 b-l="1px solid [--el-border-color]" overflow-overlay @contextmenu.prevent>
        <setting-panel />
      </aside>

      <ExportCode ref="exportCode" />
    </div>

    <Statusbar>
      <div flex aic bg="#3655b5" class="li ml0! pr8" @click="lcd.commands.emit('lcd.toggleDevice')">
        <i-material-symbols:devices-outline wa mr4 h20 />
        {{ devices.find(e => eq(e.value, [canvas.w, canvas.h]))?.label || (`${canvas.w} × ${canvas.h}`) }}
      </div>
      <i-tdesign:close class="li wa" @click="lcd.commands.emit('lcd.clear')" />
      <i-mdi:undo-variant class="li  wa mr0!" :op="!canUndo && '20'" @click="lcd.commands.emit('lcd.undo')" />
      <i-mdi:redo-variant class="li  wa ml0!" :op="!canRedo && '20'" @click="lcd.commands.emit('lcd.redo')" />
      <i-tdesign:download class="li wa" @click="lcd.commands.emit('lcd.download')" />
      <div flex aic text-nowrap class="li ml12!">
        <i-mdi:magnify-expand wa mr2 h18 />
        <input type="range" v-model.number="canvas.zoom" min=".6" max="2.5" step=".01" />
        <InputNumber :model-value="Math.round(canvas.zoom * 100)" @update:model-value="v => canvas.zoom = +((v || 0) / 100).toFixed(2)" noUnit :min="60" :max="250" class="w50 h20" />
      </div>
    </Statusbar>
  </div>
</template>

<script setup lang="ts">
import { watch, computed, provide, ref, getCurrentInstance, PropType, reactive, onUnmounted, toRaw, triggerRef, toRef, toRefs, nextTick, h, defineComponent, renderSlot, cloneVNode, watchEffect } from 'vue'
import { computedAsync, Fn, useDebouncedRefHistory, useElementSize, useResizeObserver, useWindowScroll } from '@vueuse/core'
import Moveable from 'vue3-moveable'

import { eq, get, pick, set, uid } from '@el-lowcode/utils'
import { useTransformer } from 'el-form-render'
import { designerCtxKey, DisplayNode } from './interface'
import Activitybar from './components/Activitybar.vue'
import Views from './components/Views.vue'
import ExportCode from './components/ExportCode.vue'
import SelectedLayer from './components/selected-layer.vue'
import SettingPanel from './setting-panel.vue'
import InfiniteViewer from './components/infinite-viewer.vue'
import Statusbar from './components/Statusbar.vue'
// import { vue2esm } from './vue2esm'
import { createDesignerCtx, quickPick } from '../utils'

import OptionsInput from '../components/OptionsInput.vue'
import PairInput from '../components/PairInput.vue'
import InputNumber from '../components/InputNumber.vue'
import InputNumbers from '../components/InputNumbers.vue'
import Collapse from '../components/Collapse.vue'
import EditTable from '../components/EditTable.vue'
import Tabs from '../components/Tabs.vue'
import MonacoEditor from './components/monaco-editor.vue'
import ElFormRender from 'el-form-render'

const srcdoc = computedAsync(() => import.meta.env.PROD ? import('./components/iframe-temp.html?transform').then(e => e.default) : void 0)
const srcurl = computedAsync(() => import.meta.env.DEV ? import('./components/iframe-temp.html?url').then(e => e.default) : void 0)

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
    const elRef = ref()
    const o1 = reactive(useElementSize(elRef))
    const o2 = reactive(useElementSize(viewport))
    return () => lcd.state.infiniteViewer.disabled
      ? h('div', { class: `flex ${o2.width <= o1.width && 'jcc'} ${o2.height <= o1.height && 'aic'} scrollbar-hidden overflow-auto`, ref: elRef }, slots.default!())
      : h(InfiniteViewer, { class: 'overflow-hidden', onWheel: e => (e.preventDefault(), e.stopPropagation()) }, () => slots.default?.())
  },
})

const log = (...arg) => (console.log(...arg), arg[0])

const props = defineProps({
  json: Object,
  extraPlugins: Array as PropType<string[]>,
})

const initial = () => ({
  _id: uid(), is: 'Page', children: [],
  state: { count: 0 }, plugins: [],
  // designer: { canvas: { style: { width: '100%', height: '100%' } } }
})

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

const devices = [['iPhone SE', '375,667'], ['iPhone12 Pro', '390,844'], ['iPad Mini', '768,1024']].map(e => ({
  label: e[0],
  description: e[1].replace(',', ' × '),
  // value: { width: `${e[1].split(',')[0]}px`, height: `${e[1].split(',')[1]}px` },
  value: e[1].split(',').map(e => +e),
}))
// const device = useTransformer(root, 'designer.canvas.style', { get: v => pick(v, ['width', 'height']), set: v => JSON.parse(JSON.stringify(v)) })

console.log(window.lcd = window.designerCtx = lcd)

// 时间旅行
const { history, undo, redo, canRedo, canUndo } = useDebouncedRefHistory(root, { deep: true, debounce: 150, capacity: 20 })

lcd.commands.on('lcd.toggleDevice', async () => quickPick({ items: devices, value: [canvas.w, canvas.h] }).then(v => (canvas.w = v[0], canvas.h = v[1])))
lcd.commands.on('lcd.clear', () => (lcd.rootNode.el?.ownerDocument.defaultView.unmount(), lcd.rootNode.remove(), root.value = initial()))
lcd.commands.on('lcd.undo', undo)
lcd.commands.on('lcd.redo', redo)
lcd.commands.on('lcd.download', () => exportCode.value.vis = true)

const viewport = ref<HTMLElement>()
const exportCode = ref()

const iframeScroll = computed(() => reactive(useWindowScroll({ window: lcd.rootNode.el?.ownerDocument.defaultView })))

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


// moveable
const moveable = ref()
watch(() => active!.value?.index, async () => {
  await nextTick()
  moveable.value?.updateRect()
})
function onDragStart(e) {
  lcd.draggedId = e.target.getAttribute('lcd-id')
}
function onDrag(e) {
  e.target.style.transform = e.transform
}
function onDragEnd(e) {
  const style = lcd.dragged!.data!.style ??= {}
  ;['transform'].forEach(k => style[k] = e.target.style.getPropertyValue(k))
  lcd.draggedId = undefined
}
function onResize({ target, width, height, transform, drag }) {
  const style = lcd.dragged!.data!.style ??= {}
  const setw = width != target.offsetWidth
  const seth = height != target.offsetHeight
  const sett = drag.translate[0] != 0 && drag.translate[1] != 0
  setw && (toRaw(style).width = target.style.width = `${width}px`)
  seth && (toRaw(style).height = target.style.height = `${height}px`)
  sett && (toRaw(style).transform = target.style.transform = transform)
}
function onResizeEnd(e) {
  triggerRef(toRef(lcd.dragged!.data, 'style'))
  lcd.draggedId = undefined
}

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
        case 'z': return undo()
        case 'y': return redo()
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
    height: 100%;
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
