<template>
  <div class="designer" flex="~ col" @keydown="onKeydown" v-key-dir="{ source: 'target' }">
    <div flex flex-1 h0>
      <Activitybar v-model="activitybar" :list="activitybars" />

      <KeepAlive>
        <Views v-if="activitybar" :activitybar="activitybars.find(e => e.id == activitybar)" :key="activitybar" w300 />
      </KeepAlive>

      <div relative flex-1 w0 hfull>
        <!-- Canvas Viewport -->
        <infinite-viewer wfull hfull overflow-hidden style="background: var(--vs-panel-bg)" @click="designerCtx.activeId = undefined" v-model:zoom="canvas.zoom" v-model:x="canvas.x" v-model:y="canvas.y" @wheel.prevent.stop>
          <div ref="viewport" class="viewport" :style="designerCtx.canvas?.style" @click.stop @mouseleave="designerCtx.dragged || (designerCtx.hoverId = undefined)">
            <iframe
              :key="srcurl + srcdoc + root._id"
              class="wfull hfull"
              :src="srcurl"
              :srcdoc="srcdoc"
              @vue:mounted="({ el }) => el.contentWindow.designerCtx = designerCtx"
              @vue:beforeUnmount="({ el }) => el.contentWindow.unmount?.()"
            />

            <selected-layer />
            <!-- resize -->
            <Moveable
              v-if="designerCtx.active && !designerCtx.active.isRoot && designerCtx.active.el && !designerCtx.active?.inline && designerCtx.active.is != 'span'"
              :key="designerCtx.active.id + ':' + designerCtx.active.index"
              :target="designerCtx.active.el"
              :style="`margin-top: ${-iframeScroll.y}px; margin-left: ${-iframeScroll.x}px`"
              :resizable="true"
              :rotatable="false"
              :origin="false"
              :renderDirections="designerCtx.active.isAbs ? undefined : ['e', 'se', 's']"
              :hideDefaultLines="true"
              :snappable="true"
              :snapGap="false"
              :snapElement="true"
              :elementGuidelines="[designerCtx.active?.parent, ...designerCtx.active?.siblings || []].map(e => e?.el)"
              :useResizeObserver="true"
              :useMutationObserver="true"
              @resizeStart="onDragStart" @resize="onResize" @resizeEnd="onResizeEnd"
              @rotateStart="onDragStart" @rotate="onDrag" @rotateEnd="onDragEnd"
            />
          </div>
        </infinite-viewer>

        <!-- Breadcrumb -->
        <div class="absolute top-20 left-35 flex aic text-13 lh-32" @mouseleave="designerCtx.hoverId = void 0">
          <div v-for="(node, i, len) in designerCtx.active?.path" class="vs-breadcrumb-li" @click="designerCtx.activeId = node.id" @mouseenter="designerCtx.hoverId = node.id">
            <div class="max-w150 truncate">{{ node.label }}</div>
            <div v-if="node != designerCtx.active" mx4> > </div>
          </div>
        </div>
      </div>

      
      <!-- Setting -->
      <aside w256 b-l="1px solid [--el-border-color]" overflow-overlay>
        <setting-panel />
      </aside>

      <ExportCode ref="exportCode" />
    </div>

    <Statusbar>
      <div flex aic bg="#3655b5" class="li ml0! pr8" @click="designerCtx.commands.emit('lcd.toggleDevice')">
        <i-material-symbols:devices-outline wa mr4 h20 />
        {{ devices.find(e => eq(e.value, [canvas.w, canvas.h]))?.label || (`${canvas.w} × ${canvas.h}`) }}
      </div>
      <i-tdesign:close class="li wa" @click="designerCtx.commands.emit('lcd.clear')" />
      <i-mdi:undo-variant class="li  wa mr0!" :op="!canUndo && '20'" @click="designerCtx.commands.emit('lcd.undo')" />
      <i-mdi:redo-variant class="li  wa ml0!" :op="!canRedo && '20'" @click="designerCtx.commands.emit('lcd.redo')" />
      <i-tdesign:download class="li wa" @click="designerCtx.commands.emit('lcd.download')" />
      <div flex aic text-nowrap class="li ml12!">
        <i-mdi:magnify-expand wa mr2 h18 />
        <input type="range" v-model.number="canvas.zoom" min=".6" max="2.5" step=".01" />
        <InputNumber :model-value="Math.round(canvas.zoom * 100)" @update:model-value="v => canvas.zoom = +((v || 0) / 100).toFixed(2)" noUnit :min="60" :max="250" class="w50 h20" />
      </div>
    </Statusbar>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, getCurrentInstance, PropType, reactive, onUnmounted, toRaw, triggerRef, toRef } from 'vue'
import { computedAsync, useDebouncedRefHistory, useEventListener, unrefElement, useWindowScroll, refDebounced } from '@vueuse/core'
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
import { createDesignerCtx, quickPick, vKeyDir } from '../utils'

import OptionsInput from '../components/OptionsInput.vue'
import PairInput from '../components/PairInput.vue'
import InputNumber from '../components/InputNumber.vue'
import InputNumbers from '../components/InputNumbers.vue'
import Collapse from '../components/Collapse.vue'
import EditTable from '../components/EditTable.vue'
import Tabs from '../components/Tabs.vue'
import MonacoEditor from './components/monaco-editor.vue'

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

const log = (...arg) => console.log(...arg)

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

const designerCtx = createDesignerCtx(root, () => props.extraPlugins)
const { canvas } = designerCtx

provide(designerCtxKey, designerCtx)
provide('designerCtx', designerCtx)
defineExpose(designerCtx)


const devices = [['iPhone SE', '375,667'], ['iPhone12 Pro', '390,844'], ['iPad Mini', '768,1024']].map(e => ({
  label: e[0],
  description: e[1].replace(',', ' × '),
  // value: { width: `${e[1].split(',')[0]}px`, height: `${e[1].split(',')[1]}px` },
  value: e[1].split(',').map(e => +e),
}))
// const device = useTransformer(root, 'designer.canvas.style', { get: v => pick(v, ['width', 'height']), set: v => JSON.parse(JSON.stringify(v)) })

console.log(window.designerCtx = designerCtx)

// 时间旅行
const { history, undo, redo, canRedo, canUndo } = useDebouncedRefHistory(root, { deep: true, debounce: 500, capacity: 20 })

const disposes = [
  designerCtx.commands.on('lcd.toggleDevice', async () => quickPick({ items: devices, value: [canvas.w, canvas.h] }).then(v => (canvas.w = v[0], canvas.h = v[1]))),
  designerCtx.commands.on('lcd.clear', () => (designerCtx.rootCtx.el?.ownerDocument.defaultView.unmount(), designerCtx.rootCtx.remove(), root.value = initial())),
  designerCtx.commands.on('lcd.undo', undo),
  designerCtx.commands.on('lcd.redo', redo),
  designerCtx.commands.on('lcd.download', () => exportCode.value.vis = true),
]
onUnmounted(() => disposes.forEach(cb => cb()))

const viewport = ref<HTMLElement>()
const exportCode = ref()

const iframeScroll = computed(() => reactive(useWindowScroll({ window: designerCtx.rootCtx.el?.ownerDocument.defaultView })))

const activitybars = computed(() => designerCtx.plugins.flatMap(e => e.contributes.activitybar || []))
const activitybar = ref(root.value.designer?.activitybar ?? 'widgets')
// const activitybar = useTransformer(root, 'designer.activitybar', { displayValue: 'widgets' })

// moveable
function onDragStart(e) {
  designerCtx.draggedId = e.target.getAttribute('_id')
}
function onDrag(e) {
  e.target.style.transform = e.transform
}
function onDragEnd(e) {
  const style = designerCtx.dragged!.data!.style ??= {}
  ;['transform'].forEach(k => style[k] = e.target.style.getPropertyValue(k))
  designerCtx.draggedId = undefined
}
function onResize({ target, width, height, transform, drag }) {
  const style = designerCtx.dragged!.data!.style ??= {}
  const setw = width != target.offsetWidth
  const seth = height != target.offsetHeight
  const sett = drag.translate[0] != 0 && drag.translate[1] != 0
  setw && (toRaw(style).width = target.style.width = `${width}px`)
  seth && (toRaw(style).height = target.style.height = `${height}px`)
  sett && (toRaw(style).transform = target.style.transform = transform)
}
function onResizeEnd(e) {
  triggerRef(toRef(designerCtx.dragged!.data, 'style'))
  designerCtx.draggedId = undefined
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
      designerCtx.active?.remove()
    }],
    // ↑ → ↓ ←
    [() => ['arrowup', 'arrowleft', 'arrowdown', 'arrowright'].includes(key), () => {
      const node = designerCtx.active
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
