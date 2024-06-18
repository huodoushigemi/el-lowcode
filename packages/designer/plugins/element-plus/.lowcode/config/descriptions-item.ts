export default {
  is: 'ElDescriptionsItem',
  label: 'item',
  drag: false,
  props: [
    { lp: 'label' },
    { lp: ['value', 'children'] },
    { lp: 'span', type: 'input-number', displayValue: 1 },
    { lp: 'align', displayValue: 'left', type: 'radio-group', options: ['left', 'center', 'right'] },
    { lp: 'label-align', displayValue: 'left', type: 'radio-group', options: ['left', 'center', 'right'] },
  ],
  defaultProps: () => ({
    
  })
}