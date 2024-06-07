export default {
  is: 'ElCarousel',
  label: 'carousel',
  category: '容器',
  props: [
    { lp: 'height' },
    { lp: 'initial-index', type: 'input-number' },
    { lp: 'interval', type: 'input-number', defaultValue: 3000 },
    { lp: 'trigger', type: 'radio-group', defaultValue: 'hover', options: ['hover', 'click'] },
    { lp: ['card', 'type'], type: 'switch', el: { activeValue: 'card', inactiveValue: undefined } },
    { lp: 'loop', type: 'switch', defaultValue: true },
    { lp: 'direction', type: 'radio-group', defaultValue: 'horizontal', options: ['horizontal', 'vertical'] },
    { lp: 'autoplay', type: 'switch', defaultValue: true },
  ],
  defaultProps: () => ({
    autoplay: true,
    height: '150px',
    children: [
      { is: 'ElCarouselItem', label: 'item1', children: [{ is: 'h1', children: 'item1' }] },
      { is: 'ElCarouselItem', label: 'item2', children: [{ is: 'h1', children: 'item2' }] },
    ]
  })
}