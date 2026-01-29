import { h, resolveComponent } from 'vue'
import { bool, checks, Collapse1, color, displayValue, enable2, enable3, genDisplayValue, lineStyleItems, num, opts, radios, segm, textStyleItems } from '../utils'
import { axisLabel, axisLine, axisName, axisSplitLine, axisTick } from './axis'
import StyleText from '../components/StyleText.vue'
import StyleLine from '../components/StyleLine.vue'

export * from './series'

const toArr = (arr) => Array.isArray(arr) ? arr : (arr == null ? [] : [arr])

export const form = (opt) => ({ is: 'ElFormRender', size: 'small', labelPosition: 'top', ...opt })

export const grid = (option) => enable2(option, 'Gird', void 0, () => [
  gridView(option)
])

export const gridView = (option) => ({ is: 'ElFormRender', class: 'grid grid-cols-4 gap-x-8 [&>*]:mb8', model: option, size: 'small', labelPosition: 'top', children: [
  num(['top', 'grid.top']),
  num(['right', 'grid.right']),
  num(['bottom', 'grid.bottom']),
  num(['left', 'grid.left']),
] })

const xAxis = (axis) => ({ is: 'ElFormRender', model: axis, class: 'mt8', size: 'small', labelPosition: 'top', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 px8', children: [
    segm('position', [['T', 'top'], ['B', 'bottom']]),
    num('offset', { displayValue: 0 }),
    bool(['bound-gap', 'boundaryGap'], true),
    bool('inverse'),
  ] },
  axisName(axis),
  { is: 'div', class: 'mb4' },
  axisLabel(axis),
  { is: 'div', class: 'mb4' },
  axisLine(axis, true),
  { is: 'div', class: 'mb4' },
  axisSplitLine(axis, false),
  { is: 'div', class: 'mb4' },
  axisTick(axis, true),
] })

const yAxis = (axis) => ({ is: 'ElFormRender', model: axis, class: 'mt8', size: 'small', labelPosition: 'top', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 px8', children: [
    segm('position', [['L', 'left'], ['R', 'right']]),
    num('offset', { displayValue: 0 }),
    bool(['bound-gap', 'boundaryGap'], true),
    bool('inverse'),
  ] },
  axisName(axis),
  { is: 'div', class: 'mb4' },
  axisLabel(axis),
  { is: 'div', class: 'mb4' },
  axisLine(axis, false),
  { is: 'div', class: 'mb4' },
  axisSplitLine(axis, true),
  { is: 'div', class: 'mb4' },
  axisTick(axis, false),
] })

export const axiss = (option) => ({ is: (_, { slots }) => h(resolveComponent('Tabs'), { tabs: [...option.xAxis, ...option.yAxis], editable: true, sortable: false, addable: false, props: { label: 'name' } }, {
  default: slots.default,
  extra: () => h('div', { class: 'flex aic jcc mx4 w20 h20 text-4 bg-hover cursor-pointer b-1', onClick: () => option.yAxis.push({}) }, '+'),
}), children: () => [
  ...toArr(option.xAxis).map((axis, i) => ({ ...xAxis(axis), key: `x${i}`, label: axis.name || `类目轴${i == 0 ? '' : ' ' + (i + 1)}` })),
  ...toArr(option.yAxis).map((axis, i) => ({ ...yAxis(axis), key: `y${i}`, label: axis.name || `数值轴${i == 0 ? '' : ' ' + (i + 1)}` })),
] })

export const axis = (option, props) => ({ is: 'Collapse', title: 'Axis', children: () => [
  { is: 'Tabs', stretch: true, children: [
    // X Axis
    { is: 'ElFormRender', model: toArr(option.xAxis)[0], label: 'X Axis', class: 'mt8', size: 'small', labelPosition: 'top', children: [
      { is: 'div', class: 'grid grid-cols-2 px8', children: [
        bool(['bound-gap', 'boundaryGap'], true),
        bool('inverse'),
      ] },
      axisName(option.xAxis),
      { is: 'div', class: 'mb4' },
      axisLabel(option.xAxis),
      { is: 'div', class: 'mb4' },
      axisLine(option.xAxis, !props.vertical),
      { is: 'div', class: 'mb4' },
      axisSplitLine(option.xAxis, props.vertical),
      { is: 'div', class: 'mb4' },
      axisTick(option.xAxis, !props.vertical),
    ] },
    // Y Axis
    { is: 'ElFormRender', model: toArr(option.yAxis)[0], label: 'Y Axis', class: 'mt8', size: 'small', labelPosition: 'top', children: [
      { is: 'div', class: 'grid grid-cols-2 px8', children: [
        bool(['bound-gap', 'boundaryGap'], true),
        bool('inverse'),
      ] },
      axisLabel(option.yAxis),
      { is: 'div', class: 'mb4' },
      axisLine(option.yAxis, props.vertical),
      { is: 'div', class: 'mb4' },
      axisSplitLine(option.yAxis, !props.vertical),
      { is: 'div', class: 'mb4' },
      axisTick(option.yAxis, props.vertical),
    ] }
  ] }
] })

export const legendView = (option) => ({ is: 'div', children: [
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    { is: 'div', class: 'flex [&>*]:flex-1 [&>*]:mb0!', children: [
      num(['w', 'legend.width']),
      num(['h', 'legend.height']),
    ] },
    { is: 'div', class: 'flex [&>*]:flex-1 [&>*]:mb0!', children: [
      num(['item-w', 'legend.itemWidth'], { displayValue: 25, el: { max: 50 } }),
      num(['item-h', 'legend.itemHeight'], { displayValue: 14, el: { max: 28 } }),
    ] },
    radios(['', 'legend.left'], [['L', 'left'], ['C', 'center'], ['R', 'right']]),
    radios(['', 'legend.orient'], [['↔', 'horizontal'], ['↕', 'vertical']]),
    radios(['', 'legend.top'], [['T', 'top'], ['C', 'middle'], ['B', 'bottom']]),
    num(['', 'legend.itemGap'], { displayValue: 10 }),
  ] },
  { is: 'div', class: 'text-3 op80', children: 'text' },
  { is: StyleText, class: 'my8', model: option, disabled: ['r'], prefix: 'legend.textStyle' },
] })

export const legend = (option) => enable2(option, 'Legend', genDisplayValue(option, 'legend.show', true), () => [
  legendView(option)
])

export const toolbox = (option) => enable2(option, 'Toolbox', genDisplayValue(option, 'toolbox.show', void 0), () => [
  { is: 'div', class: 'grid [&>*]:mb8', style: 'grid-template-columns: 1fr 1fr;', children: [
    { lp: ['data-zoom', 'toolbox.feature.dataZoom.show'], type: 'switch' },
    { lp: ['data-view', 'toolbox.feature.dataView'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
    { lp: ['restore', 'toolbox.feature.restore'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
    { lp: ['save-image', 'toolbox.feature.saveAsImage'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
    { lp: ['size', 'toolbox.itemSize'], type: 'slider', displayValue: 15, el: { max: 30 } },
    { lp: ['gap', 'toolbox.itemGap'], type: 'slider', displayValue: 8, el: { max: 16 } },
    radios(['', 'toolbox.orient'], [['↔', 'horizontal'], ['↕', 'vertical']]),
  ] }
])

export const tooltip = (option) => enable2(option, 'Tooltip', genDisplayValue(option, 'tooltip.show', true), () => [
  segm(['', 'tooltip.axisPointer.type'], ['line', 'shadow', 'cross'], { displayValue: 'line' }),
  // lineStyle
  option.tooltip?.axisPointer?.type in { line: 1, undefined: 1 } && { is: StyleLine, class: 'my8', model: option, prefix: 'tooltip.axisPointer.lineStyle', displayValue: { type: 'dashed' } },
  // crossStyle
  option.tooltip?.axisPointer?.type == 'cross' && { is: StyleLine, class: 'my8', model: option, prefix: 'tooltip.axisPointer.crossStyle', displayValue: { type: 'dashed' } },
  // shadowStyle
  option.tooltip?.axisPointer?.type == 'shadow' && { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    ...lineStyleItems(['color'], 'tooltip.axisPointer.shadowStyle')
  ] },
  // trigger
  { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
    opts(['trigger', 'tooltip.trigger'], ['item', 'axis', 'none']),
    checks(['trigger-on', 'tooltip.triggerOn'], [['hover', 'mousemove'], 'click'], { get: v => v?.split('|'), set: v => v?.length ? v.join('|') : void 0 }),
    { lp: ['padding', 'tooltip.padding'], set: v => v?.map(e => e ?? 5), el: { is: 'InputNumbers', len: 2, unit: null, hideUnit: true, placeholder: ['↕', '↔'] } },
    color(['bg', 'tooltip.backgroundColor'], { el: { size: 'small' } }),
  ] },
  // text
  { is: 'div', class: 'text-3 op90', children: 'text' },
  { is: StyleText, class: 'my8', model: option, disabled: ['r'], prefix: 'tooltip.textStyle' },
  // enable3(option, 'text', void 0, () => [
  // ])
])