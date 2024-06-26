import { checks, color, enable2, enable3, genDisplayValue, lineStyleItems, num, opts, radios, segm, textStyleItems } from '../utils'
import { axisLabel, axisLine, axisSplitLine, axisTick } from './axis'

export * from './series'

export const grid = (option) => enable2(option, 'Gird', void 0, () => [
  { is: 'div', class: 'grid grid-cols-4 gap-x-8 [&>*]:mb8', children: [
    num(['top', 'grid.top']),
    num(['right', 'grid.right']),
    num(['bottom', 'grid.bottom']),
    num(['left', 'grid.left']),
  ] }
])

export const xAxis = (option) => enable2(option.xAxis, 'XAxis', genDisplayValue(option, 'xAxis.show', true), () => [
  axisLabel(option.xAxis),
  { is: 'div', class: 'mb4' },
  axisLine(option.xAxis, true),
  { is: 'div', class: 'mb4' },
  axisSplitLine(option.xAxis, false),
  { is: 'div', class: 'mb4' },
  axisTick(option.xAxis, true),
])

export const yAxis = (option) => enable2(option.yAxis, 'YAxis', genDisplayValue(option, 'yAxis.show', true), () => [
  axisLabel(option.yAxis),
  { is: 'div', class: 'mb4' },
  axisLine(option.yAxis, false),
  { is: 'div', class: 'mb4' },
  axisSplitLine(option.yAxis, true),
  { is: 'div', class: 'mb4' },
  axisTick(option.yAxis, false),
])

export const legend = (option) => enable2(option, 'Legend', genDisplayValue(option, 'legend.show', true), () => [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    num(['w', 'legend.itemWidth'], { displayValue: 25, el: { max: 50 } }),
    num(['h', 'legend.itemHeight'], { displayValue: 14, el: { max: 28 } }),
    radios(['', 'legend.left'], [['L', 'left'], ['C', 'center'], ['R', 'right']]),
    radios(['', 'legend.orient'], [['↔', 'horizontal'], ['↕', 'vertical']]),
    radios(['', 'legend.top'], [['T', 'top'], ['C', 'middle'], ['B', 'bottom']]),
    num(['', 'legend.itemGap'], { displayValue: 10 }),
  ] },
  enable3(option, 'text', void 0, () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily', 'width', 'height', 'overflow'], 'legend.textStyle')
    ] }
  ])
])

export const toolbox = (option) => enable2(option, 'Toolbox', genDisplayValue(option, 'toolbox.show', void 0), () => [
  { is: 'div', class: 'grid [&>*]:mb8', style: 'grid-template-columns: 1fr 1fr;', children: [
    { lp: ['data-zoom', 'toolbox.feature.dataZoom.show'], type: 'switch' },
    { lp: ['data-view', 'toolbox.feature.dataView'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
    { lp: ['restore', 'toolbox.feature.restore'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
    { lp: ['save-image', 'toolbox.feature.saveAsImage'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
    { lp: ['size', 'toolbox.itemSize'], type: 'slider', el: { max: 30 } },
    { lp: ['gap', 'toolbox.itemGap'], type: 'slider', el: { max: 16 } },
    radios(['', 'toolbox.orient'], [['↔', 'horizontal'], ['↕', 'vertical']]),
  ] }
])

export const tooltip = (option) => enable2(option, 'Tooltip', genDisplayValue(option, 'tooltip.show', true), () => [
  segm(['', 'tooltip.axisPointer.type'], ['line', 'shadow', 'cross'], { displayValue: 'line' }),
  // lineStyle
  option.tooltip?.axisPointer?.type in { line: 1, undefined: 1 } && { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    ...lineStyleItems(['type', 'width', 'color'], 'tooltip.axisPointer.lineStyle')
  ] },
  // shadowStyle
  option.tooltip?.axisPointer?.type == 'shadow' && { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    ...lineStyleItems(['color'], 'tooltip.axisPointer.shadowStyle')
  ] },
  // crossStyle
  option.tooltip?.axisPointer?.type == 'cross' && { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    ...lineStyleItems(['type', 'width', 'color'], 'tooltip.axisPointer.crossStyle')
  ] },
  // trigger
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    opts(['trigger', 'tooltip.trigger'], ['item', 'axis', 'none']),
    checks(['trigger-on', 'tooltip.triggerOn'], [['hover', 'mousemove'], 'click'], { get: v => v?.split('|'), set: v => v?.length ? v.join('|') : void 0 }),
    { lp: ['padding', 'tooltip.padding'], set: v => v?.map(e => e ?? 5), el: { is: 'InputNumbers', len: 2, unit: null, hideUnit: true, placeholder: ['↕', '↔'] } },
    color(['bg', 'tooltip.backgroundColor'], { el: { size: 'small' } }),
  ] },
  // text
  enable3(option.tooltip, 'text', void 0, () => [
    { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
      ...textStyleItems(['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily', 'width', 'height', 'overflow'], 'tooltip.textStyle')
    ] }
  ])
])