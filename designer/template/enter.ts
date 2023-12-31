import cover from './enter.png'

export default {
  id: 'enter',
  title: '用户信息录入',
  cover,
  schema: () => ({
    is: 'Page',
    _id: '710ca988-63f7-47bd-837f-4e45f6c0b59e',
    children: [
      {
        is: 'Form',
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
            _id: 'e0b163bb-d4fb-43da-a2fd-191ae12145d4',
            label: '电话',
            prop: 'phone',
            defaultValue: '',
            el: {
              is: 'ElInput',
            },
            required: true,
            rules: {
              pattern: '^1[3456789]\\d{9}$',
              message: '格式错误',
            },
          },
          {
            is: 'ElFormItemRender',
            _id: '20997b76-1661-4768-9e51-812b1cc86751',
            label: '年龄',
            prop: 'age',
            defaultValue: 0,
            el: {
              is: 'ElInputNumber',
              controlsPosition: 'right',
              controls: true,
            },
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
          },
          {
            is: 'ElFormItemRender',
            _id: 'cfbcbb23-139b-442a-bf4f-3847bd088121',
            label: '生日',
            prop: 'time',
            defaultValue: '',
            el: {
              is: 'ElDatePicker',
              valueFormat: 'YYYY-MM-DD',
            },
          },
          {
            is: 'ElFormItemRender',
            _id: 'e9d93e55-3aca-4661-a67e-2ac1fad1d291',
            label: '地址',
            prop: 'address',
            defaultValue: '',
            el: {
              is: 'ElInput',
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
            },
          },
          {
            is: 'Descriptions',
            _id: 'a522cde2-bbb4-4ccd-bbea-10a6c8027937',
            column: 3,
            border: true,
            options: "{{[\r\n  { label: 'Username', value: state.formData.name },\r\n  { label: 'Phone', value: state.formData.phone},\r\n  { label: 'Sex', value: state.formData.sex},\r\n  { label: 'Age', value: state.formData.age },\r\n  { label: 'Time', value: state.formData.time },\r\n  { label: 'Address', value: state.formData.address},\r\n  { label: 'Remark', value: state.formData.remark },\r\n]}}",
            style: {
              margin: '0 0 18px 80px',
            },
            direction: 'horizontal',
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
    state: {
      count: 0,
      formData: {},
    },
  }),
}
