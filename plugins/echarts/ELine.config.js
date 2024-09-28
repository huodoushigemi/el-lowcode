import { serieBar, serieLine } from './.lowcode/option/series'
import { axiss, form, gridView, legend, legendView, toolbox, tooltip } from './.lowcode/option'
import { bool, segm, segm2 } from './.lowcode/utils'

export default {
  is: 'ELine',
  label: '线型图',
  category: '基础图表',
  props: (props, ctx, { node }) => {
    const { _id, option } = props

    return [
      { lp: ['data', 'option.dataset.source'], script: true },

      segm2('series-layout-by', ['column', 'row'], { displayValue: 'column' }),
  
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'category', el: { placeholder: 'auto' } },
        bool('vertical'),
      ] },

      { is: 'Tabs', class: '-mx8 no-scriptable', nav: { class: 'relative shadow-md' }, children: [
        { is: 'div', label: '容器', class: 'p8', children: [
          gridView(option)
        ] },
        { is: 'div', label: '轴', children: [
          axiss(option),
        ] },
        { is: 'div', label: '系列', children: [
          { is: 'Tabs', key: _id, tabs: option.series, editable: true, props: { label: 'name' }, new: (i) => ({ type: 'line', name: `series-${i + 1}` }), children: option.series.map((e, i) => (
            { is: 'div', label: e.name, class: 'px8', children: () => [
              e.type == 'bar' ? serieBar(e, i, option, ctx, node) : serieLine(e, i, option, ctx, node)
            ] }
          )) },
        ] },
        { is: 'div', label: '图例', class: 'p8 pt0 mt6', children: [
          form({ model: option, children: [legendView(option)] }),
        ] },
        { is: 'div', label: '其他', class: 'p8 pt0', children: [
          // legend(option),
          toolbox(option),
          tooltip(option),
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
    ]
  },
  defaultProps: () => ({
    autoresize: true,
    style: { height: '300px', width: '400px' },
    option: {
      legend: {},
      xAxis: [{}],
      yAxis: [{}],
      tooltip: { show: true, trigger: 'axis' },
      toolbox: {},
      dataset: {
        source: `{{${JSON.stringify([{ x: 'Mon', y: 150 }, { x: 'Tue', y: 230 }, { x: 'Wed', y: 224 }, { x: 'Thu', y: 218 }, { x: 'Fri', y: 135 }, { x: 'Sat', y: 147 }, { x: 'Sun', y: 260 }], undefined, ' ')}}}`
      },
      series: [{ name: 'data', label: { show: true } }]
    },
  })
}

function onEdit(active, action) {
  
}