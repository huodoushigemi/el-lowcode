<template>
  <Page>
    <p>Element Plus 基于 Vue 3，面向设计师和开发者的组件库</p>
    <p>
      {{ \"xxx\" }}
    </p>
    <p v-if="\"as\"d\"" :style="{ width: \"100\\\"px\", xxx: { www: \"pp\\\"p\" }, height: 'asda\\\"sd' }">xxxxxasad</p>
  </Page>
  </template>
  
  <script setup>
  import { reactive, computed, toRef } from 'vue'
  import { useConfigProvider } from 'el-lowcode'
  
  const { state, ds } = useConfigProvider({
    state: { count: 0 },
    plugins: ['/plugins/web', '/plugins/ai'],
  })
  </script>