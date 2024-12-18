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

    <button class="vs-btn" @click="fileSelect({ accept: 'image/*' }).then(e => image2html(e[0]))">
      <div class="mask-icon mr2 w24 h18" style="--mask-image: url(https://api.iconify.design/majesticons:image-line.svg);" />
      upload
    </button>

  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { GoogleGenerativeAI } from 'https://unpkg.com/@google/generative-ai@0.21.0/dist/index.mjs'
import { fileSelect, chooseImg } from '@el-lowcode/utils'

const form = reactive({
  key: 'AIzaSyDrMDJQ2qAeyEMvrXpQm6AiLaVpuoN2cVE',
  model: 'gemini-1.5-flash',
})

const model = computed(() => (new GoogleGenerativeAI(form.key)).getGenerativeModel({ model: form.model }))

async function image2html(file) {
  const result = await model.value.generateContent([
    '将图片转为 HTML + Tailwind',
    { inlineData: { data: await file2base64(file), mimeType: file.type } }
  ])
  const text = (await result.response).text()
  console.log(text);
}

function html2schema(html) {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  // todo
}

function file2base64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result.split(',')[1])
    reader.readAsDataURL(file)
  })
}
</script>