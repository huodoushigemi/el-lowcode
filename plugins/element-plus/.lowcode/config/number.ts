import { ENUM_SIZE } from '../../utils'

export default {
  is: 'ElInputNumber',
  label: 'number',
  category: '数据输入',
  props: [
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'readonly', type: 'switch' },
      { lp: 'min', type: 'input-number' },
      { lp: 'max', type: 'input-number' },
      { lp: 'step', type: 'input-number' },
      { lp: 'precision', type: 'input-number' },
      { lp: 'controls', type: 'switch', displayValue: true },
    ] },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
  ],
  defaultProps: () => ({
    defaultValue: 0,
    controlsPosition: 'right',
  }),
  JSONSchemaOutput: (props) => ({
    type: 'number',
    minimum: props.min,
    maximum: props.max,
    multipleOf: props.step,
  })
}