import Shadow from '../../components/Shadow.vue'
import StyleText from '../../components/StyleText.vue'
import RD from '../../components/RD.vue'
import { color, enable3, genDisplayValue, lineStyleItems, num, opts, segm, shadowStyleItems } from '../../utils'
import { parseEncode, parseXYs } from '../../../normalizeOption'

export const serieBar = (model, i, option, ctx, node) => ({ is: 'ElFormRender', model, size: 'small', labelPosition: 'top', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    segm('type', ['line', 'bar'], { defaultValue: 'bar' }),
    { lp: ['key', '$key'], options: parseXYs(node.$data), displayValue: parseEncode(node.$data, i).y, el: { allowCreate: true, filterable: true, defaultFirstOption: true } },
  ] },
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    { is: 'div', class: 'flex aic gap-4 my8 col-span-3 [&>*]:mb0', children: [
      num(['', 'barWidth'], { style: 'width: 60px', el: { placeholder: '大小' } }),
      color(['', 'itemStyle.color']),
      { is: Shadow, class: 'w24 h24 bg-hover', model, prefix: 'itemStyle' },
      { is: RD, class: 'w24 h24 bg-hover', model, prefix: 'itemStyle.borderRadius' },
    ] },
    { lp: ['堆叠', 'stack'] },
    { lp: ['轴', '$axis'], options: option.yAxis.map((e, i) => [e.name, i]) },
    num(['gap', 'barGap']),
  ] },

  { is: 'div', class: 'mb4' },

  enable3(model, '背景', genDisplayValue(model, 'showBackground', false), () => [
    color(['', 'backgroundStyle.color']),
  ]),
  
  { is: 'div', class: 'mb4' },

  enable3(model, '选中状态', genDisplayValue(model, 'select.disabled', false), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      num(['color', 'select.itemStyle.color']),
      num(['rounded', 'select.itemStyle.borderRadius']),
      { is: 'div' },
      ...lineStyleItems(['type', 'width', 'color'], 'select.itemStyle'),
      ...shadowStyleItems(['shadowBlur', 'shadowOffset', 'shadowColor'], 'select.itemStyle'),
    ] }
  ]),

  { is: 'div', class: 'mb4' },
  
  enable3(model, '标签', genDisplayValue(model, 'label.show', false), () => [
    { is: StyleText, class: 'my8', model, prefix: 'label', insertAfter: [['oxy', 'i']] },
  ]),
] })