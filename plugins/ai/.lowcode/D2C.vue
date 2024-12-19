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

    <!-- <button class="vs-btn" @click="fileSelect({ accept: 'image/*' }).then(e => image2html(e[0]))">
      <div class="mask-icon mr2 w24 h18" style="--mask-image: url(https://api.iconify.design/majesticons:image-line.svg);" />
      upload
    </button> -->

    <div ref="dropZone" class="relative flex aic jcc b-1 rd-8 cursor-pointer" :style="`height: 192px; background: center / cover no-repeat  url(${image});`" @click="fileSelect({ accept: 'image/*' }).then(e => files = e)">
      <div v-if="isOverDropZone" class="absolute inset-0 op40 bg-#808080/10 rd-8" style="outline: 4px solid #808080;" />
      <div v-if="!files?.length">Drop file here or&ensp;<span c-blue>click to upload</span></div>
    </div>

    <div>
      <button class="vs-btn" :disabled="!html" @click="showModal(html)">preview</button>
      <!-- <button class="vs-btn" :disabled="html" @click="image2html(files[0]).then(e => designer.root = html2schema(e))">-></button> -->
      <button class="vs-btn" :disabled="!html" @click="replaceCanvas">-></button>
      <!-- <button class="vs-btn" @click=" html2schema(image2html(files[0]))">d2c</button> -->
      <button class="vs-btn" @click=" image2html(files[0]).then(e => html = e)">d2c</button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, reactive, ref, watchEffect } from 'vue'
import { computedAsync, useDropZone, useLocalStorage } from '@vueuse/core'
import { GoogleGenerativeAI } from 'https://unpkg.com/@google/generative-ai@0.21.0/dist/index.mjs'
import { fileSelect, chooseImg, fileToBase64, html2schema } from '@el-lowcode/utils'

const designer = inject('designerCtx')

const form = reactive(useLocalStorage('ai:options', {
  key: 'AIzaSyDrMDJQ2qAeyEMvrXpQm6AiLaVpuoN2cVE',
  model: 'gemini-1.5-flash',
}))

const model = computed(() => (new GoogleGenerativeAI(form.key)).getGenerativeModel({ model: form.model }))

const dropZone = ref()
const { files, isOverDropZone } = useDropZone(dropZone, { dataTypes: e => e.some(e => e.includes('image')), preventDefaultForUnhandled: true })
const image = computedAsync(() => files.value?.[0] ? fileToBase64(files.value[0]) : '')
const html  = ref('')

async function image2html(file) {
  const result = await model.value.generateContent([
    '将图片转为 HTML + Tailwind',
    { inlineData: { data: await file2base64(file), mimeType: file.type } }
  ])
  const text = (await result.response).text()
  return text.replace(/(^.*```html\s)?/, '').replace(/<\/html\>\s```.*/, '</html>')
}

function replaceCanvas() {
  Object.assign(designer.root, html2schema(html.value))
}

function file2base64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result.split(',')[1])
    reader.readAsDataURL(file)
  })
}

function showModal(html) {
  // const sw = screen.width, sh = screen.height
  // const w = Math.min(parseInt(json.designer?.canvas?.style?.width || sw), sw)
  // const h = Math.min(parseInt(json.designer?.canvas?.style?.height || sh), sh)
  
  const win = window.open('', '_blank')
  // `popup,width=${w},height=${h},left=${sw - w >> 1},top=${sh - h >> 1}`

  win.document.documentElement.innerHTML = html
}
</script>