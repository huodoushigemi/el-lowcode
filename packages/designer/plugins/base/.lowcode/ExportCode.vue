<template>
  <div flex="~ col" hfull>
    <el-segmented v-model="type" class="mb18 self-start" style="--el-segmented-item-selected-bg-color: var(--el-segmented-item-active-bg-color)" :options="options" size="large" #default="{ item }">
      <div flex aic px8>
        <img :src="item.icon" w28 h28 mr4 />
        <div>{{ item.label }}</div>
      </div>
    </el-segmented>
    <MonacoEditor v-model="code" class="flex-1" :language="curr.lang ?? curr.value" :options="{ readOnly: true }" @save="ok" />
    <!-- <el-button type="primary" @click="ok">Download</el-button> -->
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { computedAsync } from '@vueuse/core'
import { download } from '@el-lowcode/utils'
import { genCode } from '../../../utils'

const lcd = inject('designerCtx')

const vis = ref(false)

const type = ref('vue')
const options = [
  { icon: 'https://api.iconify.design/vscode-icons:file-type-vue.svg', label: 'Vue', value: 'vue', lang: 'html', code: () => genCode.vue(lcd) },
  { icon: 'https://api.iconify.design/vscode-icons:file-type-vue.svg', label: 'Json Render', value: 'jsonr', ext: 'vue', lang: 'html', code: () => genCode.jsonRender(lcd) },
  { icon: 'https://api.iconify.design/vscode-icons:file-type-json.svg', label: 'Json', value: 'json', code: () => JSON.stringify(lcd.root, null, 2) },
  // { icon: 'https://osawards.com/javascript/pic/2022/SolidJS.png', label: 'Solid-js', value: 'solid-js', ext: 'jsx', lang: 'jsx', code: () => genCode.solidjs(designer) },
]
const curr = computed(() => options.find(e => e.value == type.value))

const code = computedAsync(() => curr.value.code(), null, { lazy: true, onError: console.error })

function ok() {
  download(code.value, `${+new Date}.${curr.value.ext ?? curr.value.value}`)
}

defineExpose({ vis })
</script>