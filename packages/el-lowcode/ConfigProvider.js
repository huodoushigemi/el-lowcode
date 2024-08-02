import { defineComponent, getCurrentInstance, provide, ref, renderSlot, watch } from 'vue'

export const ConfigProvider = defineComponent({
  props: {
    plugins: Array,
    state: Object,
    css: String,
  },
  setup(props, { slots }) {
    provide('pageCtx', props)

    const ins = getCurrentInstance()
    const loading = ref(false)
    const loaded = {}

    // load plugin
    watch(() => props.plugins, async (urls, old) => {
      if (JSON.stringify(urls) == JSON.stringify(old)) return
      if (!urls?.length) return
      
      try {
        loading.value = true
        await loadPlugins(urls)
      } finally {
        loading.value = false
      }
    }, { immediate: true })
    
    async function loadPlugins(urls) {
      for (const url of urls || []) {
        if (loaded[url]) continue
        loaded[url] = 1
        const plugin = (await import(/* @vite-ignore */ url + '/index.js')).default
        await loadPlugins(plugin.plugins)
        ins.appContext.app.use(plugin)
      }
    }

    return () => loading.value || renderSlot(slots, 'default')
  }
})