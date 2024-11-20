import { createApp, defineAsyncComponent, defineComponent, h, inject, ref } from 'vue'
import { ElMessage } from 'element-plus'
import IShare from '~icons/tdesign/share'
import ILoading from '~icons/eos-icons/bubble-loading'
import IEye from '~icons/mdi/eye-outline'
import { uploadLcd, previewLcd, copyText } from './utils'

function create(Comp) {
  let app
  return {
    mount(container, designerCtx) {
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
    async function onClick() {
      if (loading.value) return
      loading.value = true
      try {
        const url = await uploadLcd(ctx.root)
        const previewUrl = location.href + (location.href.includes('?') ? '&' : '?') + `file=${encodeURIComponent(url)}`
        copyText(previewUrl)
      } finally {
        loading.value = false
      }
    }
    return () => h('div', { class: 'flex aic px6', onClick }, [
      loading.value ? h(ILoading, { class: 'w18 h16' }) : h(IShare, { class: 'w18 h18' })
    ])
  }
}))

export function activate(designerCtx) {
  
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
  views: {
    'template': [
      { id: 'template', renderer: create(defineAsyncComponent(() => import('./TemplateView.vue'))) }
    ]
  },
  statusbar: [
    { class: 'px0', renderer: Share },
    { icon: { is: IEye, class: 'hfull wa' }, onClick: (ctx) => previewLcd(ctx.root) }
  ]
}