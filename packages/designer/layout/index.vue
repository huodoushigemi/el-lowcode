<template>
  <div class="layout" grid="~ cols-[auto_1fr_auto] rows-[auto_1fr]" data-designer>
    <!-- Header -->
    <header col-span-full h56 flex items-center b-b="1px solid [--el-border-color]">
      <div flex items-center>
        <i-ep:eleme w44 h44 c="[--el-color-primary]" />
        <b ml8 text-22>El lowcode</b>
      </div>
      <div class="[&>*]:p4 [&>*]:w24 [&>*]:h24 [&>.is-active]:c-[--el-color-primary]" flex-1 flex justify-center space-x-4>
        <i-mdi:desktop-mac :class="canvasWidth == '100%' && 'is-active'" bg-hover @click="canvasWidth = '100%'" />
        <i-raphael:ipad :class="canvasWidth == '768px' && 'is-active'" bg-hover @click="canvasWidth = '768px'" />
        <i-mdi:cellphone-android :class="canvasWidth == '480px' && 'is-active'" bg-hover @click="canvasWidth = '480px'" />
      </div>
      <div class="[&>*]:p4 [&>*]:w24 [&>*]:h24" flex space-x-20 px20 shrink-0>
        <el-tooltip content="clear"><i-mdi:close bg-hover @click="root = parseAttrs(el_lowcode_widgets.Page!)" /></el-tooltip>
        <i-mdi:undo-variant :op="!canUndo && '20'" bg-hover @click="undo()" />
        <i-mdi:redo-variant :op="!canRedo && '20'" bg-hover @click="redo()" ml4="!" />
        <slot name="actions"></slot>
      </div>
    </header>

    <!-- Left -->
    <el-tabs tab-position="left" type="border-card" hfull b-r="1px solid [--el-border-color]" box-border>
      <el-tab-pane w200>
        <template #label><el-tooltip content="组件库" placement="right" :hide-after="0"><i-mdi:widgets-outline w22 h22 /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">组件</div>
        <el-collapse v-model="collapse" pl12 pr8 hfull overflow-overlay>
          <el-collapse-item v-for="group in groups" :title="group.title" :name="group.title">
            <vue-draggable :model-value="group.list" grid="~ cols-2" gap-8 hfull overflow-overlay :group="{ name: 'shared', pull: 'clone', put: false }" :sort="false" :clone="clone" @end="onEnd">
              <template v-for="wgt in group.list">
                <div class="cell" truncate>{{ wgt!.label }}</div>
              </template>
            </vue-draggable>
          </el-collapse-item>
        </el-collapse>
        <!-- <vue-draggable :model-value="list" grid="~ cols-2" gap-8 p8 hfull overflow-overlay :group="{ name: 'shared', pull: 'clone', put: false }" :sort="false" :clone="clone" @end="onEnd">
          <template v-for="wgt in list">
            <div class="cell" truncate>{{ wgt.label }}</div>
          </template>
        </vue-draggable> -->
      </el-tab-pane>
      <el-tab-pane lazy w200>
        <template #label><el-tooltip content="组件树" placement="right" :hide-after="0"><i-mdi:file-tree w22 h22 /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">组件树</div>
        <el-tree hfull overflow-overlay :data="tree" :props="{ label: (e) => e.el?.is ?? e.is }" :current-node-key="designerCtx.activeId" @current-change="designerCtx.activeId = $event._id" node-key="_id" default-expand-all highlight-current :indent="10" :expand-on-click-node="false" />
      </el-tab-pane>
      <el-tab-pane lazy w256>
        <template #label><el-tooltip content="当前状态" placement="right" :hide-after="0"><i-mdi:code-json w22 h22 /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">当前状态</div>
        <current-state hfull />
      </el-tab-pane>
      <el-tab-pane lazy w512>
        <template #label><el-tooltip content="Schema" placement="right" :hide-after="0"><i-mdi:code-tags w22 h22 /></el-tooltip></template>
        <div px8 py12 text-22 b-b="1 solid [--el-border-color]">Schema 源码</div>
        <schema hfull />
      </el-tab-pane>
      <slot name="activity-bar"></slot>
    </el-tabs>
    
    <!-- Canvas Viewport -->
    <main id="canvas-viewport" flex-1 p12 bg="[--el-fill-color-lighter]" overflow-overlay>
      <!-- <page :root="root" /> -->
      <selected-layer />
      <wc-fill-remain ma :style="stringifyStyle(designerCtx.canvas.style)">
        <drag-box id="root" :el="root" min-hinherit mb0="!" />
      </wc-fill-remain>
    </main>
    
    <!-- Setting -->
    <aside w256 b-l="1px solid [--el-border-color]" overflow-overlay>
      <setting-panel />
    </aside>
    <state-drawer />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, toRefs } from 'vue'
import { isArray, remove, stringifyStyle } from '@vue/shared'
import { VueDraggable } from 'vue-draggable-plus'
import { useDebouncedRefHistory, useEventListener, useLocalStorage } from '@vueuse/core'
import { keyBy, treeUtils } from '@el-lowcode/utils'

import { el_lowcode_widgets } from '../components/el_lowcode_widgets'
import { components } from '../components'
import { parseAttrs } from '../components/_utils'
import { BoxProps } from '../components/type'
import { designerCtxKey } from './interface'
import DragBox from './components/drag-box.vue'
import SelectedLayer from './components/selected-layer.vue'
import SettingPanel from './setting-panel.vue'
import StateDrawer from './components/state-drawer.vue'
import CurrentState from './components/current-state.vue'
import Schema from './components/schema.vue'

defineOptions({
  components: keyBy(components, 'name')
})

const findWgts = (arr: string[]) => arr.map(e => el_lowcode_widgets[e])
const groups = [
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
]
const collapse = ref(groups.map(e => e.title))

// 本地持久化
const root = useLocalStorage(
  '@el-lowcode/designer-page',
  parseAttrs(el_lowcode_widgets.Page!),
  { listenToStorageChanges: false, deep: true }
)

// 时间旅行
const { history, undo, redo, canRedo, canUndo } = useDebouncedRefHistory(root, { deep: true, debounce: 500 })

const tree = computed<BoxProps[]>(() => treeUtils.changeProp([root.value], [['children', 'children', v => isArray(v) ? v : undefined]]))

/**
 * @type {import('./interface').DesignerCtx}
 */
const designerCtx = reactive({
  activeId: root.value._id,
  hoverId: undefined,
  openState: ref(false),
  currentState: {},
  canvas: { style: { width: '100%' } },
  root,
  get active() { return treeUtils.find([root.value], this.activeId, { key: '_id' }) as unknown as BoxProps },
  get hover() { return treeUtils.find([root.value], this.hoverId, { key: '_id' }) as unknown as BoxProps }
})

const canvasWidth = computed({
  get: () => designerCtx.canvas.style.width,
  set: val => designerCtx.canvas.style.width = val
})

provide(designerCtxKey, designerCtx)
defineExpose({ ...toRefs(designerCtx) })

let cloned: BoxProps
function clone(e) {
  return cloned = parseAttrs(e)
}
function onEnd(e) {
  if (!(e.to as HTMLElement).classList.contains('container-box')) return
  setTimeout(() => designerCtx.activeId = cloned._id, 100);
}

// 按 Delete 删除当前选中元素
useEventListener('keydown', (e) => {
  if (e.key !== 'Delete') return
  if (!designerCtx.activeId) return
  const flated = treeUtils.flat([root.value]) as BoxProps[]
  const parent = flated.find(e => isArray(e.children) ? e.children.includes(designerCtx.active) : false)
  if (parent) {
    remove(parent.children as [], designerCtx.active)
    designerCtx.activeId = undefined
    designerCtx.hoverId = undefined
  } else {
    root.value.children = []
  }
})
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
    bor
    &:hover {
      background: var(--el-fill-color-extra-light) !important;
    }

    &>:first-child {
      padding: 12px;
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
