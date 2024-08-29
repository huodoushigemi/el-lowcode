import { formItemPropsConfig } from '../../utils'

let count = 0

export default {
  is: 'ElSlider',
  label: 'slider',
  category: '数据输入',
  props: [
    ...formItemPropsConfig({ exclude: ['readonly', 'clearable', 'placeholder'] }),
    { lp: ['min', 'el.min'], type: 'input-number' },
    { lp: ['max', 'el.max'], type: 'input-number' },
    { lp: ['step', 'el.step'], type: 'input-number' },
    { lp: ['show-input', 'el.showInput'], type: 'switch' },
    { lp: ['show-stops', 'el.showStops'], type: 'switch' },
    { lp: ['show-tooltip', 'el.showTooltip'], type: 'switch', displayValue: true },
    { lp: 'default-value', type: 'input-number' },
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'slider',
    prop: `slider${++count}`,
    defaultValue: 0,
    el: { is: 'ElSlider' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'number',
    title: props.label,
    description: props.description,
    default: props.defaultValue,
    minimum: props.el.min,
    maximum: props.el.max,
    multipleOf: props.el.step,
    pattern: props.rules?.pattern,
  })
}