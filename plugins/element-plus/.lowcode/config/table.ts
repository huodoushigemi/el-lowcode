const item = (label, prop) => ({ is: 'ElTableColumn', label, prop })

export default [
  {
    is: 'ElTable',
    label: 'table',
    category: '数据展示',
    drag: { from: 'ElTableColumn' },
    props: [
      { lp: 'data' },
      { lp: ['cols', 'children'], el: { is: 'OptionsInput', props: { V: 'prop' }, new: i => item(`title${i + 1}`, `key${i + 1}`) } },
      { lp: 'stripe', type: 'switch' },
      { lp: 'border', type: 'switch' },
    ],
    defaultProps: () => ({
      children: [
        item('title1', 'key1'),
        item('title2', 'key2'),
        item('title3', 'key3'),
        item('title4', 'key4'),
      ]
    })
  },
  {
    is: 'ElTableColumn',
    label: 'table-column',
    category: '数据展示',
    hidden: true,
    drag: { to: 'ElTable', disabled: true },
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
]