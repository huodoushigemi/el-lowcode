export default {
  id: 'echarts-demo',
  title: 'Echarts Demo',
  schema: () => ({
    "is": "Page",
    "children": [
      {
        "is": "h1",
        "children": "线性图",
        "_id": "f62f2295-6db2-405f-98ad-64bf103b4c97"
      },
      {
        "is": "Grid",
        "cols": 3,
        "children": [
          {
            "is": "div",
            "children": [
              {
                "is": "p",
                "children": "基础线性图",
                "_id": "5ca2603c-c38e-48f5-9fd3-540ab7b2c27f"
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
                    "source": "{{state.data1}}"
                  },
                  "legend": {
                    "show": false
                  },
                  "xAxis": {},
                  "yAxis": {},
                  "tooltip": {
                    "show": true,
                    "trigger": "axis"
                  },
                  "toolbox": {},
                  "series": [
                    {
                      "type": "line",
                      "label": {
                        "show": true
                      },
                      "name": "data",
                      "$key": "y"
                    }
                  ],
                  "grid": {},
                  "backgroundColor": "#000"
                },
                "_id": "9b1f8926-b590-446a-aef0-84d617d0f53f",
                "theme": "dark",
                "initOptions": {
                  "renderer": "svg"
                },
                "category": "x"
              }
            ],
            "_id": "0cb41d08-1975-479f-a1c4-1b06c577ebb0"
          },
          {
            "is": "div",
            "children": [
              {
                "is": "p",
                "children": "面积图",
                "_id": "1da43644-e046-4c6c-80db-e177f7994ab0"
              },
              {
                "is": "ELine",
                "autoresize": true,
                "style": {
                  "height": "300px",
                  "width": "100%",
                  "marginLeft": "0px",
                  "marginTop": "0px"
                },
                "option": {
                  "dataset": {
                    "source": "{{state.data1}}"
                  },
                  "legend": {
                    "show": false
                  },
                  "xAxis": {},
                  "yAxis": {
                    "axisLine": {
                      "show": false
                    }
                  },
                  "tooltip": {
                    "show": true,
                    "trigger": "axis"
                  },
                  "toolbox": {
                    "show": false,
                    "feature": {
                      "dataZoom": {
                        "show": false
                      },
                      "saveAsImage": {}
                    }
                  },
                  "series": [
                    {
                      "type": "line",
                      "label": {
                        "show": true
                      },
                      "areaStyle": {},
                      "name": "data",
                      "smooth": false
                    }
                  ],
                  "grid": {},
                  "backgroundColor": "#000"
                },
                "_id": "459b38de-9d6a-4d40-80b2-26afe16e875b",
                "theme": "dark",
                "initOptions": {
                  "renderer": "svg"
                },
                "category": "x"
              }
            ],
            "_id": "6898a053-8778-4d42-a6c0-be1d87b24b71"
          },
          {
            "is": "div",
            "children": [
              {
                "is": "p",
                "children": "堆叠面积图",
                "_id": "fbb74d41-6bdc-4bed-b211-7fca296d8ddd"
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
                    "source": "{{state.data3}}"
                  },
                  "legend": {},
                  "xAxis": {
                    "boundaryGap": false,
                    "name": "xxxx",
                    "axisTick": {},
                    "splitLine": {},
                    "axisLabel": {},
                    "axisLine": {
                      "lineStyle": {}
                    }
                  },
                  "yAxis": {
                    "splitLine": {}
                  },
                  "tooltip": {
                    "show": true,
                    "trigger": "axis",
                    "axisPointer": {}
                  },
                  "toolbox": {
                    "feature": {
                      "saveAsImage": {},
                      "dataZoom": {
                        "show": false
                      }
                    },
                    "show": false
                  },
                  "series": [
                    {
                      "type": "line",
                      "name": "Line 1",
                      "symbol": "none",
                      "areaStyle": {
                        "color": "rgba(1, 191, 236, 1)"
                      },
                      "smooth": true,
                      "lineStyle": {
                        "width": 0
                      },
                      "stack": "total",
                      "$key": "data1"
                    },
                    {
                      "type": "line",
                      "name": "Line 2",
                      "symbol": "none",
                      "stack": "total",
                      "smooth": true,
                      "areaStyle": {
                        "color": "rgba(77, 119, 255, 1)"
                      },
                      "lineStyle": {
                        "width": 0
                      },
                      "$key": "data2"
                    },
                    {
                      "type": "line",
                      "name": "Line 3",
                      "areaStyle": {
                        "color": "rgba(116, 21, 219, 1)"
                      },
                      "lineStyle": {
                        "width": 0
                      },
                      "symbol": "none",
                      "stack": "total",
                      "smooth": true,
                      "$key": "data3"
                    },
                    {
                      "type": "line",
                      "name": "Line 4",
                      "areaStyle": {
                        "color": "rgba(135, 0, 157, 1)"
                      },
                      "lineStyle": {
                        "width": 0
                      },
                      "symbol": "none",
                      "stack": "total",
                      "smooth": true,
                      "$key": "data4"
                    },
                    {
                      "type": "line",
                      "name": "Line 5",
                      "areaStyle": {
                        "color": "rgba(224, 62, 76, 1)"
                      },
                      "lineStyle": {
                        "width": 0
                      },
                      "symbol": "none",
                      "stack": "total",
                      "smooth": true,
                      "$key": "data5"
                    }
                  ],
                  "grid": {},
                  "backgroundColor": "#000"
                },
                "_id": "f68c8eab-897d-405c-bc0b-bbbe102370dc",
                "theme": "dark",
                "id": "",
                "initOptions": {
                  "renderer": "svg"
                },
                "category": "day"
              }
            ],
            "_id": "0bf53689-e3b4-4da7-be6a-bdf463aa2fd8"
          },
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
                  "xAxis": {
                    "axisLabel": {}
                  },
                  "yAxis": {},
                  "tooltip": {
                    "show": false,
                    "trigger": "axis"
                  },
                  "toolbox": {},
                  "series": [
                    {
                      "type": "line",
                      "name": "Step Start",
                      "step": "start",
                      "smooth": false,
                      "lineStyle": {},
                      "$key": "2015"
                    },
                    {
                      "type": "line",
                      "name": "Step Mid",
                      "step": "middle",
                      "$key": "2016"
                    },
                    {
                      "type": "line",
                      "name": "Step End",
                      "step": "end",
                      "smooth": false,
                      "$key": "2017"
                    }
                  ],
                  "grid": {},
                  "backgroundColor": "#000",
                  "legend": {
                    "show": false
                  }
                },
                "_id": "b0c1c5b7-4604-4b67-87f2-5a868210ef6d",
                "theme": "dark",
                "initOptions": {
                  "renderer": "svg"
                },
                "category": "product"
              }
            ],
            "_id": "d10de957-df9f-45f9-a221-a53240610a14"
          },
          {
            "is": "div",
            "children": [
              {
                "is": "p",
                "children": "垂直折线图",
                "_id": "72109e44-4105-40af-bbf6-453850b17977"
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
                    "source": "{{{\r\n  altitude: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],\r\n  temperature: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5],\r\n}}}"
                  },
                  "legend": {},
                  "xAxis": {
                    "axisLabel": {
                      "formatter": "{value} °C"
                    },
                    "axisLine": {},
                    "axisTick": {},
                    "splitLine": {}
                  },
                  "yAxis": {
                    "axisLabel": {
                      "formatter": "{value} km"
                    },
                    "boundaryGap": false,
                    "axisLine": {
                      "onZero": false
                    },
                    "axisTick": {},
                    "splitLine": {}
                  },
                  "tooltip": {
                    "show": true,
                    "trigger": "axis"
                  },
                  "toolbox": {},
                  "series": [
                    {
                      "type": "line",
                      "label": {},
                      "name": "Altitude (km) vs. temperature (°C)",
                      "smooth": true,
                      "lineStyle": {},
                      "$key": "temperature"
                    }
                  ],
                  "grid": {
                    "bottom": 30,
                    "left": 55,
                    "right": 20,
                    "top": 31
                  },
                  "backgroundColor": "#000"
                },
                "_id": "c89db968-e27d-455e-b5cd-ff12b08f55fe",
                "theme": "dark",
                "initOptions": {
                  "renderer": ""
                },
                "vertical": true,
                "category": "altitude"
              }
            ],
            "_id": "fb8e308b-5f62-4c97-8b78-caaf7b446408"
          }
        ],
        "_id": "8554ec2a-2d9f-450b-acce-5dea7a63b6cd",
        "gap": [
          null,
          32
        ]
      }
    ],
    "state": {
      "count": 0,
      "data1": [
        {
          "x": "Mon",
          "y": 150
        },
        {
          "x": "Tue",
          "y": 230
        },
        {
          "x": "Wed",
          "y": 224
        },
        {
          "x": "Thu",
          "y": 218
        },
        {
          "x": "Fri",
          "y": 135
        },
        {
          "x": "Sat",
          "y": 147
        },
        {
          "x": "Sun",
          "y": 260
        }
      ],
      "data2": [
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
        }
      ],
      "data3": [
        {
          "day": "Mon",
          "data1": 140,
          "data2": 120,
          "data3": 320,
          "data4": 220,
          "data5": 220
        },
        {
          "day": "Tue",
          "data1": 232,
          "data2": 282,
          "data3": 132,
          "data4": 402,
          "data5": 302
        },
        {
          "day": "Wed",
          "data1": 101,
          "data2": 111,
          "data3": 201,
          "data4": 231,
          "data5": 181
        },
        {
          "day": "Thu",
          "data1": 264,
          "data2": 234,
          "data3": 334,
          "data4": 134,
          "data5": 234
        },
        {
          "day": "Fri",
          "data1": 90,
          "data2": 220,
          "data3": 190,
          "data4": 190,
          "data5": 210
        },
        {
          "day": "Sat",
          "data1": 340,
          "data2": 340,
          "data3": 130,
          "data4": 230,
          "data5": 290
        },
        {
          "day": "Sun",
          "data1": 250,
          "data2": 310,
          "data3": 220,
          "data4": 120,
          "data5": 150
        }
      ]
    },
    "_id": "7403c48a-0611-4a38-8aee-4884eddac613",
    "plugins": [
      "/el-lowcode/designer/packages/designer/plugins/echarts"
    ],
    "designer": {
      "canvas": {
        "style": {
          "height": "1920px",
          "width": "1360px"
        },
        "x": 193.62696280759832,
        "y": 52.98971875977878,
        "zoom": 1.0483144860821818
      }
    },
    "style": {
      "paddingRight": "32px",
      "paddingLeft": "32px"
    }
  }),
}
