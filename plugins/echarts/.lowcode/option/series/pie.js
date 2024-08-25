import { bool, color, details, enable, enable2, enable3, genDisplayValue, lineStyleItems, num, nums, opts, segm, textStyleItems, LINE_TYPES, shadowStyleItems, borderStyleItems } from '../../utils'

export const seriePie  = (model) => ({ is: 'ElFormRender', model, size: 'small', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    nums('radius', { get: () => [model.radius?.[0] || '0%', model.radius?.[1] || '75%'], set: v => [v[0] || '0%', v[1] || '75%'], el: { units: ['%'], hideUnit: false } }),
    nums(['xy', 'center'], { get: () => [model.center?.[0] || '50%', model.center?.[1] || '50%'], set: v => [v[0] || '50%', v[1] || '50%'], el: { units: ['%'], hideUnit: false } }),
    nums(['angle °', ''], { get: () => [model.startAngle, model.endAngle], set: () => void 0, out: v => ({ startAngle: v[0], endAngle: v[1] }), el: { min: -360 } }),
    num(['gap', 'padAngle']),
    num(['round', 'itemStyle.borderRadius']),
    bool('rose-type'),
  ] },

  { is: 'div', class: 'mb4' },
  
  enable3(model, 'label', genDisplayValue(model, 'label.show', true), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      segm(['position', 'label.position'], ['outside', 'inside', 'center'], { class: 'col-span-3', displayValue: 'outside' }),
      segm(['align', 'label.alignTo'], ['none', 'labelLine', 'edge'], { class: 'col-span-3', displayValue: 'none' }),
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily', 'width', 'height', 'overflow'], 'label'),
      { lp: ['formatter', 'label.formatter'], displayValue: '{a}' },
      { lp: ['offset', 'label.position'], set: v => v?.map(e => e ?? 0), el: { is: 'InputNumbers', len: 2, unit: null, hideUnit: true, placeholder: ['x', 'y'] } },
    ] },
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, 'label-line', genDisplayValue(model, 'labelLine.show', true), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      ...lineStyleItems(['type', 'width', 'color'], 'labelLine.lineStyle')
    ] }
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, 'select', genDisplayValue(model, 'selectedMode', false), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      { is: 'h4', class: 'col-span-3 mt10 mb0', children: 'Label' },
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily'], 'select.label'),
      { is: 'h4', class: 'col-span-3 mt10 mb0', children: 'Item' },
      ...borderStyleItems(['borderType', 'borderWidth', 'borderColor'], 'select.itemStyle'),
      ...shadowStyleItems(['shadowBlur', 'shadowOffset', 'shadowColor'], 'select.itemStyle'),
    ] }
  ])
] })