import { computed, MaybeRefOrGetter, reactive, Ref, ref, toValue, watch, watchEffect, watchSyncEffect } from 'vue'
import { isArray, isObject, remove } from '@vue/shared'
import { Awaitable, computedAsync, Fn } from '@vueuse/core'
import { useTransformer } from 'el-form-render'
import { keyBy, toArr, treeUtils, unFn } from '@el-lowcode/utils'
import { Contributes, DesignerCtx, DisplayNode, ExtensionContext, UserWidget, Widget } from '../layout/interface'

export * as genCode from './genCode'
export * from './quickPick'
export * from './useKeyDIr'

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

export function createDesignerCtx(root: Ref, builtinPluginUrls?: MaybeRefOrGetter<string[] | undefined>) {
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

  const designerCtx: DesignerCtx = reactive({
    currentState: {},
    // viewport,
    // canvas: computed(() => root.value.designer?.canvas || { zoom: 1 }),
    // @ts-ignore
    DisplayNode: class $DisplayNode extends DisplayNode { designerCtx = designerCtx },
    pageCtx: computed(() => reactive({ state: JSON.parse(JSON.stringify(root.value.state || {})) })),
    canvas: { x: 0, y: 0, zoom: 1, style: useTransformer(root, 'designer.canvas.style') },
    root,
    rootCtx: computed(() => new designerCtx.DisplayNode(designerCtx.root)),
    keyedCtx: computed(() => keyBy(treeUtils.flat([designerCtx.rootCtx]), 'id')),
    active: computed(() => designerCtx.activeId ? designerCtx.keyedCtx[designerCtx.activeId] : void 0),
    hover: computed(() => designerCtx.hoverId ? designerCtx.keyedCtx[designerCtx.hoverId] : void 0),
    dragged: computed(() => designerCtx.draggedId ? designerCtx.keyedCtx[designerCtx.draggedId] : void 0),
    plugins: [],
    pluginsLoading: computed(() => allUrls.value.every(url => !!xxx[url].value)),
    widgets: computed(() => keyBy(designerCtx.plugins.flatMap(e => e.widgets?.map(normalWidget) || []), 'is')),
    // widgets: {},
    viewRenderer: {},
    commands: createEvents(),
    dict: {
      plugins: [],
    },
  })

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

function normalWidget(widget: UserWidget): Widget {
  return {
    ...widget,
    drag: typeof widget.drag == 'boolean'
      ? { disabled: !widget.drag }
      : {
        ...widget.drag,
        to: widget.drag?.to ? toArr(widget.drag!.to) : void 0,
        from: widget.drag?.from ? toArr(widget.drag!.from) : void 0,
        ancestor: widget.drag?.ancestor ? toArr(widget.drag!.ancestor) : void 0,
      },
  }
}

export async function createPluginCtx(module, designerCtx: DesignerCtx) {
  const extCtx: ExtensionContext = {
    subscriptions: []
  }
  const isActive = ref(false)
  const contributes = computed<Contributes>(() => unFn(module.contributes, designerCtx) || {})
  const activate = async () => {
    await module.activate?.(designerCtx, extCtx)
    isActive.value = true
  }
  const deactivate = async () => {
    await module.deactivate?.(designerCtx)
    isActive.value = false
    extCtx.subscriptions.forEach(fn => typeof fn == 'function' ? fn() : fn.dispose())
  }
  await activate()

  // process commands.cb
  let commandCbs = [] as Fn[]
  extCtx.subscriptions.push(() => commandCbs.forEach(cb => cb()))
  watch(contributes, (val, old) => {
    old?.commands?.forEach(e => e.cb && designerCtx.commands.off(e.command, e.cb))
    commandCbs = val.commands?.flatMap(e => e.cb ? designerCtx.commands.on(e.command, e.cb) : []) || []
  }, { immediate: true })

  return {
    contributes,
    widgets: module.widgets || [],
    activate,
    deactivate,
    isActive,
  }
}

function createEvents() {
  const e = {}
  function on(k: string, cb: (...args: any[]) => void) {
    (e[k] ??= []).push(cb)
    return () => off(k, cb)
  }
  function off(k: string, cb: (...args: any[]) => void) {
    remove(e[k] || [], cb)
  }
  function emit(k: string, ...args: any[]) {
    return Promise.all(e[k]?.map(fn => fn(...args)))
  }
  return { on, off, emit }
}