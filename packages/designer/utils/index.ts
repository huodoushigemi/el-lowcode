import { computed, MaybeRefOrGetter, reactive, Ref, ref, toValue, watchEffect, watchSyncEffect } from 'vue'
import { isArray, isObject } from '@vue/shared'
import { useTransformer } from 'el-form-render'
import { keyBy, treeUtils } from '@el-lowcode/utils'
import { DesignerCtx, DisplayNode } from '../layout/interface'
import { computedAsync } from '@vueuse/core'
import { PageCtx } from '../plugins/web/page'

export * as genCode from './genCode'

export function objStringify(obj, fn) {
  if (isArray(obj)) {
    return `[${obj.map(e => objStringify(e, fn)).join(', ')}]`
  } else if (isObject(obj)) {
    let str = '{'
    for (const k in obj) str += ` ${k}: ${objStringify(obj[k], fn)},`
    str = str.replace(/,$/, '') + ' }'
    return str
  } else {
    return fn(obj)
  }
}

export function createDesignerCtx(root: Ref<PageCtx>, builtinPluginUrls?: MaybeRefOrGetter<string[] | undefined>) {
  const xxx = {} as Record<string, Ref<DesignerCtx['plugins'][0]>>
  const web = '/el-lowcode/designer/packages/designer/plugins/web'
  watchSyncEffect(() => {
    root.value.plugins ??= []
    root.value.plugins.includes(web) || root.value.plugins.push(web)
  })
  const allUrls = computed(() => [
    '/el-lowcode/designer/packages/designer/plugins/base',
    ...toValue(builtinPluginUrls) || [],
    ...root.value.plugins || []
  ])
  const plugins = computed(() => allUrls.value.map(url => 
    (xxx[url] ??= computedAsync(async () => {
      const plugin = await import(/* @vite-ignore */ `${url}/.lowcode/index.js`)
      const packageJSON = await fetch(`${url}/.lowcode/package.json`).then(e => e.json())
      const isActive = ref(false)
      const activate = async () => { await plugin.activate(designerCtx); isActive.value = true }
      const deactivate = async () => { await plugin.deactivate(designerCtx); isActive.value = false }
      await activate()
      return reactive({
        url,
        contributes: plugin.contributes,
        widgets: plugin.widgets,
        packageJSON,
        isActive,
        activate,
        deactivate,
      }) as DesignerCtx['plugins'][0]
    }, void 0, { onError: e => console.error(e) })).value
  ).filter(e => e))

  plugins.value

  class $DisplayNode extends DisplayNode { designerCtx = designerCtx }

  const designerCtx = reactive({
    currentState: {},
    // viewport,
    // canvas: computed(() => root.value.designer?.canvas || { zoom: 1 }),
    canvas: { x: 0, y: 0, zoom: 1, style: useTransformer(root, 'designer.canvas.style') } as any,
    root,
    flated: computed(() => treeUtils.flat([root.value])),
    keyed: computed(() => keyBy(designerCtx.flated, '_id')),
    rootCtx: computed(() => new designerCtx.DisplayNode(designerCtx.root)),
    keyedCtx: computed(() => keyBy(treeUtils.flat([designerCtx.rootCtx]), 'id')),
    active: computed(() => designerCtx.activeId ? designerCtx.keyedCtx[designerCtx.activeId] : void 0),
    activeEl: computed(() => designerCtx.activeId ? designerCtx.canvas.doc.querySelector(`[_id='${designerCtx.activeId}']`) : void 0),
    hover: computed(() => designerCtx.hoverId ? designerCtx.keyedCtx[designerCtx.hoverId] : void 0),
    hoverEl: computed(() => designerCtx.hoverId ? designerCtx.canvas.doc.querySelector(`[_id='${designerCtx.hoverId}']`) : void 0),
    dragged: computed(() => designerCtx.draggedId ? designerCtx.keyedCtx[designerCtx.draggedId] : void 0),
    plugins,
    pluginsLoading: computed(() => plugins.value.length != allUrls.value.length),
    widgets: computed(() => keyBy(designerCtx.plugins.flatMap(e => e.widgets || []), 'is')),
    viewRenderer: {},
    DisplayNode: $DisplayNode
  }) as DesignerCtx

  return designerCtx
}