<template>
  <div class="vs-menu" v-list-focus>
    <div v-for="node in data" class="vs-menu-li" :disabled="node.disabled" @click="node.click?.()">
      <div v-if="node.icon" class="mask-icon w1em h1em mr6" :style="`--mask-image：url(${node.icon})`" />
      {{ node.label }}
      <template v-if="isArray(node.children) && node.children.length">
        <i-mdi:chevron-right mla />
        <Tippy :extra="{ interactive: true, offset: [0, 4], delay: [100, 300], duration: 0, placement: 'right-start' }">
          <Menu :data="node.children" />
        </Tippy>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isArray } from '@vue/shared'
import { vListFocus } from '@el-lowcode/utils'
import Tippy from './tippy.vue'

defineProps<{
  data: any[]
}>()
</script>