import Shadow from '../../components/Shadow.vue'
import StyleText from '../../components/StyleText.vue'
import { bool, color, details, enable, enable2, enable3, genDisplayValue, lineStyleItems, num, nums, opts, segm, textStyleItems, LINE_TYPES, shadowStyleItems } from '../../utils'

export const serieBar = (model) => ({ is: 'ElFormRender', model, size: 'small', labelPosition: 'top', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    { lp: 'type', options: ['line', 'bar'], defaultValue: 'bar' },
      { lp: ['key', '$key'] },
  ] },
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    nums(['rounded', 'itemStyle.borderRadius'], { class: 'col-span-2', set: v => v.map(e => e || 0), el: { len: 4, placeholder: ['┍', '┓', '┛', '┕'] } }),
    { is: 'div', class: 'flex', children: [
      // todo
      color(['color', 'itemStyle.color']),
      { is: Shadow, model, prefix: 'itemStyle' }
    ] },
    num(['size', 'barWidth']),
    num(['gap', 'barGap']),
    { lp: 'stack' },
  ] },

  { is: 'div', class: 'mb4' },

  enable3(model, 'bg', genDisplayValue(model, 'showBackground', false), () => [
    color(['', 'backgroundStyle.color']),
  ]),
  
  { is: 'div', class: 'mb4' },

  enable3(model, 'select', genDisplayValue(model, 'select.disabled', false), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      num(['color', 'select.itemStyle.color']),
      num(['rounded', 'select.itemStyle.borderRadius']),
      { is: 'div' },
      ...lineStyleItems(['type', 'width', 'color'], 'select.itemStyle'),
      ...shadowStyleItems(['shadowBlur', 'shadowOffset', 'shadowColor'], 'select.itemStyle'),
    ] }
  ]),

  { is: 'div', class: 'mb4' },
  
  enable3(model, 'label', genDisplayValue(model, 'label.show', false), () => [
    { is: StyleText, class: 'my8', model, prefix: 'label', insertAfter: [['oxy', 'i']] },
  ]),
] })