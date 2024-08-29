export default {
  is: 'ElStatistic',
  label: 'statistic',
  category: '数据展示',
  props: [
    { lp: 'title' },
    { lp: 'value', type: 'input-number' },
    { lp: 'precision', type: 'input-number', displayValue: 0 },
    { lp: 'prefix' },
    { lp: 'suffix' }, 
    { lp: 'decimal-separator', displayValue: '.' },
    { lp: 'group-separator', displayValue: ',' },
  ],
  defaultProps: () => ({
    title: 'Daily active users',
    value: 268500
  })
}