<template>
  <Tree
    :data="lcd.root.children"
    :Node="lcd.DisplayNode"
    draggable
    :dropable="({ to, node }) => to.insertable(node)"
    :expandKeys="expandKeys"
    :dragstate="lcd.state.dragstate"
    v-model:selected-keys="selectedKeys"
    @node-down="node => node?.click()"
    @node-hover="node => node?.hover()"
    #default="{ node }"
  >
    <div flex aic flex-1 w0 pr4 :op="node.hidden ? 20 : 100">
      <div class="mask-icon w20 h20 mr4 op30" :ml="node.dir ? '' : 18" :style="`--mask-image: url(${node.config?.icon || 'https://api.iconify.design/carbon:dot-mark.svg'})`" />
      <div flex-1 w0 pr4 truncate>{{ node.label }}</div>
    </div>

    <i-tdesign:browse-off v-if="node.hidden" :class="['vs-ai w20 h20 p3 group-hover:block mr4', node.hidden ? 'block' : 'hidden']" @click.stop="node.hidden = !node.hidden" />
    <i-tdesign:browse v-else :class="['vs-ai w20 h20 p3 group-hover:block mr4', node.hidden ? 'block' : 'hidden']" @click.stop="node.hidden = !node.hidden" />

    <i-tdesign:lock-on-filled v-if="node.lock" :class="['vs-ai w20 h20 p3 group-hover:block mr4', node.lock ? 'block' : 'hidden']" @click.stop="node.lock = !node.lock" />
    <i-tdesign:lock-off v-else :class="['vs-ai w20 h20 p3 group-hover:block mr4', node.lock ? 'block' : 'hidden']" @click.stop="node.lock = !node.lock" />
  </Tree>
</template>

<script setup>
import { inject, reactive, ref, watchEffect } from 'vue'
import Tree from '../../../../layout/components/Tree.vue'

const lcd = inject('designerCtx')

const expandKeys = reactive({})
const selectedKeys = ref([])
watchEffect(() => {
  const node = lcd.active
  if (!node) return
  node.parents.reduce((o, e) => (o[e.id] = true, o), expandKeys)
  selectedKeys.value = [node.id]
})
</script>