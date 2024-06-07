function normalized(arr) {
  arr.forEach(e => {
    if (typeof e == 'object' && !e.is) e.script ??= false
    if (Array.isArray(e.children)) normalized(e.children)
  })
  return arr
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
          {is: 'div', class: 'grid aic text-12', style: 'grid-template-columns: 50px 1fr; gap: 4px 0;', children: [
            'top', { prop: 'grid.top', type: 'slider', class: 'mb0' },
            'right', { prop: 'grid.right', type: 'slider', class: 'mb0'  },
            'bottom', { prop: 'grid.bottom', type: 'slider', class: 'mb0'  },
            'left', { prop: 'grid.left', type: 'slider', class: 'mb0'  },
            { is: 'input', type: 'button', value: 'reset', onClick: () => option.grid = void 0 },
          ]}
        ] },
        { is: 'ElCollapseItem', title: 'XAxis', children: [
          { is: 'p', class: 'flex aic mb8', children: ['axis-label', { prop: 'xAxis.axisLabel.show', type: 'switch', defaultValue: true, class: 'mla mb0' }] },
          { is: 'div', class: 'text-12', style: 'display: grid; grid-template-columns: 130px 1fr', children: [
            { prop: 'xAxis.axisLabel.rotate', type: 'slider', defaultValue: 0, el: { min: -90, max: 90, formatTooltip: v => `rotate: ${v}°` } },
            { prop: 'xAxis.axisLabel.color', type: 'color-picker' },
            { prop: 'xAxis.axisLabel.margin', type: 'input-number', defaultValue: 8 }, 'gap',
            { prop: 'xAxis.axisLabel.fontSize', type: 'input-number', displayValue: 12 }, 'size',
          ] },
          { is: 'p', class: 'flex aic mb8', children: ['axis-line', { prop: 'xAxis.axisLine.show', type: 'switch', defaultValue: true, class: 'mla mb0' }] },
          { is: 'div', class: 'flex aic', children: [
            { prop: 'xAxis.axisLine.lineStyle.width', type: 'input-number', displayValue: 1, el: { max: 5 } },
            { prop: 'xAxis.axisLine.lineStyle.color', type: 'color-picker', class: 'ml8' },
            { prop: 'xAxis.axisLine.lineStyle.type', options: ['solid', 'dash'], displayValue: 'solid', class: 'ml8' },
          ] },
          { is: 'p', class: 'flex aic mb8', children: ['split-line', { prop: 'xAxis.splitLine.show', type: 'switch', class: 'mla mb0' }] },
          { is: 'div', class: 'flex aic', children: [
            { prop: 'xAxis.splitLine.lineStyle.width', type: 'input-number', displayValue: 1, el: { max: 5 } },
            { prop: 'xAxis.splitLine.lineStyle.color', type: 'color-picker', class: 'ml8' },
            { prop: 'xAxis.splitLine.lineStyle.type', options: ['solid', 'dash'], displayValue: 'solid' },
          ] },
        ] },
        { is: 'ElCollapseItem', title: 'YAxis', children: [
          { is: 'p', class: 'flex aic mb8', children: ['axis-label', { prop: 'yAxis.axisLabel.show', type: 'switch', displayValue: true, class: 'mla mb0' }] },
          { is: 'div', class: 'text-12', style: 'display: grid; grid-template-columns: 130px 1fr', children: [
            { prop: 'yAxis.axisLabel.rotate', type: 'slider', defaultValue: 0, el: { min: -90, max: 90, formatTooltip: v => `rotate: ${v}°` } },
            { prop: 'yAxis.axisLabel.color', type: 'color-picker' },
            { prop: 'yAxis.axisLabel.margin', type: 'input-number', defaultValue: 8 }, 'gap',
            { prop: 'yAxis.axisLabel.fontSize', type: 'input-number', displayValue: 12 }, 'size',
          ] },
          { is: 'p', class: 'flex aic mb8', children: ['axis-line', { prop: 'yAxis.axisLine.show', type: 'switch', class: 'mla mb0' }] },
          { is: 'div', class: 'flex aic', children: [
            { prop: 'yAxis.axisLine.lineStyle.width', type: 'input-number', displayValue: 1, el: { max: 5 } },
            { prop: 'yAxis.axisLine.lineStyle.color', type: 'color-picker', class: 'ml8' },
            { prop: 'yAxis.axisLine.lineStyle.type', options: ['solid', 'dash'], displayValue: 'solid', class: 'ml8' },
          ] },
          { is: 'p', class: 'flex aic mb8', children: ['split-line', { prop: 'yAxis.splitLine.show', type: 'switch', defaultValue: true, class: 'mla mb0' }] },
          { is: 'div', class: 'flex aic', children: [
            { prop: 'yAxis.splitLine.lineStyle.width', type: 'input-number', displayValue: 1, el: { max: 5 } },
            { prop: 'yAxis.splitLine.lineStyle.color', type: 'color-picker', class: 'ml8' },
            { prop: 'yAxis.splitLine.lineStyle.type', options: ['solid', 'dash'], displayValue: 'solid' },
          ] },
        ] },
        { is: 'ElCollapseItem', title: 'Tooltip', children: [
          { is: 'ElFormRender', model: option.tooltip, size: 'small', children: [
            { is: 'div', class: 'flex aic', children: [
              { prop: 'textStyle.fontSize', type: 'input-number', displayValue: 14 },
              { prop: 'textStyle.color', type: 'color-picker', class: 'ml8' },
            ] },
            { prop: 'axisPointer.type', type: 'radio-group', options: ['line', 'shadow', 'cross'], displayValue: 'line' },
            { is: 'div', class: 'flex aic', $: { condition: !option.tooltip.axisPointer?.type }, children: [
              { prop: 'axisPointer.lineStyle.width', type: 'input-number', displayValue: 1 },
              { prop: 'axisPointer.lineStyle.color', type: 'color-picker', class: 'ml8' },
              { prop: 'axisPointer.lineStyle.type', options: ['solid', 'dashed', 'dotted'], displayValue: 'solid', class: 'ml8' },
            ] },
            { is: 'div', class: 'flex aic', $: { condition: option.tooltip.axisPointer?.type == 'shadow' }, children: [
              { prop: 'axisPointer.shadowStyle.color', type: 'color-picker' },
            ] },
            { is: 'div', class: 'flex aic', $: { condition: option.tooltip.axisPointer?.type == 'cross' }, children: [
              { prop: 'axisPointer.crossStyle.width', type: 'input-number', displayValue: 1 },
              { prop: 'axisPointer.crossStyle.color', type: 'color-picker', class: 'ml8' },
              { prop: 'axisPointer.crossStyle.type', options: ['solid', 'dashed', 'dotted'], displayValue: 'solid', class: 'ml8' },
            ] },
          ] }
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
      tooltip:{ trigger: 'axis' },
      toolbox: {},
      series: [{ label: { show: true } }]
    },
  })
}