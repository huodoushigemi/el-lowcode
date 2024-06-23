import { enable3, num, color, opts, genDisplayValue, FONT_STYLES, FONT_WEIGHTS, FONT_FAMILYS, LINE_TYPES, FONT_OVERFLOWS, lineStyleItems } from './utils'

export const axisLabel = model => enable3(model, 'label', genDisplayValue(model, 'axisLabel.show', true), () => [
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    num(['size', 'axisLabel.fontSize'], { displayValue: 12 }),
    num(['offset', 'axisLabel.margin'], { defaultValue: 8 }),
    color(['color', 'axisLabel.color'], { el: { size: 'small' } }),
    opts(['style', 'axisLabel.fontStyle'], FONT_STYLES),
    opts(['weight', 'axisLabel.fontWeight'], FONT_WEIGHTS),
    opts(['family', 'axisLabel.fontFamily'], FONT_FAMILYS),
    num(['w', 'axisLabel.width']),
    num(['h', 'axisLabel.height']),
    num(['r °', 'axisLabel.rotate'], { el: { min: -90, max: 90 } }),
    opts(['overflow', 'axisLabel.overflow'], FONT_OVERFLOWS),
    { lp: ['format', 'axisLabel.formatter'], displayValue: '{value}' },
  ] },
])

export const axisLine = (model, displayValue) => enable3(model, 'line', genDisplayValue(model, 'axisLine.show', displayValue), () => [
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    ...lineStyleItems(['type', 'width', 'color'], 'axisLine.lineStyle')
  ] },
])

export const axisSplitLine = (model, displayValue) => enable3(model, 'split-line', genDisplayValue(model, 'splitLine.show', displayValue), () => [
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    ...lineStyleItems(['type', 'width', 'color'], 'axisLine.lineStyle')
  ] },
])

export const axisTick = (model, displayValue) => enable3(model, 'tick', genDisplayValue(model, 'axisTick.show', displayValue), () => [
  { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 0 8px', children: [
    num(['len', 'axisTick.length'], { displayValue: 5, el: { max: 30 } }),
    num(['size', 'axisTick.lineStyle.width'], { displayValue: 1, el: { max: 20 } }),
    opts(['type', 'axisTick.lineStyle.type'], LINE_TYPES),
    color(['color', 'axisTick.lineStyle.color'], { el: { size: 'small' } }),
  ] },
])