export default {
  id: 'crud',
  title: 'CRUD',
  schema: () => ({
    _id: '01a072dd458dc300',
    is: 'Page',
    state: {
      search: {},
      selected: [],
      view: {
        vis: false,
        data: null,
      },
      edit: {
        vis: false,
        data: null,
      },
      data: [
        {
          id: '1',
          date: '2016-05-04',
          name: 'Aleyna Kutzner',
          city: 'Los Angeles',
          address: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
          tag: 'Home',
        },
        {
          id: '2',
          date: '2016-05-03',
          name: 'Helen Jacobi',
          city: 'Los Angeles',
          address: '760 A Street, South Frankfield, Illinois',
          tag: 'Office',
        },
        {
          id: '3',
          date: '2016-05-02',
          name: 'Brandon Deckert',
          city: 'Los Angeles',
          address: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
          tag: 'Home',
        },
        {
          id: '4',
          date: '2016-05-01',
          name: 'Margie Smith',
          city: 'Los Angeles',
          address: '23618 Windsor Drive, West Ricardoview, Idaho',
          tag: 'Office',
        },
      ],
    },
    children: [
      {
        is: 'ElCard',
        children: {
          default: {
            children: [
              {
                is: 'ElFormLcd',
                model: '{{state.search}}',
                labelWidth: "{{'auto'}}",
                style: {
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                },
                children: [
                  {
                    is: 'ElFormItemRender',
                    prop: 'date',
                    children: [
                      {
                        is: 'ElDatePicker',
                        valueFormat: 'YYYY-MM-DD',
                        _id: 'adb9c70164118639',
                      },
                    ],
                    _id: 'adb9c70164118629',
                    label: '日期',
                  },
                  {
                    is: 'ElFormItemRender',
                    prop: 'name',
                    children: [
                      {
                        is: 'ElInput',
                        _id: 'adb9c70164118612',
                      },
                    ],
                    _id: 'adb9c70164118609',
                    label: '名称',
                  },
                  {
                    is: 'ElFormItemRender',
                    label: '标签',
                    prop: 'tag',
                    children: [
                      {
                        is: 'ElInput',
                        _id: 'adb9c7016411862c',
                      },
                    ],
                    _id: 'adb9c7016411862d',
                  },
                  {
                    is: 'ElFormItemRender',
                    prop: 'city',
                    children: [
                      {
                        is: 'ElInput',
                        _id: 'adb9c7016411862a',
                      },
                    ],
                    _id: 'adb9c7016411862b',
                    label: '城市',
                  },
                  {
                    is: 'ElFormItemRender',
                    children: [
                      {
                        is: 'ElButton',
                        type: 'primary',
                        nativeType: 'submit',
                        children: [
                          {
                            is: 'span',
                            children: '搜索',
                            _id: 'adb9c70164118641',
                          },
                        ],
                        _id: 'adb9c7016411861c',
                      },
                      {
                        is: 'ElButton',
                        nativeType: 'reset',
                        children: [
                          {
                            is: 'span',
                            children: '重置',
                            _id: 'bc0f55d8d53c1a10',
                          },
                        ],
                        _id: 'adb9c7016411861d',
                      },
                    ],
                    _id: 'adb9c70164118611',
                    label: ' ',
                  },
                ],
                _id: 'adb9c70164118608',
                inline: true,
                labelPosition: 'left',
                labelSuffix: '',
                onSubmit: "{{(e) => {\n  alert('✅ Success')\n}}}",
              },
              {
                is: 'div',
                children: [
                  {
                    is: 'ElButton',
                    children: [
                      {
                        is: 'span',
                        children: '新增',
                        _id: 'bc0f55d8d53c1a0d',
                      },
                    ],
                    _id: 'bc0f55d8d53c1a0c',
                    type: 'primary',
                    onClick: '{{(e) => {\n  state.edit.data = {}\n  state.edit.vis = true\n}}}',
                  },
                  {
                    is: 'ElButton',
                    children: [
                      {
                        is: 'span',
                        children: '批量删除',
                        _id: 'bc0f55d8d53c1a0f',
                      },
                    ],
                    _id: 'bc0f55d8d53c1a0e',
                    type: 'danger',
                    disabled: '{{!state.selected.length}}',
                    onClick: "{{async (e) => {\n  await ElementPlus.ElMessageBox.confirm(`确认删除${state.selected.map(e => `【${e.name}】`).join('')}共 ${state.selected.length} 条数据？`, '提示', { type: 'warning' })\n  ElementPlus.ElMessage.success('操作成功')\n  state.data = state.data.filter(row => !state.selected.find(e => row.id == e.id))\n  state.selected = []\n}}}",
                  },
                ],
                _id: 'bc0f55d8d53c1a09',
              },
              {
                is: 'ElTableLcd',
                children: [
                  {
                    is: 'ElTableColumn',
                    _id: '01a072dd458dc302',
                    type: 'selection',
                    fixed: 'left',
                  },
                  {
                    is: 'ElTableColumn',
                    label: '日期',
                    prop: 'date',
                    _id: '01a072dd458dc303',
                    width: 120,
                  },
                  {
                    is: 'ElTableColumn',
                    label: '名称',
                    prop: 'name',
                    _id: 'af5b9acdb724fa0f',
                    width: 140,
                  },
                  {
                    is: 'ElTableColumn',
                    prop: 'tag',
                    _id: '01a072dd458dc31f',
                    children: {
                      default: {
                        children: [
                          {
                            is: 'ElTag',
                            children: '{{row.tag}}',
                            _id: 'b4ea60b52719fa05',
                            type: "{{row.tag == 'Home' ? 'primary' : 'success'}}",
                          },
                        ],
                        _id: 'b4ea60b52719fa02',
                        scope: '{ row, column, $index }',
                      },
                    },
                    width: 120,
                    label: '标签',
                  },
                  {
                    is: 'ElTableColumn',
                    label: '地址',
                    prop: 'address',
                    _id: '01a072dd458dc304',
                    showOverflowTooltip: true,
                    width: 200,
                  },
                  {
                    is: 'ElTableColumn',
                    prop: 'city',
                    _id: 'af5b9acdb724fa2f',
                    width: 120,
                    label: '城市',
                  },
                  {
                    is: 'ElTableColumn',
                    _id: '01a072dd458dc32b',
                    children: {
                      default: {
                        children: [
                          {
                            is: 'ElButton',
                            children: '详情',
                            _id: 'b4ea60b52719fa0a',
                            size: 'small',
                            link: true,
                            type: 'default',
                            onClick: '{{(e) => {\n  state.view.vis = true\n  state.view.data = {...row}\n}}}',
                          },
                          {
                            is: 'ElButton',
                            children: '编辑',
                            _id: 'b4ea60b52719fa0c',
                            size: 'small',
                            link: true,
                            type: 'primary',
                            onClick: '{{(e) => {\n  state.edit.data = JSON.parse(JSON.stringify(row))\n  state.edit.vis = true\n}}}',
                          },
                          {
                            is: 'ElButton',
                            children: '删除',
                            _id: 'b4ea60b52719fa0b',
                            size: 'small',
                            link: true,
                            type: 'danger',
                            onClick: "{{async (e) => {\n  await ElementPlus.ElMessageBox.confirm(`确认删除【${row.name}】？`, '提示', { type: 'warning' })\n  ElementPlus.ElMessage.success('操作成功')\n  state.data.splice(state.data.findIndex(e => e.id == row.id), 1)\n}}}",
                          },
                        ],
                        _id: 'b4ea60b52719fa07',
                        scope: '{ row, column, $index }',
                      },
                    },
                    fixed: 'right',
                    width: 140,
                    label: '操作',
                  },
                ],
                _id: '01a072dd458dc301',
                data: '{{state.data}}',
                border: true,
                stripe: true,
                style: {
                  marginTop: '18px',
                },
                rowKey: 'id',
                vModels: {
                  selected: ['{{state?.selected}}'],
                },
              },
            ],
            _id: 'adb9c70164118630',
          },
        },
        _id: 'adb9c7016411862e',
      },
      {
        is: 'ElDrawer',
        modelValue: true,
        destroyOnClose: true,
        children: {
          default: {
            children: [
              {
                is: 'ElFormLcd',
                model: '{{state?.edit?.data}}',
                labelWidth: "{{'auto'}}",
                style: {
                  overflow: 'hidden',
                },
                children: [
                  {
                    is: 'ElFormItemRender',
                    prop: 'name',
                    children: [
                      {
                        is: 'ElInput',
                        _id: 'c5e316fa5ecc7829',
                      },
                    ],
                    _id: 'c5e316fa5ecc7828',
                    label: '名称',
                    required: true,
                  },
                  {
                    is: 'ElFormItemRender',
                    prop: 'date',
                    children: [
                      {
                        is: 'ElDatePicker',
                        valueFormat: 'YYYY-MM-DD',
                        _id: 'c5e316fa5ecc782d',
                      },
                    ],
                    _id: 'c5e316fa5ecc782b',
                    label: '日期',
                    required: true,
                  },
                  {
                    is: 'ElFormItemRender',
                    children: [
                      {
                        is: 'ElSelect',
                        filterable: true,
                        defaultFirstOption: true,
                        children: [
                          {
                            is: 'ElOption',
                            label: '北京',
                            value: '北京',
                            _id: '076a59f4837aba0a',
                          },
                          {
                            is: 'ElOption',
                            label: '上海',
                            value: '上海',
                            _id: '076a59f4837aba0b',
                          },
                          {
                            is: 'ElOption',
                            label: '杭州',
                            value: '杭州',
                            _id: '076a59f4837aba0c',
                          },
                          {
                            is: 'ElOption',
                            label: '深圳',
                            value: '深圳',
                            _id: '076a59f4837aba0d',
                          },
                        ],
                        _id: '076a59f4837aba08',
                      },
                    ],
                    _id: 'c5e316fa5ecc7831',
                    label: '城市',
                    prop: 'city',
                    required: true,
                  },
                  {
                    is: 'ElFormItemRender',
                    prop: 'address',
                    children: [
                      {
                        is: 'ElInput',
                        _id: '076a59f4837aba0e',
                        type: 'textarea',
                        autosize: {
                          minRows: 4,
                          maxRows: 6,
                        },
                      },
                    ],
                    _id: 'c5e316fa5ecc782f',
                    label: '地址',
                    required: true,
                  },
                  {
                    is: 'ElFormItemRender',
                    prop: 'tag',
                    children: [
                      {
                        is: 'ElRadioGroup',
                        children: [
                          {
                            is: 'ElRadio',
                            label: 'Home',
                            value: 'Home',
                            _id: '076a59f4837aba19',
                          },
                          {
                            is: 'ElRadio',
                            label: 'Office',
                            value: 'Office',
                            _id: '076a59f4837aba18',
                          },
                        ],
                        _id: '076a59f4837aba17',
                      },
                    ],
                    _id: 'c5e316fa5ecc7833',
                    label: '标签',
                    required: true,
                  },
                  {
                    is: 'ElFormItemRender',
                    label: ' ',
                    children: [
                      {
                        is: 'ElButton',
                        type: 'primary',
                        nativeType: 'submit',
                        children: [
                          {
                            is: 'span',
                            children: '提交',
                            _id: '03e006f51c23d70a',
                          },
                        ],
                        _id: 'c5e316fa5ecc781c',
                      },
                      {
                        is: 'ElButton',
                        nativeType: 'reset',
                        children: [
                          {
                            is: 'span',
                            children: '重置',
                            _id: '03e006f51c23d712',
                          },
                        ],
                        _id: 'c5e316fa5ecc781d',
                      },
                    ],
                    _id: 'c5e316fa5ecc7811',
                  },
                ],
                _id: 'c5e316fa5ecc7808',
                onSubmit: "{{() => {\n  const data = JSON.parse(JSON.stringify(state.edit.data))\n  if (data.id) {\n    const i = state.data.findIndex(e => e.id == data.id)\n    state.data.splice(i, 1, data)\n    ElementPlus.ElMessage.success('编辑成功')\n  }\n  else {\n    data.id = +new Date\n    state.data.unshift(data)\n    ElementPlus.ElMessage.success('新增成功')\n  }\n  state.edit.vis = false\n  // state.edit.data = null\n}}}",
              },
            ],
            _id: '076a59f4837aba13',
          },
          header: {
            children: [
              {
                is: 'span',
                children: "{{state.edit.data?.id ? '编辑' : '新增'}}",
                _id: '076a59f4837aba16',
              },
            ],
            _id: '076a59f4837aba15',
          },
        },
        _id: '12e384d270c2cf08',
        size: '60%',
        vModels: {
          modelValue: ['{{state?.edit?.vis}}'],
        },
      },
      {
        is: 'ElDrawer',
        modelValue: true,
        destroyOnClose: true,
        children: {
          default: {
            children: [
              {
                is: 'ElDescriptions',
                column: 2,
                border: true,
                children: [
                  {
                    is: 'ElDescriptionsItem',
                    children: {
                      label: {
                        children: [
                          {
                            is: 'span',
                            children: '名称',
                            _id: '644846c7983f6818',
                          },
                        ],
                        _id: '644846c7983f680e',
                      },
                      default: {
                        children: [
                          {
                            is: 'span',
                            children: '{{state.view.data?.name}}',
                            _id: '644846c7983f6819',
                          },
                        ],
                        _id: '644846c7983f680f',
                      },
                    },
                    _id: '644846c7983f6809',
                  },
                  {
                    is: 'ElDescriptionsItem',
                    children: {
                      label: {
                        children: [
                          {
                            is: 'span',
                            children: '标签',
                            _id: '644846c7983f681a',
                          },
                        ],
                        _id: '644846c7983f6810',
                      },
                      default: {
                        children: [
                          {
                            is: 'ElTag',
                            children: '{{state.view.data?.tag}}',
                            _id: '63859bd414696408',
                            type: "{{state.view.data?.tag == 'Home' ? 'primary' : 'success'}}",
                          },
                        ],
                        _id: '644846c7983f6811',
                      },
                    },
                    _id: '644846c7983f680a',
                  },
                  {
                    is: 'ElDescriptionsItem',
                    children: {
                      label: {
                        children: [
                          {
                            is: 'span',
                            children: '城市',
                            _id: '644846c7983f681c',
                          },
                        ],
                        _id: '644846c7983f6812',
                      },
                      default: {
                        children: [
                          {
                            is: 'span',
                            children: '{{state.view.data?.city}}',
                            _id: '644846c7983f681d',
                          },
                        ],
                        _id: '644846c7983f6813',
                      },
                    },
                    _id: '644846c7983f680b',
                  },
                  {
                    is: 'ElDescriptionsItem',
                    children: {
                      label: {
                        children: [
                          {
                            is: 'span',
                            children: '日期',
                            _id: '644846c7983f681e',
                          },
                        ],
                        _id: '644846c7983f6814',
                      },
                      default: {
                        children: [
                          {
                            is: 'span',
                            children: '{{state.view.data?.date}}',
                            _id: '644846c7983f681f',
                          },
                        ],
                        _id: '644846c7983f6815',
                      },
                    },
                    _id: '644846c7983f680c',
                  },
                  {
                    is: 'ElDescriptionsItem',
                    children: {
                      label: {
                        children: [
                          {
                            is: 'span',
                            children: '地址',
                            _id: '644846c7983f6820',
                          },
                        ],
                        _id: '644846c7983f6816',
                      },
                      default: {
                        children: [
                          {
                            is: 'span',
                            children: '{{state.view.data?.address}}',
                            _id: '644846c7983f6821',
                          },
                        ],
                        _id: '644846c7983f6817',
                      },
                    },
                    _id: '644846c7983f680d',
                  },
                ],
                _id: '644846c7983f6808',
              },
            ],
            _id: '63859bd414696410',
          },
          header: {
            children: [
              {
                is: 'div',
                children: [
                  {
                    is: 'img',
                    src: 'https://element-plus.org/images/element-plus-logo-small.svg',
                    style: {
                      height: '32px',
                    },
                    _id: '1f8fa40b1a406909',
                    loading: 'eager',
                  },
                  {
                    is: 'span',
                    children: '{{state.view.data?.name}}',
                    _id: '63859bd414696412',
                    style: {
                      marginLeft: '10px',
                      fontWeight: 'bold',
                    },
                  },
                ],
                _id: '1f8fa40b1a406908',
                style: {
                  display: 'flex',
                  alignItems: 'center',
                },
              },
            ],
            _id: '63859bd414696411',
          },
        },
        _id: '8223b816ad29ba08',
        vModels: {
          modelValue: ['state.view.vis'],
        },
        size: '300px',
        direction: 'btt',
      },
    ],
    plugins: ['/plugins/web', '/plugins/element-plus'],
    designer: {
      canvas: {
        style: {
          width: '768px',
          height: '768px',
        },
        zoom: 1,
      },
    },
    style: {},
  }),
}
