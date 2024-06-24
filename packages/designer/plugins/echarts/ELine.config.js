import { serieLine } from './.lowcode/series'
import { grid, legend, toolbox, tooltip, xAxis, yAxis } from './.lowcode/option'

export default {
  is: 'ELine',
  label: '线型图',
  props: ({ option }) => [
    { lp: 'data', script: true },
    { lp: 'fields', script: true },

    { is: 'ElFormRender', model: option, size: 'small', class: 'no-scriptable', children: [
      { is: 'ElCollapse', children: [
        grid(option),
        xAxis(option),
        yAxis(option),
        legend(option),
        toolbox(option),
        tooltip(option),
        { is: 'ElCollapseItem', title: 'Series', children: [
          { is: 'ElTabs', children: [
            { is: 'ElTabPane', label: '1', lazy: true, children: [
              serieLine(option.series[0])
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
  ],
  defaultProps: () => ({
    data: `{{${JSON.stringify([{ x: 'Mon', y: 150 }, { x: 'Tue', y: 230 }, { x: 'Wed', y: 224 }, { x: 'Thu', y: 218 }, { x: 'Fri', y: 135 }, { x: 'Sat', y: 147 }, { x: 'Sun', y: 260 }], undefined, ' ')}}}`,
    fields: `{{{ x: 'x', y: 'y' }}}`,
    style: { height: '300px', width: '400px' },
    option: {
      legend: {},
      xAxis: {},
      yAxis: {},
      tooltip:{ trigger: 'axis' },
      toolbox: {},
      series: [{ label: { show: true } }]
    },
  })
}