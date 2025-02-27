import { defineAsyncComponent, defineComponent, h, inject, ref } from 'vue'
import IShare from '~icons/tdesign/share'
import ILoading from '~icons/eos-icons/bubble-loading'
import IEye from '~icons/mdi/eye-outline'
import { uploadLcd, previewLcd, copyText } from './utils'

const Share = defineComponent({
  props: ['state'],
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
})

export const contributes = lcd => ({
  activitybar: [
    {
      id: 'template',
      title: '在线模板',
      icon: 'https://api.iconify.design/mdi:shopping-outline.svg'
    },
  ],
  views: {
    'template': [
      { id: 'template', is: defineAsyncComponent(() => import('./TemplateView.vue')) }
    ]
  },
  statusbar: [
    { children: [{ is: Share }] },
    { icon: { is: IEye, class: 'hfull wa' }, onClick: () => previewLcd(lcd.root) }
  ]
})