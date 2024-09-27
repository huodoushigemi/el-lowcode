import { createApp, defineAsyncComponent, defineComponent, h, inject, ref } from 'vue'
import { ElMessage } from 'element-plus'
import IShare from '~icons/tdesign/share'
import ILoading from '~icons/eos-icons/bubble-loading'
import { createClient, uploadLcd } from './supabase'

function create(Comp) {
  let app
  return {
    mount(container, designerCtx) {
      console.log('xxx');
      
      app = createApp({ provide: { designerCtx }, render: () => h(Comp) })
      app.mount(container)
    },
    unmount: () => app.unmount()
  }
}

const Share = create(defineComponent({
  setup() {
    const loading = ref(false)
    const ctx = inject('designerCtx')
    function onClick() {
      if (loading.value) return
      loading.value = true
      onShare(ctx).finally(() => loading.value = false)
    }
    return () => h('div', { class: 'flex aic px6', onClick }, [
      loading.value ? h(ILoading, { class: 'w18 h16' }) : h(IShare, { class: 'w18 h18' })
    ])
  }
}))

export function activate(designerCtx) {
  designerCtx.viewRenderer['template'] = create(defineAsyncComponent(() => import('./TemplateView.vue')))
}

export function deactivate(designerCtx) {

}

export const contributes = {
  activitybar: [
    {
      id: 'template',
      title: '在线模板',
      icon: 'https://api.iconify.design/mdi:shopping-outline.svg'
    },
  ],
  statusbar: [
    { class: 'px0', renderer: Share }
  ]
}

async function onShare(ctx) {
  const url = await uploadLcd(JSON.stringify(ctx.root))

  // 复制到剪切板
  const input = Object.assign(document.createElement('input'), { style: { position: 'fixed', top: 0, left: 0, visibility: 'hidden' } })
  input.value = location.origin + '/demo.html?file=' + encodeURIComponent(url)
  document.body.append(input)
  input.select()

  if (document.execCommand('copy')) {
    ElMessage.success({ message: '已复制到剪切板', offset: 32 })
  } else {
    ElMessage.error({ message: '复制失败', offset: 32 })
  }

  input.remove()
}