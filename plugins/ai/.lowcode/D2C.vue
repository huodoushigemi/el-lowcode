<template>
  <div flex="~ col" class="py6 hfull">
    <div ref="scrollRef" class="flex flex-col flex-1 overflow-auto scroll-smooth">
      <div class="px20 mb6 space-y-12">
        <div>
          MODEL
          <select class="vs-input py4 mt4" v-model="form.model">
            <!-- <option v-for="val in ['gemini-1.5-flash', 'gemini-2.0-flash-exp', 'gemini-pro']" :value="val">{{ val }}</option> -->
            <option v-for="val in models" :value="val">{{ val }}</option>
          </select>
        </div>
    
        <div>
          API KEY
          <input class="vs-input mt4" v-model="form.key" />
        </div>
      </div>

      <template v-for="msg in msgs">
        <div v-if="msg.self" class="p14 mt8" style="background: var(--vs-li-inactiveSelectionBg)">
          <div class="flex aic">
            <i-carbon:user-avatar-filled-alt class="w24 h24 mr4" />
            Me
          </div>
          <wc-mdit :content="msg.content" css="pre { padding: 8px; max-height: 192px; overflow: auto; background: #0a0a0a66; }" .options="{ breaks: true }" />
          <img :src="msg.image" class="block" style="width: -webkit-fill-available; max-height: 192px; object-fit: contain;" />
        </div>
        <div v-else class="p14" style="background: var(--vs-li-hover-bg)">
          <div class="flex aic">
            <i-ri:bilibili-fill class="w24 h24 mr8"/>
            AI Assistant
          </div>
          <i-eos-icons:three-dots-loading v-if="!msg.content" style="width: 48px; height: 48px" />
          <wc-mdit v-else="msg.content" :content="msg.content" :css="`pre { padding: 8px; max-height: 192px; overflow: auto; background: #0a0a0a66; } ${!msg.done && blinkCaret}`" :options="{ highlight }" />
          <div class="vs-actions flex space-x-4">
            <i-pajamas:live-preview v-if="msg.done" class="vs-ai vs-li mla" title="View" @click="showModal(msg.content)" />
            <i-tdesign:file-import v-if="msg.done" class="vs-ai vs-li" title="Import to designer" @click="replaceCanvas(msg.content)" />
          </div>
        </div>
      </template>
    </div>
  
    <div ref="dropZone" class="relative m6 flex aic jcc b-1 rd-8 cursor-pointer" style="height: 96px" @click="fileSelect({ accept: 'image/*' }).then(e => send(e[0]))">
      <div v-if="isOverDropZone" class="absolute inset-0 op40 bg-#808080/40 rd-8" style="outline: 4px solid #808080;" />
      <div >Drop image here or&ensp;<span c-blue>click to upload</span></div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { toReactive, useDropZone, useLocalStorage, useSessionStorage } from '@vueuse/core'
import { GoogleGenerativeAI } from 'https://unpkg.com/@google/generative-ai@0.21.0/dist/index.mjs'
import { fileSelect, fileToBase64, html2schema } from '@el-lowcode/utils'
import 'wc-mdit'

const designer = inject('designerCtx')

const ais = {
  deepseek: {
    icon: 'https://api-docs.deepseek.com/zh-cn/img/favicon.svg',
    url: 'https://api.deepseek.com',
    key: ['7fa38d5c65', 'f437f831f4b2c15cce5393', '-ks'].reverse().join(''),
    models: ['deepseek-reasoner', 'deepseek-chat']
  },
  openai: {
    icon: 'https://openai.com/2.0/icon.svg',
    key: ['7fa38d5c65', 'f437f831f4b2c15cce5393', '-ks'].reverse().join(''),
    models: ['gpt-4o', 'gpt-4o-mini']
  },
  // gemini: {
  //   icon: 'https://openai.com/2.0/icon.svg',
  //   key: 'AIzaSyDrMDJQ2qAeyEMvrXpQm6AiLaVpuoN2cVE',
  //   models: ['gemini-1.5-flash', 'gemini-2.0-flash-exp', 'gemini-pro']
  // }
}

const models = Object.values(ais).flatMap(e => e.models)

const form = toReactive(useLocalStorage('ai:options', {
  key: 'AIzaSyDrMDJQ2qAeyEMvrXpQm6AiLaVpuoN2cVE',
  // key: ['7fa38d5c65', 'f437f831f4b2c15cce5393', '-ks'].reverse().join('')
  model: 'gemini-2.0-flash-exp',
}))

const model = computed(() => (new GoogleGenerativeAI(form.key)).getGenerativeModel({ model: form.model }))

const msgs = useSessionStorage('ai.d2c:msgs', [])

const dropZone = ref()
const { isOverDropZone } = useDropZone(dropZone, { dataTypes: e => e.some(e => e.includes('image')), onDrop: e => e?.[0] && send(e[0]) })

async function send(file, content = '将图片转为 HTML + Tailwind\n- 使用 CDN 引入 Tailwind: `\<script src="https://cdn.tailwindcss.com">\<\/script\>`\n- 颜色均使用 style 属性设置') {
  msgs.value.push({
    self: 1,
    image: await fileToBase64(file),
    content,
  })
  msgs.value.push({
    controller: new AbortController(),
    content: '',
    done: 0
  })
  
  setTimeout(() => scrollRef.value.scrollTop = scrollRef.value.scrollHeight, 0)
  
  const row = msgs.value[msgs.value.length - 1]
  
  try {
    const { stream } = await model.value.generateContentStream([content, { inlineData: { data: await file2base64(file), mimeType: file.type } }], row.controller)
    
    for await (const res of stream) {
      row.content += res.text()
      stickyBottom()
    }
  } catch (e) {
    row.content = '❌ Error'
    throw e
  } finally {
    row.controller = void 0
    row.done = 1
  }
}

function replaceCanvas(content) {
  Object.assign(designer.root, html2schema(extractHtml(content)))
}

function file2base64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result.split(',')[1])
    reader.readAsDataURL(file)
  })
}

function showModal(content) {
  const html = extractHtml(content)
  const file = new File([html], '', { type: 'text/html' })
  const url = URL.createObjectURL(file)
  window.open(url, '_blank')
}

function extractHtml(content) {
  return content.replace(/(^[\s\S]*```html\s)?/, '').replace(/<\/html\>\s```[\s\S]*/, '</html>')
}

// 光标闪烁的竖线
const blinkCaret = `
.markdown-body > *:last-child::after,
.markdown-body:empty::after {
  content: ' ';
  display: inline-block;
  margin: 0 2px;
  width: 4px;
  line-height: 1em;
  opacity: 0.8;
  animation: blink-caret .75s infinite;
}

@keyframes blink-caret {
  from, to { background: transparent; }
  50% { background: currentColor; }
}
`


const scrollRef = ref()

// 置底
async function stickyBottom() {
  const isSticky = scrollRef.value?.scrollHeight - (scrollRef.value?.scrollTop + scrollRef.value?.clientHeight) < 60
  await Promise.resolve()
  if (isSticky) setTimeout(() => {
    scrollRef.value.style.scrollBehavior = 'unset'
    scrollRef.value.scrollTop = scrollRef.value.scrollHeight
    scrollRef.value.style.scrollBehavior = ''
  }, 0)
}

function highlight(code, lang) {
  return `<wc-hljs code="${code}" />`
}

async function openai(key, url) {
  const OpenAI = await import('https://unpkg.com/openai@4.82.0/index.mjs').then(e => e.default)
  const openai = new OpenAI({
    baseURL: url,
    apiKey: key,
    dangerouslyAllowBrowser: true
  })

  return async function* (messages, model) {
    const stream = await openai.chat.completions.create({
      messages: messages ?? [
        { role: "system", content: "You are a helpful assistant." },
        { role: 'user', content: [{ type: 'text', content: '' }, { typr: 'image_url', image_url: { url: '' } }] }
      ],
      model: model ?? "deepseek-chat",
      stream: true
    })
    for await (const chunk of stream) {
      yield chunk.choices[0]?.delta?.content || ""
    }
  }
  
}
</script>