<template>
  <template v-for="e in designer.plugins.filter(e => e.widgets?.length)">
    <div class="flex aic px20">
      <img class="w24 h24 mr8" :src="e.packageJSON.icon" />
      <h2 class="my0 uppercase">{{ e.packageJSON.displayName ?? e.packageJSON.name }}</h2>
    </div>
    <CompView :list="e.widgets" />
    <div class="mt8 mb12" style="height: 1px; background: var(--vscode-dropdown-border)" />
  </template>
</template>

<script setup>
import { inject } from 'vue'
import { CompView } from '@el-lowcode/designer'

const designer = inject('designerCtx')
</script>