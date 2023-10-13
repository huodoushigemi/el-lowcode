export default {
  is: 'ElStatistic',
  label: 'statistic',
  props: [
    { lp: 'title' },
    { lp: 'value', type: 'input-number' },
    { lp: 'precision', type: 'input-number', defaultValue: 0 },
    { lp: 'prefix' },
    { lp: 'suffix' }, 
    { lp: 'decimal-separator', defaultValue: '.' },
    { lp: 'group-separator', defaultValue: ',' },
  ],
  defaultProps: () => ({
    title: 'Daily active users',
    value: 268500
  })
}