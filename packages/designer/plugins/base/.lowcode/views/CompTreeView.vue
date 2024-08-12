<template>
  <Tree
    :data="designerCtx.root.children"
    :props="{ id: '_id', label: e => e['data-layer'] || (isString(e.children) && e.children) || e.is, children: e => typeof e.children == 'string' ? void 0 : e.children }"
    draggable
    :dropable="({ to }) => to.dir"
  />
</template>

<script setup>
import { inject } from 'vue'
import { isString } from '@vue/shared'
import { Tree } from '@el-lowcode/designer'

const designerCtx = inject('designerCtx')
</script>