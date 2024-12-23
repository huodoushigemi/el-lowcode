<template>
  <div flex="~ col" class="py6 hfull">
    <div class="flex flex-col flex-1 overflow-auto scroll-smooth">
      <div class="px20 mb6 space-y-12">
        <div>
          MODEL
          <select class="vs-input py4 mt4" v-model="form.model">
            <option v-for="val in ['gemini-1.5-flash', 'gemini-2.0-flash-exp']" :value="val">{{ val }}</option>
          </select>
        </div>
    
        <div>
          API KEY
          <input class="vs-input mt4" v-model="form.key" />
        </div>
      </div>

      <template v-for="msg in msgs">
        <div v-if="msg.self" class="p14 mt8" style="background: var(--vs-li-inactiveSelectionBg)">
          <div class="flex aic mb12">
            <i-carbon:user-avatar-filled-alt class="w24 h24 mr4" />
            Me
          </div>
          <!-- <p>{{ msg.content }}</p> -->
          <wc-mdit :content="msg.content" css="pre { padding: 8px; max-height: 192px; overflow: auto; background: #0a0a0a66; }" .options="{ breaks: true }" />
          <img :src="msg.image" class="block" style="width: -webkit-fill-available; max-height: 192px; object-fit: contain;" />
        </div>
        <div v-else class="p14" style="background: var(--vs-li-hover-bg)">
          <div class="flex aic">
            <i-ri:bilibili-fill class="w24 h24 mr8"/>AI Assistant
          </div>
          <wc-mdit :content="msg.content" css="pre { padding: 8px; max-height: 192px; overflow: auto; background: #0a0a0a66; }" />
          <div class="vs-actions flex space-x-4">
            <i-pajamas:live-preview class="vs-ai vs-li mla" title="View" @click="showModal(msg.content)" />
            <i-tdesign:file-import class="vs-ai vs-li" title="Import to designer" @click="replaceCanvas(msg.content)" />
          </div>
          <!-- <button class="vs-btn" @click="showModal(msg.content)">preview</button>
          <button class="vs-btn" @click="replaceCanvas(msg.content)">-></button> -->
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
import { computed, inject, reactive, ref } from 'vue'
import { toReactive, useDropZone, useLocalStorage, useSessionStorage } from '@vueuse/core'
import { GoogleGenerativeAI } from 'https://unpkg.com/@google/generative-ai@0.21.0/dist/index.mjs'
import { fileSelect, chooseImg, fileToBase64, html2schema } from '@el-lowcode/utils'
import 'wc-mdit'

const designer = inject('designerCtx')

const form = toReactive(useLocalStorage('ai:options', {
  key: 'AIzaSyDrMDJQ2qAeyEMvrXpQm6AiLaVpuoN2cVE',
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
  
  const controller = new AbortController()
  // const { stream } = await model.value.generateContentStream([content, { inlineData: { data: await file2base64(file), mimeType: file.type } }], controller)
  // const row = {
  //   controller,
  //   content: ''
  // }
  // msgs.value.push(row)

  // for (const res in await stream) {
  //   row.content += res.text()
  // }
  // row.controller = void 0

  const ret = await model.value.generateContent([content, { inlineData: { data: await file2base64(file), mimeType: file.type } }], controller)
  const text = (await ret.response).text()
  msgs.value.push({ content: text })
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
  return content.replace(/(^.*```html\s)?/, '').replace(/<\/html\>\s```.*/, '</html>')
}
</script>