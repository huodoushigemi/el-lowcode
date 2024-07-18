export default {
  id: 'condition',
  title: '组件联动',
  schema: () => ({
    is: 'Page',
    _id: '710ca988-63f7-47bd-837f-4e45f6c0b59e',
    children: [
      {
        is: 'ElCard',
        _id: '2368858c-4fc1-4ca1-b3fb-8b4d7bca1cde',
        header: '组件联动',
        children: [
          {
            is: 'ElForm$$',
            _id: 'cf70094f-5da9-4770-b6a0-c8787fac72ba',
            labelWidth: 80,
            style: {
              overflow: 'hidden',
            },
            children: [
              {
                is: 'ElFormItemRender',
                _id: '70392eb3-506c-4ebb-b246-2bf1d3b1a1b6',
                label: '姓名',
                prop: 'name',
                defaultValue: '',
                el: {
                  is: 'ElInput',
                },
                required: true,
              },
              {
                is: 'ElFormItemRender',
                _id: '01b6a07d-b97c-4508-bcab-abbe07216779',
                label: '性别',
                prop: 'sex',
                defaultValue: '',
                options: [
                  {
                    label: '男',
                    value: '1',
                  },
                  {
                    label: '女',
                    value: '2',
                  },
                ],
                el: {
                  is: 'ElRadioGroup',
                },
                required: true,
              },
              {
                is: 'ElFormItemRender',
                _id: 'e0b163bb-d4fb-43da-a2fd-191ae12145d4',
                label: '电话',
                prop: 'phone',
                defaultValue: '',
                el: {
                  is: 'ElInput',
                  placeholder: '为女时必填',
                },
                required: "{{state.formData.sex == '2'}}",
                rules: {
                  pattern: '^1[3456789]\\d{9}$',
                  message: '格式错误',
                },
              },
              {
                is: 'ElFormItemRender',
                _id: '83d294fb-ed7c-44e3-b64f-0924ba2c477b',
                label: '备注',
                prop: 'remark',
                defaultValue: '',
                el: {
                  is: 'ElInput',
                  minlength: 10,
                  maxlength: 128,
                  type: 'textarea',
                  showWordLimit: true,
                  placeholder: '为男时隐藏',
                },
                $: {
                  condition: "{{state.formData.sex != '1'}}",
                }
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
    style: {
      'padding-top': '100px',
    },
  }),
}
