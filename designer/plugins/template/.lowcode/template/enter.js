import cover from './enter.png'

export default {
  id: 'enter',
  title: '用户信息录入',
  cover,
  schema: {
    is: 'Page',
    _id: '710ca988-63f7-47bd-837f-4e45f6c0b59e',
    children: [
      {
        is: 'ElForm-c',
        _id: 'cf70094f-5da9-4770-b6a0-c8787fac72ba',
        labelWidth: 60,
        style: {
          overflow: 'hidden',
          marginTop: '16px',
          marginLeft: '0px',
          paddingRight: '16px',
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
            is: 'ElDescriptions',
            column: 3,
            border: true,
            children: [
              {
                is: 'ElDescriptionsItem',
                label: 'Username',
                children: '{{state.formData.name}}',
                _id: '9d4e60ff-4e3b-45fc-8788-0d9ad77e7c10',
              },
              {
                is: 'ElDescriptionsItem',
                label: 'Phone',
                children: '{{state.formData.phone}}',
                _id: 'd6582674-46e6-4dd6-ac58-19da8b064ce7',
              },
              {
                is: 'ElDescriptionsItem',
                label: 'Sex',
                children: '{{state.formData.sex}}',
                _id: '385a05ff-e18a-4727-8c41-d2456a4133b4',
              },
              {
                is: 'ElDescriptionsItem',
                label: 'Age',
                children: '{{state.formData.age}}',
                _id: '3c0d1198-e61f-4676-aa54-e56cd5f16964',
              },
              {
                is: 'ElDescriptionsItem',
                label: 'Time',
                children: '{{state.formData.time}}',
                _id: 'f7995122-69e2-4198-bcf1-9ee9ff0ce8b7',
              },
              {
                is: 'ElDescriptionsItem',
                label: 'Address',
                children: '{{state.formData.address}}',
              },
              {
                is: 'ElDescriptionsItem',
                label: 'Remark',
                children: '{{state.formData.remark}}',
              },
            ],
            _id: 'e94a1c1a-0eda-417c-a5c5-e6a411be0484',
            style: {
              marginBottom: '40px',
              marginTop: '40px',
              marginLeft: '16px',
            },
            direction: 'horizontal',
            size: 'small',
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
      formData: {
        name: '12313',
        phone: '123213',
        age: 5,
        sex: '',
        time: '',
        address: '123r2',
        remark: 'ewrgetgw',
      },
    },
    plugins: [
      '/el-lowcode/designer/packages/designer/plugins/web',
      '/el-lowcode/designer/packages/designer/plugins/element-plus',
    ],
    designer: {
      canvas: {
        style: {
          width: '768px',
          height: '1024px',
        },
      },
    },
    style: {},
  },
}
