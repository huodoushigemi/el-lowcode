export default {
  id: 'questionnaire',
  title: '麦当劳调查问卷',
  cover: () => import('./questionnaire.png').then(e => e.default),
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
            _id: '07617834-5b02-4136-ba4a-bc45438bc659',
            children: [
              {
                is: 'ElRadioGroup',
                children: [
                  {
                    label: '1-18岁',
                    value: '1',
                    is: 'ElRadio',
                    _id: '842dd295-4509-4250-af2e-10bb9563e791',
                  },
                  {
                    label: '19-35岁',
                    value: '2',
                    is: 'ElRadio',
                    _id: '00811234-1072-49f9-a4a6-265eace47d8b',
                  },
                  {
                    label: '35-50岁',
                    value: '3',
                    is: 'ElRadio',
                    _id: '56bb5339-faa7-497d-8032-ccff6c7671d8',
                  },
                  {
                    label: '50岁以上',
                    value: '4',
                    is: 'ElRadio',
                    _id: '340f722a-0696-4343-8639-f840307fa23d',
                  },
                ],
                _id: '514c82ee-a3b1-4774-b75e-2c574eb91a46',
              },
            ],
          },
          {
            is: 'ElFormItemRender',
            label: '2. 会去麦当劳的原因？',
            prop: 'radio4',
            defaultValue: '',
            _id: '66553703-0971-4f18-a686-95498f0dde63',
            children: [
              {
                is: 'ElRadioGroup',
                children: [
                  {
                    label: '价格实惠',
                    value: '1',
                    is: 'ElRadio',
                    _id: '691e289d-f96c-44f1-b383-4b63fd565a55',
                  },
                  {
                    label: '方便快捷',
                    value: '2',
                    is: 'ElRadio',
                    _id: '1118c6a0-4109-44dd-bb1b-cc9beed544f3',
                  },
                  {
                    label: '随大众',
                    value: '3',
                    is: 'ElRadio',
                    _id: '318ec896-a3f0-4e27-a3ce-ef38f2bf1030',
                  },
                  {
                    label: '位置方便',
                    value: '4',
                    is: 'ElRadio',
                    _id: '0b8f5db0-6846-4a2c-9c47-536a54204980',
                  },
                  {
                    label: '其他',
                    value: '5',
                    is: 'ElRadio',
                    _id: '192cf586-9b7a-43a0-b220-e5ef22199f9c',
                  },
                ],
                _id: '75ce391f-b901-4870-8ce5-5998f9860dfb',
              },
            ],
          },
          {
            is: 'ElFormItemRender',
            label: '3. 请问您去消费的频率：',
            prop: 'radio5',
            defaultValue: '',
            _id: 'f22cf6fb-763b-4ef8-a3f9-37d72354f5e0',
            children: [
              {
                is: 'ElRadioGroup',
                children: [
                  {
                    label: '经常',
                    value: '1',
                    is: 'ElRadio',
                    _id: '930f4adc-1312-4a3c-87be-1a6e29edefe2',
                  },
                  {
                    label: '偶尔',
                    value: '2',
                    is: 'ElRadio',
                    _id: 'd6f486ee-21ab-4e01-adb1-1e94ef81d1aa',
                  },
                  {
                    label: '很少',
                    value: '3',
                    is: 'ElRadio',
                    _id: 'c3ec7854-aa61-4151-ae7f-e3c1b86d644b',
                  },
                  {
                    label: '没去过',
                    value: '4',
                    is: 'ElRadio',
                    _id: '77d02959-db57-4cff-abe3-82317081962b',
                  },
                ],
                _id: 'aa2aed6b-3469-48e1-b315-e2f84b45a9ae',
              },
            ],
          },
          {
            is: 'ElFormItemRender',
            label: '4. 您在麦当劳平均一次消费金额是多少？',
            prop: 'radio6',
            defaultValue: '',
            _id: 'f0796491-b308-4668-b517-ebf300dea846',
            children: [
              {
                is: 'ElRadioGroup',
                children: [
                  {
                    label: '20元以下',
                    value: '1',
                    is: 'ElRadio',
                    _id: 'e1098d84-1609-4e59-a231-227944e5d564',
                  },
                  {
                    label: '20-50元',
                    value: '2',
                    is: 'ElRadio',
                    _id: '9e889b3a-2c71-40bf-80e2-b67a37920f0e',
                  },
                  {
                    label: '50-80元',
                    value: '3',
                    is: 'ElRadio',
                    _id: '4096d25e-70f4-47a3-a190-5025199f8988',
                  },
                  {
                    label: '80元以上',
                    value: '4',
                    is: 'ElRadio',
                    _id: '763e664e-b7aa-4d11-bba6-8706f93399aa',
                  },
                ],
                _id: '40831105-43c7-4b20-95e4-70db658bae2d',
              },
            ],
          },
          {
            is: 'ElFormItemRender',
            label: '5. 您一般都消费那些类型的食品？',
            prop: 'radio7',
            defaultValue: '',
            _id: 'ce11589d-4234-495b-8af2-9490a215c2ed',
            children: [
              {
                is: 'ElRadioGroup',
                children: [
                  {
                    label: '汉堡套餐',
                    value: '1',
                    is: 'ElRadio',
                    _id: 'e0aaf4a9-33cd-43ac-9e86-3b84ed5dd6de',
                  },
                  {
                    label: '甜点饮料（甜筒、咖啡、奶茶等）',
                    value: '2',
                    is: 'ElRadio',
                    _id: '5a8a7a00-cab5-4505-884b-10487d1b6acd',
                  },
                  {
                    label: '营养早餐',
                    value: '3',
                    is: 'ElRadio',
                    _id: 'ae7f386c-e4b0-4bfd-bb9e-1952b94ae030',
                  },
                  {
                    label: '儿童套餐（配玩具）',
                    value: '4',
                    is: 'ElRadio',
                    _id: '2e7d5bca-f8ad-450f-9a59-0282ce3e9a63',
                  },
                ],
                _id: '297d519a-f1fd-4cfd-84e6-11a61729d3f4',
              },
            ],
          },
          {
            is: 'ElFormItemRender',
            label: '6. 去麦当劳就餐是否会考虑食品的健康性',
            prop: 'radio12',
            defaultValue: '',
            _id: '3ed9c774-a861-4738-98fe-f94b75a0ab75',
            children: [
              {
                is: 'ElRadioGroup',
                children: [
                  {
                    label: '会考虑且很在意',
                    value: '1',
                    is: 'ElRadio',
                    _id: '8aca94de-f973-45a6-9531-2df3a38ae53e',
                  },
                  {
                    label: '油炸食品减少就餐次数',
                    value: '2',
                    is: 'ElRadio',
                    _id: 'aeb27094-f8b2-45a8-bf8d-7ca481503f24',
                  },
                  {
                    label: '偶尔考虑一下',
                    value: '3',
                    is: 'ElRadio',
                    _id: 'd4956015-02dc-4bf1-affc-5cbec2762df0',
                  },
                  {
                    label: '不考虑、不在乎',
                    value: '4',
                    is: 'ElRadio',
                    _id: '318046e0-9781-43cc-a7e6-9d6fbe3a6d91',
                  },
                ],
                _id: '528ef726-851e-4cf5-b5b5-d2452bc54de6',
              },
            ],
          },
          {
            is: 'ElFormItemRender',
            label: '7. 您觉得麦当劳相对于其他快餐店的优势在于？',
            prop: 'checkbox1',
            defaultValue: [],
            _id: '4af2cfa0-a61a-4354-8537-ab9ba52e03a1',
            children: [
              {
                is: 'ElCheckboxGroup',
                children: [
                  {
                    label: '口味不错',
                    value: '1',
                    is: 'ElCheckbox',
                    _id: '0a727d22-176b-4c44-b046-af47375a75fc',
                  },
                  {
                    label: '价格适中',
                    value: '2',
                    is: 'ElCheckbox',
                    _id: 'abec8cec-f336-4617-a12b-4222cfbe71e7',
                  },
                  {
                    label: '方便性',
                    value: '3',
                    is: 'ElCheckbox',
                    _id: '274b2f7e-f601-42fe-a732-d12bac87e2bc',
                  },
                  {
                    label: '服务态度好',
                    value: '4',
                    is: 'ElCheckbox',
                    _id: '0e8fb0da-bac1-4243-86f3-97121c3c566b',
                  },
                  {
                    label: '卫生干净',
                    value: '5',
                    is: 'ElCheckbox',
                    _id: '5b12533d-e343-4f9c-b7a4-8b2418023552',
                  },
                ],
                _id: '91be2a9f-2a4f-4234-b776-03fc001922df',
              },
            ],
          },
          {
            is: 'ElFormItemRender',
            label: '8. 您从何得知麦当劳出的新品？',
            prop: 'checkbox2',
            defaultValue: [],
            _id: 'b1e7e737-493f-4edc-9af7-6c1d9d22120a',
            children: [
              {
                is: 'ElCheckboxGroup',
                children: [
                  {
                    label: '电视广告',
                    value: '1',
                    is: 'ElCheckbox',
                    _id: 'c9788ab8-5cd4-46cc-9e89-b0d86208cfa3',
                  },
                  {
                    label: '地铁等户外广告',
                    value: '2',
                    is: 'ElCheckbox',
                    _id: '5c50f048-6706-40e7-a0ff-df9976e6b79a',
                  },
                  {
                    label: '杂志报纸上',
                    value: '3',
                    is: 'ElCheckbox',
                    _id: 'a9d88ca6-33d4-4c5a-8b9c-b51ef9ec21d0',
                  },
                  {
                    label: '在麦当劳店面看到',
                    value: '4',
                    is: 'ElCheckbox',
                    _id: 'ff616d1f-c1b5-4323-9826-d3b6bb112625',
                  },
                  {
                    label: '周围朋友介绍',
                    value: '5',
                    is: 'ElCheckbox',
                    _id: '7f89af97-ca19-48f4-9a8b-d62aa293ec5e',
                  },
                ],
                _id: '7fd7e4c1-5454-4c4b-9f33-ad70992742d9',
              },
            ],
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
    plugins: ['/plugins/web', '/plugins/element-plus'],
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
