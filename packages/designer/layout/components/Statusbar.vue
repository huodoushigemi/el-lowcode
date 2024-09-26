<template>
  <footer class="status">
    <slot />
    <template v-for="e in left.sort(sort)">
      <div v-if="!unFn(e.hidden)" :class="e.class" :style="e.style" @click="e.onClick">{{ e.text }}</div>
    </template>

    <div flex-1 style="visibility: hidden;" />
    
    <template v-for="e in right.sort(sort)">
      <div v-if="!unFn(e.hidden)" :class="e.class" :style="e.style" @click="e.onClick">{{ e.text }}</div>
    </template>
  </footer>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { unFn } from '@el-lowcode/utils'
import { DesignerCtx, StatusBarItem } from '../interface'

const designer = inject<DesignerCtx>('designerCtx')!

const left = computed(() => designer.plugins.flatMap(e => e.contributes.statusbar?.filter(e => e.align != 'right') || []))
const right = computed(() => designer.plugins.flatMap(e => e.contributes.statusbar?.filter(e => e.align == 'right') || []))

const sort = (a: StatusBarItem, b: StatusBarItem) => (b.priority || 0) - (a.priority || 0)
</script>

<style lang="scss">
.status {
  display: flex;
  height: 22px;
  color: var(--vscode-statusBar-foreground, #fff);
  background-color: var(----vscode-statusBar-background, #505050);
  line-height: 0;
  // #007acc

  > .statusbar-item, > * {
    margin: 0 3px;
    padding: 0 5px;
    font-size: 12px;
    height: 22px;
    line-height: 22px;
    cursor: pointer;
    box-sizing: content-box;

    &:hover {
      background-color: var(--vscode-statusBarItem-hoverBackground, #ffffff1f);
    }
  }
}
</style>
