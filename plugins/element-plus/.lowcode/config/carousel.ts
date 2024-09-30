const item = i => ({ is: 'ElCarouselItem', children: [{ is: 'h1', children: `item${i + 1}` }] })

export default [
  {
    is: 'ElCarousel',
    label: 'carousel',
    category: '容器',
    drag: { from: 'ElCarouselItem' },
    props: [
      { lp: 'height' },
      { lp: 'initial-index', type: 'input-number' },
      { lp: 'interval', type: 'input-number', displayValue: 3000 },
      { lp: 'trigger', type: 'radio-group', displayValue: 'hover', options: ['hover', 'click'] },
      { lp: ['card', 'type'], type: 'switch', el: { activeValue: 'card', inactiveValue: undefined } },
      { lp: 'loop', type: 'switch', displayValue: true },
      { lp: 'direction', type: 'radio-group', displayValue: 'horizontal', options: ['horizontal', 'vertical'] },
      { lp: 'autoplay', type: 'switch', displayValue: true },
      { lp: 'motion-blur', type: 'switch' },
      { lp: ['items', 'children'], el: { is: 'OptionsInput', props: { V: 'name' }, new: item } }
    ],
    defaultProps: () => ({
      autoplay: true,
      height: '150px',
      children: [
        item(0),
        item(1),
      ]
    })
  },
  {
    is: 'ElCarouselItem',
    label: 'carousel-item',
    hidden: true,
    drag: { to: 'ElCarousel' },
    defaultProps: () => ({
      children: []
    })
  }
]