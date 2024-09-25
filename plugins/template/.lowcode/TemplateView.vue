<template>
  <div px12 overflow-overlay>
    <ElCard v-for="item in templates" shadow="hover" body-class="p0!" my12>
      <ElImage v-if="item.cover" :src="item.cover" :preview-src-list="[item.cover]" />
      <div py8 px12>
        <div font-bold>{{ item.title }}</div>
        <div text-right>
          <ElButton size="default" type="primary" title="预览" plain text bg tag="a" target="_blank" p8 decoration-none @click="demoUrl(item)"><i-mdi:eye-outline text-1.2em /></ElButton>
          <ElButton size="default" type="primary" title="导入" plain text bg p8 @click="onEdit(item)"><i-mdi:application-import text-1.2em /></ElButton>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { computedAsync } from '@vueuse/core'
import { ElImage, ElCard, ElButton } from 'element-plus'

const designerCtx = inject('designerCtx')

const encodeSchema = (schema) => encodeURIComponent(JSON.stringify(schema, (k, v) => k == '_id' ? void 0 : v))

const templateModules = Object.values(import.meta.glob('./template/*.js'))
const templatesPromise = async () => ((await Promise.all(templateModules.map(e => e()))).map(e => e.default).filter(e => e))
const templates = computedAsync(templatesPromise)

function onEdit(item) {
  designerCtx.root = JSON.parse(JSON.stringify(item.schema))
}

async function demoUrl({ title, schema }) {
  const sw = screen.width, sh = screen.height
  const w = Math.min(parseInt(schema.designer?.canvas?.style?.width || sw), sw)
  const h = Math.min(parseInt(schema.designer?.canvas?.style?.height || sh), sh)

  const text = JSON.stringify(schema)
  const hash = (await import('md5')).default(text)

  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.45.4')
  const supabase = createClient(
    'https://oxbkrsyagojtbckytbjx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Ymtyc3lhZ29qdGJja3l0Ymp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNzQzNTAsImV4cCI6MjA0Mjg1MDM1MH0.M3O3VPvgfaxtMaasBIM-rgPw90l1GAG_m-_RQqMbNMc'
  )

  // await supabase.auth.signUp({ email: '123@qq.com', password: '123456' })

  const storage = supabase.storage.from('lcd')

  try {
    const file = new File([text], hash, { type: 'text/plain' })
    await storage.upload(hash, file, { cacheControl: 3600 * 24 * 7 })
  } catch (e) {
    console.error(e)
  }

  // eg: https://oxbkrsyagojtbckytbjx.supabase.co/storage/v1/object/public/lcd/echarts-demo.js
  const url = `${storage.url}/object/public/${storage.bucketId}/${hash}`

  const win = window.open(
    `/demo.html?file=${encodeURIComponent(url)}`,
    '_blank',
    `popup,width=${w},height=${h},left=${sw - w >> 1},top=${sh - h >> 1}`
  )

  win.addEventListener('DOMContentLoaded', () => {
    win.document.title = title
  })

  return {}
}

async function checkFileExists(storage, path) {
  const { data, error } = await storage.getPublicUrl(path)
  if (error?.message?.includes('not found')) return
  return data.publicUrl
}
</script>