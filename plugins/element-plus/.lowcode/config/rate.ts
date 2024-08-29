import { formItemPropsConfig } from '../../utils'

let count = 0

export default {
  is: 'ElRate',
  label: 'rate',
  category: '数据输入',
  props: [
    ...formItemPropsConfig({ exclude: ['readonly', 'placeholder'] }),
    { lp: ['max', 'el.max'], type: 'input-number', displayValue: 5 },
    // { lp: ['low-threshold', 'el.lowThreshold'], type: 'input-number', displayValue: 2 },
    // { lp: ['high-threshold', 'el.highThreshold'], type: 'input-number', displayValue: 4 },
    { lp: ['void-color', 'el.voidColor'], type: 'color-picker' },
    { lp: ['show-score', 'el.showScore'], type: 'switch' },
    { lp: 'default-value', type: 'input-number' },
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'rate',
    prop: `rate${++count}`,
    defaultValue: 0,
    el: { is: 'ElRate' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'number',
    title: props.label,
    description: props.description,
    default: props.defaultValue,
    maximum: props.max,
    pattern: props.rules?.pattern,
  })
}