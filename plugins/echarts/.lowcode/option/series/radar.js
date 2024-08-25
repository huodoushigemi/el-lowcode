import { bool, color, details, enable, enable2, enable3, genDisplayValue, lineStyleItems, num, nums, opts, segm, textStyleItems, LINE_TYPES, shadowStyleItems, borderStyleItems, enable3Symbol, areaStyleItems } from '../../utils'

export const radarAxis = model => enable2(model.radar, 'Axis', void 0, () => [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    segm(['', 'shape'], ['polygon', 'circle'], { class: 'col-span-2', displayValue: 'polygon' }),
    num('radius', { displayValue: '75%', el: { units: ['%'], hideUnit: false } }),
    nums(['xy', 'center'], { get: () => [model.radar.center?.[0] || '50%', model.radar.center?.[1] || '50%'], set: v => [v[0] || '50%', v[1] || '50%'], el: { units: ['%'], hideUnit: false } }),
    num(['angle °', 'startAngle'], { displayValue: 90 }),
  ] },
  
  { is: 'div', class: 'mb4' },
  
  enable3(model.radar, 'axis-name', genDisplayValue(model.radar, 'axisName.show', true), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily', 'width', 'height', 'overflow', 'formatter'], 'axisName'),
      num(['offset', 'nameGap'], { displayValue: 15 })
    ] }
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model.radar, 'split-line', genDisplayValue(model.radar, 'splitLine.show', true), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      ...lineStyleItems(['type', 'width', 'color', 'shadowBlur', 'shadowOffset', 'shadowColor'], 'splitLine.lineStyle'),
      num(['number', 'splitNumber'], { displayValue: 5 })
    ]}
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model.radar, 'area', void 0, () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      ...areaStyleItems(['color', 'opacity'], 'splitArea.areaStyle'),
    ] }
  ]),
])

export const serieRadar = (model) => ({ is: 'ElFormRender', model, size: 'small', children: [
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    { lp: 'name', class: 'col-span-3' },
    ...lineStyleItems(['type', 'width', 'color', 'shadowBlur', 'shadowOffset', 'shadowColor'], 'lineStyle')
  ] },

  { is: 'div', class: 'mb4' },

  enable3(model, 'label', genDisplayValue(model, 'label.show', false), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily', 'width', 'height', 'overflow'], 'label'),
      { lp: ['formatter', 'label.formatter'], displayValue: '{c}' },
      nums(['offset', 'label.offset'], { set: v => [v?.[0] ?? 0, v?.[1] ?? 0], el: { len: 2, min: -50, placeholder: ['x', 'y'] } }),
    ] },
  ]),

  { is: 'div', class: 'mb4' },

  enable3Symbol(model), 
  
  { is: 'div', class: 'mb4' },

  enable3(model, 'area', [() => !!model.areaStyle, v => model.areaStyle = v ? {} : void 0], () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      ...areaStyleItems(['color', 'opacity'], 'areaStyle'),
    ] },
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, 'select', void 0, () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      { is: 'h4', class: 'col-span-3 mt10 mb0', children: 'Label' },
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily'], 'select.label'),
      { is: 'h4', class: 'col-span-3 mt10 mb0', children: 'Line' },
      ...lineStyleItems(['type', 'width', 'color', 'shadowBlur', 'shadowColor', 'shadowOffset'], 'select.lineStyle'),
      { is: 'h4', class: 'col-span-3 mt10 mb0', children: 'Area' },
      ...areaStyleItems(['color', 'opacity'], 'select.areaStyle'),
    ] }
  ]),
] })