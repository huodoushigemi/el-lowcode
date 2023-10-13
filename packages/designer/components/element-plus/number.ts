import { formItemPropsConfig } from '../_utils'

let count = 0

export default {
  is: 'ElInputNumber',
  label: 'number',
  props: [
    ...formItemPropsConfig(),
    { lp: ['min', 'el.min'], type: 'input-number' },
    { lp: ['max', 'el.max'], type: 'input-number' },
    { lp: ['step', 'el.step'], type: 'input-number' },
    { lp: ['precision', 'el.precision'], type: 'input-number' },
    { lp: ['controls', 'el.controls'], type: 'switch', defaultValue: true },
    { lp: 'default-value', type: 'input-number' },
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'number',
    prop: `number${++count}`,
    defaultValue: 0,
    el: { is: 'ElInputNumber', controlsPosition: 'right' }
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