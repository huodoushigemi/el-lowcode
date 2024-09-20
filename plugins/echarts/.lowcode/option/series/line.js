import { bool, color, enable3, genDisplayValue, num, segm } from '../../utils'
import StyleText from '../../components/StyleText.vue'
import StyleLine from '../../components/StyleLine.vue'

const _options = (arr) => (arr.map(e => ({ label: e[0], value: e[1] })))

export const serieLine = (model, option) => ({ is: 'ElFormRender', model, size: 'small', labelPosition: 'top', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    segm('type', ['line', 'bar'], { defaultValue: 'line' }),
    { lp: ['key', '$key'] },
  ] },
  { is: StyleLine, class: 'my8', model, prefix: 'lineStyle', displayValue: { width: 2 } },
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', size: 'small', children: [
    { lp: 'stack' },
    { lp: ['轴', '$axis'], options: option.yAxis.map((e, i) => [e.name, i]) },
    { lp: 'step', options: ['start', ['mid', 'middle'], 'end'] },
    bool('smooth', false),
  ] },

  { is: 'div', class: 'mb4' },

  enable3(model, '标签', genDisplayValue(model, 'label.show', false), () => [
    { is: StyleText, class: 'my8', model, prefix: 'label', insertAfter: [['oxy', 'i']] },
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, '折点', [() => model.symbol != 'none', v => model.symbol = v ? 'emptyCircle' : 'none'], () => [
    segm(['', 'symbol'], _options([['⭕', 'emptyCircle'], ['🔴', 'circle'], ['🟥', 'rect'], ['🔺', 'triangle'], ['📍',  'pin']]), { displayValue: 'emptyCircle', style: 'margin-bottom: 8px' }),
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', size: 'small', children: [
      num(['size', 'symbolSize'], { displayValue: 4 }),
      num(['r °', 'symbolRotate'], { el: { min: -180, max: 180 } }),
    ] },
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, '区域', [() => !!model.areaStyle, v => model.areaStyle = v ? {} : void 0], () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', size: 'small', children: [
      color(['', 'areaStyle.color'])
    ] },
  ]),
] })