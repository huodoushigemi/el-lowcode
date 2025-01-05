<template>
  <div px12 overflow-overlay>
    <i-mingcute:loading-line v-if="loading" class="hfull block mxa text-32 animate-spin" style="margin-top: 64px" />

    <ElCard v-else v-for="item in templates" shadow="hover" body-class="p0!" my12>
      <ElImage v-if="item.cover" :src="fnAsync(item.cover)" :preview-src-list="[fnAsync(item.cover)]" />
      <div class="py8 px12">
        <div class="font-bold">{{ item.title }}</div>
        <div class="text-right">
          <ElButton size="default" type="primary" title="预览" plain text bg p8 decoration-none @click="demoUrl(item)"><i-mdi:eye-outline text-1.2em /></ElButton>
          <ElButton size="default" type="primary" title="导入" plain text bg p8 @click="onEdit(item)"><i-mdi:application-import text-1.2em /></ElButton>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { computedAsync } from '@vueuse/core'
import { useRequest } from 'vue-request'
import { ElImage, ElCard, ElButton } from 'element-plus'
import { unFn } from '@el-lowcode/utils'
import { previewLcd } from './utils'

const designerCtx = inject('designerCtx')

const templateModules = Object.values(import.meta.glob('./template/*.js'))
const { data: templates, loading } = useRequest(() => Promise.all(templateModules.map(e => e().then(e => e.default))))

function onEdit(item) {
  designerCtx.root = JSON.parse(JSON.stringify(unFn(item.schema)))
}

const cache = new WeakMap()
function fnAsync(fn) {
  return (cache.get(fn) ?? cache.set(fn, computedAsync(() => unFn(fn))).get(fn)).value
}

async function demoUrl({ title, schema }) {
  const win = await previewLcd(schema)
  win.addEventListener('DOMContentLoaded', () => win.document.title = title, { once: true })
}
</script>