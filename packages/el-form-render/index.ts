import { withInstall } from '@el-lowcode/utils'
import FormRender from './form-render.vue'
import FormItemRender from './form-item-render.vue'
export * from './form-render'

export const ElFormItemRender = FormItemRender
// todo
// @ts-ignore
export const ElFormRender = withInstall(FormRender, [FormItemRender])
export default ElFormRender
