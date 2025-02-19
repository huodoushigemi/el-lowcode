<template>
  <footer class="vs-status">
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
import { isObject, normalizeClass } from '@vue/shared'
import { unFn, unVal } from '@el-lowcode/utils'
import { createRender, Render } from '@el-lowcode/render'
import { DesignerCtx, Renderer, StatusBarItem } from '../interface'
import Icon from '../../components/Icon.vue'
import { useLcd } from '../../utils'

const lcd = useLcd()

const left = computed(() => lcd.plugins.flatMap(e => e.contributes.statusbar?.filter(e => e.align != 'right') || []))
const right = computed(() => lcd.plugins.flatMap(e => e.contributes.statusbar?.filter(e => e.align == 'right') || []))

const sort = (a: StatusBarItem, b: StatusBarItem) => (b.priority || 0) - (a.priority || 0)

const e = (e: StatusBarItem, { slots }) => (
  <div class={['li flex aic space-x-4']} style={e.style} op={unFn(e.disabled) && '20'} onClick={() => lcd.commands.emit(e.command!)} {...renderer(e.renderer)}>
    {e.icon && (isObject(e.icon) ? Render({ is: Icon, ...e.icon, class: normalizeClass(['hfull wa min-w22', e.icon.class]) }) : <Icon class='hfull wa min-w22' src={unVal(e.icon)} />)}
    {e.text}
    {slots.default?.()}
  </div>
)

const Item = createRender({ defaultIs: e })

const renderer = (renderer?: Renderer) => ({
  'onVnodeMounted': ({ el }) => renderer?.mount?.(el, lcd),
  'onVnodeUnmounted': ({ el }) => renderer?.unmount?.(el, lcd),
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
