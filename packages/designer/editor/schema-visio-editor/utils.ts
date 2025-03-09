import { computed, effectScope, getCurrentInstance, inject, markRaw, MaybeRefOrGetter, reactive, Ref, ref, toRaw, toValue, watch, watchSyncEffect } from 'vue'
import { isArray, isObject, remove } from '@vue/shared'
import { useDebouncedRefHistory } from '@vueuse/core'
import { useTransformer } from 'el-form-render'
import { keyBy, mapValues, toArr, treeUtils, unFn, unVal } from '@el-lowcode/utils'
import { BoxProps, Contributes, DesignerCtx, DisplayNode, ExtensionContext, PluginModule, UserWidget, Widget } from '../../layout/interface'

export function createDesignerCtx(root: Ref, builtinPluginUrls?: MaybeRefOrGetter<string[] | undefined>) {
  const allUrls = computed(() => [
    ...toValue(builtinPluginUrls) || [],
    ...root.value.plugins || []
  ])

  const lcd: DesignerCtx = reactive({
    // viewport,
    // canvas: computed(() => root.value.designer?.canvas || { zoom: 1 }),
    // @ts-ignore
    DisplayNode: class $DisplayNode extends DisplayNode { lcd = lcd },
    canvas: {
      x: useTransformer(root, 'designer.canvas.x', { silentSet: v => +v.toFixed(0) }),
      y: useTransformer(root, 'designer.canvas.y', { silentSet: v => +v.toFixed(0) }),
      w: useTransformer(root, 'designer.canvas.style.width', { get: v => v && parseInt(v), set: v => v + 'px' }),
      h: useTransformer(root, 'designer.canvas.style.height', { get: v => v && parseInt(v), set: v => v + 'px' }),
      zoom: useTransformer(root, 'designer.canvas.zoom', { get: v => v || 1, set: v => +(v * 100).toFixed(0) / 100 }),
      style: useTransformer(root, 'designer.canvas.style')
    },
    root,
    rootNode: computed(() => new lcd.DisplayNode(lcd.root)),
    keyedNode: computed(() => keyBy(treeUtils.flat([lcd.rootNode]), 'id')),
    active: computed(() => lcd.activeId ? lcd.keyedNode[lcd.activeId] : void 0),
    hover: computed(() => lcd.hoverId ? lcd.keyedNode[lcd.hoverId] : void 0),
    dragged: computed(() => lcd.draggedId ? lcd.keyedNode[lcd.draggedId] : void 0),
    plugins: [],
    pluginsLoading: computed(() => lcd.plugins.length < allUrls.value.length + 1),
    newProps: computed(() => is => Object.assign({ is } as BoxProps, lcd.widgets[is]!.defaultProps?.(lcd))),
    widgets: computed(() => keyBy(lcd.plugins.flatMap(e => e.widgets?.map(normalWidget) || []), 'is')),
    // snippets: computed(() => keyBy(designerCtx.plugins.flatMap(e => e.snippets || []), 'id')),
    snippets: computed(() => [...lcd.dict.snippets, ...lcd.plugins.flatMap(e => e.snippets || [])]),
    commands: createEvents(),
    dict: {
      plugins: [],
      snippets: []
    },
    state: {
      infiniteViewer: {
        disabled: 1
      },
      // 时间旅行
      history: useDebouncedRefHistory(root, { deep: true, debounce: 150, capacity: 20 }),
      dragstate: {},
    },
    // activitybar: computed(() => findret(lcd.plugins, e => e.contributes.activitybar?.find(e => e.id == lcd.state.activitybarId))),
    app: toRaw(getCurrentInstance()?.appContext.app) as any,
  })

  const basePlugin = () => {
    const module = import('../../plugins/base/.lowcode/index')
    const json = import('../../plugins/base/.lowcode/package.json')
    return createPluginCtx('base', module, json, lcd)
  }

  lcd.plugins = computed(() => {
    return [unVal(basePlugin), ...unVal(loadPlugins, allUrls, lcd)?.value || []].filter(e => e)
  }) as any

  watch(() => lcd.dragged, (val, old) => {
    old?.el?.removeAttribute('lcd-dragged')
    val?.el?.setAttribute('lcd-dragged', '')
  })

  return lcd
}

function normalWidget(widget: UserWidget): Widget {
  return {
    ...widget,
    drag: typeof widget.drag == 'boolean' ? { disabled: !widget.drag } : widget.drag,
  }
}

function loadPlugins(urls: Ref<string[]>, lcd: DesignerCtx): Ref<DesignerCtx['plugins']> {
  const cache = {} as Record<string, Promise<DesignerCtx['plugins'][0]>>
  const ps = () => urls.value.map(url => cache[url] ??= (() => {
    const module = import(/* @vite-ignore */ `${url}/.lowcode/index.js`)
    const json = fetch(`${url}/.lowcode/package.json`).then(e => e.json())
    return createPluginCtx(url, module, json, lcd)
  })())
  return computed(() => ps().map(e => unVal(e)).filter(e => e))
}

export async function createPluginCtx(url: string, module, packageJSON, lcd: DesignerCtx): Promise<PluginModule> {
  ;[module, packageJSON] = await Promise.all([module, packageJSON])
  const extCtx: ExtensionContext = {
    subscriptions: []
  }
  const isActive = ref(false)
  const contributes = computed<Contributes>(() => {
    const contributes = { ...unFn(module.contributes, lcd) || {} }
    contributes.views = mapValues(contributes.views || {}, v => {
      return v.map(view => ({
        ...view,
        name: view.name === true ? packageJSON.displayName ?? packageJSON.name : view.name,
        icon: view.icon === true ? packageJSON.icon : view.icon,
      }))
    })
    return contributes
  })

  const scope = effectScope()
  
  const activate = async () => {
    scope.run(async () => {
      // process commands.cb
      watchSyncEffect(clear => {
        const { commands } = contributes.value
        commands?.forEach(e => e.cb && lcd.commands.on(e.command, e.cb))
        clear(() => commands?.forEach(e => e.cb && lcd.commands.off(e.command, e.cb)))
      })
      
      await module.activate?.(lcd, extCtx)
      isActive.value = true
    })
  }
  const deactivate = async () => {
    scope.stop()
    await module.deactivate?.(lcd)
    isActive.value = false
    extCtx.subscriptions.forEach(fn => typeof fn == 'function' ? fn() : fn.dispose())
  }
  await activate()

  return markRaw({
    url,
    get contributes() { return contributes.value },
    widgets: module.widgets || [],
    snippets: module.snippets,
    activate,
    deactivate,
    get isActive() { return isActive.value },
    packageJSON
  })
}

function createEvents() {
  const e = {}
  function on(k: string, cb: (...args: any[]) => void) {
    (e[k] ??= []).push(cb)
    // tryOnBeforeUnmount(() => off(k, cb))
    return () => off(k, cb)
  }
  function off(k: string, cb: (...args: any[]) => void) {
    remove(e[k] || [], cb)
  }
  function emit(k: string, ...args: any[]) {
    return e[k] && Promise.all(e[k]?.map(fn => fn(...args)))
  }
  return { on, off, emit }
}

export const useLcd = () => inject<DesignerCtx>('designerCtx')!