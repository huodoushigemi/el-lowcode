<template>
  <footer class="status">
    <slot />
    <template v-for="e in left.sort(sort)">
      <Item v-bind="e" />
    </template>

    <div flex-1 style="visibility: hidden;" />
    
    <template v-for="e in right.sort(sort)">
      <Item v-bind="e" />
    </template>
  </footer>
</template>

<script setup lang="tsx">
import { computed, inject } from 'vue'
import { unFn } from '@el-lowcode/utils'
import { Render } from '@el-lowcode/render'
import { DesignerCtx, Renderer, StatusBarItem } from '../interface'
import { isObject } from '@vue/shared';

const designer = inject<DesignerCtx>('designerCtx')!

const left = computed(() => designer.plugins.flatMap(e => e.contributes.statusbar?.filter(e => e.align != 'right') || []))
const right = computed(() => designer.plugins.flatMap(e => e.contributes.statusbar?.filter(e => e.align == 'right') || []))

const sort = (a: StatusBarItem, b: StatusBarItem) => (b.priority || 0) - (a.priority || 0)

const Item = (e: StatusBarItem) => !unFn(e.hidden) && (
  <div class={[e.class, 'flex aic space-x-4']} style={e.style} onClick={() => e.onClick?.(designer)} {...renderer(e.renderer)}>
    {e.icon && (isObject(e.icon) ? Render(e.icon) : <img src={unFn(e.icon)} class='hfull wa' />)}
    {e.text}
  </div>
)

const renderer = (renderer?: Renderer) => ({
  'onVnodeMounted': ({ el }) => renderer?.mount?.(el, designer),
  'onVnodeUnmounted': ({ el }) => renderer?.unmount?.(el, designer),
})
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
