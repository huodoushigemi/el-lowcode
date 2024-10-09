<template>
  <div class="designer" flex="~ col">
    <div flex flex-1 h0>
      <Activitybar v-model="activeView" :list="activitybars" @update:modelValue="log" />

      <KeepAlive>
        <Views v-if="activeView" :activitybar="activitybars.find(e => e.id == activeView)" :key="activeView" w300 bg="#252526" />
      </KeepAlive>

      <div relative flex-1 w0 hfull>
        <!-- Canvas Viewport -->
         <!-- v-model:x="designerCtx.canvas.x" v-model:y="designerCtx.canvas.y"  -->
        <infinite-viewer wfull hfull overflow-hidden style="background: var(--el-fill-color-light)" @click="designerCtx.activeId = undefined" v-model:zoom="designerCtx.canvas.zoom" @wheel.prevent.stop>
          <div ref="viewport" class="viewport" :style="designerCtx.canvas?.style" @click.stop @mouseleave="designerCtx.dragged || (designerCtx.hoverId = undefined)">
            <iframe
              :key="srcurl + srcdoc + root._id"
              class="wfull hfull"
              :src="srcurl"
              :srcdoc="srcdoc"
              @vue:mounted="({ el }) => el.contentWindow.designerCtx = designerCtx"
            />

            <selected-layer />
            <!-- resize -->
            <Moveable :style="`margin-top: ${-iframeScroll.y}px; margin-left: ${-iframeScroll.x}px`" :target="designerCtx.active?.isRoot ? undefined : designerCtx.active?.el" :resizable="true" :rotatable="false" :renderDirections="resizeDir(designerCtx.active)" :origin="false" :useResizeObserver="true" :useMutationObserver="true" :hideDefaultLines="true" @resizeStart="onDragStart" @resize="onResize" @resizeEnd="onResizeEnd" @rotateStart="onDragStart" @rotate="onDrag" @rotateEnd="onDragEnd" />
          </div>
        </infinite-viewer>

        <div class="absolute top-20 left-35 flex aic text-13 lh-32" @mouseleave="designerCtx.hoverId = void 0">
          <div v-for="(node, i, len) in designerCtx.keyedCtx[designerCtx.activeId!]?.path" class="vs-breadcrumb-li" @click="designerCtx.activeId = node.id" @mouseenter="designerCtx.hoverId = node.id">
            <div class="max-w150 truncate">{{ node.label }}</div>
            <div v-if="node.id != designerCtx.activeId" mx4> > </div>
          </div>
        </div>
      </div>

      
      <!-- Setting -->
      <aside w256 b-l="1px solid [--el-border-color]" overflow-overlay>
        <setting-panel />
      </aside>
      <!-- <state-drawer /> -->

      <ExportCode ref="exportCode" />
    </div>

    <Statusbar>
      <div flex aic bg="#3655b5" class="[&>*]:flex-shrink-0 ml0! pr8" @click="designerCtx.commands.emit('lcd.toggleDevice')">
        <i-material-symbols:devices-outline wa mr4 h20 />
        {{ devices.find(e => eq(e.value, viewer.size.v))?.label || (`${parseInt(viewer.size.v.width)} × ${parseInt(viewer.size.v.height)}`) }}
      </div>
      <i-tdesign:close wa @click="designerCtx.commands.emit('lcd.clear')" />
      <i-mdi:undo-variant wa mr0="!" :op="!canUndo && '20'" @click="designerCtx.commands.emit('lcd.undo')" />
      <i-mdi:redo-variant wa ml0="!" :op="!canRedo && '20'" @click="designerCtx.commands.emit('lcd.redo')" />
      <i-tdesign:download wa @click="designerCtx.commands.emit('lcd.download')" />
      <div flex aic text-nowrap class="[&>*]:flex-shrink-0 ml12!">
        <i-mdi:magnify-expand wa mr2 h18 />
        <input type="range" v-model.number="viewer.zoom.v" min="60" max="250" />
        <InputNumber v-model="viewer.zoom.v" noUnit :min="60" :max="250" class="w50 h20" />
      </div>
    </Statusbar>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, getCurrentInstance, PropType, reactive, onUnmounted } from 'vue'
import { computedAsync, useDebouncedRefHistory, useEventListener, unrefElement, useWindowScroll, refDebounced } from '@vueuse/core'
import { v4 as uuid } from 'uuid'
import Moveable from 'vue3-moveable'

import { eq, get, pick, set } from '@el-lowcode/utils'
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

const log = (...arg) => console.log(...arg)

const devices = [['iPhone SE', '375,667'], ['iPhone12 Pro', '390,844'], ['iPad Mini', '768,1024']].map(e => ({
  label: e[0],
  description: e[1].replace(',', ' × '),
  value: { width: `${e[1].split(',')[0]}px`, height: `${e[1].split(',')[1]}px` },
}))

const props = defineProps({
  json: Object,
  extraPlugins: Array as PropType<string[]>,
})

const initial = () => ({
  _id: uuid(), is: 'Page', children: [],
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

provide(designerCtxKey, designerCtx)
provide('designerCtx', designerCtx)
defineExpose(designerCtx)

const viewer = {
  // x: useTransformer(root, 'designer.canvas.x'),
  // y: useTransformer(root, 'designer.canvas.y'),
  zoom: useTransformer(designerCtx, 'canvas.zoom', { get: v => (v * 100).toFixed(), set: v => +(v / 100).toFixed(2) }),
  size: useTransformer(root, 'designer.canvas.style', { get: v => pick(v, ['width', 'height']), set: v => JSON.parse(JSON.stringify(v)) }),
  w: useTransformer(root, 'designer.canvas.style.width', { get: v => v || parseInt(v), set: v => v + 'px' }),
  h: useTransformer(root, 'designer.canvas.style.height', { get: v => v || parseInt(v), set: v => v + 'px' }),
  // get x() { return get(root.value, 'designer.canvas.x') },
  // set x(v) { toRaw(initCanvas()).x = v },
  // get y() { return get(root.value, 'designer.canvas.y') },
  // set y(v) { toRaw(initCanvas()).y = v },
  // get zoom() { return get(root.value, 'designer.canvas.zoom') },
  // set zoom(v) { toRaw(initCanvas()).zoom = v },
}

console.log(window.designerCtx = designerCtx)

// 时间旅行
const { history, undo, redo, canRedo, canUndo } = useDebouncedRefHistory(root, { deep: true, debounce: 500, capacity: 20 })

const disposes = [
  designerCtx.commands.on('lcd.toggleDevice', async () => viewer.size.v = await quickPick({ items: devices, value: viewer.size.v })),
  designerCtx.commands.on('lcd.clear', () => root.value = initial()),
  designerCtx.commands.on('lcd.undo', undo),
  designerCtx.commands.on('lcd.redo', redo),
  designerCtx.commands.on('lcd.download', () => exportCode.value.vis = true),
]
onUnmounted(() => disposes.forEach(cb => cb()))

const initCanvas = () => get(root.value, 'designer.canvas') || set(root.value, 'designer.canvas', {})

const viewport = ref<HTMLElement>()
const exportCode = ref()

const iframeScroll = computed(() => reactive(useWindowScroll({ window: designerCtx.rootCtx.el?.ownerDocument.defaultView })))

const activitybars = computed(() => designerCtx.plugins.flatMap(e => e.contributes.activitybar || []))
const activeView = ref()

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
  const setw = width != target.offsetWidth
  const seth = height != target.offsetHeight
  setw && (target.style.width = `${width}px`)
  seth && (target.style.height = `${height}px`)
  if (drag.translate[0] != 0 && drag.translate[1] != 0) {
    target.style.transform = transform
  }
}
function onResizeEnd(e) {
  const style = designerCtx.dragged!.data!.style ??= {}
  ;['width', 'height', 'transform'].forEach(k => style[k] = e.target.style.getPropertyValue(k) || undefined)
  designerCtx.draggedId = undefined
}
function resizeDir(node?: DisplayNode) {
  if (!node) return undefined
  if (node.data.is == 'Page') return []
  return node.isAbs ? undefined : ['e', 'se', 's']
}

// 按 Delete 删除当前选中元素
useEventListener('keydown', (e) => {
  if (e.key !== 'Delete') return
  if (!designerCtx.activeId) return
  if (designerCtx.active!.parent) {
    designerCtx.active!.remove()
    designerCtx.activeId = undefined
    designerCtx.hoverId = undefined
  } else {
    root.value.children = []
  }
})

// ↑ → ↓ ←
useEventListener('keydown', e => {
  if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return
  if (!['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(e.key)) return
  
  const node = designerCtx.active
  if (!node) return
  e.preventDefault()
  e.stopPropagation()
  if (node == designerCtx.rootCtx) return
  const offset = e.shiftKey ? 10 : 1
  if (node.isAbs) {
    const plus = (i, v) => {
      const xy = node.xy
      xy[i] += v
      node.xy = xy
    }
    if (e.key == 'ArrowUp') plus(1, -offset)
    if (e.key == 'ArrowLeft') plus(0, -offset)
    if (e.key == 'ArrowDown') plus(1, offset)
    if (e.key == 'ArrowRight') plus(0, offset)
  }
  else {
    const plus = (prop, v) => set(node, `style.${prop}`, parseInt(get(node, `style.${prop}`) || 0) + v + 'px')
    if (e.key == 'ArrowUp') plus('marginTop', -offset)
    if (e.key == 'ArrowLeft') plus('marginLeft', -offset)
    if (e.key == 'ArrowDown') plus('marginTop', offset)
    if (e.key == 'ArrowRight') plus('marginLeft', offset)
  }
})

// ctrl z / y
useEventListener('keydown', e => {
  if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return
  if (!e.ctrlKey) return
  const key = e.key.toLocaleLowerCase()
  if (!['z', 'y'].includes(key)) return
  e.preventDefault()
  e.stopPropagation()
  switch (key) {
    case 'z': return undo()
    case 'y': return redo()
  }
})
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
