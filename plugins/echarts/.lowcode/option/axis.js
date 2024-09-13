import { enable3, num, color, opts, genDisplayValue, FONT_STYLES, FONT_WEIGHTS, FONT_FAMILYS, LINE_TYPES, FONT_OVERFLOWS, lineStyleItems, displayValue, enable2, textStyleItems, bool } from '../utils'
import StyleText from '../components/StyleText.vue'
import StyleLine from '../components/StyleLine.vue'

export const axisName = model => enable3(model, '轴名称', void 0, () => [
  { is: 'div', class: '', children: [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      { lp: 'name' },
      num(['offset', 'nameGap'], { displayValue: 15 })
    ] },
    { is: StyleText, model, fields: { r: 'nameRotate' }, prefix: k => k == 'r' ? '' : 'nameTextStyle' },
  ] }
])

export const axisLabel = model => enable3(model, '轴标签', genDisplayValue(model, 'axisLabel.show', true), () => [
  { is: StyleText, class: 'my8', model, prefix: 'axisLabel' },
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    num(['offset', 'axisLabel.margin'], { get: displayValue(8) }),
    num(['w', 'axisLabel.width']),
    num(['h', 'axisLabel.height']),
    opts(['overflow', 'axisLabel.overflow'], FONT_OVERFLOWS),
    { lp: ['format', 'axisLabel.formatter'], displayValue: '{value}' },
  ] },
])

export const axisLine = (model, displayValue) => enable3(model, '轴线', genDisplayValue(model, 'axisLine.show', displayValue), () => [
  { is: StyleLine, class: 'my8', model, prefix: 'axisLine.lineStyle' },
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    bool(['on-zero', 'axisLine.onZero'], true, { script: false })
  ] },
])

export const axisSplitLine = (model, displayValue) => enable3(model, '轴分割线', genDisplayValue(model, 'splitLine.show', displayValue), () => [
  { is: StyleLine, class: 'my8', model, prefix: 'splitLine.lineStyle' },
])

export const axisTick = (model, displayValue) => enable3(model, '轴刻度', genDisplayValue(model, 'axisTick.show', displayValue), () => [
  { is: StyleLine, class: 'my8', model, prefix: 'axisTick.lineStyle' },
  { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 0 8px', children: [
    num(['len', 'axisTick.length'], { displayValue: 5, el: { max: 30 } }),
  ] },
])