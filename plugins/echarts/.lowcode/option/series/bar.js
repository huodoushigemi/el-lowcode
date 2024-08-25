import { bool, color, details, enable, enable2, enable3, genDisplayValue, lineStyleItems, num, nums, opts, segm, textStyleItems, LINE_TYPES, shadowStyleItems } from '../../utils'

export const serieBar = (model) => ({ is: 'ElFormRender', model, size: 'small', labelPosition: 'top', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    { lp: 'type', options: ['line', 'bar'], displayValue: 'bar' },
    // segm('type', ['line', 'bar'], { displayValue: 'bar' }),
    { lp: ['key', '$key'] },
  ] },
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    nums(['rounded', 'itemStyle.borderRadius'], { class: 'col-span-2', set: v => v.map(e => e || 0), el: { len: 4, placeholder: ['┍', '┓', '┛', '┕'] } }),
    color(['color', 'itemStyle.color']),
    num(['size', 'barWidth']),
    num(['gap', 'barGap']),
    { lp: 'stack' },
    ...shadowStyleItems(['shadowBlur', 'shadowOffset', 'shadowColor'], 'itemStyle'),
  ] },

  { is: 'div', class: 'mb4' },

  enable3(model, 'bg', genDisplayValue(model, 'showBackground', false), () => [
    color(['color', 'backgroundStyle.color']),
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
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily', 'width', 'height', 'overflow'], 'label'),
      { lp: ['offset', 'label.position'], set: v => v?.map(e => e ?? 0), el: { is: 'InputNumbers', len: 2, unit: null, hideUnit: true, placeholder: ['x', 'y'] } },
    ] },
  ]),
] })