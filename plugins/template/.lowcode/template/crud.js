export default {
  id: 'crud',
  title: 'CRUD',
  schema: () => ({
    _id: '01a072dd458dc300',
    is: 'Page',
    state: {
      count: 0,
      search: {},
      view: {
        vis: false,
        data: null,
      },
    },
    children: [
      {
        is: 'ElCard',
        children: {
          default: {
            children: [
              {
                is: 'ElForm-c',
                model: '{{(state.search ??= {}, state.search)}}',
                labelWidth: "{{'auto'}}",
                style: {
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                },
                children: [
                  {
                    is: 'ElFormItemRender',
                    label: 'Date',
                    prop: 'date',
                    children: [
                      {
                        is: 'ElDatePicker',
                        defaultValue: '',
                        valueFormat: 'YYYY-MM-DD',
                        _id: 'adb9c70164118639',
                      },
                    ],
                    _id: 'adb9c70164118629',
                  },
                  {
                    is: 'ElFormItemRender',
                    label: 'Name',
                    prop: 'name',
                    children: [
                      {
                        is: 'ElInput',
                        _id: 'adb9c70164118612',
                      },
                    ],
                    _id: 'adb9c70164118609',
                  },
                  {
                    is: 'ElFormItemRender',
                    label: 'Tag',
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
                    label: 'City',
                    prop: 'city',
                    children: [
                      {
                        is: 'ElInput',
                        _id: 'adb9c7016411862a',
                      },
                    ],
                    _id: 'adb9c7016411862b',
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
                            children: 'Submit',
                            _id: 'adb9c70164118641',
                          },
                        ],
                        _id: 'adb9c7016411861c',
                      },
                      {
                        is: 'ElButton',
                        nativeType: 'reset',
                        children: 'Reset',
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
                is: 'ElTable',
                children: [
                  {
                    is: 'ElTableColumn',
                    _id: '01a072dd458dc302',
                    type: 'selection',
                    fixed: 'left',
                  },
                  {
                    is: 'ElTableColumn',
                    label: 'Date',
                    prop: 'date',
                    _id: '01a072dd458dc303',
                    width: 120,
                    fixed: 'left',
                  },
                  {
                    is: 'ElTableColumn',
                    label: 'Name',
                    prop: 'name',
                    _id: 'af5b9acdb724fa0f',
                    width: 140,
                  },
                  {
                    is: 'ElTableColumn',
                    label: 'Tag',
                    prop: 'tag',
                    _id: '01a072dd458dc31f',
                    children: {
                      default: {
                        children: [
                          {
                            is: 'ElTag',
                            children: '{{scope.row.tag}}',
                            _id: 'b4ea60b52719fa05',
                            type: "{{scope.row.tag == 'Home' ? 'primary' : 'success'}}",
                          },
                        ],
                        _id: 'b4ea60b52719fa02',
                        vSlot: 'scope',
                      },
                    },
                    width: 120,
                  },
                  {
                    is: 'ElTableColumn',
                    label: 'Address',
                    prop: 'address',
                    _id: '01a072dd458dc304',
                    showOverflowTooltip: true,
                    width: 200,
                  },
                  {
                    is: 'ElTableColumn',
                    label: 'City',
                    prop: 'city',
                    _id: 'af5b9acdb724fa2f',
                    width: 120,
                  },
                  {
                    is: 'ElTableColumn',
                    label: 'Operations',
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
                            onClick: '{{(e) => {\n  state.view.vis = true\n  state.view.data = {...scope.row}\n}}}',
                          },
                          {
                            is: 'ElButton',
                            children: '编辑',
                            _id: 'b4ea60b52719fa0c',
                            size: 'small',
                            link: true,
                            type: 'primary',
                          },
                          {
                            is: 'ElButton',
                            children: '删除',
                            _id: 'b4ea60b52719fa0b',
                            size: 'small',
                            link: true,
                            type: 'danger',
                          },
                        ],
                        _id: 'b4ea60b52719fa07',
                        vSlot: 'scope',
                      },
                    },
                    fixed: 'right',
                    width: 140,
                  },
                ],
                _id: '01a072dd458dc301',
                data: "{{[\r\n  {\r\n    date: '2016-05-04',\r\n    name: 'Aleyna Kutzner',\r\n    city: 'Los Angeles',\r\n    address: 'Lohrbergstr. 86c, Süd Lilli, Saarland',\r\n    tag: 'Home'\r\n  },\r\n  {\r\n    date: '2016-05-03',\r\n    name: 'Helen Jacobi',\r\n    city: 'Los Angeles',\r\n    address: '760 A Street, South Frankfield, Illinois',\r\n    tag: 'Office'\r\n  },\r\n  {\r\n    date: '2016-05-02',\r\n    name: 'Brandon Deckert',\r\n    city: 'Los Angeles',\r\n    address: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',\r\n    tag: 'Home'\r\n  },\r\n  {\r\n    date: '2016-05-01',\r\n    name: 'Margie Smith',\r\n    city: 'Los Angeles',\r\n    address: '23618 Windsor Drive, West Ricardoview, Idaho',\r\n    tag: 'Office'\r\n  },\r\n]}}",
                border: true,
                stripe: true,
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
                            children: 'Username',
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
                            children: 'Telephone',
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
                            children: 'City',
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
                            children: 'Date',
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
                            children: 'Address',
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
    plugins: ['/plugins/web', '/plugins/ai', '/plugins/element-plus'],
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
