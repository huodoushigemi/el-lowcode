export default {
  is: 'ElProgress',
  label: 'progress',
  category: '数据展示',
  props: [
    { lp: ['value', 'percentage'], type: 'input-number' },
    { lp: 'stroke-width', type: 'input-number', displayValue: 6 },
    { lp: 'type', type: 'radio-group', displayValue: 'line', options: ['line', 'circle', 'dashboard'] },
    { lp: 'text-inside', type: 'switch' },
    { lp: 'color', type: 'color-picker' },
  ],
  defaultProps: () => ({
    percentage: 50,
    format: '{{v => `${v}%`}}'
  })
}