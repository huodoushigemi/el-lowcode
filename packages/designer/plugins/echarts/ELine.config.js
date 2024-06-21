import { get, pick } from "@el-lowcode/utils"
import { h } from "vue"

const FONT_STYLES = ['normal', 'italic', 'oblique']
const FONT_WEIGHTS = ['normal', 'bold', 'bolder', 'lighter']
const FONT_FAMILYS = ['sans-serif', 'serif', 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei']
const FONT_OVERFLOWS = ['none', 'truncate', 'break', 'breakAll']
const LINE_TYPES = ['solid', 'dashed', 'dotted']

function normalized(arr) {
  arr.forEach(e => {
    if (!e) return
    if (typeof e == 'object' && !e.is) e.script ??= false
    if (Array.isArray(e.children)) normalized(e.children)
  })
  return arr
}

const enable = (model, label, prop, defaultValue, children, ) => ({ is: 'ElFormRender', model, size: 'small', style: 'padding: 1px 12px; background: var(--el-fill-color-light);', children: [
  { is: 'div', class: 'flex aic', children: [
    { is: 'div', style: 'margin: 6px 0; font-weight: bold; text-transform: capitalize;', children: label },
    { prop, type: 'switch', class: 'mla mb0', defaultValue }
  ] },
  ...(get(model, prop) ? children : [])
] })

const enable2 = (model, label, prop, defaultValue, children, ) => ({ is: 'ElFormRender', model, class: 'el-collapse-item', size: 'small', children: [
  { is: 'div', class: ['el-collapse-item__header', get(model, prop) && 'is-active'], style: 'cursor: auto', children: [
    label,
    { prop, type: 'switch', class: 'mla mb0', defaultValue }
  ] },
  ...(get(model, prop) ? children : [])
] })

const number = (lp, opt) => ({ lp, ...opt, el: { is: 'InputNumber', unit: null, min: 0, hideUnit: true, ...opt?.el } })
const number1 = (prop, opt) => ({ prop, ...opt, el: { is: 'InputNumber', unit: null, hideUnit: true } })

const color = (lp, opt) => ({ lp, type: 'color-picker', ...opt })
const opts = (lp, options, opt) => ({ lp, type: 'select', options, ...opt })
const radios = (lp, options, opt) => ({ lp, type: 'radio-group', options, ...opt })
const segm = (lp, options, opt) => ({ lp, type: 'segmented', ...opt, el: { options, block: true, wfull: '', ...opt?.el } })
const checks = (lp, options, opt) => ({ lp, type: 'checkbox-group', options, ...opt, el: { type: 'button' } })
// const slider1 = (props) => ({  })

const details = (label, children) => ({ is: "details", children: [
  { is: 'summary', class: 'my8', style: 'text-transform: capitalize;', children: label },
  ...children
] })

const axisLabel = model => enable(model, 'label', 'show', true, [
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    number(['size', 'fontSize'], { displayValue: 12 }),
    number(['offset', 'margin'], { defaultValue: 8 }),
    color(['color', 'color'], { el: { size: 'small' } }),
    opts(['style', 'fontStyle'], FONT_STYLES),
    opts(['weight', 'fontWeight'], FONT_WEIGHTS),
    opts(['family', 'fontFamily'], FONT_FAMILYS),
    number(['w', 'width']),
    number(['h', 'height']),
    opts(['overflow', 'overflow'], FONT_OVERFLOWS),
    { lp: ['format', 'formatter'], displayValue: '{value}' },
    number(['r °', 'rotate'], { el: { min: -90, max: 90 } }),
  ] },
])

const axisLine = model => enable(model, 'line', 'show', true, [
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    number(['size', 'lineStyle.width'], { displayValue: 1, el: { max: 5} }),
    opts(['type', 'lineStyle.type'], LINE_TYPES),
    color(['color', 'lineStyle.color'], { el: { size: 'small' } }),
  ] },
])

const splitLine = model => enable(model, 'split-line', 'show', false, [
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
    number(['size', 'lineStyle.width'], { displayValue: 1, el: { max: 5 } }),
    opts(['type', 'lineStyle.type'], LINE_TYPES),
    color(['color', 'lineStyle.color'], { el: { size: 'small' } }),
  ] },
])

const axisTick = model => enable(model, 'tick', 'show', true, [
  { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 0 8px', children: [
    number(['len', 'length'], { displayValue: 5, el: { max: 30 } }),
    number(['size', 'lineStyle.width'], { displayValue: 1, el: { max: 5 } }),
    opts(['type', 'lineStyle.type'], LINE_TYPES),
    color(['color', 'lineStyle.color'], { el: { size: 'small' } }),
  ] },
])

const _lineStyleItems = (prefix) => {
  const n = p => [prefix, p].filter(e => e).join('.')
  return {
    type: opts(['type', n('type')], LINE_TYPES),
    width: number(['width', n('width')], { el: { max: 10 } }),
    color: color(['color', n('color')], { el: { size: 'small' } }),
    ..._shadowStyleItems(prefix),
  }
}

const _shadowStyleItems = (prefix) => {
  const n = p => [prefix, p].filter(e => e).join('.')
  return {
    shadowBlur: number(['shadow-blur', n('shadowBlur')], { el: { max: 50 } }),
    shadowColor: color(['shadow-color', n('shadowColor')], { el: { size: 'small' } }),
    shadowOffsetX: number(['shadow-x', n('shadowOffsetX')]),
    shadowOffsetY: number(['shadow-y', n('shadowOffsetY')]),
  }
}

const _textStyleItems = prefix => {
  const n = p => [prefix, p].filter(e => e).join('.')
  return {
    fontSize: number(['size', n('fontSize')], { displayValue: 12 }),
    color: color(['color', n('color')], { el: { size: 'small' } }),
    fontStyle: opts(['style', n('fontStyle')], FONT_STYLES),
    fontWeight: opts(['weight', n('fontWeight')], FONT_WEIGHTS),
    fontFamily: opts(['family', n('fontFamily')], FONT_FAMILYS),
    lineHeight: number(['line-height', n('lineHeight')]),
    backgroundColor: color(['background-color', n('backgroundColor')]),
    ..._shadowStyleItems(prefix),
    width: number(['w', n('width')]),
    height: number(['h', n('height')]),
    overflow: opts(['overflow', n('overflow')], FONT_OVERFLOWS),
    formatter: { lp: ['format', n('formatter')], displayValue: '{value}' },
    rotate: number(['r °', n('rotate')], { el: { min: -90, max: 90 }   }),
  }
}

export default {
  is: 'ELine',
  label: '线型图',
  props: ({ option }) => normalized([
    { lp: 'data', script: true },
    { lp: 'fields', script: true },

    { is: 'ElFormRender', model: option, size: 'small', children: [
      { is: 'ElCollapse', children: [
        { is: 'ElCollapseItem', title: 'Grid', children: [
          { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
            number(['top', 'grid.top']),
            number(['right', 'grid.right']),
            number(['bottom', 'grid.bottom']),
            number(['left', 'grid.left']),
          ] }
        ] },
        { is: 'ElCollapseItem', title: 'XAxis', children: [
          axisLabel(option.xAxis.axisLabel),
          { is: 'div', class: 'mb4' },
          axisLine(option.xAxis.axisLine),
          { is: 'div', class: 'mb4' },
          splitLine(option.xAxis.splitLine),
          { is: 'div', class: 'mb4' },
          axisTick(option.xAxis.axisTick),
        ] },
        { is: 'ElCollapseItem', title: 'YAxis', children: [
          axisLabel(option.yAxis.axisLabel),
          { is: 'div', class: 'mb4' },
          axisLine(option.yAxis.axisLine),
          { is: 'div', class: 'mb4' },
          splitLine(option.yAxis.splitLine),
          { is: 'div', class: 'mb4' },
          axisTick(option.yAxis.axisTick),
        ] },
        enable2(option.legend, 'Legend', 'show', true, [
          { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
            number(['w', 'itemWidth'], { displayValue: 25, el: { max: 50 } }),
            number(['h', 'itemHeight'], { displayValue: 14, el: { max: 28 } }),
            radios(['', 'left'], [['L', 'left'], ['C', 'center'], ['R', 'right']]),
            radios(['', 'top'], [['T', 'top'], ['C', 'middle'], ['B', 'bottom']]),
            radios(['', 'orient'], [['⇿', 'horizontal'], ['↕', 'vertical']]),
            number(['', 'itemHeight'], { displayValue: 14, el: { max: 28 } }),
          ] },
          details('text', [
            { is: 'ElFormRender', model: option.legend.textStyle, class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', size: 'small', children: [
              ...Object.values(pick(_textStyleItems(), ['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily', 'width', 'height', 'overflow']))
            ] }
          ])
        ]),
        enable2(option.toolbox, 'Toolbox', 'show', false, [
          { is: 'div', class: 'grid', style: 'grid-template-columns: 1fr 1fr;', children: [
            { lp: ['data-zoom', 'feature.dataZoom.show'], type: 'switch' },
            { lp: ['data-view', 'feature.dataView'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
            { lp: ['restore', 'feature.restore'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
            { lp: ['save-image', 'feature.saveAsImage'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
            { lp: ['size', 'itemSize'], type: 'slider', el: { max: 30 } },
            { lp: ['gap', 'itemGap'], type: 'slider', el: { max: 16 } },
            radios(['', 'orient'], [['⇿', 'horizontal'], ['↕', 'vertical']]),
          ] },
        ]),
        enable2(option.tooltip, 'Tooltip', 'show', true, [
          segm(['', 'axisPointer.type'], ['line', 'shadow', 'cross'], { displayValue: 'line' }),
          // lineStyle
          option.tooltip?.axisPointer?.type in { line: 1, undefined: 1 } && { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
            ...Object.values(pick(_lineStyleItems('axisPointer.lineStyle'), ['type', 'width', 'color']))
          ] },
          // shadowStyle
          option.tooltip?.axisPointer?.type == 'shadow' && { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
            ...Object.values(pick(_lineStyleItems('axisPointer.shadowStyle'), ['color']))
          ] },
          // crossStyle
          option.tooltip?.axisPointer?.type == 'cross' && { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', children: [
            ...Object.values(pick(_lineStyleItems('axisPointer.crossStyle'), ['type', 'width', 'color']))
          ] },
          { is: 'div', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8', children: [
            opts('trigger', ['item', 'axis', 'none']),
            checks('triggerOn', [['hover', 'mousemove'], 'click'], { get: v => v?.split('|'), set: v => v?.length ? v.join('|') : void 0 }),
            { lp: 'padding', set: v => v?.map(e => e ?? 5), el: { is: 'InputNumbers', len: 2, unit: null, hideUnit: true, placeholder: ['y', 'x'] } },
            color(['bg', 'backgroundColor'], { el: { size: 'small' } }),
          ] },
          details('Text', [
            { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', size: 'small', children: [
              ...Object.values(pick(_textStyleItems('textStyle'), ['fontSize', 'lineHeight', 'color', 'fontStyle', 'fontWeight', 'fontFamily', 'width', 'height', 'overflow']))
            ] }
          ])
        ]),
        { is: 'ElCollapseItem', title: 'Series', children: [
          { is: 'ElTabs', children: [
            { is: 'ElTabPane', label: 'Series', lazy: true, children: [
              { is: 'ElFormRender', model: option.series[0], size: 'small', children: [
                { is: 'p', class: 'flex aic mb8', children: ['label', { prop: 'label.show', type: 'switch', defaultValue: true, class: 'mla mb0' }] },
                { is: 'div', class: 'flex aic', children: [
                  { prop: 'label.fontSize', type: 'input-number', displayValue: 12 },
                  { prop: 'label.color', type: 'color-picker', class: 'ml8' },
                  { prop: 'label.position', options: ['top', 'left', 'right', 'bottom'], displayValue: 'top', class: 'ml8' },
                ] },
                { is: 'p', class: 'flex aic mb8', children:  'line' },
                { is: 'div', class: 'flex aic', children: [
                  { prop: 'lineStyle.width', type: 'input-number', defaultValue: 2 },
                  { prop: 'lineStyle.color', type: 'color-picker', class: 'ml8' },
                  { prop: 'lineStyle.solid', options: ['solid', 'dashed', 'dotted'], displayValue: 'solid' },
                ] },
                { is: 'p', class: 'flex aic mb8', children: ['area-style', { prop: 'areaStyle', type: 'switch', get: v => !!v, set: v => v ? {} : void 0, class: 'mla mb0' }] },
                { is: 'div', class: 'flex aic', children: [
                  { prop: 'areaStyle.opacity', type: 'slider', displayValue: .7, class: 'flex-1', el: { min: 0, max: 1, step: .1, formatTooltip: v => `opacity: ${v * 100} %` } },
                  { prop: 'areaStyle.color', type: 'color-picker' },
                ] },
                { is: 'p', class: 'flex aic mb8', children: ['shadow', { prop: 'lineStyle.shadowColor', type: 'switch', get: v => !!v, set: v => v ? 'rgb(128, 255, 165)' : void 0, class: 'mla mb0' }] },
                { is: 'div', class: 'flex aic', children: [
                  { prop: 'lineStyle.shadowBlur', type: 'input-number', displayValue: 0 },
                  { prop: 'lineStyle.shadowColor', type: 'color-picker', class: 'ml8' },
                ] },
                { is: 'div', class: 'flex aic text-12', children: [
                  'x',
                  { prop: 'lineStyle.shadowOffsetX', type: 'slider', displayValue: 0, class: 'flex-1', el: { max: 20 } },
                  'y',
                  { prop: 'lineStyle.shadowOffsetY', type: 'slider', displayValue: 0, class: 'flex-1', el: { max: 20 }  },
                ] },
                { is: 'p', class: 'flex aic mb8', children: ['smooth', { prop: 'smooth', type: 'switch', class: 'mla mb0' }] },
              ] },
            ] },
          ] },
        ] },
      ] },
    ] },

    { is: 'ElDivider' },
    { is: 'h1', children: 'Common' },
    { is: 'div', class: 'grid grid-cols-3', children: [
      { lp: 'autoresize', type: 'switch' },
      { lp: ['svg', 'initOptions.renderer'], type: 'switch', get: v => !!v, set: v => v ? 'svg' : void 0 },
      { lp: ['dark', 'theme'], type: 'switch', get: v => !!v, set: v => v ? 'dark' : void 0 },
    ] },

    { is: 'ElDivider' },
    { is: 'h1', children: 'Event' },
    { lp: 'onFinished', script: true },
    { lp: 'onSelectchanged', script: true },
    { lp: 'onLegendselectchanged', script: true },
    { lp: 'onLegendselected', script: true },
  ]),
  defaultProps: () => ({
    data: `{{${JSON.stringify([{ x: 'Mon', y: 150 }, { x: 'Tue', y: 230 }, { x: 'Wed', y: 224 }, { x: 'Thu', y: 218 }, { x: 'Fri', y: 135 }, { x: 'Sat', y: 147 }, { x: 'Sun', y: 260 }], undefined, ' ')}}}`,
    fields: `{{{ x: 'x', y: 'y' }}}`,
    style: { height: '300px', width: '400px' },
    option: {
      legend: { textStyle: {} },
      xAxis: { axisLabel: {}, axisLine: {}, splitLine: {}, axisTick: {} },
      yAxis: { axisLabel: {}, axisLine: {}, splitLine: {}, axisTick: {} },
      tooltip:{ trigger: 'axis' },
      toolbox: { textStyle: {} },
      series: [{ label: { show: true } }]
    },
  })
}