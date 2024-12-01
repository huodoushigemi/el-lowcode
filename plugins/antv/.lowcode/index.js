import { toArr } from '@el-lowcode/utils'

export const widgets = [
  {
    is: 'antv-pivot-sheet',
    label: '交叉表',
    category: '表格',
    props: (props, ctx) => {
      const node = ctx.keyedNode[props._id]
      const ks = Object.keys(node?.$data.dataCfg.data?.[0] || {})
      
      return [
        { lp: ['数据', 'dataCfg.data'], script: true },
        { lp: ['行维度', 'dataCfg.fields.rows'], options: ks, el: { multiple: true } },
        { lp: ['列维度', 'dataCfg.fields.columns'], options: ks, el: { multiple: true } },
        { lp: ['指标', 'dataCfg.fields.values'], options: ks, el: { multiple: true } },
        { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
          { lp: ['主题', 'themeCfg.name'], options: [['—', void 0], 'colorful', 'gray', 'dark'], el: { class: 'wfull' } },
          { lp: ['品牌色', 'brandColor'], type: 'color-picker', el: { colorFormat: 'hex' } },
        ] },
        // 小计总计
        { is: 'details', class: 'mb18', children: [
          { is: 'summary', children: '小计总计' },
          { is: 'Tabs', class: '-mx8 mt8', stretch: true, children: [
            { is: 'div', label: '行', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8 p8', children: [
              { lp: ['文本', 'options.totals.row.grandTotalsLabel'], displayValue: '', el: { placeholder: '总计' } },
              { lp: ['显示', 'options.totals.row.showGrandTotals'], type: 'switch', displayValue: false },
              { lp: ['反转布局', 'options.totals.row.reverseGrandTotalsLayout'], type: 'switch', displayValue: false, style: 'grid-column: 2' },
              { is: 'el-divider', class: 'my0 b-b-1 col-span-2' },
              { lp: ['文本', 'options.totals.row.subTotalsLabel'], displayValue: '', el: { placeholder: '小计' } },
              { lp: ['显示', 'options.totals.row.showSubTotals'], type: 'switch', displayValue: false },
              { lp: ['维度', 'options.totals.row.subTotalsDimensions'], options: ks, get: v => v?.[0], set: v => toArr(v) },
              { lp: ['反转布局', 'options.totals.row.reverseSubTotalsLayout'], type: 'switch', displayValue: false },
            ] },
            { is: 'div', label: '列', class: '', children: [] },
          ] },
        ] },
        // 排序
        { is: 'details', children: [
          { is: 'summary', children: '排序' },
          { is: 'div', label: '行', class: 'grid grid-cols-2 gap-x-8 [&>*]:mb8 p8', children: [
            { lp: ['字段', 'dataCfg.sortParams.0.sortFieldId'], options: ks },
            { lp: ['ㅤ', 'dataCfg.sortParams.0.sortMethod'], type: 'radio-group', options: ['ASC', 'DESC'] }
          ] },
        ] },
      ]
    },
    defaultProps: () => ({
      style: { height: '430px' },
      options: {},
      dataCfg: {
        data: `{{[\n  { "number": 7789, "province": "浙江省", "city": "杭州市", "type": "家具", "sub_type": "桌子" },\n  { "number": 2367, "province": "浙江省", "city": "绍兴市", "type": "家具", "sub_type": "桌子" },\n  { "number": 3877, "province": "浙江省", "city": "宁波市", "type": "家具", "sub_type": "桌子" },\n  { "number": 4342, "province": "浙江省", "city": "舟山市", "type": "家具", "sub_type": "桌子" },\n  { "number": 5343, "province": "浙江省", "city": "杭州市", "type": "家具", "sub_type": "沙发" },\n  { "number": 632, "province": "浙江省", "city": "绍兴市", "type": "家具", "sub_type": "沙发" },\n  { "number": 7234, "province": "浙江省", "city": "宁波市", "type": "家具", "sub_type": "沙发" },\n  { "number": 834, "province": "浙江省", "city": "舟山市", "type": "家具", "sub_type": "沙发" },\n  { "number": 945, "province": "浙江省", "city": "杭州市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 1304, "province": "浙江省", "city": "绍兴市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 1145, "province": "浙江省", "city": "宁波市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 1432, "province": "浙江省", "city": "舟山市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 1343, "province": "浙江省", "city": "杭州市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 1354, "province": "浙江省", "city": "绍兴市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 1523, "province": "浙江省", "city": "宁波市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 1634, "province": "浙江省", "city": "舟山市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 1723, "province": "四川省", "city": "成都市", "type": "家具", "sub_type": "桌子" },\n  { "number": 1822, "province": "四川省", "city": "绵阳市", "type": "家具", "sub_type": "桌子" },\n  { "number": 1943, "province": "四川省", "city": "南充市", "type": "家具", "sub_type": "桌子" },\n  { "number": 2330, "province": "四川省", "city": "乐山市", "type": "家具", "sub_type": "桌子" },\n  { "number": 2451, "province": "四川省", "city": "成都市", "type": "家具", "sub_type": "沙发" },\n  { "number": 2244, "province": "四川省", "city": "绵阳市", "type": "家具", "sub_type": "沙发" },\n  { "number": 2333, "province": "四川省", "city": "南充市", "type": "家具", "sub_type": "沙发" },\n  { "number": 2445, "province": "四川省", "city": "乐山市", "type": "家具", "sub_type": "沙发" },\n  { "number": 2335, "province": "四川省", "city": "成都市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 245, "province": "四川省", "city": "绵阳市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 2457, "province": "四川省", "city": "南充市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 2458, "province": "四川省", "city": "乐山市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 4004, "province": "四川省", "city": "成都市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 3077, "province": "四川省", "city": "绵阳市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 3551, "province": "四川省", "city": "南充市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 352, "province": "四川省", "city": "乐山市", "type": "办公用品", "sub_type": "纸张" }\n]\n}}`,
        fields: {
          rows: ['province', 'city'],
          columns: ['type', 'sub_type'],
          values: ['number']
        },
        meta: [
          { field: 'number', name: '数量' },
          { field: 'province', name: '省份' },
          { field: 'city', name: '城市' },
          { field: 'type', name: '类别' },
          { field: 'sub_type', name: '子类别' },
        ],
      },
      themeCfg: {},
    })
  }
]

export const contributes = {
  views: {
    'widgets': [
      { id: 'widgets.echarts', name: true, icon: true, iconClass: 'my4', is: ['widgets', { list: widgets }] }
    ],
  }
}