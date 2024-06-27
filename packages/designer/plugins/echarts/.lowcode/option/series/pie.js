import { bool, color, details, enable, enable2, enable3, genDisplayValue, lineStyleItems, num, nums, opts, segm, textStyleItems, LINE_TYPES, shadowStyleItems, borderStyleItems } from '../../utils'

export const seriePie  = (model) => ({ is: 'ElFormRender', model, size: 'small', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    nums('radius', { get: () => [model.radius?.[0] || '0%', model.radius?.[1] || '75%'], set: v => [v[0] || '0%', v[1] || '75%'], el: { units: ['%'], hideUnit: false } }),
    nums(['angle °', ''], { get: () => [model.startAngle, model.endAngle], out: v => ({ startAngle: v[0], endAngle: v[1] }) }),
    num(['gap', 'padAngle']),
    num(['round', 'itemStyle.borderRadius']),
    bool('rose-type'),
  ] },

  { is: 'div', class: 'mb4' },
  
  enable3(model, 'label', genDisplayValue(model, 'label.show', true), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      segm(['position', 'label.position'], ['outside', 'inside', 'center'], { class: 'col-span-3' }),
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily', 'width', 'height', 'overflow'], 'label'),
      { lp: ['formatter', 'label.formatter'], displayValue: '{a}' },
      { lp: ['offset', 'label.position'], set: v => v?.map(e => e ?? 0), el: { is: 'InputNumbers', len: 2, unit: null, hideUnit: true, placeholder: ['x', 'y'] } },
      { is: 'div' },
      { is: 'div' },
      segm(['align', 'label.alignTo'], ['none', 'labelLine', 'edge'], { class: 'col-span-3' }),
    ] },
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, 'label-line', genDisplayValue(model, 'labelLine.show', true), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      ...lineStyleItems(['type', 'width', 'color'])
    ] }
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, 'select', genDisplayValue(model, 'select.disabled', false), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      { is: 'h4', class: 'col-span-3', children: 'Label' },
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily'], 'select.label'),
      { is: 'h4', class: 'col-span-3', children: 'Item' },
      ...borderStyleItems(['borderType', 'borderWidth', 'borderColor'], 'select.itemStyle'),
      ...shadowStyleItems(['shadowBlur', 'shadowOffset', 'shadowColor'], 'select.itemStyle'),
    ] }
  ])
] })