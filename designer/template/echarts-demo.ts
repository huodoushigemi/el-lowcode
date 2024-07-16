export default {
  id: 'echarts-demo',
  title: 'Echarts Demo',
  schema: () => ({
    is: 'Page',
    children: [
      {
        is: 'h1',
        children: '线性图',
        _id: 'f62f2295-6db2-405f-98ad-64bf103b4c97',
      },
      {
        is: 'Grid',
        cols: '3',
        children: [
          {
            is: 'div',
            children: [
              {
                is: 'p',
                children: '基础线性图',
                _id: '5ca2603c-c38e-48f5-9fd3-540ab7b2c27f',
              },
              {
                is: 'ELine',
                data: '{{[\n {\n  "x": "Mon",\n  "y": 150\n },\n {\n  "x": "Tue",\n  "y": 230\n },\n {\n  "x": "Wed",\n  "y": 224\n },\n {\n  "x": "Thu",\n  "y": 218\n },\n {\n  "x": "Fri",\n  "y": 135\n },\n {\n  "x": "Sat",\n  "y": 147\n },\n {\n  "x": "Sun",\n  "y": 260\n }\n]}}',
                fields: "{{{ x: 'x', y: 'y' }}}",
                autoresize: true,
                style: {
                  height: '300px',
                  width: '100%',
                },
                option: {
                  legend: {},
                  xAxis: {},
                  yAxis: {},
                  tooltip: {
                    show: true,
                    trigger: 'axis',
                  },
                  toolbox: {},
                  series: [
                    {
                      label: {
                        show: true,
                      },
                    },
                  ],
                  grid: {},
                  backgroundColor: '#000',
                },
                _id: '9b1f8926-b590-446a-aef0-84d617d0f53f',
                theme: 'dark',
              },
            ],
            _id: '0cb41d08-1975-479f-a1c4-1b06c577ebb0',
          },
          {
            is: 'div',
            children: [
              {
                is: 'p',
                children: '面积图 / 平滑线',
                _id: '1da43644-e046-4c6c-80db-e177f7994ab0',
              },
              {
                is: 'ELine',
                data: '{{[\n {\n  "x": "Mon",\n  "y": 150\n },\n {\n  "x": "Tue",\n  "y": 230\n },\n {\n  "x": "Wed",\n  "y": 224\n },\n {\n  "x": "Thu",\n  "y": 218\n },\n {\n  "x": "Fri",\n  "y": 135\n },\n {\n  "x": "Sat",\n  "y": 147\n },\n {\n  "x": "Sun",\n  "y": 260\n }\n]}}',
                fields: "{{{ x: 'x', y: 'y' }}}",
                autoresize: true,
                style: {
                  height: '300px',
                  width: '100%',
                },
                option: {
                  legend: {},
                  xAxis: {},
                  yAxis: {},
                  tooltip: {
                    show: true,
                    trigger: 'axis',
                  },
                  toolbox: {},
                  series: [
                    {
                      label: {
                        show: true,
                      },
                      areaStyle: {},
                    },
                  ],
                  grid: {},
                  backgroundColor: '#000',
                },
                _id: '459b38de-9d6a-4d40-80b2-26afe16e875b',
                theme: 'dark',
              },
            ],
            _id: '6898a053-8778-4d42-a6c0-be1d87b24b71',
          },
          {
            is: 'div',
            children: [
              {
                is: 'p',
                children: '基础线性图',
                _id: 'fbb74d41-6bdc-4bed-b211-7fca296d8ddd',
              },
              {
                is: 'ELine',
                data: '{{[\n {\n  "x": "Mon",\n  "y": 150\n },\n {\n  "x": "Tue",\n  "y": 230\n },\n {\n  "x": "Wed",\n  "y": 224\n },\n {\n  "x": "Thu",\n  "y": 218\n },\n {\n  "x": "Fri",\n  "y": 135\n },\n {\n  "x": "Sat",\n  "y": 147\n },\n {\n  "x": "Sun",\n  "y": 260\n }\n]}}',
                fields: "{{{ x: 'x', y: 'y' }}}",
                autoresize: true,
                style: {
                  height: '300px',
                  width: '100%',
                },
                option: {
                  legend: {},
                  xAxis: {},
                  yAxis: {},
                  tooltip: {
                    show: true,
                    trigger: 'axis',
                  },
                  toolbox: {},
                  series: [
                    {
                      label: {
                        show: true,
                      },
                    },
                  ],
                  grid: {},
                  backgroundColor: '#000',
                },
                _id: 'f68c8eab-897d-405c-bc0b-bbbe102370dc',
                theme: 'dark',
              },
            ],
            _id: '0bf53689-e3b4-4da7-be6a-bdf463aa2fd8',
          },
        ],
        _id: '8554ec2a-2d9f-450b-acce-5dea7a63b6cd',
        gap: 32,
      },
    ],
    state: {
      count: 0,
    },
    _id: '7403c48a-0611-4a38-8aee-4884eddac613',
    plugins: ['/el-lowcode/designer/packages/designer/plugins/echarts'],
    designer: {
      canvas: {
        x: -136.6496615045305,
        y: -124.94599919375173,
        zoom: 0.7910531726580184,
      },
    },
    style: {
      paddingRight: '32px',
      paddingLeft: '32px',
    },
  }),
}
