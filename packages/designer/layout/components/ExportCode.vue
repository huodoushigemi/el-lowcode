<template>
  <el-drawer v-model="vis" size="60%" direction="rtl" :with-header="false" destroy-on-close append-to-body>
    <div flex="~ col" hfull>
      <el-segmented v-model="type" class="mb18 self-start" style="--el-segmented-item-selected-bg-color: var(--el-segmented-item-active-bg-color)" :options="options" size="large" #default="{ item }">
        <div flex aic px8>
          <img :src="item.icon" w28 h28 mr4 />
          <div>{{ item.label }}</div>
        </div>
      </el-segmented>
      <MonacoEditor v-model:value="code" class="flex-1" :language="curr.lang ?? curr.value" :options="{ readOnly: true }" @save="ok" />
      <div class="mt18 text-right">
        <el-button @click="vis = true">Esc</el-button>
        <el-button type="primary" @click="ok">Download</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { download } from '@el-lowcode/utils'
import { DesignerCtx } from '../interface'
import { genCode } from '../../utils'
import MonacoEditor from './monaco-editor.vue'

const designer = inject<DesignerCtx>('designerCtx')!

const vis = ref(false)

const type = ref('vue')
const options = [
  { icon: 'https://api.iconify.design/vscode-icons:file-type-vue.svg', label: 'Vue', value: 'vue', lang: 'html', code: () => genCode.vue(designer) },
  { icon: 'https://api.iconify.design/vscode-icons:file-type-vue.svg', label: 'Json Render', value: 'jsonr', ext: 'vue', lang: 'html', code: () => genCode.jsonRender(designer) },
  { icon: 'https://api.iconify.design/vscode-icons:file-type-json.svg', label: 'Json', value: 'json', code: () => JSON.stringify(designer.root, null, 2) },
  { icon: 'https://osawards.com/javascript/pic/2022/SolidJS.png', label: 'Solid-js', value: 'solid-js', ext: 'jsx', lang: 'jsx', code: () => genCode.solidjs(designer) },
]
const curr = computed(() => options.find(e => e.value == type.value)!)

const code = computed(() => curr.value.code())

function ok() {
  download(code.value, `${+new Date}.${curr.value.ext ?? curr.value.value}`)
}

defineExpose({ vis })
</script>