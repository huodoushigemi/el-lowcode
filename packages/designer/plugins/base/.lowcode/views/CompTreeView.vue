<template>
  <Tree
    :data="designerCtx.root.children"
    :DisplayNode="$DisplayNode"
    draggable
    :dropable="({ to }) => to.dir"
  />
</template>

<script setup>
import { computed, inject } from 'vue'
import { Tree, DisplayNode } from '@el-lowcode/designer'

const designerCtx = inject('designerCtx')

const $DisplayNode = class extends DisplayNode {
  designerCtx = designerCtx
}
</script>