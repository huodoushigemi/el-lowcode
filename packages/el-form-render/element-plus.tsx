import { createVNode, resolveDynamicComponent } from 'vue'
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElForm, ElFormItem, ElOption, ElRadio, ElRadioButton, ElSelect, formItemProps, formProps } from 'element-plus'

import { createFormRender } from './createFormRender'
import { optValue, showOpt, Item, NormalizedOpt } from './form-render'

const { FormRender, FormItemRender } = createFormRender({
  prefix: 'el-',
  Form: ElForm,
  formProps: formProps,
  FormItem: ElFormItem,
  formItemProps: formItemProps,
  Options: ({ type, options, el }: Item & { options: NormalizedOpt[] }, { slots }) => {
    if (el?.is) {
      return createVNode(resolveDynamicComponent(el.is), { options, ...el }, slots)
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
        <ElCheckboxGroup {...el}>
          {options.map(opt => (
            el!.type == 'button'
              ? <ElRadioButton {...opt} label={optValue(opt)}>{showOpt(opt)}</ElRadioButton>
              : <ElRadio {...opt} label={optValue(opt)}>{showOpt(opt)}</ElRadio>
          ))}
        </ElCheckboxGroup>
      )
    }
  },
})

FormRender.name = 'ElFormRender'
FormItemRender.name = 'ElFormItemRender'

export const ElFormRender = FormRender
export const ElFormItemRender = FormItemRender

export default ElFormRender