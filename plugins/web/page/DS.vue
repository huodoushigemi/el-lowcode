<template>
  <table class="vs-table wfull b-1">
    <tr>
      <th>Data Source</th>
      <th class="cursor-pointer" @click="onAdd"><div class="mask-icon mxa w24 h24" style="--mask-image: url(https://api.iconify.design/bi:plus.svg)" /></th>
    </tr>
    <tr v-for="e in modelValue" class="vs-li cursor-pointer" @click="vis = true; model = e">
      <td class="hover:c-blue">{{ e.id }}</td>
      <td class="hover:c-red" @click.stop="remove(modelValue, e)"><div class="mask-icon mxa w20 h20" style="--mask-image: url(https://api.iconify.design/ic:sharp-delete-outline.svg)" /></td>
    </tr>
    <tr v-if="!modelValue?.length">
      <td colspan="2" class="p20 op40 text-center">Empty</td>
    </tr>
  </table>

  <el-drawer v-model="vis" title="Data Source" destroy-on-close append-to-body size="500px" @closed="model = null">
    <el-form-render ref="formRef" :model="model" label-position="right" label-width="auto">
      <div grid="~ cols-2" style="gap: 0 32px">
        <el-form-item-render :lp="['ID', 'id']" :rules="[required, { validator: (r, v) => modelValue?.find(e => e.id == v) ? new Error('ID duplicate') : true }]" />
        <el-form-item-render :lp="['IS INIT', 'isInit']" type="switch" /> 
        <el-form-item-render :lp="['Type', 'type']" :options="['fetch']" />
        <el-form-item-render :lp="['METHOD', 'options.method']" :options="['GET', 'POST', 'PUT', 'DELETE']" />
      </div>
      <el-form-item-render :lp="['URL', 'options.uri']" :rules="[required]" :el="{ placeholder: 'https://...' }" />
      <el-form-item-render :lp="['BODY', 'options.params']" :el="{ is: 'MonacoEditor', language: 'json', options: { scrollBeyondLastLine: false } }" :displayValue="`{\n  \n}`" :get="v => v ? JSON.stringify(v, '  ') : void 0" :set="v => v ? JSON.parse(v) : void 0" style="height: 100px" />
      <el-form-item-render :lp="['FILTER', 'dataHandler']" :el="{ is: 'MonacoEditor', language: 'javascript', options: { scrollBeyondLastLine: false } }" :displayValue="`(data) => {\n  return data\n}`" :get="v => unExp(v)" :set="v => wrapExp(v)" style="height: 128px" />
    </el-form-render>

    <template #footer>
      <el-button @click="vis = false">Esc</el-button>
      <el-button type="primary" @click="ok">OK</el-button>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { remove } from '@vue/shared'
import { unExp, wrapExp, toArr } from '@el-lowcode/utils'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const required = { required: true, message: '' }

const vis = ref(false)
const formRef = ref()
const model = ref()

function onAdd() {
  vis.value = true
  model.value = {
    type: 'fetch',
    isInit: true,
    options: {
      method: 'POST',
    }
  }
}

async function ok() {
  await formRef.value.validate()
  emit('update:modelValue', [...toArr(props.modelValue), model.value])
  vis.value = false
}

watchEffect(() => console.log(props.modelValue))
</script>