export default [
  {
    id: 'echarts-line.0',
    category: '折线图',
    schema: () => ({
      is: 'e-line',
      autoresize: true,
      style: { width: '400px', height: '300px' },
      option: {
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
        grid: { top: 32, bottom: 32, right: 16 },
        legend: { show: false },
        xAxis: [{}],
        yAxis: [{}],
        tooltip: { show: true, trigger: 'axis' },
        toolbox: {},
        series: [{ type: 'line', label: { show: true }, name: 'data', $key: 'y' }],
        backgroundColor: '#000',
      },
      theme: 'dark',
      initOptions: { renderer: 'svg' },
      category: 'x',
    }),
  },

  {
    id: 'echarts-line.1',
    category: '折线图',
    keywords: ['卡片'],
    schema: () => ({
      is: 'e-line',
      autoresize: true,
      style: { width: '400px', height: '300px' },
      option: {
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
        grid: { top: 32, bottom: 32, right: 16 },
        legend: { show: false },
        xAxis: [{}],
        yAxis: [{}],
        tooltip: { show: true, trigger: 'axis' },
        toolbox: {},
        series: [{ type: 'line', label: { show: true }, areaStyle: {}, name: 'data', $key: 'y' }],
        backgroundColor: '#000',
      },
      theme: 'dark',
      initOptions: { renderer: 'svg' },
      category: 'x',
    }),
  },

  {
    id: 'echarts-line.2',
    category: '折线图',
    schema: () => ({
      is: 'e-line',
      autoresize: true,
      style: { width: '400px', height: '300px' },
      option: {
        dataset: {
          source: [
            { day: 'Mon', data1: 140, data2: 120, data3: 320, data4: 220, data5: 220 },
            { day: 'Tue', data1: 232, data2: 282, data3: 132, data4: 402, data5: 302 },
            { day: 'Wed', data1: 101, data2: 111, data3: 201, data4: 231, data5: 181 },
            { day: 'Thu', data1: 264, data2: 234, data3: 334, data4: 134, data5: 234 },
            { day: 'Fri', data1: 90, data2: 220, data3: 190, data4: 190, data5: 210 },
            { day: 'Sat', data1: 340, data2: 340, data3: 130, data4: 230, data5: 290 },
            { day: 'Sun', data1: 250, data2: 310, data3: 220, data4: 120, data5: 150 },
          ],
        },
        legend: {},
        xAxis: [{ boundaryGap: false, name: 'xxxx', axisTick: {}, splitLine: {}, axisLabel: {}, axisLine: { lineStyle: {} } }],
        yAxis: [{ splitLine: {} }],
        tooltip: { show: true, trigger: 'axis', axisPointer: {} },
        toolbox: { feature: { saveAsImage: {}, dataZoom: { show: false } }, show: false },
        series: [
          { type: 'line', name: 'Line 1', symbol: 'none', areaStyle: { color: 'rgba(1, 191, 236, 1)' }, smooth: true, lineStyle: { width: 0 }, stack: 'total', $key: 'data1' },
          { type: 'line', name: 'Line 2', symbol: 'none', stack: 'total', smooth: true, areaStyle: { color: 'rgba(77, 119, 255, 1)' }, lineStyle: { width: 0 }, $key: 'data2' },
          { type: 'line', name: 'Line 3', areaStyle: { color: 'rgba(116, 21, 219, 1)' }, lineStyle: { width: 0 }, symbol: 'none', stack: 'total', smooth: true, $key: 'data3' },
          { type: 'line', name: 'Line 4', areaStyle: { color: 'rgba(135, 0, 157, 1)' }, lineStyle: { width: 0 }, symbol: 'none', stack: 'total', smooth: true, $key: 'data4' },
          { type: 'line', name: 'Line 5', areaStyle: { color: 'rgba(224, 62, 76, 1)' }, lineStyle: { width: 0 }, symbol: 'none', stack: 'total', smooth: true, $key: 'data5' },
        ],
        grid: { bottom: 32 },
        backgroundColor: '#000',
      },
      theme: 'dark',
      initOptions: { renderer: 'svg' },
      category: 'x',
    }),
  },

  {
    id: 'echarts-line.3',
    category: '折线图',
    schema: () => ({
      is: 'e-line',
      autoresize: true,
      style: { width: '400px', height: '300px' },
      option: {
        dataset: {
          source: [
            { product: 'Latte', 2015: 23.3, 2016: 45.8, 2017: 93.7 },
            { product: 'Milk', 2015: 33.1, 2016: 63.4, 2017: 85.1 },
            { product: 'Cheese', 2015: 26.4, 2016: 55.2, 2017: 92.5 },
            { product: 'Walnut', 2015: 42.4, 2016: 63.9, 2017: 109.1 }
          ]
        },
        grid: { right: 16, bottom: 32 },
        xAxis: [{ axisLabel: {} }],
        yAxis: [{}],
        tooltip: { show: false, trigger: 'axis' },
        toolbox: {},
        series: [
          { type: 'line', name: 'Step Start', step: 'start', smooth: false, lineStyle: {}, $key: '2015' },
          { type: 'line', name: 'Step Mid', step: 'middle', $key: '2016' },
          { type: 'line', name: 'Step End', step: 'end', smooth: false, $key: '2017' },
        ],
        grid: { right: 16, bottom: 32 },
        backgroundColor: '#000',
        legend: { show: true },
      },
      theme: 'dark',
      initOptions: { renderer: 'svg' },
      category: 'product',
    }),
  },

  {
    id: 'echarts-line.4',
    category: '折线图',
    schema: () => ({
      is: 'e-line',
      autoresize: true,
      style: { width: '400px', height: '300px' },
      option: {
        dataset: {
          source: [
            ['altitude', 0, 10, 20, 30, 40, 50, 60, 70, 80],
            ['temperature', 15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5],
          ],
        },
        legend: {},
        xAxis: [{ axisLabel: { formatter: '{value} km' }, axisLine: {}, axisTick: {}, splitLine: {} }],
        yAxis: [{ axisLabel: {}, boundaryGap: false, axisLine: { onZero: false }, axisTick: {}, splitLine: {} }],
        tooltip: { show: true, trigger: 'axis' },
        toolbox: {},
        series: [
          { type: 'line', label: {}, name: 'Altitude (km) vs. temperature (°C)', smooth: true, lineStyle: {}, $key: 'temperature' },
        ],
        grid: { bottom: 32, left: 55, right: 20, top: 31 },
        backgroundColor: '#000',
      },
      vertical: true,
      seriesLayoutBy: 'row',
      theme: 'dark',
      initOptions: { renderer: 'svg' },
    }),
  },
]
