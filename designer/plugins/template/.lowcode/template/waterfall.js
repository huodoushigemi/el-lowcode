import cover from './waterfall.png'

export default {
  id: 'waterfall',
  title: '瀑布流',
  cover,
  schema: {
    is: 'Page',
    _id: 'fa0c45d7-55f3-4d1a-a1dc-e8ad6b5e1026',
    children: [
      {
        is: 'wc-appbar',
        _id: '9e522eb2-9f2a-4822-a084-64a1343baeff',
        minh: 56,
        children: [
          {
            is: 'img',
            _id: 'cde21d7e-5747-4af4-bdb5-2606e04c4c65',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/09/20/202309201955264145/202309201955264145_640_398.jpg?&rand=0827',
            style: {
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              objectFit: 'cover',
            },
            maxh: 256,
            loading: 'eager',
          },
          {
            is: 'p',
            _id: 'cdf988bb-1788-4b96-a132-810d4cec7542',
            children: '麦当劳',
            style: {
              margin: '0',
              padding: '0 1em',
              height: 'calc(var(--wc-appbar-minh) * 1px)',
              'line-height': 'calc(var(--wc-appbar-minh) * 1px)',
              'font-size': '1.5em',
              'font-weight': 'bold',
              'box-sizing': 'border-box',
              color: '#ffbc0d',
              background: 'red',
              opacity: 'calc(var(--wc-appbar-shrink-offset) / (var(--wc-appbar-maxh) - var(--wc-appbar-minh)))',
            },
          },
        ],
        maxh: 256,
        pinned: true
      },
      {
        is: 'wc-waterfall',
        _id: '3bda2402-ab78-442a-ad13-645ef651b541',
        cols: 2,
        gap: 12,
        children: [
          {
            is: 'img',
            _id: '760a1c71-7896-4de6-add5-433c139cb4f1',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2020/08/27/202008271612217853/202008271612217853_640_829.jpg?&rand=0827',
            style: {
              width: '100%',
            },
            loading: 'eager',
          },
          {
            is: 'img',
            _id: '7cd5a284-9743-4ce5-9da9-4c18866cfe6f',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/10/06/202310062234584850/202310062234584850_640_398.jpg?202308141052345193&rand=0827',
            style: {
              width: '100%',
            },
            loading: 'eager',
          },
          {
            is: 'img',
            _id: 'e84132b7-2c33-4065-a305-eaccd4c95e8d',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/10/06/202310062240171410/202310062240171410_640_480.jpg?202308141052345193&rand=0827',
            style: {
              width: '100%',
            },
            loading: 'eager',
          },
          {
            is: 'img',
            _id: '20f207c3-f478-42be-8159-173981827378',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/10/06/202310062244366947/202310062244366947_640_480.jpg?202308141052345193&rand=0827',
            style: {
              width: '100%',
            },
          },
          {
            is: 'img',
            _id: 'a4a72f9b-79ac-4075-bf1c-db501b6f7ff4',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/10/06/202310062249227761/202310062249227761_640_480.jpg?202308141052345193&rand=0827',
            style: {
              width: '100%',
            },
          },
          {
            is: 'img',
            _id: 'e0d2bb6e-c84c-410e-9dfe-58c4d2f9cdeb',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/03/29/202303291047249759/202303291047249759_640_398.jpg?202303291045298272&rand=0827',
            style: {
              width: '100%',
            },
          },
          {
            is: 'img',
            _id: '71b13098-2f41-4aa8-8de3-70e68593f578',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/01/31/202301311552089483/202301311552089483_640_480.jpg?202208301012197725&rand=0827',
            style: {
              width: '100%',
            },
          },
          {
            is: 'img',
            _id: '87f83464-0617-4708-99ba-95a5084fb4cc',
            src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2020/03/09/202003091044589424/202003091044589424_640_829.jpg?202002191125097096&rand=0827',
            style: {
              width: '100%',
            },
          },
          {
            is: 'img',
            _id: '263cdfb4-f341-46ed-ad23-da5839677bae',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/08/08/202308081000359276/202308081000359276_640_829.jpg?202308081029417817&rand=0827',
            style: {
              width: '100%',
            },
            loading: 'eager',
          },
          {
            is: 'img',
            _id: 'c3c84746-9665-44c7-882c-47723e55d76c',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/09/20/202309202009586805/202309202009586805_640_480.jpg?&rand=0827',
            style: {
              width: '100%',
            },
          },
          {
            is: 'img',
            _id: '1bb91c2f-0864-4994-b122-7950cec33a47',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/09/20/202309202017276076/202309202017276076_640_480.jpg?&rand=0827',
            style: {
              width: '100%',
            },
          },
          {
            is: 'img',
            _id: 'db26b4d6-a9b7-4477-a5d0-efceb373fbf4',
            src: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2023/09/20/202309202032584312/202309202032584312_640_480.jpg?&rand=0827',
            style: {
              width: '100%',
            },
          },
        ],
        style: {
          'margin-top': '14px',
        },
      },
    ],
    state: {
      count: 0,
    },
    style: {
      'max-width': '512px',
      margin: 'auto',
    },
    plugins: [
      "/el-lowcode/designer/packages/designer/plugins/web"
    ],
    designer: {
      canvas: {
        style: {
          width: '768px',
          height: '1024px',
        },
      },
    },
  },
}
