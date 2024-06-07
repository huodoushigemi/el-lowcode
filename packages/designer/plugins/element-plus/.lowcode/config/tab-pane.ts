export default {
  is: 'ElTabPane',
  label: 'tab-pane',
  layout: true,
  drag: false,
  props: [
    { lp: 'label' },
    { lp: 'name' },
    { lp: 'disabled', type: 'switch' },
    { lp: 'lazy', type: 'switch' },
  ],
  defaultProps: () => ({
    children: [
      { is: 'h1', children: (Math.random() * 100).toFixed() }
    ]
  })
}