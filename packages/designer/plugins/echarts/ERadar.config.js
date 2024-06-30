import { radarAxis, serieRadar } from './.lowcode/option/series'
import { grid, legend, toolbox, tooltip, xAxis, yAxis } from './.lowcode/option'
import { enable2 } from './.lowcode/utils'

export default {
  is: 'ERadar',
  label: '雷达图',
  props: ({ data, option }) => [
    { lp: 'data' },

    // { lp: ['indicator', 'option.radar.indicator'], el: { is: 'OptionsInput', props: { L: 'name', V: 'max' }, placholder: ['name', 'max'] } },
    { lp: ['indicator', 'option.radar.indicator'], el: { is: 'EditTable', columns: [{ prop: 'name' }, { prop: 'key' }, { prop: 'max' }] } },

    { is: 'ElFormRender', model: option, size: 'small', class: 'no-scriptable', children: [
      legend(option),
      toolbox(option), 
      tooltip(option),
      radarAxis(option),

      enable2(option, 'Series', void 0, () => [
        { is: 'ElTabs', children: data.map((e, i) => ({ is: 'ElTabPane', label: `data-${i}`, lazy: true, children: [
          serieRadar(option.series.data[i] ??= {})
        ] }))},
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
    data: [
      { sales: 4200, manage: 3000, info: 20000, custom: 35000, develop: 50000, market: 18000 },
      { sales: 5000, manage: 14000, info: 28000, custom: 26000, develop: 42000, market: 21000 },
    ],
    style: { height: '300px', width: '400px' },
    autoresize: true,
    option: {
      legend: {},
      tooltip: {},
      toolbox: {},
      series: { selectedMode: true, data: [] },
      radar: {
        indicator: [
          { name: '销售额', key: 'sales', max: 6500 },
          { name: '管理', key: 'manage', max: 16000 },
          { name: '信息技术', key: 'info', max: 30000 },
          { name: '客户支持', key: 'custom', max: 38000 },
          { name: '发展', key: 'develop', max: 52000 },
          { name: '营销', key: 'market', max: 25000 }
        ]
      },
    },
  })
}