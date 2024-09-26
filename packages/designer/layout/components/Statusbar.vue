<template>
  <footer class="status">
    <slot />
  </footer>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { DesignerCtx } from '../interface'

const designer = inject<DesignerCtx>('designerCtx')!
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
