export default {
  id: 'if',
  title: '组件联动',
  schema: {
    is: 'Page',
    _id: '63f7-47bd-837f-4e45f6c0b59e',
    children: [
      {
        is: 'ElCard',
        _id: '2368858c-4fc1-4ca1-b3fb-8b4d7bca1cde',
        header: '组件联动',
        children: [
          {
            is: 'ElFormLcd',
            _id: 'cf70094f-5da9-4770-b6a0-c8787fac72ba',
            labelWidth: 80,
            style: {
              overflow: 'hidden',
            },
            children: [
              {
                is: 'ElFormItemRender',
                label: '姓名',
                prop: 'name',
                children: [
                  {
                    is: 'ElInput',
                    defaultValue: '',
                    _id: '7e9346b1-58c7-4396-8039-e1202af4baf2',
                  },
                ],
                _id: 'cff10199-ae9a-4b83-a901-2b7495357288',
                required: true,
              },
              {
                is: 'ElFormItemRender',
                label: '性别',
                prop: 'sex',
                children: [
                  {
                    is: 'ElRadioGroup',
                    defaultValue: '',
                    children: [
                      {
                        is: 'ElRadio',
                        label: '男',
                        value: '1',
                        _id: '79839133-e28e-4303-a4e6-7933f4e70923',
                      },
                      {
                        is: 'ElRadio',
                        label: '女',
                        value: '2',
                        _id: 'bea0d404-9e19-47e7-bf2c-c6836f5dd5e2',
                      },
                    ],
                    _id: '34de3191-c356-4d4b-81b2-1467c8facdbb',
                  },
                ],
                _id: '8f7ca6a7-2efc-48c0-a6b9-d20dc5366439',
                required: true,
              },
              {
                is: 'ElFormItemRender',
                label: '电话',
                prop: 'phone',
                children: [
                  {
                    is: 'ElInput',
                    defaultValue: '',
                    _id: '3c0d9ce4-e497-49b4-827f-26762bbe800d',
                    placeholder: '为女时必填',
                  },
                ],
                _id: '21d4a708-c427-4159-aa7f-824ebd1e8e6a',
                required: "{{state.formData.sex == '2'}}",
              },
              {
                is: 'ElFormItemRender',
                label: '备注',
                prop: 'remark',
                vIf: "{{state.formData.sex != '1'}}",
                children: [
                  {
                    is: 'ElInput',
                    defaultValue: '',
                    _id: '9a8fa22c-bdba-4cd6-9c54-5b344e4068f0',
                    placeholder: '为男时隐藏',
                    type: 'textarea',
                    showWordLimit: false,
                  },
                ],
                _id: '2909a517-012e-44c3-9a46-16312debb1f7',
              },
              {
                is: 'ElDivider',
                _id: '1fc0a255-c3ea-4c5d-95ed-71d48db20b2b',
                children: '',
                direction: 'horizontal',
                borderStyle: 'solid',
              },
            ],
            model: '{{state.formData}}',
          },
        ],
        shadow: 'always',
        style: {
          'max-width': '640px',
          margin: 'auto',
        },
      },
    ],
    state: {
      count: 0,
      formData: {},
    },
    designer: {
      canvas: {
        style: {
          width: '768px',
          height: '1024px',
        },
      },
    },
    style: {
      'padding-top': '100px',
    },
    plugins: ['/plugins/web', '/plugins/element-plus'],
  },
}
