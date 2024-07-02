import { serieBar, serieLine } from './.lowcode/option/series'
import { grid, legend, toolbox, tooltip, xAxis, yAxis } from './.lowcode/option'
import { enable2 } from './.lowcode/utils'

export default {
  is: 'EBar',
  label: '柱状图',
  props: ({ option }) => [
    { lp: 'data', script: true },
    { lp: 'fields', script: true },

    { is: 'ElFormRender', model: option, size: 'small', class: 'no-scriptable', children: [
      grid(option),
      xAxis(option),
      yAxis(option),
      legend(option),
      toolbox(option),
      tooltip(option),
      enable2(option, 'Series', void 0, () => [
        { is: 'ElTabs', children: [
          { is: 'ElTabPane', label: '1', lazy: true, children: [
            serieBar(option.series[0])
          ] },
        ] },
      ], true)
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
    autoresize: true,
    style: { height: '300px', width: '400px' },
    option: {
      legend: {},
      xAxis: {},
      yAxis: {},
      tooltip:{ show: true, trigger: 'axis' },
      toolbox: {},
      series: [{ type: 'bar', label: { show: true } }]
    },
  })
}