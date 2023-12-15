import { withInstall } from '@el-lowcode/utils'
import FormRender from './form-render.vue'
import FormItemRender from './form-item-render.vue'
export * from './form-render'

// export const ElFormItemRender = FormItemRender

// export const ElFormRender = withInstall(FormRender, [FormItemRender])
// export default ElFormRender

export * from './element-plus'
import { ElFormRender } from './element-plus'

export default ElFormRender