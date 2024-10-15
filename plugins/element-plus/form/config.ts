import { mapValues, keyBy } from '@el-lowcode/utils'
import { treeUtils } from '@el-lowcode/utils'
import { ENUM_SIZE } from '../utils'
import JsonSchemaDialog from './json-schema-dialog.vue'

export default {
  is: 'ElForm-c',
  label: 'form',
  category: '表单',
  props: [
    { lp: 'model', required: true, script: true },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
    { lp: 'label-position', type: 'radio-group', options: ['left', 'right', 'top'] },
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'label-width', type: 'input-number', el: { max: 200 } },
      { lp: 'label-suffix' },
      { lp: 'disabled', type: 'switch' },
      { lp: 'inline', type: 'switch' },
      { lp: 'status-icon', type: 'switch' },
      { lp: 'scroll-to-error', type: 'switch' },
    ] },
    { is: 'ElDivider' },
    { is: JsonSchemaDialog },
    { is: 'ElDivider' },
    { is: 'h1', children: 'Event' },
    { lp: 'onSubmit', script: true }
  ],
  defaultProps: (ctx) => ({
    model: '{{(state.formData ??= {}, state.formData)}}',
    labelWidth: 80,
    style: { overflow: 'hidden' },
    children: [
      ctx.widgets.ElFormItemRender.defaultProps(ctx)
    ]
  }),
  JSONSchemaOutput: (props, ctx) => {
    const flatted = treeUtils.flat(props.children).filter(e => e.prop)
    return {
      type: 'object',
      required: flatted.filter(e => e.required).map(e => e.prop),
      properties: mapValues(keyBy(flatted, 'prop'), e => ctx.widgets[e.is]?.JSONSchemaOutput?.(e, ctx))
    }
  }
}