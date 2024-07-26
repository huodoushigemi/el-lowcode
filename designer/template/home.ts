import cover from './home.png'

export default {
  id: 'home',
  title: '首页',
  cover,
  schema: () => ({
    is: 'Page',
    _id: '276a574a-a57c-40b9-a70c-e30caea01039',
    children: [
      {
        is: 'wc-appbar',
        _id: '109f61d0-90d4-44bd-9e4c-43f6bcb5dccf',
        children: [
          {
            is: 'img',
            _id: 'aaaa2345-cb83-438b-8b18-ae80e8fcd51f',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2017/01/04/201701041632042243/201701041632042243_600_400.jpg?&rand=0827',
            style: {
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              objectFit: 'contain',
              backgroundColor: 'rgba(255, 0, 0, 1)',
            },
            loading: 'eager',
          },
        ],
        minh: 128,
        maxh: 400,
      },
      {
        is: 'Grid',
        _id: '63c324b2-c11e-4df7-9e8f-03d526193e0e',
        cols: '4',
        children: [
          {
            is: 'div',
            _id: 'b3b2b59e-22c1-461f-bfbe-ae771093a6d4',
            children: [
              {
                is: 'img',
                _id: 'e40ea1a2-4be2-442e-9e15-f4c40b25ff8e',
                src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/09/06/202309061812548569/202309061812548569_640_398.jpg?&rand=0827',
                style: {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                },
                loading: 'eager',
              },
              {
                is: 'div',
                _id: '531a000c-3650-40be-9454-b78529a4b644',
                children: [
                  {
                    is: 'span',
                    _id: '14d8f041-477c-46ff-be2d-ff58ba2af920',
                    children: '【重磅】1+1上新！新双吉、新派！',
                    style: {
                      fontSize: '22px',
                    },
                  },
                  {
                    is: 'span',
                    _id: 'c03f41d0-8c24-4a43-a37c-4292dfffce5a',
                    children: '2023.09.06',
                    style: {
                      display: 'block',
                      'font-size': '12px',
                      'margin-top': '16px',
                    },
                  },
                ],
                style: {
                  position: 'absolute',
                  bottom: '0',
                  padding: '18px',
                  width: '100%',
                  'box-sizing': 'border-box',
                  'background-color': 'rgba(0, 0, 0, 0.3)',
                },
              },
            ],
            style: {
              'grid-column': 'span 2',
              position: 'relative',
            },
          },
          {
            is: 'div',
            _id: '6c21d047-ca2e-474e-8c1b-b9f24bc3905f',
            children: [
              {
                is: 'img',
                _id: '04d30d30-1c00-4b41-97d6-c6de12d8f47e',
                src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/09/06/202309061833163404/202309061833163404_640_480.jpg?&rand=0827',
                style: {
                  width: '100%',
                },
                loading: 'eager',
              },
              {
                is: 'div',
                _id: '1336d379-d15d-464d-95dd-0196d950cf59',
                children: [
                  {
                    is: 'span',
                    _id: '5ea57fcc-2eee-4ce2-9973-23658c179857',
                    children: '给奶铁庆生，9块9喝新口味！',
                    style: {
                      'font-size': '18px',
                      'font-weight': 'bold',
                    },
                  },
                  {
                    is: 'span',
                    _id: 'aa165535-851d-4f5f-87c1-110eedeb853b',
                    children: '2023.09.06',
                    style: {
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      'font-size': '12px',
                    },
                  },
                ],
                style: {
                  padding: '20px',
                  'font-size': '18px',
                  color: 'rgba(0, 0, 0, 1)',
                  fontSize: '18px',
                },
              },
            ],
            style: {
              position: 'relative',
              'background-color': 'rgba(255, 188, 13, 1)',
            },
          },
          {
            is: 'div',
            _id: 'c836ed87-a8fe-481f-837e-3aa012646954',
            children: [
              {
                is: 'img',
                _id: 'd766e462-4e15-4120-ace8-f5ce3256999b',
                src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/09/06/202309061841197164/202309061841197164_640_480.jpg?&rand=0827',
                style: {
                  width: '100%',
                },
                loading: 'eager',
              },
              {
                is: 'div',
                _id: '72f39e0b-ba9f-4e10-9041-72f0849a00b1',
                children: [
                  {
                    is: 'span',
                    _id: '3fefa2b6-5777-4f24-90b5-05616281dc1c',
                    children: '限定款麦旋风，积分抽半价吃！',
                    style: {
                      'font-size': '18px',
                      'font-weight': 'bold',
                    },
                  },
                  {
                    is: 'span',
                    _id: '43e54946-dbf5-4b82-9e82-66b2b546a083',
                    children: '2023.09.06',
                    style: {
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      'font-size': '12px',
                    },
                  },
                ],
                style: {
                  padding: '20px',
                  'font-size': '18px',
                  color: 'rgba(0, 0, 0, 1)',
                },
              },
            ],
            style: {
              position: 'relative',
              'background-color': 'rgba(255, 188, 13, 1)',
            },
          },
          {
            is: 'div',
            _id: '1a72a78c-8319-4b61-b55d-3465502d4c8a',
            children: [
              {
                is: 'img',
                _id: '20754f58-6e9d-41e2-acd8-8bf420eae945',
                src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/08/24/202308241421557742/202308241421557742_640_480.jpg?&rand=0827',
                style: {
                  width: '100%',
                },
                loading: 'eager',
              },
              {
                is: 'div',
                _id: 'be8b03c3-a19f-4afe-b8b2-098e1eb5d690',
                children: [
                  {
                    is: 'span',
                    _id: '1ac3f95e-d6b1-44b6-a88b-2af494c8a285',
                    children: '没见过的麦当劳？！猛地推门而入',
                    style: {
                      'font-size': '18px',
                      'font-weight': 'bold',
                    },
                  },
                  {
                    is: 'span',
                    _id: 'c7891f56-08ea-42a1-8813-55a364807eda',
                    children: '2023.08.24',
                    style: {
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      'font-size': '12px',
                    },
                  },
                ],
                style: {
                  padding: '20px',
                  color: 'rgba(0, 0, 0, 1)',
                },
              },
            ],
            style: {
              position: 'relative',
              'background-color': 'rgba(255, 188, 13, 1)',
            },
          },
          {
            is: 'div',
            _id: '69f6a65d-ad36-4c13-84db-eb1cb06aa999',
            children: [
              {
                is: 'img',
                _id: '967e0728-e3d3-4849-a748-2f59aa8601b1',
                src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/08/24/202308241413174495/202308241413174495_640_480.jpg?&rand=0827',
                style: {
                  width: '100%',
                },
                loading: 'eager',
              },
              {
                is: 'div',
                _id: 'c9c853ac-c3d8-432f-96d4-ee84afe3fa59',
                children: [
                  {
                    is: 'span',
                    _id: 'dffe8191-a060-4ccb-8305-e331dfc8cd94',
                    children: '摊牌了！限时第二杯0元！',
                    style: {
                      'font-size': '18px',
                      'font-weight': 'bold',
                    },
                  },
                  {
                    is: 'span',
                    _id: '391bf607-8d17-4de9-8c19-e2f5a61696c8',
                    children: '2023.08.24',
                    style: {
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      'font-size': '12px',
                    },
                  },
                ],
                style: {
                  padding: '20px',
                  'font-size': '18px',
                  color: 'rgba(0, 0, 0, 1)',
                },
              },
            ],
            style: {
              position: 'relative',
              'background-color': 'rgba(255, 188, 13, 1)',
            },
          },
          {
            is: 'div',
            _id: '22055e65-01c9-4f8d-a6c5-c5bc5dfe5864',
            children: [
              {
                is: 'img',
                _id: '10c6f3a3-e5d6-4a09-b187-3a482f9e451a',
                src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/08/17/202308171428018508/202308171428018508_640_398.jpg?&rand=0827',
                style: {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                },
                loading: 'eager',
              },
              {
                is: 'div',
                _id: '8d563d8c-03e1-4f00-8dd8-5e46cf2399d3',
                children: [
                  {
                    is: 'span',
                    _id: '3a7f1953-b338-4363-bfa0-1ffa49159465',
                    children: '字少事大：上新！还买1送1！',
                    style: {
                      'font-size': '22px',
                      'font-weight': 'bold',
                    },
                  },
                  {
                    is: 'span',
                    _id: '723a1003-f0a7-45a4-bc53-0622f3f259dc',
                    children: '2023.08.24',
                    style: {
                      display: 'block',
                      'font-size': '12px',
                      'margin-top': '16px',
                    },
                  },
                ],
                style: {
                  position: 'absolute',
                  bottom: '0',
                  padding: '18px',
                  width: '100%',
                  'box-sizing': 'border-box',
                  'background-color': 'rgba(0, 0, 0, 0.3)',
                },
              },
            ],
            style: {
              position: 'relative',
              'grid-column': 'span 2',
            },
          },
        ],
        gap: [20, 20],
        style: {
          'margin-top': '20px',
        },
      },
    ],
    state: {
      count: 0,
    },
    style: {},
    plugins: [
      "/el-lowcode/designer/packages/designer/plugins/web"
    ],
  }),
}
