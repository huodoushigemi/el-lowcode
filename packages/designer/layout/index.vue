<template>
  <div class="layout" grid="~ cols-[auto_1fr_auto] rows-[auto_1fr]" data-designer>
    <!-- Header -->
    <header col-span-full h56 flex aic b-b="1px solid [--el-border-color]">
      <div flex aic>
        <i-ep:eleme w44 h44 c="[--el-color-primary]" />
        <b ml8 text-22>El lowcode</b>
      </div>

      <!-- 尺寸 -->
       <!-- style="--el-border-color: 0"  -->
      <ElFormRender class="flex aic mxa text-12 [&>*]:mb0!" :model="root" size="small" :items="[
        { lp: ['尺寸: ', 'designer.canvas.style.wh'], type: 'select', options: [['iPhone SE', '375 × 667'], ['iPhone12 Pro', '390 × 844'], ['iPad Mini', '768 × 1024']], class: 'w160 mr8', get: () => ['width', 'height'].map(k => parseFloat(get(root, `designer.canvas.style.${k}`)) || ' - ').join(' × '), set: v => (['width', 'height'].forEach((k, i) => set(root, `designer.canvas.style.${k}`, v && v.split(' × ')[i] + 'px')), void 0), el: { clearable: true } },
        { prop: 'designer.canvas.style.width', class: 'w50', el: { is: 'InputNumber', hideUnit: true } },
        { is: 'div', class: 'mx4', children: '×' },
        { prop: 'designer.canvas.style.height', class: 'w50', el: { is: 'InputNumber', hideUnit: true } },
        // { prop: 'designer.canvas.zoom', type: 'slider', class: 'w100 ml16 mr4', get: v => parseInt(v * 100) || 100, set: v => v / 100,  el: { min: 40, max: 250, showTooltip: false } },
        // { is: 'div', class: 'w50', children: () => `${parseInt(get(root, 'designer.canvas.zoom') * 100) || 100}%` },
        { prop: 'designer.canvas.zoom', class: 'ml8 w55', displayValue: '100%', get: v => parseInt(v * 100) + '%', set: v => parseInt(v) / 100, el: { is: 'InputNumber', units: ['%'], min: 40, max: 250 } }
      ]" />
      
      <div class="[&>*]:p4 [&>*]:w32 [&>*]:h32" flex space-x-20 px20 shrink-0>
        <el-tooltip content="clear"><i-mdi:close bg-hover @click="root = parseAttrs(el_lowcode_widgets.Page!)" /></el-tooltip>
        <i-mdi:undo-variant :op="!canUndo && '20'" bg-hover @click="undo()" />
        <i-mdi:redo-variant :op="!canRedo && '20'" bg-hover @click="redo()" ml4="!" />
        <slot name="actions"></slot>
      </div>
    </header>

    <!-- Activity bar -->
    <el-tabs tab-position="left" type="border-card" hfull b-r="1px solid [--el-border-color]" box-border>
      <!-- <el-tab-pane w200 ref="dropZone">
        <div v-if="isOverDropZone" absolute inset-0 bg="gray/40" pointer-events-none />
        <template #label><el-tooltip content="组件库" placement="right" :hide-after="0"><i-mdi:widgets-outline /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">组件</div>
        <el-collapse v-model="collapse" pl12 pr8 hfull overflow-overlay>
          <template v-for="group in groups">
            <el-collapse-item v-if="group.list.length" :title="group.title" :name="group.title">
              <vue-draggable :model-value="group.list" grid="~ cols-2" gap-8 hfull overflow-overlay :group="{ name: 'shared', pull: 'clone', put: false }" :sort="false" :clone="clone" @end="onEnd">
                <template v-for="wgt in group.list">
                  <div class="cell" truncate>{{ wgt!.label }}</div>
                </template>
              </vue-draggable>
            </el-collapse-item>
          </template>
        </el-collapse>
      </el-tab-pane> -->

      <!-- Installed plugins -->
      <el-tab-pane v-for="[url, pkg] in installedPlugins?.map(e => [e, loadPkg(e)])" lazy w200>
        <template #label><el-tooltip v-if="pkg" :content="pkg.name" placement="right" :hide-after="0"><img :src="pkg.icon" :alt="pkg.name" /></el-tooltip></template>
        <div v-if="pkg" flex aic px8 py12 text-22 b-b="1 solid [--el-border-color]">
          <img :src="pkg.icon" :alt="pkg.name" mr8 w32 h32 />
          {{ pkg.name }}
        </div>
        <div v-for="(list, category) in groupBy(asyncConfig(url) || [], 'category')" p8>
          <div mt4 mb10 text-16 font-bold>{{ category == 'undefined' ? '其他' : category }}</div>
          <!-- <vue-draggable :model-value="list.filter(e => e.drag != false)" grid="~ cols-2" gap-8 :group="{ name: 'shared', pull: 'clone', put: false }" :sort="false" :clone="clone" @end="onEnd">
            <div v-for="wgtConfig in list.filter(e => e.drag != false)" class="cell" text-14 truncate>{{ wgtConfig.label }}</div>
          </vue-draggable> -->
          <Sortable :model-value="list.filter(e => e.drag != false)" grid="~ cols-2" gap-8 :option="{ group: { name: 'shared', pull: 'clone', put: false }, sort: false, onEnd }" :clone>
            <div v-for="wgtConfig in list.filter(e => e.drag != false)" class="cell" text-14 truncate>{{ wgtConfig.label }}</div>
          </Sortable>
        </div>
      </el-tab-pane>

      <!-- plugins market -->
      <el-tab-pane name="plugins" lazy w250>
        <template #label><el-tooltip content="插件市场" placement="right" :hide-after="0"><i-mdi:power-plug-outline /></el-tooltip></template>
        <PluginsMarket />
      </el-tab-pane>

      <el-tab-pane name="tree" lazy w200>
        <template #label><el-tooltip content="组件树" placement="right" :hide-after="0"><i-mdi:file-tree /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">组件树</div>
        <el-tree hfull overflow-overlay :data="tree" :props="{ label: (e) => e.el?.is ?? e.is }" :current-node-key="designerCtx.activeId" @current-change="designerCtx.activeId = $event._id" node-key="_id" default-expand-all highlight-current :indent="10" :expand-on-click-node="false" />
      </el-tab-pane>
      <el-tab-pane name="state" lazy w256>
        <template #label><el-tooltip content="当前状态" placement="right" :hide-after="0"><i-mdi:code-json /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">当前状态</div>
        <current-state hfull />
      </el-tab-pane>
      <el-tab-pane name="schema" lazy w512>
        <template #label><el-tooltip content="Schema" placement="right" :hide-after="0"><i-mdi:code-tags /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">Schema 源码</div>
        <schema />
      </el-tab-pane>
      <slot name="activity-bar"></slot>
    </el-tabs>
    
    <!-- Canvas Viewport -->
    <infinite-viewer wfull hfull overflow-hidden :cursor="middlePressed && 'grab'" style="background: var(--el-fill-color-light)" @click="designerCtx.activeId = undefined" @mousedown.middle.prevent="middlePressed = true" @mouseup.middle.prevent="middlePressed = false" @pinch="designerCtx.canvas.zoom = $event.zoom">
      <div ref="viewport" class="viewport relative" :style="designerCtx.canvas.style" @mousedown.left.stop @click.stop @mouseleave="designerCtx.draggedId || (designerCtx.hoverId = undefined)">
        <!-- <drag-box id="root" :el="root" h1080 overflow-auto /> -->
         <div hfull overflow-auto>
           <DragBox2 id="root" :el="root" min-hfull />
         </div>
        <selected-layer />
        <Moveable :target="activeEl()" :resizable="true" :rotatable="false" :renderDirections="resizeDir(designerCtx.active)" :origin="false" :useResizeObserver="true" :useMutationObserver="true" :hideDefaultLines="true" @resizeStart="onDragStart" @resize="onResize" @resizeEnd="onResizeEnd" @rotateStart="onDragStart" @rotate="onDrag" @rotateEnd="onDragEnd" />
        <Moveable v-if="designerCtx.hover?.style?.position == 'absolute'" :target="hoverEl() == rootEl() ? undefined : hoverEl()" :draggable="true" :origin="false" :useResizeObserver="true" :useMutationObserver="true" :hideDefaultLines="true" @dragStart="onDragStart" @drag="onDrag" @dragEnd="onDragEnd" />
      </div>
    </infinite-viewer>
    
    <!-- Setting -->
    <aside w256 b-l="1px solid [--el-border-color]" overflow-overlay>
      <setting-panel />
    </aside>
    <state-drawer />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, onUpdated, watch, watchEffect, getCurrentInstance, toRefs, toRef } from 'vue'
import { isArray, isPlainObject, remove } from '@vue/shared'
import { computedAsync, toReactive, useDebouncedRefHistory, useDropZone, useEventListener, useLocalStorage } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
// import { VueDraggable } from 'vue-draggable-plus'
import Moveable from 'vue3-moveable'

import { Arrable, get, keyBy, groupBy, pick, set, toArr, treeUtils } from '@el-lowcode/utils'
import { el_lowcode_widgets } from '../components/el_lowcode_widgets'
import { parseAttrs, importJs } from '../components/_utils'
import { BoxProps, ElLowcodeConfig } from '../components/type'
import { DesignerCtx, designerCtxKey } from './interface'
import DragBox from './components/drag-box.vue'
import DragBox2 from './components/drag-box2.vue'
import Sortable from './components/Sortable.vue'
import SelectedLayer from './components/selected-layer.vue'
import SettingPanel from './setting-panel.vue'
import StateDrawer from './components/state-drawer.vue'
import CurrentState from './components/current-state.vue'
import PluginsMarket from './components/PluginsMarket.vue'
import InfiniteViewer from './components/infinite-viewer.vue'
import Schema from './components/schema.vue'
import { vue2esm } from './vue2esm'
import { PageCtx } from '../plugins/web/page'
import { plugins, builtins } from './config'

import OptionsInput from '../components/options-input'
import InputNumber from '../components/InputNumber.vue'
import InputNumbers from '../components/InputNumbers.vue'
import Collapse from '../components/Collapse.vue'
import EditTable from '../components/EditTable.vue'

const app = getCurrentInstance()!.appContext.app
app.use(OptionsInput)
app.component('InputNumber', InputNumber)
app.component('InputNumbers', InputNumbers)
app.component('Collapse', Collapse)
app.component('EditTable', EditTable)

// 根节点
const root = useLocalStorage(
  '@el-lowcode/designer-page',
  { is: 'div' } as PageCtx,
  { listenToStorageChanges: false, deep: true, shallow: false }
)

;(async () => {
  for (const url of builtins) {
    const config = await loadConfig(url)
    Object.assign(el_lowcode_widgets, keyBy(config, 'is'))
  }
  if (root.value.is != 'Page') {
    root.value = parseAttrs(el_lowcode_widgets.Page!) as PageCtx
  }
})()


// 时间旅行
const { history, undo, redo, canRedo, canUndo } = useDebouncedRefHistory(root, { deep: true, debounce: 500 })

// 组件树
const tree = computed<BoxProps[]>(() => treeUtils.changeProp([root.value], [['children', 'children', v => isArray(v) ? v : undefined]]))

// const groups = reactive([
//   {
//     title: '自定义组件',
//     list: computedAsync(() => Promise.all(Object.values(root.value.extraElLowcodeWidgets ?? {}).map(async id => {
//       const { default: config } = await importJs(id) as { default: Arrable<ElLowcodeConfig> }
//       return toArr(config).map(e => el_lowcode_widgets[e.is] = e)
//     })).then(e => e.flat()), [], { onError: e => console.error(e) })
//   },
//   ...Object.entries(groupBy(Object.values(el_lowcode_widgets), 'category')).map(([title, list]) => ({ title, list }))
// ])
// const collapse = ref(groups.map(e => e.title))

const installedPlugins = computed(() => [...new Set([...root.value?.plugins || [], ...builtins])])

// 加载插件 config
watchEffect(() => {
  installedPlugins.value.forEach(async url => {
    const config = await loadConfig(url)
    if (isArray(config)) {
      Object.assign(el_lowcode_widgets, keyBy(config, 'is'))
    }
  })
})

const pkgCache = {}
function loadPkg(url) {
  return (pkgCache[url] ??= computedAsync(() => fetch(`${url}/package.json`).then(e => e.json()))).value
}

const configCache = {}
function asyncConfig(url): ElLowcodeConfig[] {
  return (configCache[url] ??= computedAsync(() => loadConfig(url))).value
}

function loadConfig(url): Promise<ElLowcodeConfig[]> {
  return import(/* @vite-ignore */ `${url}/.lowcode/config.js`).then(e => e.default)
}

async function addRemotePlugin(url?) {
  const { value } = await ElMessageBox.prompt('', '远程插件', { inputValue: url, inputPlaceholder: 'http://xxx' })
  if (!/https?:\/\//.test(value)) return ElMessage.error({ message: '地址错误' })
  const plugins = root.value.plugins ??= []
  plugins.push(value)
}


const viewport = ref<HTMLElement>()

const designerCtx = reactive({
  currentState: {},
  viewport,
  // canvas: { zoom: 1, style: { width: '100%' } },
  // root
  ...toRefs(toReactive(toRef(() => root.value.designer || { canvas: undefined }))),
  widgets: el_lowcode_widgets,
  root,
  flated: computed(() => treeUtils.flat([root.value])),
  keyed: computed(() => keyBy(designerCtx.flated, '_id')),
  active: computed(() => designerCtx.activeId && treeUtils.find([root.value], designerCtx.activeId, { key: '_id' })),
  hover: computed(() => designerCtx.hoverId && treeUtils.find([root.value], designerCtx.hoverId, { key: '_id' })),
  dragged: computed(() => designerCtx.draggedId && treeUtils.find([root.value], designerCtx.draggedId, { key: '_id' })),
// } as { [K in keyof DesignerCtx]: MaybeRef<DesignerCtx[K]> })
}) as DesignerCtx

provide(designerCtxKey, designerCtx)
provide('designerCtx', designerCtx)
defineExpose(designerCtx)

console.log(window.designerCtx = designerCtx);


let cloned: BoxProps
function clone(e) {
  return cloned = parseAttrs(e)
  // return { is: 'div', _id: +new Date + '', children: 'xxx' }
  // console.log(e);
}
function onEnd(e) {
  // if (!(e.to as HTMLElement).classList.contains('container-box')) return
  setTimeout(() => designerCtx.activeId = cloned._id, 100);
  // designerCtx.activeId
}

const activeEl = () => designerCtx.viewport?.querySelector<HTMLElement>(`[_id='${designerCtx.activeId}']`)
const hoverEl = () => designerCtx.viewport?.querySelector<HTMLElement>(`[_id='${designerCtx.hoverId}']`)
const rootEl = () => designerCtx.viewport?.querySelector<HTMLElement>(`[_id='${designerCtx.root._id}']`)

// moveable
function onDragStart(e) {
  designerCtx.draggedId = e.target.getAttribute('_id')
}
function onDrag(e) {
  // e.target.style.transform = e.transform
  e.target.style.transform = `translate(${e.translate[0]}px, ${e.translate[1]}px)`
  e.target.style.setProperty('--x', e.translate[0] + 'px')
  e.target.style.setProperty('--y', e.translate[1] + 'px')
}
function onDragEnd(e) {
  const style = designerCtx.dragged!.style ??= {}
  ;['transform', '--x', '--y'].forEach(k => style[k] = e.target.style.getPropertyValue(k))
  designerCtx.draggedId = undefined
}
function onResize({ target, width, height, transform, drag }) {
  const setw = width != target.offsetWidth
  const seth = height != target.offsetHeight
  setw && (target.style.width = `${width}px`)
  seth && (target.style.height = `${height}px`)
  if (drag.translate[0] != 0 && drag.translate[1] != 0) {
    target.style.transform = transform
    target.style.setProperty('--x', drag.translate[0] + 'px')
    target.style.setProperty('--y', drag.translate[1] + 'px')
  }
}
function onResizeEnd(e) {
  const style = designerCtx.dragged!.style ??= {}
  ;['width', 'height', 'transform', '--x', '--y'].forEach(k => style[k] = e.target.style.getPropertyValue(k) || undefined)
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
  const flated = treeUtils.flat([root.value]) as BoxProps[]
  const parent = flated.find(e => isArray(e.children) ? e.children.includes(designerCtx.active!) : false)
  if (parent) {
    remove(parent.children as [], designerCtx.active)
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

// 拖拽 .vue 自定义组件
const dropZone = ref<HTMLDivElement>(), { isOverDropZone } = useDropZone(dropZone, onDrop)
async function onDrop(_, e: DragEvent) {
  const list = [] as FileSystemFileEntry[]
  for (const item of e.dataTransfer!.items) scanFiles(item.webkitGetAsEntry(), list)

  const fs = await Promise.all(list.map(e => new Promise<File>((s, j) => e.file(s, j))))
  if (!fs.length) return
  
  const loading = ElLoading.service({ lock: true })

  try {
    root.value.extraElLowcodeWidgets ??= {}
    root.value.customComponents ??= {}
    
    for (const file of fs) {
      if (file.name.endsWith('.config.js')) {
        root.value.extraElLowcodeWidgets[file.name] = await file.text()
      }
      else if (file.name.endsWith('.vue') || file.name.endsWith('.js')) {
        const jscode = file.name.endsWith('.vue')
          ? await vue2esm(await file.text(), file.name)
          : await file.text()
        const { default: comp } = await importJs(jscode)
        if (!comp) throw new Error(`文件 ${file.name} 没有默认导出`)
        if (!isPlainObject(comp)) throw new Error(`文件 ${file.name} 应默认导出 vue 组件，但导出的是 ${typeof comp}`)
        const name = comp.name || file.name.split('.')[0]
        root.value.customComponents[name] = jscode
      }
      else {
        console.warn(`不支持的文件类型：${file.name}`)
      }
    }
  } catch (e) {
    alert('导入失败')
    throw e
  } finally {
    loading.close()
  }
}

function scanFiles(entry: FileSystemEntry | null, list: FileSystemFileEntry[] = []) {
  if (!entry) return list
  if (entry.isDirectory) {
    let directoryReader = (entry as FileSystemDirectoryEntry).createReader()
    directoryReader.readEntries((es) => list.push(...es.filter(e => e.isFile) as any[]))
  }
  else if (entry.isFile) {
    list.push(entry as FileSystemFileEntry)
  }
  return list
}
</script>

<style scoped lang="scss">
.layout {
  :deep(.el-card) {
    transition: none;
  }
}

.viewport {
  height: 100%;
  // overflow: auto;
  background: var(--el-fill-color-extra-light);
}

.cell {
  display: flex;
  justify-content: center;
  padding: 4px 6px;
  height: max-content;
  border: 1px dashed var(--el-border-color);
  cursor: move;

  &:hover {
    background: #c0c0c040;
  }
}

:deep(.el-collapse) {
  > .el-collapse-item .el-collapse-item__content {
    padding-bottom: 10px;
  }
}

:deep(.el-tabs--left) {
  .el-tab-pane {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
  }
  .el-tabs__nav-wrap {
    margin-right: 0;
  }
  .el-tabs__header {
    margin-right: 0;
  }
  .el-tabs__item {
    padding: 0;
    border: unset !important;
    margin: 0 !important;
    outline: unset !important;
    &:hover {
      background: var(--el-fill-color-extra-light) !important;
    }

    &>:first-child {
      padding: 8px;
      width: 36px;
      height: 36px;
      outline: unset;
    }
    &.is-active {
      border: unset !important;
      margin: unset !important;
      background-color: unset !important;
    }
  }
  .el-tabs__content {
    padding: 0;
    height: 100%;
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
