export default {
  id: 'pattern',
  title: '表单校验',
  cover: () => import('./pattern.png').then(e => e.default),
  schema: {
    is: 'Page',
    _id: 'a0246183-b618-4a98-b353-207896342181',
    children: [
      {
        is: 'h1',
        _id: 'c87a24b3-68c0-4510-8403-224f47aeeac5',
        children: '自定义校验规则',
      },
      {
        is: 'p',
        _id: '1b765f3e-edbd-4276-86a8-6f1e0756266c',
        children:
          '这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。',
      },
      {
        is: 'p',
        _id: '6c774ef3-9e5a-455f-993a-f65766e90cfe',
        children:
          '本例还使用 status-icon 属性为输入框添加了表示校验结果的反馈图标。',
      },
      {
        is: 'ElCard',
        _id: 'a8a663e5-8ce3-4d08-8e00-fa610184eaa8',
        header: '',
        children: [
          {
            is: 'ElFormLcd',
            _id: '23e1cb33-98b8-4e6b-a6f5-13b144e26fa7',
            labelWidth: 80,
            style: {
              overflow: 'hidden',
            },
            onFinish: "{{() => alert('success')}}",
            onFinishFailed: "{{() => alert('failed')}}",
            children: [
              {
                is: 'ElFormItemRender',
                _id: 'db825204-d07c-4e79-97ad-511e5bae7439',
                label: 'Password',
                prop: 'pass',
                defaultValue: '',
                required: true,
                description: '',
                children: [
                  {
                    is: 'ElInput',
                    _id: 'fe9b1123-4d65-40ec-a754-0525b066a22e',
                  },
                ],
              },
              {
                is: 'ElFormItemRender',
                _id: 'b9958b03-c0c3-4563-a3a3-f5d325e6f9cb',
                label: 'Confirm',
                prop: 'checkPass',
                defaultValue: '',
                required: true,
                rules: {
                  validator:
                    "{{(rule, val, cb) => {\r\n  if (state.formData.pass != state.formData.checkPass) {\r\n    return new Error(`Two inputs don't match!`)\r\n  } else {\r\n    cb()\r\n  }\r\n}}}",
                },
                children: [
                  {
                    is: 'ElInput',
                    type: 'password',
                    _id: '269256ef-523e-41b2-9654-d309e78f7964',
                  },
                ],
              },
              {
                is: 'ElFormItemRender',
                _id: 'a303350e-9c38-496f-9a9b-c1a7052171b9',
                label: 'Age',
                prop: 'age',
                defaultValue: '',
                required: true,
                rules: {
                  pattern: '^\\d+$',
                  message: 'Please input the digits',
                },
                children: [
                  {
                    is: 'ElInput',
                    _id: 'f0c591c5-1ea4-4325-92e3-788466c75e8c',
                  },
                ],
              },
            ],
            model: '{{state.formData}}',
            statusIcon: true,
          },
        ],
        shadow: 'always',
      },
    ],
    state: {
      count: 0,
      formData: {},
    },
    style: {
      padding: '20px',
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
