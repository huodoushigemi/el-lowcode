import { serieLine } from './.lowcode/option/series'
import { axis, grid, legend, toolbox, tooltip } from './.lowcode/option'
import { bool, segm, segm2 } from './.lowcode/utils'

export default {
  is: 'ELine',
  label: '线型图',
  props: (props) => {
    const { _id, option } = props

    return [
      { lp: ['data', 'option.dataset.source'], script: true },
  
      // segm2('series-layout-by', ['column', 'row'], { displayValue: 'column' }),
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'category', el: { placeholder: 'auto' } },
        bool('vertical'),
      ] },
  
      // { lp: ['series', 'option.series'], class: '-mr8', el: { is: 'EditTable', columns: [{ prop: 'name' }, { prop: 'encode.y' }], new: () => ({ type: 'line' }) } },
  
      { is: 'ElFormRender', model: option, size: 'small', class: 'no-scriptable', children: [
        grid(option),
        axis(option, props),
        legend(option),
        toolbox(option),
        tooltip(option),
        { is: 'Tabs', key: _id, class: '-mx8 mt12', tabs: option.series, editable: true, props: { label: 'name' }, new: (i) => ({ type: 'line', name: `series-${i + 1}` }), children: option.series.map(e => (
          { is: 'div', label: e.name, class: 'px8', children: () => [serieLine(e)] }
        )) },
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
    ]
  },
  defaultProps: () => ({
    autoresize: true,
    style: { height: '300px', width: '400px' },
    option: {
      legend: {},
      xAxis: {},
      yAxis: {},
      tooltip: { show: true, trigger: 'axis' },
      toolbox: {},
      dataset: {
        source: `{{${JSON.stringify([{ x: 'Mon', y: 150 }, { x: 'Tue', y: 230 }, { x: 'Wed', y: 224 }, { x: 'Thu', y: 218 }, { x: 'Fri', y: 135 }, { x: 'Sat', y: 147 }, { x: 'Sun', y: 260 }], undefined, ' ')}}}`
      },
      series: [{ label: { show: true } }]
    },
  })
}

function onEdit(active, action) {
  
}