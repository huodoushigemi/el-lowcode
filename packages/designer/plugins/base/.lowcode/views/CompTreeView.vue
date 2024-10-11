<template>
  <Tree
    :data="designerCtx.root.children"
    :Node="designerCtx.DisplayNode"
    draggable
    :dropable="({ to, node }) => to.insertable(node)"
    @node-click="node => designerCtx.activeId = node?.id"
    @node-hover="node => designerCtx.hoverId = node?.id"
    #default="{ node }"
  >
    <div flex aic flex-1 w0 pr4 :op="node.hidden ? 20 : 100">
      <div class="mask-icon w20 h20 mr4 op30" :style="`--mask-image: url(${node.config.icon || 'https://api.iconify.design/carbon:dot-mark.svg'})`" />
      <div flex-1 w0 pr4 truncate>{{ node.label }}</div>
    </div>

    <i-tdesign:browse-off v-if="node.hidden" :class="['vs-ai w20 h20 p3 group-hover:block mr4', node.hidden ? 'block' : 'hidden']" @click.stop="node.hidden = !node.hidden" />
    <i-tdesign:browse v-else :class="['vs-ai w20 h20 p3 group-hover:block mr4', node.hidden ? 'block' : 'hidden']" @click.stop="node.hidden = !node.hidden" />

    <i-tdesign:lock-on-filled v-if="node.lock" :class="['vs-ai w20 h20 p3 group-hover:block mr4', node.lock ? 'block' : 'hidden']" @click.stop="node.lock = !node.lock" />
    <i-tdesign:lock-off v-else :class="['vs-ai w20 h20 p3 group-hover:block mr4', node.lock ? 'block' : 'hidden']" @click.stop="node.lock = !node.lock" />
  </Tree>
</template>

<script setup>
import { computed, inject } from 'vue'
import { Tree } from '@el-lowcode/designer'

const designerCtx = inject('designerCtx')
</script>