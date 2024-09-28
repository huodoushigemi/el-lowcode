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
import { previewLcd } from './utils'

const designerCtx = inject('designerCtx')

const encodeSchema = (schema) => encodeURIComponent(JSON.stringify(schema, (k, v) => k == '_id' ? void 0 : v))

const templateModules = Object.values(import.meta.glob('./template/*.js'))
const templatesPromise = async () => ((await Promise.all(templateModules.map(e => e()))).map(e => e.default).filter(e => e))
const templates = computedAsync(templatesPromise)

function onEdit(item) {
  designerCtx.root = JSON.parse(JSON.stringify(item.schema))
}

async function demoUrl({ title, schema }) {
  const win = await previewLcd(schema)
  win.addEventListener('DOMContentLoaded', () => win.document.title = title, { once: true })
}
</script>