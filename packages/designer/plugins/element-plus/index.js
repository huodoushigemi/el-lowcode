import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { ElFormRender } from 'el-form-render'

import DateTime from './date-time'
import Descriptions from './descriptions'
import Form from './form'

export default {
  install(app) {
    app.use(ElementPlus)
    app.use(ElFormRender)

    app.use(DateTime)
    app.use(Descriptions)
    app.use(Form)
  }
}