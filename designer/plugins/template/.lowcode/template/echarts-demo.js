export default {
  id: 'echarts-demo',
  title: 'Echarts Demo',
  schema: {
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
                "children": "垂直折线图（Y轴为类目轴）",
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
                    "axisLabel": {},
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
                  "renderer": "svg"
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
      },
      {
        "is": "h1",
        "children": "柱状图",
        "_id": "9e4aff78-3b26-4a8f-ae97-e9e9ce9b2d2b"
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
                "children": "基础柱状图",
                "_id": "ef7d963e-25ea-409e-9a4a-3ffadcb6d7c9"
              },
              {
                "is": "EBar",
                "autoresize": true,
                "style": {
                  "height": "300px",
                  "width": "100%"
                },
                "option": {
                  "legend": {
                    "show": false
                  },
                  "xAxis": {},
                  "yAxis": {},
                  "tooltip": {
                    "show": false,
                    "trigger": "axis"
                  },
                  "toolbox": {},
                  "dataset": {
                    "source": "{{[\n {\n  \"x\": \"Mon\",\n  \"y\": 150\n },\n {\n  \"x\": \"Tue\",\n  \"y\": 230\n },\n {\n  \"x\": \"Wed\",\n  \"y\": 224\n },\n {\n  \"x\": \"Thu\",\n  \"y\": 218\n },\n {\n  \"x\": \"Fri\",\n  \"y\": 135\n },\n {\n  \"x\": \"Sat\",\n  \"y\": 147\n },\n {\n  \"x\": \"Sun\",\n  \"y\": 260\n }\n]}}"
                  },
                  "series": [
                    {
                      "label": {
                        "show": true
                      },
                      "name": "data",
                      "backgroundStyle": {},
                      "$key": "y"
                    }
                  ],
                  "backgroundColor": "#000"
                },
                "_id": "acc633ac-2450-470e-b86a-346caecb34eb",
                "theme": "dark",
                "category": "x",
                "initOptions": {
                  "renderer": "svg"
                }
              }
            ],
            "_id": "3a406434-2d05-461a-bfb8-f1be06b2a94b"
          },
          {
            "is": "div",
            "children": [
              {
                "is": "p",
                "children": "条形图（世界人口总量 ）",
                "_id": "18be708a-c9fd-44fb-915c-965fe1baa439"
              },
              {
                "is": "EBar",
                "autoresize": true,
                "style": {
                  "height": "300px",
                  "width": "100%"
                },
                "option": {
                  "legend": {
                    "top": "top"
                  },
                  "xAxis": {},
                  "yAxis": {},
                  "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {}
                  },
                  "toolbox": {
                    "show": false
                  },
                  "dataset": {
                    "source": "{{[\n  { country: 'Brazil', 2011: 18203, 2012: 19325 },\n  { country: 'Indonesia', 2011: 23489, 2012: 23438 },\n  { country: 'USA', 2011: 29034, 2012: 29034 },\n  { country: 'India', 2011: 104970, 2012: 121594 },\n  { country: 'China', 2011: 131744, 2012: 134141 },\n  { country: 'World', 2011: 630230, 2012: 681807 },\n]}}"
                  },
                  "series": [
                    {
                      "label": {},
                      "name": "2011",
                      "$key": "2011"
                    },
                    {
                      "name": "2012",
                      "$key": "2012"
                    }
                  ],
                  "backgroundColor": "#000",
                  "grid": {
                    "left": 70
                  }
                },
                "_id": "1e2830a3-2119-4874-a69a-f539f40f0579",
                "theme": "dark",
                "category": "country",
                "vertical": true,
                "initOptions": {
                  "renderer": "svg"
                }
              }
            ],
            "_id": "14246540-77d9-459b-8b78-106b1b58235f"
          },
          {
            "is": "div",
            "children": [
              {
                "is": "p",
                "children": "渐变色",
                "_id": "9fe52591-41be-470d-9ea7-e205808e8257"
              },
              {
                "is": "EBar",
                "autoresize": true,
                "style": {
                  "height": "300px",
                  "width": "100%"
                },
                "option": {
                  "legend": {
                    "show": false
                  },
                  "xAxis": {},
                  "yAxis": {},
                  "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                      "type": "shadow"
                    }
                  },
                  "toolbox": {
                    "show": false
                  },
                  "dataset": {
                    "source": "{{[\n {\n  \"x\": \"Mon\",\n  \"y\": 150\n },\n {\n  \"x\": \"Tue\",\n  \"y\": 230\n },\n {\n  \"x\": \"Wed\",\n  \"y\": 224\n },\n {\n  \"x\": \"Thu\",\n  \"y\": 218\n },\n {\n  \"x\": \"Fri\",\n  \"y\": 135\n },\n {\n  \"x\": \"Sat\",\n  \"y\": 147\n },\n {\n  \"x\": \"Sun\",\n  \"y\": 260\n }\n]}}"
                  },
                  "series": [
                    {
                      "label": {
                        "show": true
                      },
                      "name": "data"
                    }
                  ],
                  "backgroundColor": "#000"
                },
                "_id": "9e5d1699-4008-40e1-8de1-5b678fb389e7",
                "theme": "dark",
                "initOptions": {
                  "renderer": "svg"
                }
              }
            ],
            "_id": "a33feaa0-4670-4163-bde4-4204edb9fa76"
          },
          {
            "is": "div",
            "children": [
              {
                "is": "p",
                "children": "折柱混合",
                "_id": "ba70bf0b-b201-4276-a2c2-29193856bff9"
              },
              {
                "is": "EBar",
                "autoresize": true,
                "style": {
                  "height": "300px",
                  "width": "100%"
                },
                "option": {
                  "legend": {
                    "show": false
                  },
                  "xAxis": {},
                  "yAxis": {},
                  "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                      "type": "shadow"
                    }
                  },
                  "toolbox": {
                    "show": false
                  },
                  "dataset": {
                    "source": "{{[\n {\n  \"x\": \"Mon\",\n  \"y\": 150\n },\n {\n  \"x\": \"Tue\",\n  \"y\": 230\n },\n {\n  \"x\": \"Wed\",\n  \"y\": 224\n },\n {\n  \"x\": \"Thu\",\n  \"y\": 218\n },\n {\n  \"x\": \"Fri\",\n  \"y\": 135\n },\n {\n  \"x\": \"Sat\",\n  \"y\": 147\n },\n {\n  \"x\": \"Sun\",\n  \"y\": 260\n }\n]}}"
                  },
                  "series": [
                    {
                      "label": {
                        "show": true
                      },
                      "name": "data"
                    }
                  ],
                  "backgroundColor": "#000"
                },
                "_id": "34d27abd-26c6-43be-97e4-b56a3dcec054",
                "theme": "dark",
                "initOptions": {
                  "renderer": "svg"
                }
              }
            ],
            "_id": "25243478-5871-43de-b28e-8337d2b2e658"
          },
          {
            "is": "div",
            "children": [
              {
                "is": "p",
                "children": "堆叠柱状图",
                "_id": "d2b31d86-b554-4b45-9427-2acb8442b258"
              },
              {
                "is": "EBar",
                "autoresize": true,
                "style": {
                  "height": "300px",
                  "width": "100%"
                },
                "option": {
                  "legend": {},
                  "xAxis": {},
                  "yAxis": {},
                  "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                      "type": "shadow"
                    }
                  },
                  "toolbox": {
                    "show": false
                  },
                  "dataset": {
                    "source": "{{[\n  ['product', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],\n  ['Direct', 320, 332, 301, 334, 390, 330, 320],\n  ['Email', 120, 132, 101, 134, 90, 230, 210],\n  ['Union Ads', 220, 182, 191, 234, 290, 330, 310],\n  ['Video Ads', 150, 232, 201, 154, 190, 330, 410],\n  ['Baidu', 620, 732, 701, 734, 1090, 1130, 1120],\n  ['Google', 120, 132, 101, 134, 290, 230, 220],\n  ['Bing', 60, 72, 71, 74, 190, 130, 110],\n  ['Others', 62, 82, 91, 84, 109, 110, 120]\n]}}"
                  },
                  "series": [
                    {
                      "label": {},
                      "name": "Direct",
                      "stack": "",
                      "$key": "1"
                    },
                    {
                      "type": "bar",
                      "name": "Email",
                      "stack": "Ad",
                      "$key": "2"
                    },
                    {
                      "type": "bar",
                      "name": "Union Ads",
                      "stack": "Ad",
                      "$key": "3"
                    },
                    {
                      "type": "bar",
                      "name": "Video Ads",
                      "stack": "Ad",
                      "$key": "4"
                    },
                    {
                      "type": "bar",
                      "name": "Baidu",
                      "stack": "Search Engine",
                      "barWidth": 5,
                      "$key": "5"
                    },
                    {
                      "type": "bar",
                      "name": "Google",
                      "stack": "Search Engine",
                      "$key": "6"
                    },
                    {
                      "type": "bar",
                      "name": "Bing",
                      "stack": "Search Engine",
                      "$key": "7"
                    },
                    {
                      "type": "bar",
                      "name": "Others",
                      "stack": "Search Engine",
                      "$key": "8"
                    }
                  ],
                  "backgroundColor": "#000",
                  "grid": {
                    "bottom": 31,
                    "left": 45,
                    "right": 24
                  }
                },
                "_id": "325517b2-9925-4f67-886d-909827fd41fb",
                "theme": "dark",
                "seriesLayoutBy": "row",
                "initOptions": {
                  "renderer": "svg"
                }
              }
            ],
            "_id": "0b773241-2b51-4a79-af85-3f98a2560528"
          }
        ],
        "_id": "0bf685ff-f01c-4e39-87e0-436cb06be5ef",
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
      "/el-lowcode/designer/packages/designer/plugins/web",
      "/el-lowcode/designer/packages/designer/plugins/echarts"
    ],
    "designer": {
      "canvas": {
        "style": {
          "height": "1920px",
          "width": "1360px"
        },
        "x": -130.95591623692712,
        "y": -54.75997332920042,
        "zoom": 0.74597530293359
      }
    },
    "style": {
      "paddingRight": "32px",
      "paddingLeft": "32px"
    }
  },
}
