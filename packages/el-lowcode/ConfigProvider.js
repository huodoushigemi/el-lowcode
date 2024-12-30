import { computed, defineComponent, effectScope, getCurrentInstance, onUnmounted, provide, reactive, ref, renderSlot, toRef, toRefs, watch, watchEffect } from 'vue'
import { deepClone, execExp, useRequest } from '@el-lowcode/utils'
import { computedEager, toReactive } from '@vueuse/core'

const dsType = {
  fetch: (e, vars) => {
    return useRequest(async () => {
      const { options: { uri, method, params, ...options }, dataHandler } = deepClone(e, v => execExp(v, vars))
      const url = method == 'GET' ? `${uri}${uri.includes('?') ? '&' : '?'}${new URLSearchParams(params).toString()}` : uri
      const body = method == 'GET' ? void 0 : JSON.stringify(params)
      const ret = await fetch(url, { method, body, ...options }).then(e => e.json())
      return dataHandler ? dataHandler(ret) : ret
    }, {
      manual: !execExp(e.isInit, vars)
    })
  }
}

export const ConfigProvider = defineComponent({
  inheritAttrs: false,
  props: {
    state: Object,
    ds: Object,
    css: String,
    plugins: Array,
  },
  setup(props, { slots }) {
    const config = reactive(useConfigProvider(props))

    provide('pageCtx', window.pageCtx = config)

    return () => renderSlot(slots, config.loading ? 'loading' : 'default')
  }
})

export const useConfigProvider = (props) => {
  const config = reactive({})

  config.state = computed(() => {
    return reactive(JSON.parse(JSON.stringify(props.state || {})))
  })

  config.ds = computedEager(() => {
    const { list = [] } = props.ds || {}
    return reactive(list.reduce((o, e) => (o[e.id] = computedEager(() => dsType[e.type](e, config)), o), {}))
  })

  const css = document.createElement('style')
  watchEffect(() => css.innerText = props.css)
  onUnmounted(() => css.remove())

  const ins = getCurrentInstance()
  config.loading = false
  const loaded = {}

  // load plugin
  watch(() => [...props.plugins], async (urls, old) => {
    if (JSON.stringify(urls) == JSON.stringify(old)) return
    if (!urls?.length) return
    
    try {
      config.loading = true
      await loadPlugins(urls)
    } finally {
      config.loading = false
    }
  }, { immediate: true })
  
  async function loadPlugins(urls = []) {
    return await Promise.all(urls.map(async url => {
      if (loaded[url]) return
      loaded[url] = 1
      const plugin = (await import(/* @vite-ignore */ url + '/index.js')).default
      await loadPlugins(plugin.plugins)
      ins.appContext.app.use(plugin)
    }))
  }

  return toRefs(config)
}