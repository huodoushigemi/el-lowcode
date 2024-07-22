export default {
  id: 'echarts-demo',
  title: 'Echarts Demo',
  schema: () => ({
    "is": "Page",
    "children": [
      {
        "is": "Grid",
        "cols": 3,
        "children": [
          {
            "is": "div",
            "children": [
              {
                "is": "p",
                "children": "阶梯折线图",
                "_id": "7fae98fb-a5cc-4a10-ae9f-6411d512b8fd"
              },
              {
                "is": "ELine",
                "autoresize": true,
                "style": {
                  "height": "300px",
                  "width": "100%"
                },
                "option": {
                  "dataset": {
                    "source": "{{[\n  { product: 'Latte', 2015: 23.3, 2016: 45.8, 2017: 93.7 },\n  { product: 'Milk', 2015: 33.1, 2016: 63.4, 2017: 85.1 },\n  { product: 'Cheese', 2015: 26.4, 2016: 55.2, 2017: 92.5 },\n  { product: 'Walnut Brownie', 2015: 42.4, 2016: 63.9, 2017: 109.1 }\n]}}"
                  },
                  "legend": {},
                  "xAxis": {
                    "axisLabel": {}
                  },
                  "yAxis": {},
                  "tooltip": {
                    "show": true,
                    "trigger": "axis"
                  },
                  "toolbox": {},
                  "series": [
                    {
                      "type": "line",
                      "name": "Step Start",
                      "encode": {
                        "x": "product",
                        "y": "2015"
                      },
                      "step": "start"
                    },
                    {
                      "type": "line",
                      "name": "Step Mid",
                      "step": "middle",
                      "encode": {
                        "x": "product",
                        "y": "2016"
                      }
                    },
                    {
                      "type": "line",
                      "name": "Step End",
                      "encode": {
                        "x": "product",
                        "y": "2017"
                      },
                      "step": "end"
                    }
                  ],
                  "grid": {},
                  "backgroundColor": "#000"
                },
                "_id": "b0c1c5b7-4604-4b67-87f2-5a868210ef6d",
                "theme": "dark"
              }
            ],
            "_id": "d10de957-df9f-45f9-a221-a53240610a14"
          }
        ],
        "_id": "8554ec2a-2d9f-450b-acce-5dea7a63b6cd",
        "gap": [
          0,
          32
        ]
      }
    ],
    "state": {
      "count": 0,
      "data": [
        {
          "2023": 400.9873,
          "2024": 272.1358,
          "month": 1
        },
        {
          "2023": 319.5663,
          "2024": 221.9202,
          "month": 2
        },
        {
          "2023": 272.1169,
          "2024": 190.7839,
          "month": 3
        },
        {
          "2023": 294.341,
          "2024": 208.4785,
          "month": 4
        },
        {
          "2023": 295.0105,
          "2024": 225.2215,
          "month": 5
        },
        {
          "2023": 349.9293,
          "2024": 243.2626,
          "month": 6
        },
        {
          "2023": 342.9027,
          "2024": 256.3479,
          "month": 7
        },
        {
          "2023": 0,
          "2024": 267.6072,
          "month": 8
        },
        {
          "2023": 0,
          "2024": 289.7656,
          "month": 9
        },
        {
          "2023": 0,
          "2024": 322.7761,
          "month": 10
        },
        {
          "2023": 0,
          "2024": 347.9579,
          "month": 11
        },
        {
          "2023": 0,
          "2024": 353.049,
          "month": 12
        }
      ]
    },
    "_id": "7403c48a-0611-4a38-8aee-4884eddac613",
    "plugins": [
      "/el-lowcode/designer/packages/designer/plugins/web",
      "/el-lowcode/designer/packages/designer/plugins/echarts"
    ],
    "designer": {
      "canvas": {
        "x": -140.80697848891145,
        "y": -69.71168446962633,
        "zoom": 0.9078604966322299,
        "style": {}
      }
    },
    "style": {
      "paddingRight": "32px",
      "paddingLeft": "32px"
    }
  }),
}
