import { createApp } from 'vue'
import { ElFormRender } from 'el-form-render'
import './style.css'
import App from './App.vue'
import { ElInput } from 'element-plus'

import 'element-plus/es/components/input/style/css'

createApp(App).use(ElFormRender).use(ElInput).mount('#app')
