<template>
  <template v-for="e in aaa">
    <div class="flex aic px20">
      <img class="w24 h24 mr8" :src="e.packageJSON.icon" />
      <h2 class="my0 uppercase">{{ e.packageJSON.displayName ?? e.packageJSON.name }}</h2>
    </div>
    <CompView :list="e.widgets" />
    <div class="mt8 mb12" style="height: 1px; background: var(--vscode-dropdown-border)" />
  </template>
</template>

<script setup>
import { inject, computed } from 'vue'
import { computedAsync } from '@vueuse/core'
import { CompView } from '@el-lowcode/designer'

const designer = inject('designerCtx')

const xxx = {}

const aaa = computed(() => {
  const plugins = designer.root.plugins ?? []
  return plugins.map(url => 
    (xxx[url] ??= computedAsync(async () => {
      const plugin = await import(/* @vite-ignore */ `${url}/.lowcode/index.js`)
      const packageJSON = await fetch(`${url}/.lowcode/package.json`).then(e => e.json())
      return { url, packageJSON, widgets: plugin.widgets }
    }, void 0, { onError: e => console.error(e) })).value
  ).filter(e => e)
})
</script>