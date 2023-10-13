import { ENUM_SIZE } from '../../const'
import { formItemPropsConfig } from '../_utils'

let count = 0

export default {
  is: 'ElSwitch',
  label: 'switch',
  props: [
    ...formItemPropsConfig(),
    { lp: 'width' },
    { lp: 'active-text' },
    { lp: 'inactive-text' },
    { lp: 'active-value' },
    { lp: 'inactive-value' },
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'switch',
    prop: `switch${++count}`,
    defaultValue: false,
    el: { is: 'ElSwitch' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'boolean',
    title: props.label,
    description: props.description,
    default: props.defaultValue,
    pattern: props.rules?.pattern,
  })
}