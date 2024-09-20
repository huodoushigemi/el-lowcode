export default {
  id: 'echarts',
  title: 'Echarts',
  schema: {
    "_id": "0dd6204d-5782-43df-b3d4-1b338505ac77",
    "is": "Page",
    "state": {
      "count": 0
    },
    "children": [
      {
        "is": "ELine",
        "autoresize": true,
        "style": {
          "height": "300px",
          "width": "400px"
        },
        "option": {
          "legend": {},
          "xAxis": [
            {}
          ],
          "yAxis": [
            {}
          ],
          "tooltip": {
            "show": true,
            "trigger": "axis"
          },
          "toolbox": {},
          "dataset": {
            "source": "{{[\n {\n  \"x\": \"Mon\",\n  \"y\": 150\n },\n {\n  \"x\": \"Tue\",\n  \"y\": 230\n },\n {\n  \"x\": \"Wed\",\n  \"y\": 224\n },\n {\n  \"x\": \"Thu\",\n  \"y\": 218\n },\n {\n  \"x\": \"Fri\",\n  \"y\": 135\n },\n {\n  \"x\": \"Sat\",\n  \"y\": 147\n },\n {\n  \"x\": \"Sun\",\n  \"y\": 260\n }\n]}}"
          },
          "series": [
            {
              "name": "data",
              "label": {
                "show": true
              }
            }
          ]
        },
        "initOptions": {
          "renderer": "svg"
        },
        "_id": "73475152-24dc-4851-944e-43fd6528f2bf"
      },
      {
        "is": "EBar",
        "autoresize": true,
        "style": {
          "height": "438px"
        },
        "option": {
          "grid": {
            "right": 145
          },
          "legend": {},
          "xAxis": [
            {
              "name": "",
              "axisLabel": {}
            }
          ],
          "yAxis": [
            {
              "name": "Evaporation",
              "axisLine": {
                "show": true,
                "lineStyle": {
                  "color": "rgba(84, 112, 198, 1)"
                }
              },
              "position": "right",
              "axisLabel": {
                "formatter": "{value} ml"
              }
            },
            {
              "name": "Precipitation",
              "offset": 76,
              "axisLine": {
                "show": true,
                "lineStyle": {
                  "color": "rgba(145, 204, 117, 1)"
                }
              },
              "position": "right",
              "axisLabel": {
                "formatter": "{value} ml"
              }
            },
            {
              "name": "温度",
              "axisLine": {
                "show": true,
                "lineStyle": {
                  "color": "rgba(238, 102, 102, 1)"
                }
              },
              "position": "left",
              "axisLabel": {
                "formatter": "{value} °C"
              }
            }
          ],
          "tooltip": {
            "show": true,
            "trigger": "axis",
            "axisPointer": {
              "type": "cross"
            }
          },
          "toolbox": {},
          "dataset": {
            "source": "{{[\n  ['product', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],\n  ['Evaporation', 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],\n  ['Precipitation', 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],\n  ['Temperature', 2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]\n]}}"
          },
          "series": [
            {
              "type": "bar",
              "name": "series-2",
              "$key": "1",
              "$axis": 0,
              "itemStyle": {
                "color": "rgba(84, 112, 198, 1)"
              }
            },
            {
              "type": "bar",
              "name": "series-3",
              "$key": "2",
              "$axis": 1,
              "itemStyle": {
                "color": "rgba(145, 204, 117, 1)"
              }
            },
            {
              "name": "data",
              "label": {},
              "type": "line",
              "$key": "3",
              "$axis": 2,
              "lineStyle": {
                "color": "rgba(238, 102, 102, 1)"
              },
              "symbolSize": 2,
              "symbolColor": "rgba(238, 102, 102, 1)"
            }
          ]
        },
        "_id": "1abfb9e1-906b-42bd-a30f-c7e2f8ee0b5a",
        "seriesLayoutBy": "row",
        "initOptions": {
          "renderer": "svg"
        }
      }
    ],
    "plugins": [
      "/plugins/web",
      "/plugins/echarts"
    ],
    "designer": {
      "canvas": {
        "style": {
          "width": "768px",
          "height": "1024px"
        }
      }
    }
  }
}
