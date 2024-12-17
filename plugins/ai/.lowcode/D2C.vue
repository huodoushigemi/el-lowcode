<template>
  <div>

  </div>
</template>

<script setup>
import { GoogleGenerativeAI } from 'https://unpkg.com/@google/generative-ai@0.21.0/dist/index.mjs'

const API_KEY = 'AIzaSyDrMDJQ2qAeyEMvrXpQm6AiLaVpuoN2cVE'

const ai = new GoogleGenerativeAI(API_KEY)
const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' })

async function image2html(file) {
  const result = await model.generateContent([
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