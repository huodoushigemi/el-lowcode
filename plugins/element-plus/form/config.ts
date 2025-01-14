import { mapValues, keyBy } from '@el-lowcode/utils'
import { treeUtils } from '@el-lowcode/utils'
import { ENUM_SIZE } from '../utils'
import JsonSchemaDialog from './json-schema-dialog.vue'

const Text = (s, extra) => ({ is: 'span', children: s, ...extra })

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
  defaultProps: () => ({
    model: '{{(state.formData ??= {}, state.formData)}}',
    labelWidth: 120,
    style: { overflow: 'hidden' },
    children: [
      { is: 'ElFormItemRender', label: 'Activity name', prop: 'name', children: [{ is: 'ElInput' }] },
      { is: 'ElFormItemRender', label: 'Activity zone', prop: 'region', children: [{ is: 'ElSelect', children: [{ is: 'ElOption', label: 'Zone one', value: 'shanghai' }, { is: 'ElOption', label: 'Zone two', value: 'beijing' }] }] },
      { is: 'ElFormItemRender', label: 'Activity name', prop: 'name', children: [
        { is: 'ElFormItemRender', prop: 'date1', children: [{ is: 'ElDatePicker', type: 'date' }] },
        { is: 'span', style: { padding: '0 12px' }, children: '-' },
        { is: 'ElFormItemRender', prop: 'date2', children: [{ is: 'ElDatePicker', type: 'date' }] },
      ] },
      { is: 'ElFormItemRender', label: 'Instant delivery', prop: 'delivery', children: [{ is: 'ElSwitch' }] },
      { is: 'ElFormItemRender', label: 'Activity location', prop: 'location', children: [{ is: 'ElSegmented', options: [{ label: 'Home', value: 'Home' }, { label: 'Company', value: 'Company' }, { label: 'School', value: 'School' }] }] },
      { is: 'ElFormItemRender', label: 'Activity type', prop: 'type', children: [{ is: 'ElCheckboxGroup', children: [{ is: 'ElCheckbox', label: 'Online activities', value: 'Online activities' }, { is: 'ElCheckbox', label: 'Promotion activities', value: 'Promotion activities' }, { is: 'ElCheckbox', label: 'Offline activities', value: 'Offline activities' }, { is: 'ElCheckbox', label: 'Simple brand exposure', value: 'Simple brand exposure' }] }] },
      { is: 'ElFormItemRender', label: 'Resources', prop: 'resource', children: [{ is: 'ElRadioGroup', children: [{ is: 'ElRadio', label: 'Sponsorship', value: 'Sponsorship' }, { is: 'ElRadio', label: 'Venue', value: 'Venue' }] }] },
      { is: 'ElFormItemRender', label: 'Activity form', prop: 'desc', children: [{ is: 'ElInput', type: 'textarea' }] },
      { is: 'ElFormItemRender', label: ' ', children: [{ is: 'ElButton', type: 'primary', nativeType: 'submit', children: [Text('Submit')] }, { is: 'ElButton', nativeType: 'reset', children: [Text('Reset')] }] },
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