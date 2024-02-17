import { createVNode, resolveDynamicComponent } from 'vue'
import { Form, FormItem } from 'ant-design-vue'
import { formProps, formItemProps } from 'ant-design-vue/es/form'

import { createFormRender } from './createFormRender'
import { solveOptions } from './utils'

const { FormRender, FormItemRender } = createFormRender({
  Form: Form,
  formName: 'AFormRender',
  formProps: formProps(),
  FormItem: FormItem,
  formItemName: 'AFormItemRender',
  formItemProps: formItemProps(),
  Input: (item) => {
    const { type, el } = item
    const is = el?.is || (`a-${type || 'input'}`)
    if (!item.options) {
      return createVNode(resolveDynamicComponent(is), el)
    }
    const options = solveOptions(item.options)!
    if (el?.is) {
      return createVNode(resolveDynamicComponent(is), { options, ...el })
    }
    else if (type == 'select' || !type) {
      return (
        <a-select {...el} options={options} />
      )
    }
    else if (type == 'checkbox-group') {
      return (
        <a-checkbox-group {...el} options={options} />
      )
    }
    else if (type == 'radio-group') {
      return (
        <a-radio-group {...el} options={options} />
      )
    }
  },
  fields: {
    prop: 'name',
    modelValue: (item) => ({
      switch: 'checked',
      radio: 'checked',
      checkbox: 'checked',
      upload: 'fileList',
      transfer: 'targetKeys'
    }[item.type!] || 'value'),
  }
})

export const AFormRender = FormRender
export const AFormItemRender = FormItemRender

export default AFormRender