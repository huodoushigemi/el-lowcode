import { bool, color, details, enable, enable2, enable3, genDisplayValue, lineStyleItems, num, nums, opts, segm, textStyleItems, LINE_TYPES, shadowStyleItems, borderStyleItems } from '../../utils'
import StyleText from '../../components/StyleText.vue'
import StyleLine from '../../components/StyleLine.vue'
import { parseEncode, parseXYs } from '../../../normalizeOption'

export const seriePie = (model, i, option, ctx, node) => ({ is: 'ElFormRender', model, size: 'small', labelPosition: 'top', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    // opts(['类目', 'encode.itemName']),
    // opts(['类目', 'encode.itemName']),
    { lp: ['类目', 'encode.itemName'], options: parseXYs(node.$data), displayValue: parseEncode(node.$data, i).x, el: { allowCreate: true, filterable: true, defaultFirstOption: true } },
    { lp: ['数值', 'encode.value'], options: parseXYs(node.$data), displayValue: parseEncode(node.$data, i).y, el: { allowCreate: true, filterable: true, defaultFirstOption: true } },
    nums(['半径', 'radius'], { get: () => [model.radius?.[0] || '0%', model.radius?.[1] || '75%'], set: v => [v[0] || '0%', v[1] || '75%'], el: { units: ['%'], hideUnit: false } }),
    nums(['位置', 'center'], { get: () => [model.center?.[0] || '50%', model.center?.[1] || '50%'], set: v => [v[0] || '50%', v[1] || '50%'], el: { units: ['%'], hideUnit: false } }),
    nums(['角度 °', ''], { get: () => [model.startAngle, model.endAngle], set: () => void 0, out: v => ({ startAngle: v[0], endAngle: v[1] }), el: { min: -360 } }),
    num(['间距', 'padAngle']),
    num(['圆角', 'itemStyle.borderRadius']),
    bool(['玫瑰图', 'roseType']),
  ] },

  { is: 'div', class: 'mb4' },
  
  enable3(model, '标签', genDisplayValue(model, 'label.show', true), () => [
    { is: StyleText, class: 'my8', model, prefix: 'label' },
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      opts(['位置', 'label.position'], ['outside', 'inside', 'center'], { displayValue: 'outside' }),
      opts(['对其', 'label.alignTo'], [['—', void 0], ['line', 'labelLine'], 'edge']),
      { lp: ['格式化', 'label.formatter'], displayValue: '{a}' },
    ] },
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, '标签线', genDisplayValue(model, 'labelLine.show', true), () => [
    { is: StyleLine, class: 'my8', model, prefix: 'labelLine.lineStyle' },
  ]),

  { is: 'div', class: 'mb4' },

  enable3(model, '选中状态', genDisplayValue(model, 'selectedMode', false), () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      { is: 'h4', class: 'col-span-3 mt10 mb0', children: 'Label' },
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily'], 'select.label'),
      { is: 'h4', class: 'col-span-3 mt10 mb0', children: 'Item' },
      ...borderStyleItems(['borderType', 'borderWidth', 'borderColor'], 'select.itemStyle'),
      ...shadowStyleItems(['shadowBlur', 'shadowOffset', 'shadowColor'], 'select.itemStyle'),
    ] }
  ])
] })