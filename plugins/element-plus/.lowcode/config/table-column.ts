export default {
  is: 'ElTableColumn',
  label: 'table-column',
  category: '数据展示',
  drag: false,
  sortablePut: false,
  props: [
    { lp: ['title', 'label'] },
    { lp: ['key', 'prop'] },
    { lp: 'width', type: 'input-number' },
    { lp: 'fixed', options: ['left', 'right'] },
    { lp: 'align', options: ['left', 'center', 'right'] },
    { lp: 'render-header', script: true },
    { lp: 'formatter', script: true },
  ],
  defaultProps: () => ({
    
  })
}