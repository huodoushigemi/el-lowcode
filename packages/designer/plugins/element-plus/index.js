import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { ElFormRender } from 'el-form-render'

import DateTime from './date-time'
import Form from './form'

export default {
  install(app) {
    app.use(ElementPlus)
    app.use(ElFormRender)

    app.use(DateTime)
    app.use(Form)
  }
}