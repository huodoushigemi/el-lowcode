import cover from './questionnaire.png'

export default {
  id: 'questionnaire',
  title: '麦当劳调查问卷',
  cover,
  schema: {
    children: [
      {
        labelWidth: '80',
        style: {
          overflow: 'hidden',
        },
        children: [
          {
            is: 'ElFormItemRender',
            label: '1. 您的年龄？',
            prop: 'radio1',
            defaultValue: '',
            options: [
              {
                label: '1-18岁',
                value: '1',
              },
              {
                label: '19-35岁',
                value: '2',
              },
              {
                label: '35-50岁',
                value: '3',
              },
              {
                label: '50岁以上',
                value: '4',
              },
            ],
            el: {
              is: 'ElRadioGroup',
            },
            _id: '07617834-5b02-4136-ba4a-bc45438bc659',
          },
          {
            is: 'ElFormItemRender',
            label: '2. 会去麦当劳的原因？',
            prop: 'radio4',
            defaultValue: '',
            options: [
              {
                label: '价格实惠',
                value: '1',
              },
              {
                label: '方便快捷',
                value: '2',
              },
              {
                label: '随大众',
                value: '3',
              },
              {
                label: '位置方便',
                value: '4',
              },
              {
                label: '其他',
                value: '5',
              },
            ],
            el: {
              is: 'ElRadioGroup',
            },
            _id: '66553703-0971-4f18-a686-95498f0dde63',
          },
          {
            is: 'ElFormItemRender',
            label: '3. 请问您去消费的频率：',
            prop: 'radio5',
            defaultValue: '',
            options: [
              {
                label: '经常',
                value: '1',
              },
              {
                label: '偶尔',
                value: '2',
              },
              {
                label: '很少',
                value: '3',
              },
              {
                label: '没去过',
                value: '4',
              },
            ],
            el: {
              is: 'ElRadioGroup',
            },
            _id: 'f22cf6fb-763b-4ef8-a3f9-37d72354f5e0',
          },
          {
            is: 'ElFormItemRender',
            label: '4. 您在麦当劳平均一次消费金额是多少？',
            prop: 'radio6',
            defaultValue: '',
            options: [
              {
                label: '20元以下',
                value: '1',
              },
              {
                label: '20-50元',
                value: '2',
              },
              {
                label: '50-80元',
                value: '3',
              },
              {
                label: '80元以上',
                value: '4',
              },
            ],
            el: {
              is: 'ElRadioGroup',
            },
            _id: 'f0796491-b308-4668-b517-ebf300dea846',
          },
          {
            is: 'ElFormItemRender',
            label: '5. 您一般都消费那些类型的食品？',
            prop: 'radio7',
            defaultValue: '',
            options: [
              {
                label: '汉堡套餐',
                value: '1',
              },
              {
                label: '甜点饮料（甜筒、咖啡、奶茶等）',
                value: '2',
              },
              {
                label: '营养早餐',
                value: '3',
              },
              {
                label: '儿童套餐（配玩具）',
                value: '4',
              },
            ],
            el: {
              is: 'ElRadioGroup',
            },
            _id: 'ce11589d-4234-495b-8af2-9490a215c2ed',
          },
          {
            is: 'ElFormItemRender',
            label: '6. 去麦当劳就餐是否会考虑食品的健康性',
            prop: 'radio12',
            defaultValue: '',
            options: [
              {
                label: '会考虑且很在意',
                value: '1',
              },
              {
                label: '油炸食品减少就餐次数',
                value: '2',
              },
              {
                label: '偶尔考虑一下',
                value: '3',
              },
              {
                label: '不考虑、不在乎',
                value: '4',
              },
            ],
            el: {
              is: 'ElRadioGroup',
            },
            _id: '3ed9c774-a861-4738-98fe-f94b75a0ab75',
          },
          {
            is: 'ElFormItemRender',
            label: '7. 您觉得麦当劳相对于其他快餐店的优势在于？',
            prop: 'checkbox1',
            defaultValue: [],
            options: [
              {
                label: '口味不错',
                value: '1',
              },
              {
                label: '价格适中',
                value: '2',
              },
              {
                label: '方便性',
                value: '3',
              },
              {
                label: '服务态度好',
                value: '4',
              },
              {
                label: '卫生干净',
                value: '5',
              },
            ],
            el: {
              is: 'ElCheckboxGroup',
            },
            _id: '4af2cfa0-a61a-4354-8537-ab9ba52e03a1',
          },
          {
            is: 'ElFormItemRender',
            label: '8. 您从何得知麦当劳出的新品？',
            prop: 'checkbox2',
            defaultValue: [],
            options: [
              {
                label: '电视广告',
                value: '1',
              },
              {
                label: '地铁等户外广告',
                value: '2',
              },
              {
                label: '杂志报纸上',
                value: '3',
              },
              {
                label: '在麦当劳店面看到',
                value: '4',
              },
              {
                label: '周围朋友介绍',
                value: '5',
              },
            ],
            el: {
              is: 'ElCheckboxGroup',
            },
            _id: 'b1e7e737-493f-4edc-9af7-6c1d9d22120a',
          },
        ],
        is: 'ElForm-c',
        _id: '1e8c282f-a74f-48f8-bf0a-7e2f2c8a6dc9',
        labelPosition: 'top',
        model: '{{state.formData}}',
      },
    ],
    state: {
      count: 0,
      formData: {},
    },
    is: 'Page',
    _id: '2aca-4f04-8507',
    style: {
      padding: '12px',
    },
    plugins: [
      "/plugins/web",
      "/plugins/element-plus"
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
