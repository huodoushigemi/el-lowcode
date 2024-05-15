import { mapValues, keyBy } from '@el-lowcode/utils'
import { treeUtils } from '@el-lowcode/utils'
import { ENUM_SIZE } from '../../const'
import { el_lowcode_widgets } from '../el_lowcode_widgets'
import { parseAttrs } from '../_utils'
import JsonSchemaDialog from './json-schema-dialog.vue'
import { FormItemProps } from 'element-plus'

export default {
  is: 'Form',
  label: 'form',
  layout: true,
  props: [
    { is: JsonSchemaDialog },
    { lp: 'model', required: true, scriptable: true },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
    { lp: 'label-width' },
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
      parseAttrs(el_lowcode_widgets.ElInput!)
    ]
  }),
  JSONSchemaOutput: (props) => {
    const flatted = treeUtils.flat(props.children as FormItemProps[]).filter(e => e.prop)
    return {
      type: 'object',
      required: flatted.filter(e => e.required).map(e => e.prop),
      properties: mapValues(keyBy(flatted, 'prop'), e => el_lowcode_widgets[e.el?.is]?.JSONSchemaOutput?.(e))
    }
  }
}