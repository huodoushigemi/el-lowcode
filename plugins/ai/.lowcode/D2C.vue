<template>
  <div flex="~ col" class="py6 hfull">
    <div ref="scrollRef" class="flex flex-col flex-1 overflow-auto scroll-smooth">
      <div class="flex mb6 space-x-12">
        <div>
          MODEL
          <select class="vs-input py4 mt4" v-model="form.model">
            <template v-for="ai in AI">
              <option v-for="val in ai.models" :value="val" :style="`background: url(${ai.icon}) center/contain no-repeat`">
                {{ val }}
              </option>
            </template>
          </select>
        </div>
    
        <div flex="~ 1 col">
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
          <wc-mdit v-else="msg.content" :content="msg.content" :css="`pre { padding: 8px; max-height: 192px; overflow: auto; background: #0a0a0a66; } ${!msg.done && blinkCaret}`" .options="{ highlight, linkify: true }" />
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
import { reactive, computed, inject, ref, watch, watchEffect } from 'vue'
import { isString } from '@vue/shared'
import { toReactive, useDropZone, useLocalStorage, useSessionStorage } from '@vueuse/core'
import { fileSelect, fileToBase64, html2schema } from '@el-lowcode/utils'
import 'wc-mdit'
import { AI } from './ai'

const designer = inject('designerCtx')

const models = Object.values(AI).flatMap(e => e.models)

const form = toReactive(useLocalStorage('ai:options', {
  key: AI.deepseek.key,
  model: AI.deepseek.models[0],
}))

watch(() => form.model, v => {
  form.key = Object.values(AI).find(e => e.models.includes(v)).key
})

// const msgs = useSessionStorage('ai.d2c:msgs', [])
const msgs = ref([])

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
    const ai = Object.values(AI).find(e => e.models.includes(form.model))
    
    for await (const text of ai.stream(form, [content, file], row.controller)) {
      row.content += text
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
</script>