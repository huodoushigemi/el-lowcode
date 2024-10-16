import { computed, defineComponent, getCurrentInstance, provide, reactive, ref, renderSlot, toRef, watch } from 'vue'

export const ConfigProvider = defineComponent({
  inheritAttrs: false,
  props: {
    plugins: Array,
    state: Object,
    css: String,
  },
  setup(props, { slots }) {
    provide('pageCtx', reactive({
      state: computed(() => reactive(JSON.parse(JSON.stringify(props.state))))
    }))

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