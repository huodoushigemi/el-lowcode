import { computed, MaybeRefOrGetter, reactive, Ref, ref, toValue, watch, watchEffect, watchSyncEffect } from 'vue'
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
  const allUrls = computed(() => [
    ...toValue(builtinPluginUrls) || [],
    ...root.value.plugins || []
  ])

  const xxx = {} as Record<string, Ref<DesignerCtx['plugins'][0]>>

  // load plugins
  watch(allUrls, urls => {
    urls.forEach(url => (xxx[url] ??= computedAsync(async () => {
      const plugin = reactive({
        url,
        ...await createPluginCtx(await import(/* @vite-ignore */ `${url}/.lowcode/index.js`), designerCtx),
        packageJSON: await fetch(`${url}/.lowcode/package.json`).then(e => e.json()),
      }) as DesignerCtx['plugins'][0]
      designerCtx.plugins.push(plugin)
      return plugin
    }, void 0, { onError: e => console.error(e) })))
  }, { immediate: true })

  const designerCtx = reactive({
    currentState: {},
    // viewport,
    // canvas: computed(() => root.value.designer?.canvas || { zoom: 1 }),
    // @ts-ignore
    DisplayNode: class $DisplayNode extends DisplayNode { designerCtx = designerCtx },
    canvas: { x: 0, y: 0, zoom: 1, style: useTransformer(root, 'designer.canvas.style') } as any,
    root,
    flated: computed(() => treeUtils.flat([root.value])),
    keyed: computed(() => keyBy(designerCtx.flated, '_id')),
    rootCtx: computed(() => new designerCtx.DisplayNode(designerCtx.root)),
    keyedCtx: computed(() => keyBy(treeUtils.flat([designerCtx.rootCtx]), 'id')),
    active: computed(() => designerCtx.activeId ? designerCtx.keyedCtx[designerCtx.activeId] : void 0),
    activeEl: computed(() => designerCtx.active?.el),
    hover: computed(() => designerCtx.hoverId ? designerCtx.keyedCtx[designerCtx.hoverId] : void 0),
    hoverEl: computed(() => designerCtx.hover?.el),
    dragged: computed(() => designerCtx.draggedId ? designerCtx.keyedCtx[designerCtx.draggedId] : void 0),
    plugins: [],
    pluginsLoading: computed(() => allUrls.value.every(url => !!xxx[url].value)),
    widgets: computed(() => keyBy(designerCtx.plugins.flatMap(e => e.widgets || []), 'is')),
    // widgets: {},
    viewRenderer: {},
    dict: {
      plugins: [],
    },
  }) as DesignerCtx

  ;(async () => {
    designerCtx.plugins.unshift(reactive({
      // url: await import('../plugins/base?url').replaceAll('/index.js', '') as string,
      url: '',
      ...await createPluginCtx(await import('../plugins/base/.lowcode/index'), designerCtx),
      packageJSON: await import(`../plugins/base/.lowcode/package.json`),
    }))
  })()

  return designerCtx
}

export async function createPluginCtx(module, designerCtx: DesignerCtx) {
  const isActive = ref(false)
  const activate = async () => { await module.activate?.(designerCtx); isActive.value = true }
  const deactivate = async () => { await module.deactivate?.(designerCtx); isActive.value = false }
  await activate()
  return {
    contributes: module.contributes || {},
    widgets: module.widgets || [],
    activate,
    deactivate,
    isActive,
  }
}