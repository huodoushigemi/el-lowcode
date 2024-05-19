import { createApp, h, computed } from 'vue'
import { useDark } from '@vueuse/core'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import routes from '~pages'

import './style.css'
import 'virtual:uno.css'
// import 'uno.css'

import ElLowcode from 'el-lowcode'

useDark({ storageKey: 'vitepress-theme-appearance' })

createApp(() => h(RouterView))
  .use(ElementPlus)
  .use(ElLowcode)
  .use(createRouter({
    history: createWebHashHistory(),
    routes
  }))
  .mount('#app')
