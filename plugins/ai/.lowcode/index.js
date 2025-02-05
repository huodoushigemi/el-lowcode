import { createApp, defineAsyncComponent, h } from 'vue'
import { showDialog } from '@el-lowcode/designer'

function create(AsyncComp) {
  let app
  return {
    mount(container, designerCtx) {
      app = createApp({ provide: { designerCtx }, render: () => h(AsyncComp) })
      app.mount(container)
    },
    unmount: () => app.unmount()
  }
}

export const contributes = {
  activitybar: [
    // {
    //   id: 'ai',
    //   title: 'AI',
    //   icon: 'https://api.iconify.design/solar:magic-stick-broken.svg'
    // },
  ],
  views: {
    // 'ai': [
    //   { id: 'ai.d2c', name: 'D2C', renderer: create(defineAsyncComponent(() => import('./D2C.vue'))) },
    // ],
  },
  menus: {
    'node/context': node => [
      { label: 'AI 助手', icon: 'https://api.iconify.design/solar:magic-stick-broken.svg', children: [
        { label: '图转码', icon: '	https://api.iconify.design/mdi:image-outline.svg', onClick: () => d2c(1) }
      ] },
    ]
  }
}

async function d2c() {
  // const OpenAI = await import('https://unpkg.com/openai@4.82.0/index.mjs').then(e => e.default)
  // const openai = new OpenAI({
  //   baseURL: 'https://api.deepseek.com',
  //   apiKey: '<your API key>',
  //   dangerouslyAllowBrowser: true
  // })
  
  // openai.chat.completions.create({
  //   messages: [
  //     { role: "system", content: "You are a helpful assistant." },
  //     { role: 'user', content: [{ type: 'text', content: '' }, { typr: 'image_url', image_url: { url: '' } }] }
  //   ],
  //   model: "deepseek-chat",
  //   stream: true
  // }).then(async stream => {
  //   for await (const chunk of stream) {
  //     chunk.choices[0]?.delta?.content || ""
  //   }
  // })
  await showDialog({ is: 'el-drawer', withHeader: false }, {
    default: () => h(defineAsyncComponent(() => import('./D2C.vue')), { style: 'margin: 0 -6px' }),
    footer: void 0
  })
}