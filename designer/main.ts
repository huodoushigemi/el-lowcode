import { createApp, h, computed } from 'vue'
import { useDark } from '@vueuse/core'

import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import routes from '~pages'


import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/divider/style/css'
import 'element-plus/es/components/collapse/style/css'
import 'element-plus/es/components/collapse-item/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/drawer/style/css'
import 'element-plus/es/components/tooltip/style/css'
// import 'element-plus/es/components/dropdown/style/css'
// import 'element-plus/es/components/dropdown/style/css'
// import 'element-plus/es/components/dropdown-menu/style/css'
// import 'element-plus/es/components/dropdown-item/style/css'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/tabs/style/css'
import 'element-plus/es/components/tab-pane/style/css'
import 'element-plus/es/components/image/style/css'
import 'element-plus/es/components/card/style/css'
import 'element-plus/es/components/empty/style/css'
import 'element-plus/es/components/collapse-transition/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/input-number/style/css'
import 'element-plus/es/components/slider/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/radio/style/css'
import 'element-plus/es/components/radio-button/style/css'
import 'element-plus/es/components/radio-group/style/css'
import 'element-plus/es/components/checkbox/style/css'
import 'element-plus/es/components/checkbox-button/style/css'
import 'element-plus/es/components/checkbox-group/style/css'
import 'element-plus/es/components/switch/style/css'
import 'element-plus/es/components/segmented/style/css'
import 'element-plus/es/components/color-picker/style/css'

import './style.css'
import 'virtual:uno.css'
// import 'uno.css'

// useDark({ storageKey: 'vitepress-theme-appearance' })

createApp(() => h(RouterView))
  .use(ElementPlus)
  .use(createRouter({
    history: createWebHashHistory(),
    routes
  }))
  .mount('#app')
