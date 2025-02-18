<template>
  <div class="px12" overflow-overlay>
    <i-mingcute:loading-line v-if="loading" class="hfull block mxa text-32 animate-spin" style="margin-top: 64px" />

    <div v-else v-for="item in templates" shadow="hover" body-class="p0!" class="vs-li comp-li my12 cursor-pointer" flex="~ col" @click="onEdit(item)">
      <img class="comp-cover" :src="unVal(item.cover) || 'https://img.alicdn.com/tfs/TB1SnwliYr1gK0jSZR0XXbP8XXa-192-144.png_300x300Q90.jpg'" wfull hfull :style="`max-height: ${item.cover ? 'unset' : '96px'}; object-fit: scale-down;`" />
      <!-- <ElImage :src="unVal(item.cover)" :preview-src-list="[unVal(item.cover)]" /> -->
      <div class="py8 pb12 px12 text-center" style="background: rgba(0,0,0,.25);">
        <div class="font-bold">{{ item.title }}</div>
        <!-- <div class="text-right">
          <ElButton size="default" type="primary" title="预览" plain text bg p8 decoration-none @click="demoUrl(item)"><i-mdi:eye-outline text-1.2em /></ElButton>
          <ElButton size="default" type="primary" title="导入" plain text bg p8 @click="onEdit(item)"><i-mdi:application-import text-1.2em /></ElButton>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useRequest } from 'vue-request'
// import { ElCard, ElButton, ElImage } from 'element-plus'
import { unFn, unVal} from '@el-lowcode/utils'
import { previewLcd } from './utils'

const designerCtx = inject('designerCtx')

const templateModules = Object.values(import.meta.glob('./template/*.js'))
const { data: templates, loading } = useRequest(() => Promise.all(templateModules.map(e => e().then(e => e.default))))

function onEdit(item) {
  designerCtx.root = JSON.parse(JSON.stringify(unFn(item.schema)))
}

async function demoUrl({ title, schema }) {
  const win = await previewLcd(schema)
  win.addEventListener('DOMContentLoaded', () => win.document.title = title, { once: true })
}
</script>

<style lang="scss" scoped>

</style>