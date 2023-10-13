<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, FormInstance } from 'element-plus'
// import 'element-plus/es/components/form/style/css'
import { formRenderProps, prop } from './form-render'
import FormItemRender from './form-item-render.vue'

defineOptions({ name: 'ElFormRender' })

const props = defineProps(formRenderProps)

const formRef = ref<FormInstance>()

defineExpose(new Proxy({}, {
  get(t, k) {
    return formRef.value?.[k]
  },
  has(t, k) {
    return k in (formRef.value || {})
  }
}))
</script>

<template>
  <el-form ref="formRef" v-bind="props" :items="undefined" @submit.prevent="formRef!.validate()">
    <template v-for="item in items" :key="prop(item)">
      <component :is="item.is ?? FormItemRender" v-bind="item">
        <slot :name="prop(item)" />
      </component>
    </template>

    <slot />
  </el-form>
</template>
