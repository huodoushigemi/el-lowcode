import { createVNode, resolveDynamicComponent } from 'vue'
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElForm, ElFormItem, ElOption, ElRadio, ElRadioButton, ElRadioGroup, ElSelect, formItemProps, formProps } from 'element-plus'

import { createFormRender } from './createFormRender'
import { optValue, showOpt, solveOptions } from './form-render'

const { FormRender, FormItemRender } = createFormRender({
  Form: ElForm,
  formProps: formProps,
  FormItem: ElFormItem,
  formItemProps: formItemProps,
  Input: (item) => {
    const { type, el } = item
    const is = el?.is || (`el-${type || 'input'}`)
    if (!item.options) {
      return createVNode(resolveDynamicComponent(is), el)
    }
    const options = solveOptions(item.options)!
    if (el?.is) {
      return createVNode(resolveDynamicComponent(is), { options, ...el })
    }
    else if (type == 'select' || !type) {
      return (
        <ElSelect {...el}>
          {options.map(opt => <ElOption {...opt} />)}
        </ElSelect>
      )
    }
    else if (type == 'checkbox-group') {
      return (
        <ElCheckboxGroup {...el}>
          {options.map(opt => (
            el!.type == 'button'
              ? <ElCheckboxButton {...opt} label={optValue(opt)}>{showOpt(opt)}</ElCheckboxButton>
              : <ElCheckbox {...opt} label={optValue(opt)}>{showOpt(opt)}</ElCheckbox>
          ))}
        </ElCheckboxGroup>
      )
    }
    else if (type == 'radio-group') {
      return (
        <ElRadioGroup {...el}>
          {options.map(opt => (
            el!.type == 'button'
              ? <ElRadioButton {...opt} label={optValue(opt)}>{showOpt(opt)}</ElRadioButton>
              : <ElRadio {...opt} label={optValue(opt)}>{showOpt(opt)}</ElRadio>
          ))}
        </ElRadioGroup>
      )
    }
  },
  fields: {
    modelValue: (item) => ({
      upload: 'fileList'
    }[item.type] || 'modelValue')
  }
})

FormRender.name = 'ElFormRender'
FormItemRender.name = 'ElFormItemRender'

export const ElFormRender = FormRender
export const ElFormItemRender = FormItemRender

export default ElFormRender