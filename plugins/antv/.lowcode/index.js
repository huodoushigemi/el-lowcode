import { toArr } from '@el-lowcode/utils'

export const widgets = [
  {
    is: 'antv-pivot-sheet',
    label: '交叉表',
    category: '表格',
    props: (props, ctx) => {
      const node = ctx.keyedCtx[props._id]
      const ks = Object.keys(node?.$data.dataCfg.data?.[0] || {})
      
      return [
        { lp: ['数据', 'dataCfg.data'], script: true },
        { lp: ['行维度', 'dataCfg.fields.rows'], options: ks, el: { multiple: true } },
        { lp: ['列维度', 'dataCfg.fields.columns'], options: ks, el: { multiple: true } },
        { lp: ['指标', 'dataCfg.fields.values'], options: ks, set: v => toArr(v), get: v => v?.[0] },
        { lp: ['主题', 'themeCfg.name'], options: [['—', void 0], 'colorful', 'gray', 'dark'], el: { class: 'wfull' } },
        { lp: ['', 'brandColor'], type: 'color-picker', el: { colorFormat: 'hex' } }
      ]
    },
    defaultProps: () => ({
      style: { height: '338px' },
      options: {},
      dataCfg: {
        data: `{{[\n  { "number": 7789, "province": "浙江省", "city": "杭州市", "type": "家具", "sub_type": "桌子" },\n  { "number": 2367, "province": "浙江省", "city": "绍兴市", "type": "家具", "sub_type": "桌子" },\n  { "number": 3877, "province": "浙江省", "city": "宁波市", "type": "家具", "sub_type": "桌子" },\n  { "number": 4342, "province": "浙江省", "city": "舟山市", "type": "家具", "sub_type": "桌子" },\n  { "number": 5343, "province": "浙江省", "city": "杭州市", "type": "家具", "sub_type": "沙发" },\n  { "number": 632, "province": "浙江省", "city": "绍兴市", "type": "家具", "sub_type": "沙发" },\n  { "number": 7234, "province": "浙江省", "city": "宁波市", "type": "家具", "sub_type": "沙发" },\n  { "number": 834, "province": "浙江省", "city": "舟山市", "type": "家具", "sub_type": "沙发" },\n  { "number": 945, "province": "浙江省", "city": "杭州市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 1304, "province": "浙江省", "city": "绍兴市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 1145, "province": "浙江省", "city": "宁波市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 1432, "province": "浙江省", "city": "舟山市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 1343, "province": "浙江省", "city": "杭州市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 1354, "province": "浙江省", "city": "绍兴市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 1523, "province": "浙江省", "city": "宁波市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 1634, "province": "浙江省", "city": "舟山市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 1723, "province": "四川省", "city": "成都市", "type": "家具", "sub_type": "桌子" },\n  { "number": 1822, "province": "四川省", "city": "绵阳市", "type": "家具", "sub_type": "桌子" },\n  { "number": 1943, "province": "四川省", "city": "南充市", "type": "家具", "sub_type": "桌子" },\n  { "number": 2330, "province": "四川省", "city": "乐山市", "type": "家具", "sub_type": "桌子" },\n  { "number": 2451, "province": "四川省", "city": "成都市", "type": "家具", "sub_type": "沙发" },\n  { "number": 2244, "province": "四川省", "city": "绵阳市", "type": "家具", "sub_type": "沙发" },\n  { "number": 2333, "province": "四川省", "city": "南充市", "type": "家具", "sub_type": "沙发" },\n  { "number": 2445, "province": "四川省", "city": "乐山市", "type": "家具", "sub_type": "沙发" },\n  { "number": 2335, "province": "四川省", "city": "成都市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 245, "province": "四川省", "city": "绵阳市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 2457, "province": "四川省", "city": "南充市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 2458, "province": "四川省", "city": "乐山市", "type": "办公用品", "sub_type": "笔" },\n  { "number": 4004, "province": "四川省", "city": "成都市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 3077, "province": "四川省", "city": "绵阳市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 3551, "province": "四川省", "city": "南充市", "type": "办公用品", "sub_type": "纸张" },\n  { "number": 352, "province": "四川省", "city": "乐山市", "type": "办公用品", "sub_type": "纸张" }\n]\n}}`,
        fields: {
          rows: ['province', 'city'],
          columns: ['type', 'sub_type'],
          values: ['number'],
          valueInCols: true,
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