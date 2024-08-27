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
        <infinite-viewer wfull hfull overflow-hidden :cursor="middlePressed && 'grab'" style="background: var(--el-fill-color-light)" @click="designerCtx.activeId = undefined" @mousedown.middle.prevent="middlePressed = true" @mouseup.middle.prevent="middlePressed = false" v-model:zoom="designerCtx.canvas.zoom" @wheel.prevent.stop>
          <div ref="viewport" class="viewport" :style="designerCtx.canvas?.style" @mousedown.left.stop @click.stop @mouseleave="designerCtx.draggedId || (designerCtx.hoverId = undefined)">
            <!-- @vue-ignore -->
            <iframe
              :key="root._id + CanvasIframe1"
              class="wfull hfull"
              :srcdoc="CanvasIframe1"
              @load="e => designerCtx.canvas.doc = e.target.contentDocument"
              @vue:mounted="({ el }) => el.contentWindow.designerCtx = designerCtx"
            />
            
            <selected-layer />
            <!-- resize -->
            <Moveable :target="designerCtx.active?.isRoot ? undefined : designerCtx.activeEl" :resizable="true" :rotatable="false" :renderDirections="resizeDir(designerCtx.active?.data)" :origin="false" :useResizeObserver="true" :useMutationObserver="true" :hideDefaultLines="true" @resizeStart="onDragStart" @resize="onResize" @resizeEnd="onResizeEnd" @rotateStart="onDragStart" @rotate="onDrag" @rotateEnd="onDragEnd" />
          </div>
        </infinite-viewer>

        <div class="absolute top-20 left-35 flex aic text-13 lh-32" @mouseleave="designerCtx.hoverId = void 0">
          <div v-for="(node, i, len) in designerCtx.keyedCtx[designerCtx.activeId!]?.path" class="vs-breadcrumb-li" @click="designerCtx.activeId = node.id" @mouseenter="designerCtx.hoverId = node.id">
            <div class="max-w150 truncate">{{ node.label }}</div>
            <div v-if="node.id != designerCtx.activeId" mx4> > </div>
          </div>
        </div>

        <div class="absolute bottom-10 left-35 flex">
          <div class="[&>*]:p4 [&>*]:w32 [&>*]:h32" flex space-x-10 px6 style="background: var(--vscode-activityBar-background, #333333)">
            <i-mdi:close data-title="clear" class="vs-ai" @click="root = initial()" />
            <i-mdi:undo-variant class="vs-ai" :op="!canUndo && '20'" @click="undo()" />
            <i-mdi:redo-variant class="vs-ai" :op="!canRedo && '20'" @click="redo()" ml4="!" />
            <i-tdesign:download class="vs-ai" @click="$refs.exportCode.vis = true" />
            <!-- <slot name="actions"></slot> -->
          </div>
  
          <ElFormRender class="flex aic ml8 px6 text-12 [&>*]:mb0!" style="background: var(--vscode-activityBar-background, #333333)" :model="designerCtx.canvas" size="small" :items="[
            { prop: 'style.wh', type: 'select', options: [['iPhone SE', '375 × 667'], ['iPhone12 Pro', '390 × 844'], ['iPad Mini', '768 × 1024']], class: 'w110 mr8', get: () => ['width', 'height'].map(k => parseFloat(get(root, `designer.canvas.style.${k}`)) || ' - ').join(' × '), set: v => (['width', 'height'].forEach((k, i) => set(root, `designer.canvas.style.${k}`, v && v.split(' × ')[i] + 'px')), void 0), el: { clearable: true } },
            { prop: 'style.width', class: 'w50', el: { is: 'InputNumber', hideUnit: true } },
            { is: 'div', class: 'mx4', children: '×' },
            { prop: 'style.height', class: 'w50', el: { is: 'InputNumber', hideUnit: true } },
            { prop: 'zoom', class: 'ml8 w55', displayValue: '100%', get: v => parseInt(v * 100) + '%', set: v => parseInt(v) / 100, el: { is: 'InputNumber', units: ['%'], min: 40, max: 250 } }
          ]" />
        </div>
      </div>

      
      <!-- Setting -->
      <aside w256 b-l="1px solid [--el-border-color]" overflow-overlay>
        <setting-panel />
      </aside>
      <state-drawer />

      <ExportCode ref="exportCode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, getCurrentInstance, PropType } from 'vue'
import { computedAsync, useDebouncedRefHistory, useEventListener, useLocalStorage, useMagicKeys } from '@vueuse/core'
import { v4 as uuid } from 'uuid'
import Moveable from 'vue3-moveable'

import { get, set } from '@el-lowcode/utils'
import { useTransformer } from 'el-form-render'
import { BoxProps, Widget } from '../index'
import { DesignerCtx, designerCtxKey } from './interface'
import Activitybar from './components/Activitybar.vue'
import Views from './components/Views.vue'
import ExportCode from './components/ExportCode.vue'
import SelectedLayer from './components/selected-layer.vue'
import SettingPanel from './setting-panel.vue'
import StateDrawer from './components/state-drawer.vue'
import InfiniteViewer from './components/infinite-viewer.vue'
// import { vue2esm } from './vue2esm'
import { createDesignerCtx } from '../utils'
import { PageCtx } from '../plugins/web/page'

import OptionsInput from '../components/OptionsInput.vue'
import PairInput from '../components/PairInput.vue'
import InputNumber from '../components/InputNumber.vue'
import InputNumbers from '../components/InputNumbers.vue'
import Collapse from '../components/Collapse.vue'
import EditTable from '../components/EditTable.vue'
import Tabs from '../components/Tabs.vue'

import CanvasIframe1 from './components/iframe-temp.html?transform'

const app = getCurrentInstance()!.appContext.app
app.component('OptionsInput', OptionsInput)
app.component('PairInput', PairInput)
app.component('InputNumber', InputNumber)
app.component('InputNumbers', InputNumbers)
app.component('Collapse', Collapse)
app.component('EditTable', EditTable)
app.component('Tabs', Tabs)

const log = (...arg) => console.log(...arg)

const props = defineProps({
  json: Object as PropType<PageCtx>,
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

const activitybars = computed(() => designerCtx.plugins.flatMap(e => e.contributes.activitybar || []))
const activeView = ref()

// 时间旅行
const { history, undo, redo, canRedo, canUndo } = useDebouncedRefHistory(root, { deep: true, debounce: 500, capacity: 20 })

const initCanvas = () => get(root.value, 'designer.canvas') || set(root.value, 'designer.canvas', {})

const viewer = {
  // x: useTransformer(root, 'designer.canvas.x'),
  // y: useTransformer(root, 'designer.canvas.y'),
  // zoom: useTransformer(root, 'designer.canvas.zoom')
  // get x() { return get(root.value, 'designer.canvas.x') },
  // set x(v) { toRaw(initCanvas()).x = v },
  // get y() { return get(root.value, 'designer.canvas.y') },
  // set y(v) { toRaw(initCanvas()).y = v },
  // get zoom() { return get(root.value, 'designer.canvas.zoom') },
  // set zoom(v) { toRaw(initCanvas()).zoom = v },
}
const viewport = ref<HTMLElement>()

const designerCtx = createDesignerCtx(root, () => props.extraPlugins)

provide(designerCtxKey, designerCtx)
provide('designerCtx', designerCtx)
defineExpose(designerCtx)

console.log(window.designerCtx = designerCtx)

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
function resizeDir(node?: BoxProps) {
  if (!node) return undefined
  if (node.is == 'Page') return []
  return node.style?.position == 'absolute' ? undefined : ['e', 'se', 's']
}

// 中建按下
const middlePressed = ref(false)

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
  
  const node = designerCtx.active?.data
  if (!node) return
  e.preventDefault()
  e.stopPropagation()
  if (node == designerCtx.root) return
  const offset = e.shiftKey ? 10 : 1
  const absolute = node.style?.position == 'absolute'
  if (absolute) {
    const plus = (i, v) => {
      if (!node.style?.transform) set(node, 'style.transform', `translate(0px, 0px)`)
      const matched = node.style.transform.match(/translate\(([^\)]+?)\)/)
      const xy = matched[1].split(',').map(e => parseInt(e))
      xy[i] += v
      node.style.transform = node.style.transform.replace(matched[0], `translate(${xy[0]}px, ${xy[1]}px)`)
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
