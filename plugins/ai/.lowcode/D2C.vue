<template>
  <div px20 py6 space-y-12>
    <div>
      MODEL
      <select class="vs-input py4 mt4" v-model="form.model">
        <option v-for="val in ['gemini-1.5-flash']" :value="val">{{ val }}</option>
      </select>
    </div>

    <div>
      API KEY
      <input class="vs-input mt4" v-model="form.key" />
    </div>

    <br />

    <div class="flex flex-col">
      <template v-for="msg in msgs">
        <div v-if="msg.self">
          <img :src="msg.image" style="width: -webkit-fill-available; max-height: 192px; object-fit: contain;" />
        </div>
        <div v-else>
          <wc-mdit :content="msg.content" css="pre { max-height: 192px; overflow: auto; }" />
          <button class="vs-btn" @click="showModal(msg.content)">preview</button>
          <button class="vs-btn" @click="replaceCanvas(msg.content)">-></button>
        </div>
      </template>
    </div>

    <div ref="dropZone" class="relative flex aic jcc b-1 rd-8 cursor-pointer" :style="`height: 128px; background: center / cover no-repeat  url(${image});`" @click="fileSelect({ accept: 'image/*' }).then(e => send(e[0]))">
      <div v-if="isOverDropZone" class="absolute inset-0 op40 bg-#808080/10 rd-8" style="outline: 4px solid #808080;" />
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

async function send(file, content = '将图片转为 HTML + Tailwind') {
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