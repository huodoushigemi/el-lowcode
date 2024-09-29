import { unFn } from '@el-lowcode/utils'

const types = ['ElInput', 'ElInputNumber', 'ElRate', 'ElSlider', 'ElSwitch', 'ElSelect', 'ElRadioGroup', 'ElCheckboxGroup', 'ElTimePicker', 'ElDatePicker', 'ElColorPicker', 'ElDateTime-lcd']
const hasOpts = ['ElSelect', 'ElRadioGroup', 'ElCheckboxGroup', 'ElSegmented']

export default {
  is: 'ElFormItemRender',
  label: 'field',
  category: '表单',
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
    { is: 'ElFormRender', model: props.el, labelPosition: 'top', size: 'small', children: [
      { prop: 'is', options: types, el: { clearable: false, onChange: v => props.el = createInput(v, ctx) } },
      ...unFn(ctx.widgets[props.el.is].props, props.el, ctx) || [],
    ] },
    hasOpts.includes(props.el.is) && { lp: 'options', el: { is: 'OptionsInput' }, defaultValue: () => [{ label: 'opt 1', value: '1' }, { label: 'opt 2', value: '2' }, { label: 'opt 3', value: '3' }] },
  ]),
  defaultProps: (ctx) => ({
    is: 'ElFormItemRender',
    label: 'field',
    prop: `input`,
    el: createInput('ElInput', ctx)
  }),
  JSONSchemaOutput: (props, ctx) => ({
    title: props.label,
    description: props.description,
    pattern: props.rules?.pattern,
    default: props.el.defaultValue,
    enum: props.options?.map(e => e.value),
    enumNames: props.options?.map(e => e.label),
    ...ctx.widgets[props.el.is].JSONSchemaOutput?.(props.el, ctx)
  })
}

function createInput(is, ctx) {
  return {
    is,
    ...ctx.widgets[is].defaultProps?.(ctx),
  }
}