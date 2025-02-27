import { computed, defineComponent, getCurrentInstance, isRef, onUnmounted, unref, provide, reactive, renderSlot, toRefs, watch, watchEffect, toValue, h } from 'vue'
import { isFunction, isString } from '@vue/shared'
import { toReactive } from '@vueuse/core'
import { execExp, useRequest } from '@el-lowcode/utils'
import { cloneObj } from './index'

const dsType = {
  fetch: (e, vars) => {
    // todo stop
    return useRequest(async () => {
      const { options: { uri, method, params, ...options }, dataHandler } = cloneObj(reactive(e), vars)
      const url = method == 'GET' ? `${uri}${uri.includes('?') ? '&' : '?'}${new URLSearchParams(params).toString()}` : uri
      const body = method == 'GET' ? void 0 : JSON.stringify(params)
      const ret = await fetch(url, { method, body, ...options }).then(e => e.json())
      return dataHandler ? dataHandler(ret) : ret
    }, {
      manual: !unref(execExp(e.isInit, vars))
    })
  }
}

const props = {
  fetch: Function,
  schema: Object
}

export const ConfigProvider = defineComponent({
  inheritAttrs: false,
  props,
  setup(props, { slots, expose }) {
    const { data: schema, loading } = useRequest(() => 
      isString(props.fetch) ? fetch(props.fetch).then(e => e.json()) :
      isFunction(props.fetch) ? props.fetch() :
      props.schema
    )
    
    const vars = reactive(useConfigProvider(toReactive(computed(() => schema.value ?? {}))))

    provide('vars', vars)
    expose(vars)

    return () =>
      vars.loading || loading.value ? h('div', renderSlot(slots, 'loading')) :
      !schema.value ? h('div', renderSlot(slots, 'empty', { vars }, () => [h('div', { style: 'opacity: .4; text-align: center; padding: 1em' }, 'Empty')])) :
      renderSlot(slots, 'default', { vars, schema: schema.value })
  }
})

export function useConfigProvider(props) {
  const config = reactive({})

  config.state = computed(() => {
    return reactive(cloneObj(props.state, config, v => !isRef(v)))
  })

  config.ds = computed(() => {
    const { list = [] } = props.ds || {}
    return reactive(list.reduce((o, e) => (o[e.id] = computed(() => dsType[e.type](e, config)), o), {}))
  })

  const css = document.createElement('style')
  watchEffect(() => css.innerText = props.css)
  onUnmounted(() => css.remove())

  const ins = getCurrentInstance()
  config.loading = false
  const loaded = {}

  // load plugin
  watch(() => [...props.plugins || []], async (urls, old) => {
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