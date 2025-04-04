export default [
  {
    id: 'echarts-bar.0',
    category: '柱状图',
    schema: () => ({
      is: 'e-bar',
      autoresize: true,
      style: { width: '400px', height: '300px' },
      option: {
        grid: { top: 32, right: 16, bottom: 32 },
        legend: { show: false },
        xAxis: [{}],
        yAxis: [{}],
        tooltip: { show: false, trigger: 'axis' },
        toolbox: {},
        dataset: {
          source: [
            { x: 'Mon', y: 150 },
            { x: 'Tue', y: 230 },
            { x: 'Wed', y: 224 },
            { x: 'Thu', y: 218 },
            { x: 'Fri', y: 135 },
            { x: 'Sat', y: 147 },
            { x: 'Sun', y: 260 },
          ],
        },
        series: [{ label: { show: true }, name: 'data', backgroundStyle: {}, $key: 'y', type: 'bar' }],
        backgroundColor: '#000',
      },
      theme: 'dark',
      initOptions: { renderer: 'svg' },
      category: 'x',
    }),
  },

  {
    id: 'echarts-bar.multi',
    category: '柱状图',
    schema: () => ({
      is: 'e-bar',
      autoresize: true,
      style: { width: '400px', height: '300px' },
      option: {
        grid: { left: 70, right: 20, bottom: 32 },
        legend: { top: 'top' },
        xAxis: [{}],
        yAxis: [{}],
        tooltip: { trigger: 'axis', axisPointer: {} },
        toolbox: { show: false },
        dataset: {
          source: [
            { country: 'Brazil', 2011: 18203, 2012: 19325 },
            { country: 'Indonesia', 2011: 23489, 2012: 23438 },
            { country: 'USA', 2011: 29034, 2012: 29034 },
            { country: 'India', 2011: 104970, 2012: 121594 },
            { country: 'China', 2011: 131744, 2012: 134141 },
            { country: 'World', 2011: 630230, 2012: 681807 },
          ],
        },
        series: [
          { label: {}, name: '2011', $key: '2011', type: 'bar' },
          { name: '2012', $key: '2012', type: 'bar' },
        ],
        backgroundColor: '#000',
      },
      vertical: true,
      theme: 'dark',
      initOptions: { renderer: 'svg' },
      category: 'country',
    }),
  },

  {
    id: 'echarts-bar.stack',
    category: '柱状图',
    schema: () => ({
      is: 'e-bar',
      autoresize: true,
      style: { width: '400px', height: '300px' },
      option: {
        grid: { left: 50, right: 16, bottom: 32 },
        legend: {},
        xAxis: [{}],
        yAxis: [{}],
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        toolbox: { show: false },
        dataset: {
          source: [
            ['product', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            ['Direct', 320, 332, 301, 334, 390, 330, 320],
            ['Email', 120, 132, 101, 134, 90, 230, 210],
            ['Union Ads', 220, 182, 191, 234, 290, 330, 310],
            ['Video Ads', 150, 232, 201, 154, 190, 330, 410],
            ['Baidu', 620, 732, 701, 734, 1090, 1130, 1120],
            ['Google', 120, 132, 101, 134, 290, 230, 220],
            ['Bing', 60, 72, 71, 74, 190, 130, 110],
            ['Others', 62, 82, 91, 84, 109, 110, 120],
          ],
        },
        series: [
          { label: {}, name: 'Direct', stack: '', $key: 'Direct', type: 'bar' },
          { type: 'bar', name: 'Email', stack: 'Ad', $key: 'Email' },
          { type: 'bar', name: 'Union Ads', stack: 'Ad', $key: 'Union Ads' },
          { type: 'bar', name: 'Video Ads', stack: 'Ad', $key: 'Video Ads' },
          { type: 'bar', name: 'Baidu', stack: 'Search Engine', barWidth: 5, $key: 'Baidu' },
          { type: 'bar', name: 'Google', stack: 'Search Engine', $key: 'Google' },
          { type: 'bar', name: 'Bing', stack: 'Search Engine', $key: 'Bing' },
          { type: 'bar', name: 'Others', stack: 'Search Engine', $key: 'Others' },
        ],
        backgroundColor: '#000',
      },
      theme: 'dark',
      initOptions: { renderer: 'svg' },
    }),
  },
]
