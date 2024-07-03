<template>
  <div px8 py12 text-22 b-b="1 solid [--el-border-color]">图层</div>
  <el-tree
    class="hfull overflow-overlay [&>.el-tree\_\_drop-indicator]:h4"
    style="--el-color-primary-light-9: var(--el-color-primary-light-8)"
    :data="tree"
    :current-node-key="designerCtx.activeId"
    @current-change="designerCtx.activeId = $event._id"
    node-key="_id"
    default-expand-all
    highlight-current
    :indent="10"
    :expand-on-click-node="false"
    draggable
    :allow-drop="allowDrop"
    @node-drop="nodeDrop"
  >
    <template #default="{ node, data }">
      <div class="el-tree-node__label" flex-1 w0 truncate lh-26 @dblclick="edit = data">
        <template v-if="edit != data">{{  getLabel(data) }}</template>
        <input v-else ref="inputRef" :value="getLabel(data)" @change="designerCtx.active['data-layer'] = $event.target.value.trim() || void 0" focus:outline="1 solid" p0 lh-22 block />
      </div>
    </template>
  </el-tree>
</template>

<script setup>
import { computed, inject, ref, watchEffect } from 'vue'
import { isArray, isString } from '@vue/shared'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { get, keyBy, groupBy, pick, set, toArr, treeUtils } from '@el-lowcode/utils'
import { designerCtxKey } from '../interface'
import { refWithWatch } from '../../components/hooks'

// import type {
//   AllowDropType,
//   NodeDropType,
// } from 'element-plus/es/components/tree/src/tree.type'

const designerCtx = inject(designerCtxKey)

const tree = computed(() => treeUtils.changeProp([designerCtx.root], [['children', 'children', v => isArray(v) ? v : undefined]]))

const label = refWithWatch(() => getLabel(designerCtx.active))

function getLabel(data) {
  if (!data) return
  data = designerCtx.keyed[data._id]
  return data['data-layer'] ?? (
    isString(data.children)
      ? data.children
      : data.el?.is ?? data.is
  )
}

const inputRef = ref()
const edit = ref()

onClickOutside(inputRef, () => edit.value = null)
useEventListener(inputRef, 'keyup', e => e.key == 'Escape' && (edit.value = null))
watchEffect(() => {
  if (!inputRef.value) return
  inputRef.value.focus()
  inputRef.value.select()
})

function dblclick() {

}

function allowDrop(drag, drop, type) {  
  drop = designerCtx.keyed[drop.data._id]
  return type != 'inner' || isArray(drop.children)
}

function nodeDrop(drag, drop, type) {
  // todo
  drag = designerCtx.keyed[drag.data._id]
  drop = designerCtx.keyed[drop.data._id]
}
</script>