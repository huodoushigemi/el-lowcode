import * as ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { ElFormRender } from 'el-form-render'

import DateTime from './date-time'
import Form from './ElFormLcd.vue'
import Table from './ElTableLcd.vue'

window.ElementPlus = ElementPlus

export default {
  install(app) {
    app.use(ElementPlus)
    app.use(ElFormRender)

    app.use(DateTime)
    app.component(Form.__name, Form)
    app.component(Table.__name, Table)
  }
}