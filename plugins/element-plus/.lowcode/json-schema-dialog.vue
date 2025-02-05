<template>
  <div my18 divide="x-1 solid current">
    <button class="vs-btn" type="primary" size="default" @click="show = true">
      <i-mdi:export mr8 text-1.2em />
      JSON Schema
    </button>
    <button class="vs-btn ml0!" px8="!" type="primary" size="default" tag="a" :href="previewUrl" target="_blank">
      <i-mdi:play-circle-outline text-1.2em />
    </button>
  </div>
  
  <el-dialog v-model="show" class="[&_.el-dialog\_\_footer]:flex" title="JSON Schema" destroy-on-close>
    <MonacoEditor v-model="jsonSchema" height="512px" :options="{ readOnly: true }" />
    <template #footer>
      <el-button size="default" type="primary" plain text bg tag="a" :href="previewUrl" target="_blank" mra decoration-none><i-mdi:eye-outline mr4 text-1.2em /> Preview</el-button>
      <el-button size="default" @click="show = false">Cancel</el-button>
      <el-button size="default" type="primary" @click="onExport"><i-mdi:progress-download mr4 text-1.2em /> Export</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
// import { ElButton, ElButtonGroup, ElDialog } from 'element-plus'

const designerCtx = inject('designerCtx')

const show = ref(false)

// todo
const jsonSchema = computed(() => JSON.stringify(designerCtx.widgets['ElFormLcd'].JSONSchemaOutput(designerCtx.active.data, designerCtx), null, '  '))
const previewUrl = computed(() => `https://form.lljj.me/v3/#/demo?type=Test&schema=${encodeURIComponent(jsonSchema.value)}`)

function onExport() {
  const file = new File([jsonSchema.value], `JSONSchema-${+new Date}.json`, { type: 'text/plain' })
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  a.click()
  URL.revokeObjectURL(url)
}
</script>