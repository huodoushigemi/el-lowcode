import { unrefElement } from '@vueuse/core'

export default {
  is: 'ElDateTime-lcd',
  label: 'datetime',
  category: '数据输入',
  props: [
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'readonly', type: 'switch' },
      { lp: 'clearable', type: 'switch' },
      { lp: 'type', options: ['year', 'month', 'date', 'datetime', 'week'], style: 'grid-column: 1 / 2' },
      { lp: ['show-format', 'format'], defaultValue: 'YYYY/MM/DD HH:mm:ss', options: ['YYYY/MM/DD HH:mm:ss', 'YYYY-MM-DDTHH:mm:ss.SSSZ'] },
      { lp: 'placeholder' },
    ] },
  ],
  defaultProps: () => ({
    defaultValue: '',
    format: 'YYYY/MM/DD HH:mm:ss'
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
    format: 'date-time',
  }),
  getEl({ ref }) {
    return unrefElement(ref)?.nextSibling
  }
}