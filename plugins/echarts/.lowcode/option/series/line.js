import { bool, color, details, enable, enable2, enable3, genDisplayValue, lineStyleItems, num, segm, textStyleItems } from '../../utils'
import StyleText from '../../components/StyleText.vue'
import StyleLine from '../../components/StyleLine.vue'

const _options = (arr) => (arr.map(e => ({ label: e[0], value: e[1] })))

export const serieLine = (model) => ({ is: 'ElFormRender', model, size: 'small', labelPosition: 'top', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
    { lp: 'type', options: ['line', 'bar'] },
    { lp: ['key', '$key'] },
  ] },
  { is: StyleLine, class: 'my8', model, prefix: 'lineStyle', displayValue: { width: 2 } },
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', size: 'small', children: [
    // ...lineStyleItems(['type', 'width', 'color', 'shadowBlur', 'shadowOffset', 'shadowColor'], 'lineStyle'),
    { lp: 'stack' },
    { lp: 'step', options: ['start', ['mid', 'middle'], 'end'] },
    bool('smooth', false)
  ] },

  { is: 'div', class: 'mb4' },

  enable3(model, 'label', genDisplayValue(model, 'label.show', false), () => [
    { is: StyleText, class: 'my8', model, prefix: 'label' },
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', size: 'small', children: [
      // ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily', 'width', 'height', 'overflow'], 'label'),
      { lp: ['offset', 'label.offset'], set: v => v?.map(e => e ?? 0), el: { is: 'InputNumbers', len: 2, unit: null, hideUnit: true, placeholder: ['x', 'y'] } },
    ] },
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, 'symbol', [() => model.symbol != 'none', v => model.symbol = v ? 'emptyCircle' : 'none'], () => [
    segm(['', 'symbol'], _options([['⭕', 'emptyCircle'], ['🔴', 'circle'], ['🟥', 'rect'], ['🔺', 'triangle'], ['📍',  'pin']]), { displayValue: 'emptyCircle', style: 'margin-bottom: 8px' }),
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', size: 'small', children: [
      num(['size', 'symbolSize'], { displayValue: 4 }),
      num(['r °', 'symbolRotate'], { el: { min: -180, max: 180 } }),
    ] },
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, 'area', [() => !!model.areaStyle, v => model.areaStyle = v ? {} : void 0], () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', size: 'small', children: [
      color(['color', 'areaStyle.color'])
    ] },
  ]),
] })