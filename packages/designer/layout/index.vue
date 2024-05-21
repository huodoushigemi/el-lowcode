<template>
  <div class="layout" grid="~ cols-[auto_1fr_auto] rows-[auto_1fr]" data-designer>
    <!-- Header -->
    <header col-span-full h56 flex aic b-b="1px solid [--el-border-color]">
      <div flex aic>
        <i-ep:eleme w44 h44 c="[--el-color-primary]" />
        <b ml8 text-22>El lowcode</b>
      </div>
      <div class="[&>*]:p4 [&>*]:w32 [&>*]:h32 [&>.is-active]:c-[--el-color-primary]" flex-1 flex justify-center space-x-4>
        <i-mdi:desktop-mac :class="canvasWidth == '1280px' && 'is-active'" bg-hover @click="canvasWidth = '1280px'" />
        <i-raphael:ipad :class="canvasWidth == '768px' && 'is-active'" bg-hover @click="canvasWidth = '768px'" />
        <i-mdi:cellphone-android :class="canvasWidth == '480px' && 'is-active'" bg-hover @click="canvasWidth = '480px'" />
      </div>
      <div class="[&>*]:p4 [&>*]:w32 [&>*]:h32" flex space-x-20 px20 shrink-0>
        <el-tooltip content="clear"><i-mdi:close bg-hover @click="root = parseAttrs(el_lowcode_widgets.Page!)" /></el-tooltip>
        <i-mdi:undo-variant :op="!canUndo && '20'" bg-hover @click="undo()" />
        <i-mdi:redo-variant :op="!canRedo && '20'" bg-hover @click="redo()" ml4="!" />
        <slot name="actions"></slot>
      </div>
    </header>

    <!-- Left -->
    <el-tabs tab-position="left" type="border-card" hfull b-r="1px solid [--el-border-color]" box-border> 
      <el-tab-pane w200 ref="dropZone" :class="isOverDropZone && `overlay`">
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
        <!-- <vue-draggable :model-value="list" grid="~ cols-2" gap-8 p8 hfull overflow-overlay :group="{ name: 'shared', pull: 'clone', put: false }" :sort="false" :clone="clone" @end="onEnd">
          <template v-for="wgt in list">
            <div class="cell" truncate>{{ wgt.label }}</div>
          </template>
        </vue-draggable> -->
      </el-tab-pane>
      <el-tab-pane lazy w200>
        <template #label><el-tooltip content="组件树" placement="right" :hide-after="0"><i-mdi:file-tree /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">组件树</div>
        <el-tree hfull overflow-overlay :data="tree" :props="{ label: (e) => e.el?.is ?? e.is }" :current-node-key="designerCtx.activeId" @current-change="designerCtx.activeId = $event._id" node-key="_id" default-expand-all highlight-current :indent="10" :expand-on-click-node="false" />
      </el-tab-pane>
      <el-tab-pane lazy w256>
        <template #label><el-tooltip content="当前状态" placement="right" :hide-after="0"><i-mdi:code-json /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">当前状态</div>
        <current-state hfull />
      </el-tab-pane>
      <el-tab-pane lazy w512>
        <template #label><el-tooltip content="Schema" placement="right" :hide-after="0"><i-mdi:code-tags /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">Schema 源码</div>
        <schema />
      </el-tab-pane>
      <slot name="activity-bar"></slot>
    </el-tabs>
    
    <!-- Canvas Viewport -->
    <infinite-viewer wfull hfull style="background: var(--el-fill-color-light)" @click="designerCtx.activeId = undefined">
      <div ref="viewport" class="viewport relative" :style="`width: ${canvasWidth}; background: var(--el-fill-color-extra-light)`" @click.stop>
        <drag-box id="root" :el="root" h1080 />
        <selected-layer v-if="!designerCtx.draggedId" />
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
import { MaybeRef, computed, provide, reactive, ref } from 'vue'
import { isArray, isObject, isPlainObject, remove } from '@vue/shared'
import { ElLoading } from 'element-plus'
import { VueDraggable } from 'vue-draggable-plus'
import { computedAsync, useDebouncedRefHistory, useDropZone, useEventListener, useLocalStorage } from '@vueuse/core'
import { Arrable, keyBy, toArr, treeUtils } from '@el-lowcode/utils'

import { el_lowcode_widgets } from '../components/el_lowcode_widgets'
import { components } from '../components'
import { parseAttrs, importJs } from '../components/_utils'
import { BoxProps, ElLowcodeConfig } from '../components/type'
import { DesignerCtx, designerCtxKey } from './interface'
import DragBox from './components/drag-box.vue'
import SelectedLayer from './components/selected-layer.vue'
import SettingPanel from './setting-panel.vue'
import StateDrawer from './components/state-drawer.vue'
import CurrentState from './components/current-state.vue'
import InfiniteViewer from './components/infinite-viewer.vue'
import Schema from './components/schema.vue'
import { vue2esm } from './vue2esm'

defineOptions({
  components: keyBy(components, 'name')
})

// 根节点
const root = useLocalStorage(
  '@el-lowcode/designer-page',
  parseAttrs(el_lowcode_widgets.Page!),
  { listenToStorageChanges: false, deep: true, shallow: false }
)

// 时间旅行
const { history, undo, redo, canRedo, canUndo } = useDebouncedRefHistory(root, { deep: true, debounce: 500 })

// 组件树
const tree = computed<BoxProps[]>(() => treeUtils.changeProp([root.value], [['children', 'children', v => isArray(v) ? v : undefined]]))

const findWgts = (arr: string[]) => arr.map(e => el_lowcode_widgets[e]).filter(e => e)
const groups = reactive([
  {
    title: '自定义组件',
    list: computedAsync(() => Promise.all(Object.values(root.value.extraElLowcodeWidgets ?? {}).map(async id => {
      const { default: config } = await importJs(id) as { default: Arrable<ElLowcodeConfig> }
      return toArr(config).map(e => el_lowcode_widgets[e.is] = e)
    })).then(e => e.flat()), [], { onError: e => console.error(e) })
  },
  {
    title: '数据输入',
    list: findWgts(['Form', 'ElInput', 'ElInputNumber', 'ElSlider', 'ElRate', 'ElRadioGroup', 'ElCheckboxGroup', 'ElSwitch', 'ElDatePicker', 'ElTimePicker', 'DateTime', 'ElColorPicker'])
  },
  {
    title: '布局容器',
    list: findWgts(['div', 'wc-waterfall', 'a', 'Grid', 'ElCard', 'ElTabs'])
  },
  {
    title: '通用',
    list: findWgts(['span', 'p', 'h1', 'img', 'ElText', 'ElLink', 'ElButton'])
  },
  {
    title: '展示',
    list: findWgts(['ElAlert', 'ElStatistic', 'Descriptions', 'ElCarousel', 'ElProgress', 'ElDivider', 'ElTooltip', 'ElTag', 'Code', 'wc-appbar'])
  },
  {
    title: '其他',
    list: findWgts(['iframe'])
  }
])
const collapse = ref(groups.map(e => e.title))

const viewport = ref<HTMLElement>()
const canvasWidth = computed({
  get: () => designerCtx.canvas.style.width,
  set: val => designerCtx.canvas.style.width = val
})

const designerCtx = reactive({
  activeId: root.value._id,
  openState: ref(false),
  currentState: {},
  viewport,
  canvas: { style: { width: '100%' } },
  root,
  active: computed(() => designerCtx.activeId && treeUtils.find([root.value], designerCtx.activeId, { key: '_id' })),
  hover: computed(() => designerCtx.hoverId && treeUtils.find([root.value], designerCtx.hoverId, { key: '_id' })),
  dragged: computed(() => designerCtx.draggedId && treeUtils.find([root.value], designerCtx.draggedId, { key: '_id' })),
} as { [K in keyof DesignerCtx]: MaybeRef<DesignerCtx[K]> })

provide(designerCtxKey, designerCtx)
defineExpose(designerCtx)

let cloned: BoxProps
function clone(e) {
  return cloned = parseAttrs(e)
  // return { is: 'div', _id: +new Date + '', children: 'xxx' }
  // console.log(e);
}
function onEnd(e) {
  if (!(e.to as HTMLElement).classList.contains('container-box')) return
  setTimeout(() => designerCtx.activeId = cloned._id, 100);
  // designerCtx.activeId
}

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

// 拖拽 .vue 自定义组件
const dropZone = ref<HTMLDivElement>(), { isOverDropZone } = useDropZone(dropZone, onDrop)
async function onDrop(_, e: DragEvent) {

  const list = [] as FileSystemFileEntry[]
  for (const item of e.dataTransfer!.items) scanFiles(item.webkitGetAsEntry(), list)

  const loading = ElLoading.service({ lock: true })

  try {
    const fs = await Promise.all(list.map(e => new Promise<File>((s, j) => e.file(s, j))))
    if (!fs.length) return

    const widgets = root.value.extraElLowcodeWidgets ??= {}
    const components = root.value.customComponents ??= {}
    
    fs!.forEach(async file => {
      if (file.name.endsWith('.config.js')) {
        widgets[file.name] = await file.text()
      }
      else if (file.name.endsWith('.vue') || file.name.endsWith('.js')) {
        const jscode = file.name.endsWith('.vue')
          ? await vue2esm(await file.text(), file.name)
          : await file.text()
        const { default: comp } = await importJs(jscode)
        if (!comp) throw new Error(`文件 ${file.name} 没有默认导出`)
        if (!isPlainObject(comp)) throw new Error(`文件 ${file.name} 应默认导出 vue 组件，但导出的是 ${typeof comp}`)
        const name = comp.name || file.name.split('.')[0]
        components[name] = jscode
      }
      else {
        console.warn(`不支持的文件类型：${file.name}`)
      }
    })
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
