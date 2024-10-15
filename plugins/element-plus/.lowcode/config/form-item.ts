import { reactive } from 'vue'
import { unFn } from '@el-lowcode/utils'

const types = ['ElInput', 'ElInputNumber', 'ElRate', 'ElSlider', 'ElSwitch', 'ElSelect', 'ElRadioGroup', 'ElCheckboxGroup', 'ElTimePicker', 'ElDatePicker', 'ElColorPicker', 'ElDateTime-lcd']

export default {
  is: 'ElFormItemRender',
  label: 'field',
  category: '表单',
  drag: { from: [], to: ['ElForm', 'ElForm-c', 'ElForm-lcd'] },
  props: (props, ctx) => ([
    { is: 'div', class: 'grid grid-cols-3 gap-x-8', children: [
      { lp: ['标签', 'label'] },
      { lp: ['key', 'prop'], required: true, script: false, el: { clearable: false } },
      { lp: ['必填', 'required'], type: 'switch' },
    ] },
    // { lp: 'description', el: { type: 'textarea', autosize: { minRows: 2, maxRows: 4 } } },
    { is: 'ElCollapse', class: 'mb18', children: [{ is: 'ElCollapseItem', title: '校验', children: [
        { lp: ['validator', 'rules.validator'], script: true },
        { lp: ['pattern', 'rules.pattern'] },
        { lp: ['pattern-hint', 'rules.message'] }
      ]
    }]},
    // { lp: ['size', 'el.size'], type: 'radio-group', options: ENUM_SIZE },
    
    { is: 'div', class: 'mx--8 b-b-1' },
    { is: 'h4', class: 'my12', children: '组件' },
    { is: 'ElFormRender', model: props.children?.[0] || {}, labelPosition: 'top', size: 'small', children: [
      { prop: 'is', options: types, el: { clearable: false, onChange: v => props.children = [createInput(v, ctx)] } },
      ...unFn(ctx.widgets[props.children?.[0]?.is]?.props, props.children?.[0], ctx) || [],
    ] },
  ]),
  defaultProps: (ctx) => ({
    is: 'ElFormItemRender',
    label: 'field',
    prop: `input`,
    children: [createInput('ElInput', ctx)],
  }),
  devProps: props => ({
    ...props,
    children: props.children?.length ? reactive([{ ...props.children[0], 'lcd-drag': { disabled: true } }]) : props.children
  }),
  purify: props => ({
    ...props,
    // defaultValue: void 0,
    children: [{ ...props.children[0], defaultValue: void 0 }]
  }),
  JSONSchemaOutput: (props, ctx) => {
    const el = props.children[0] || {}
    return {
      title: props.label,
      description: props.description,
      pattern: props.rules?.pattern,
      default: el.defaultValue,
      enum: el.children?.map(e => e.value),
      enumNames: el.children?.map(e => e.label),
      ...ctx.widgets[el.is].JSONSchemaOutput?.(el, ctx)
    }
  }
}

function createInput(is, ctx) {
  return {
    is,
    ...ctx.widgets[is].defaultProps?.(ctx),
  }
}