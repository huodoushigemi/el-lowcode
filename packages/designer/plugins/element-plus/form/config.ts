import { mapValues, keyBy } from '@el-lowcode/utils'
import { treeUtils } from '@el-lowcode/utils'
import { ENUM_SIZE } from '../utils'
// import JsonSchemaDialog from './json-schema-dialog.vue'
import { FormItemProps } from 'element-plus'

import Input from '../.lowcode/config/input'

export default {
  is: 'ElForm$$',
  label: 'form',
  layout: true,
  category: '数据输入',
  props: [
    // todo
    // { is: JsonSchemaDialog },
    { lp: 'model', required: true, scriptable: true },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
    { lp: 'label-width', type: 'slider', el: { max: 200 } },
    { lp: 'label-position', type: 'radio-group', options: ['left', 'right', 'top'] },
    { lp: 'disabled', type: 'switch' },
    { lp: 'inline', type: 'switch' },
    { lp: 'label-suffix' },
    { lp: 'status-icon', type: 'switch' },
    { lp: 'scroll-to-error', type: 'switch' },
    { is: 'ElDivider' },
    { is: 'h1', children: 'Event' },
    { lp: 'onSubmit', scriptable: true }
  ],
  defaultProps: () => ({
    labelWidth: 80,
    style: { overflow: 'hidden' },
    children: [
      Input.defaultProps()
    ]
  }),
  JSONSchemaOutput: (props) => {
    const flatted = treeUtils.flat(props.children as FormItemProps[]).filter(e => e.prop)
    return {
      type: 'object',
      required: flatted.filter(e => e.required).map(e => e.prop),
      // todo
      // properties: mapValues(keyBy(flatted, 'prop'), e => el_lowcode_widgets[e.el?.is]?.JSONSchemaOutput?.(e))
    }
  }
}