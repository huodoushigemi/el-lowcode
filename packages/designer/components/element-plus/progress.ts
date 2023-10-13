export default {
  is: 'ElProgress',
  label: 'progress',
  props: [
    { lp: ['value', 'percentage'], type: 'input-number' },
    { lp: 'stroke-width', type: 'input-number', defaultValue: 6 },
    { lp: 'type', type: 'radio-group', defaultValue: 'line', options: ['line', 'circle', 'dashboard'] },
    { lp: 'text-inside', type: 'switch' },
    { lp: 'color', type: 'color-picker' },
  ],
  defaultProps: () => ({
    percentage: 50
  })
}