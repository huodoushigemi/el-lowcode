import { createVNode, resolveDynamicComponent } from 'vue'
import { NForm, NFormItem, formProps, formItemProps } from 'naive-ui'

import { createFormRender } from './createFormRender'
import { solveOptions } from './utils'

const { FormRender, FormItemRender } = createFormRender({
  Form: NForm,
  formName: 'NFormRender',
  formProps: formProps,
  FormItem: NFormItem,
  formItemName: 'NFormItemRender',
  formItemProps: formItemProps,
  Input: (item) => {
    const { type, el } = item
    const is = el?.is || (`n-${type || 'input'}`)
    if (!item.options) {
      return createVNode(resolveDynamicComponent(is), el)
    }
    const options = solveOptions(item.options)!
    if (el?.is) {
      return createVNode(resolveDynamicComponent(is), { options, ...el })
    }
    else if (type == 'select' || !type) {
      return (
        <n-select {...el} options={options} />
      )
    }
    else if (type == 'checkbox-group') {
      return (
        <n-checkbox-group {...el}>
          {options.map(opt => (
            <n-checkbox {...opt} />
          ))}
        </n-checkbox-group>
      )
    }
    else if (type == 'radio-group') {
      return (
        <n-radio-group {...el}>
          {options.map(opt => (
            el!.type == 'button'
              ? <n-radio-button {...opt} />
              : <n-radio {...opt} />
          ))}
        </n-radio-group>
      )
    }
  },
  fields: {
    prop: 'path',
    rules: 'rule',
    modelValue: (item) => ({
      radio: 'checked',
      checkbox: 'checked',
      upload: 'fileList',
    }[item.type!] || 'value'),
  }
})

FormRender.name = 'NFormRender'
FormItemRender.name = 'NFormItemRender'

export const NFormRender = FormRender
export const NFormItemRender = FormItemRender

export default NFormRender