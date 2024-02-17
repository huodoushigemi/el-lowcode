import { createVNode, mergeProps, resolveDynamicComponent } from 'vue'
import { Form, formProps, Field, fieldProps } from 'vant'

import { createFormRender } from './createFormRender'
import { showOpt, solveOptions } from './utils'

const { FormRender, FormItemRender } = createFormRender({
  Form: Form,
  formName: 'VanFormRender',
  formProps: formProps,
  FormItem: Field,
  formItemName: 'VanFormItemRender',
  formItemProps: fieldProps,
  Input: (item) => {
    const { type, el } = item
    const is = el?.is || `van-${type || 'field'}`
    if (!item.options) {
      return createVNode(resolveDynamicComponent(is), mergeProps({ style: 'padding: 0' }, el))
    }
    const options = solveOptions(item.options)!
    if (el?.is) {
      return createVNode(resolveDynamicComponent(is), { options, ...el })
    }
    else if (type == 'checkbox-group') {
      return (
        <van-checkbox-group {...el}>
          {options.map(opt => (
            <van-checkbox name={opt.value} {...opt}>{showOpt(opt)}</van-checkbox>
          ))}
        </van-checkbox-group>
      )
    }
    else if (type == 'radio-group') {
      return (
        <van-radio-group {...el}>
          {options.map(opt => (
            <van-radio name={opt.value} {...opt}>{showOpt(opt)}</van-radio>
          ))}
        </van-radio-group>
      )
    }
  },
  fields: {
    prop: 'name',
    inputSlot: 'input',
  }
})

export const VanFormRender = FormRender
export const VanFormItemRender = FormItemRender

export default VanFormRender