import { computed, defineComponent, effectScope, getCurrentInstance, onUnmounted, provide, reactive, ref, renderSlot, toRef, watch, watchEffect } from 'vue'
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
    plugins: Array,
    state: Object,
    ds: Object,
    css: String,
  },
  setup(props, { slots }) {
    const pageCtx = reactive({})

    pageCtx.state = computed(() => {
      return reactive(JSON.parse(JSON.stringify(props.state)))
    })

    pageCtx.ds = computedEager(() => {
      const { list = [] } = props.ds || {}
      return reactive(list.reduce((o, e) => (o[e.id] = computedEager(() => dsType[e.type](e, pageCtx)), o), {}))
    })

    provide('pageCtx', window.pageCtx = pageCtx)

    const css = document.createElement('style')
    watchEffect(() => css.innerText = props.css)
    onUnmounted(() => css.remove())

    const ins = getCurrentInstance()
    const loading = ref(false)
    const loaded = {}

    // load plugin
    watch(() => [...props.plugins], async (urls, old) => {
      if (JSON.stringify(urls) == JSON.stringify(old)) return
      if (!urls?.length) return
      
      try {
        loading.value = true
        await loadPlugins(urls)
      } finally {
        loading.value = false
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

    return () => renderSlot(slots, loading.value ? 'loading' : 'default')
  }
})