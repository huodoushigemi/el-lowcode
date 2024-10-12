<template>
  <footer class="vs-status">
    <slot />
    <template v-for="e in left.sort(sort)">
      <Item :e="e" />
    </template>

    <div flex-1 style="visibility: hidden;" />
    
    <template v-for="e in right.sort(sort)">
      <Item :e="e" />
    </template>
  </footer>
</template>

<script setup lang="tsx">
import { computed, inject } from 'vue'
import { isObject } from '@vue/shared'
import { unFn } from '@el-lowcode/utils'
import { Render } from '@el-lowcode/render'
import { DesignerCtx, Renderer, StatusBarItem } from '../interface'

const designer = inject<DesignerCtx>('designerCtx')!

const left = computed(() => designer.plugins.flatMap(e => e.contributes.statusbar?.filter(e => e.align != 'right') || []))
const right = computed(() => designer.plugins.flatMap(e => e.contributes.statusbar?.filter(e => e.align == 'right') || []))

const sort = (a: StatusBarItem, b: StatusBarItem) => (b.priority || 0) - (a.priority || 0)

const Item = ({ e }: { e: StatusBarItem}) => !unFn(e.hidden) && (
  <div class={[e.class, 'li flex aic space-x-4']} style={e.style} onClick={() => (designer.commands.emit(e.command!), e.onClick?.(designer))} {...renderer(e.renderer)}>
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
.vs-status {
  display: flex;
  height: 22px;
  // color: var(--vscode-statusBar-foreground, #fff);
  background-color: var(--vs-statusbar-bg);
  line-height: 0;
  // #007acc

  > .li {
    margin: 0 3px;
    padding: 0 5px;
    font-size: 12px;
    height: 22px;
    line-height: 22px;
    cursor: pointer;
    box-sizing: content-box;

    &:hover {
      background-color: var(--vs-statusbar-hover-bg);
    }
  }
}
</style>
