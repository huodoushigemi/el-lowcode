import { createVNode, resolveDynamicComponent } from 'vue'
import { ElForm, ElFormItem, formItemProps, formProps } from 'element-plus'

import { createFormRender } from './createFormRender'
import { showOpt, solveOptions } from './utils'

const { FormRender, FormItemRender, formRenderProps, formItemRenderProps } = createFormRender({
  Form: ElForm,
  formName: 'ElFormRender',
  formProps: formProps,
  FormItem: ElFormItem,
  formItemName: 'ElFormItemRender',
  formItemProps: formItemProps,
  Input: (item) => {
    const { type, el } = item
    const is = el?.is || (`el-${type || 'input'}`)
    if (!item.options) {
      return createVNode(resolveDynamicComponent(is), el)
    }
    const options = solveOptions(item.options)!
    if (type == 'select' || is == 'ElSelect' || (!el.is && !type)) {
      return (
        <el-select {...el}>
          {options.map(opt => <el-option {...opt} />)}
        </el-select>
      )
    }
    else if (type == 'checkbox-group' || is == 'ElCheckboxGroup') {
      return (
        <el-checkbox-group {...el}>
          {options.map(opt => (
            el!.type == 'button'
              ? <el-checkbox-button {...opt} label={opt.value}>{showOpt(opt)}</el-checkbox-button>
              : <el-checkbox {...opt} label={opt.value}>{showOpt(opt)}</el-checkbox>
          ))}
        </el-checkbox-group>
      )
    }
    else if (type == 'radio-group' || is == 'ElRadioGroup') {
      return (
        <el-radio-group {...el}>
          {options.map(opt => (
            el!.type == 'button'
              ? <el-radio-button {...opt} label={opt.value}>{showOpt(opt)}</el-radio-button>
              : <el-radio {...opt} label={opt.value}>{showOpt(opt)}</el-radio>
          ))}
        </el-radio-group>
      )
    }
    else {
      return createVNode(resolveDynamicComponent(is), { options, ...el })
    }
  },
  fields: {
    modelValue: (item) => ({
      upload: 'fileList'
    }[item.is!] || 'modelValue')
  }
})

export const ElFormRender = FormRender
export const ElFormItemRender = FormItemRender

export {
  formRenderProps,
  formItemRenderProps
}

export default ElFormRender