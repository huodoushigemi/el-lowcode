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
          "$xAxis": [{}],
          "$yAxis": [{}],
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
        "_id": "73475152-24dc-4851-944e-43fd6528f2bf"
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
