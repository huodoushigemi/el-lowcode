import { get } from "@el-lowcode/utils"

const FONT_STYLES = ['normal', 'italic', 'oblique']
const FONT_WEIGHTS = ['normal', 'bold', 'bolder', 'lighter']
const FONT_FAMILYS = ['sans-serif', 'serif', 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei']
const FONT_OVERFLOWS = ['none', 'truncate', 'break', 'breakAll']
const LINE_TYPES = ['solid', 'dashed', 'dotted']

function normalized(arr) {
  arr.forEach(e => {
    if (typeof e == 'object' && !e.is) e.script ??= false
    if (Array.isArray(e.children)) normalized(e.children)
  })
  return arr
}

const enable = (model, label, prop, defaultValue, children) => ({ is: 'div', style: 'padding: 1px 12px; background: var(--el-fill-color-light);', children: [
  { is: 'div', class: 'flex aic', style: 'margin: 6px 0; font-weight: bold', children: [
    { is: 'div', children: label },
    { prop, type: 'switch', class: 'mla mb0', defaultValue }
  ] },
  ...(get(model, prop) ? children : [])
] })

const number = (lp, opt) => ({ lp, ...opt, el: { is: 'InputNumber', unit: null, hideUnit: true, ...opt?.el } })
const number1 = (prop, opt) => ({ prop, ...opt, el: { is: 'InputNumber', unit: null, hideUnit: true } })

const color = (lp, opt) => ({ lp, type: 'color-picker', ...opt })
const opts = (lp, options, opt) => ({ lp, type: 'select', options, ...opt })
// const slider1 = (props) => ({  })

export default {
  is: 'ELine',
  label: '线型图',
  props: ({ option }) => normalized([
    { lp: 'data', script: true },
    { lp: 'fields', script: true },

    { is: 'ElFormRender', model: option, size: 'small', children: [
      { is: 'ElCollapse', children: [
        { is: 'ElCollapseItem', title: 'Grid', children: [
          { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 0 8px', children: [
            number(['top', 'grid.top']),
            number(['right', 'grid.right']),
            number(['bottom', 'grid.bottom']),
            number(['left', 'grid.left']),
          ] }
        ] },
        { is: 'ElCollapseItem', title: 'XAxis', children: [
          { is: 'ElFormRender', model: option.xAxis.axisLabel, size: 'small', children: [
            enable(option.xAxis.axisLabel, 'label', 'show', true, [
              { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 8px', children: [
                number(['size', 'fontSize'], { displayValue: 12 }),
                number(['offset', 'margin'], { defaultValue: 8 }),
                // number(['w', 'width']),
                // number(['h', 'height']),
                color(['color', 'color'], { el: { size: 'small' } }),
                opts(['style', 'fontStyle'], FONT_STYLES),
                opts(['weight', 'fontWeight'], FONT_WEIGHTS),
                opts(['family', 'fontFamily'], FONT_FAMILYS),
                opts(['overflow', 'overflow'], FONT_OVERFLOWS),
                { lp: ['format', 'formatter'], displayValue: '{value}' },
                number(['rotate', 'rotate'], { el: { min: -90, max: 90 } }),
              ] },
            ]),
          ] },
          { is: 'div', class: 'mb4' },
          { is: 'ElFormRender', model: option.xAxis.axisLine, size: 'small', children: [
            enable(option.xAxis.axisLine, 'line', 'show', true, [
              { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 8px', children: [
                number(['size', 'lineStyle.width'], { displayValue: 1, el: { max: 5, min: 0 } }),
                opts(['type', 'lineStyle.type'], LINE_TYPES),
                color(['color', 'lineStyle.color'], { el: { size: 'small' } }),
              ] },
            ]),
          ] },
          { is: 'div', class: 'mb4' },
          { is: 'ElFormRender', model: option.xAxis.splitLine, size: 'small', children: [
            enable(option.xAxis.splitLine, 'split-line', 'show', false, [
              { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 8px', children: [
                number(['size', 'lineStyle.width'], { displayValue: 1, el: { max: 5, min: 0 } }),
                opts(['type', 'lineStyle.type'], LINE_TYPES),
                color(['color', 'lineStyle.color'], { el: { size: 'small' } }),
              ] },
            ]),
          ] },
          { is: 'div', class: 'mb4' },
          { is: 'ElFormRender', model: option.xAxis.axisTick, size: 'small', children: [
            enable(option.xAxis.axisTick, 'tick', 'show', true, [
              { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 0 8px', children: [
                number(['len', 'length'], { displayValue: 5, el: { max: 30, min: 0 } }),
                number(['size', 'lineStyle.width'], { displayValue: 1, el: { max: 5, min: 0 } }),
                opts(['type', 'lineStyle.type'], LINE_TYPES),
                color(['color', 'lineStyle.color'], { el: { size: 'small' } }),
              ] },
            ]),
          ] },
        ] },
        { is: 'ElCollapseItem', title: 'YAxis', children: [
          { is: 'ElFormRender', model: option.yAxis.axisLabel, size: 'small', children: [
            enable(option.yAxis.axisLabel, 'label', 'show', true, [
              { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 8px', children: [
                number(['size', 'fontSize'], { displayValue: 12 }),
                number(['offset', 'margin'], { defaultValue: 8 }),
                color(['color', 'color'], { el: { size: 'small' } }),
                number(['w', 'width']),
                number(['h', 'height']),
                number(['rotate', 'rotate'], { el: { min: -90, max: 90 } }),
                opts(['style', 'fontStyle'], FONT_STYLES),
                opts(['weight', 'fontWeight'], FONT_WEIGHTS),
                opts(['family', 'fontFamily'], FONT_FAMILYS),
                opts(['overflow', 'overflow'], FONT_OVERFLOWS),
                { lp: ['format', 'formatter'], displayValue: '{value}' },
              ] },
            ]),
          ] },
          { is: 'div', class: 'mb4' },
          { is: 'ElFormRender', model: option.yAxis.axisLine, size: 'small', children: [
            enable(option.yAxis.axisLine, 'line', 'show', false, [
              { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 8px', children: [
                number(['size', 'lineStyle.width'], { displayValue: 1, el: { max: 5, min: 0 } }),
                opts(['type', 'lineStyle.type'], LINE_TYPES),
                color(['color', 'lineStyle.color'], { el: { size: 'small' } }),
              ] },
            ]),
          ] },
          { is: 'div', class: 'mb4' },
          { is: 'ElFormRender', model: option.yAxis.splitLine, size: 'small', children: [
            enable(option.yAxis.splitLine, 'split-line', 'show', true, [
              { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 8px', children: [
                number(['size', 'lineStyle.width'], { displayValue: 1, el: { max: 5, min: 0 } }),
                opts(['type', 'lineStyle.type'], LINE_TYPES),
                color(['color', 'lineStyle.color'], { el: { size: 'small' } }),
              ] },
            ]),
          ] },
          { is: 'div', class: 'mb4' },
          { is: 'ElFormRender', model: option.yAxis.axisTick, size: 'small', children: [
            enable(option.yAxis.axisTick, 'tick', 'show', false, [
              { is: 'div', class: '[&>*]:mb8', style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 0 8px', children: [
                number(['len', 'length'], { displayValue: 5, el: { max: 30, min: 0 } }),
                number(['size', 'lineStyle.width'], { displayValue: 1, el: { max: 5, min: 0 } }),
                opts(['type', 'lineStyle.type'], LINE_TYPES),
                color(['color', 'lineStyle.color'], { el: { size: 'small' } }),
              ] },
            ]),
          ] },
        ] },
        { is: 'ElCollapseItem', title: 'Legend', children: [
          { is: 'ElFormRender', model: option.legend, size: 'small', children: [
            { is: 'div', class: 'flex aic', children: [
              { prop: 'textStyle.fontSize', type: 'input-number', displayValue: 12 },
              { prop: 'textStyle.color', type: 'color-picker', class: 'ml8' },
            ] },
            { is: 'div', class: 'grid', style: 'grid-template-columns: repeat(2, 10px 1fr); gap: 0 4px; text-align: right;', children: [
              'w', { prop: 'itemWidth', type: 'slider', displayValue: 25, el: { max: 50 } },
              'h', { prop: 'itemHeight', type: 'slider', displayValue: 14, el: { max: 28 } },
              'x', { prop: 'left', options: [['L', 'left'], ['C', 'center'], ['R', 'right']], type: 'radio-group' },
              'y', { prop: 'top', options: [['T', 'top'], ['C', 'middle'], ['B', 'bottom']], type: 'radio-group' },
              'g', { prop: 'itemGap', type: 'slider', displayValue: 10, el: { max: 20 } },
            ] },
            { prop: 'orient', options: ['horizontal', 'vertical'], type: 'radio-group' },
          ] }
        ] },
        { is: 'ElCollapseItem', title: 'Toolbox', children: [
          { is: 'ElFormRender', model: option.toolbox, size: 'small', children: [
            { is: 'div', class: 'grid', style: 'grid-template-columns: 1fr 1fr;', children: [
              { lp: ['data-zoom', 'feature.dataZoom'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
              { lp: ['data-view', 'feature.dataView'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
              { lp: ['restore', 'feature.restore'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
              { lp: ['save-image', 'feature.saveAsImage'], type: 'switch', get: v => !!v, set: v => v ? {} : void 0 },
              { lp: ['size', 'itemSize'], type: 'slider', el: { max: 30 } },
              { lp: ['gap', 'itemGap'], type: 'slider', el: { max: 16 } },
            ] },
            { prop: 'orient', options: ['horizontal', 'vertical'], type: 'radio-group' },
          ] }
        ] },
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
    { is: 'div', class: 'grid', style: 'grid-template-columns: 1fr 1fr 1fr;', children: [
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
    autoresize: true,
    style: { height: '300px', width: '400px' },
    option: {
      legend: {},
      xAxis: { axisLabel: {  }, axisLine: {  }, splitLine: {  }, axisTick: {  } },
      yAxis: { axisLabel: {  }, axisLine: {  }, splitLine: {  }, axisTick: {  } },
      tooltip:{ trigger: 'axis' },
      toolbox: {},
      series: [{ label: { show: true } }]
    },
  })
}