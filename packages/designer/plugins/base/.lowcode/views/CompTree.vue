<template>
  <ElTree
    ref="treeRef"
    class="overflow-overlay [&>.el-tree\_\_drop-indicator]:h4"
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
    @node-click="focusViewport"
  >
    <template #default="{ node, data }">
      <div class="el-tree-node__label group" flex="~ 1" lh-26 @mouseenter="designerCtx.hoverId = data._id">
        <div flex-1 w0 truncate @dblclick="edit = data">
          <template v-if="edit != data">{{ getLabel(data) }}</template>
          <input v-else ref="inputRef" :value="getLabel(data)" @change="designerCtx.active['data-layer'] = $event.target.value.trim() || void 0" focus:outline="1 solid" mt2 p0 lh-22 block />
        </div>
        <div :class="data['data-lock'] ? 'block' : 'group-hover:block hidden'" w26 h26 p6 bg-hover @click="getData(node)['data-lock'] = data['data-lock'] ? void 0 : true">
          <div :class="data['data-lock'] ? 'i-ep-lock' : 'i-ep-unlock'" />
        </div>
        <div w26 h26 p6 bg-hover @click="getData(node)['data-hide'] = data['data-hide'] ? void 0 : true">
          <div :class="data['data-hide'] ? 'i-ep-hide' : 'i-ep-view'" />
        </div>
      </div>
    </template>
  </ElTree>
</template>

<script setup>
import { computed, inject, ref, watchEffect, watch } from 'vue'
import { isArray, isString, remove } from '@vue/shared'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { ElTree } from 'element-plus'
import { treeUtils } from '@el-lowcode/utils'

const designerCtx = inject('designerCtx')

const treeRef = ref()
const tree = computed(() => treeUtils.changeProp(designerCtx.root.children, [['children', 'children', v => isArray(v) ? v : undefined]]))

watch([tree, () => designerCtx.activeId], () => treeRef.value?.setCurrentKey(designerCtx.activeId, false), { immediate: true, flush: 'post' })

function getLabel(data) {
  if (!data) return
  data = designerCtx.keyed[data._id]
  return data['data-layer'] ?? (
    isString(data.children)
      ? data.children
      : data.el?.is ?? data.is
  )
}

function getData(node) {
  return designerCtx.keyed[node.key]
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
  drag = designerCtx.keyed[drag.data._id]
  drop = designerCtx.keyed[drop.data._id]
  const dragParent = treeUtils.findParent([designerCtx.root], drag._id, { key: '_id' })
  const dropParent = treeUtils.findParent([designerCtx.root], drop._id, { key: '_id' })
  // dragParent.children.splice()
  remove(dragParent.children, drag)
  if (type == 'before') {
    dropParent.children.splice(dropParent.children.indexOf(drop), 0, drag)
  }
  else if (type == 'after') {
    dropParent.children.splice(dropParent.children.indexOf(drop) + 1, 0, drag)
  }
  else if (type == 'inner') {
    if (drag.style?.position == 'absolute') {
      ['position', 'transform'].forEach(k => {
        drag.style[k] = void 0
      })
    }
    drop.children.push(drag)
  }
}

function focusViewport() {
  document.querySelector('.viewport')?.focus()
}
</script>