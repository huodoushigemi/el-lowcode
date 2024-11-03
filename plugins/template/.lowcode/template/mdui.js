export default {
  id: 'MDUI',
  title: 'MDUI Demo',
  schema: {
    _id: '14bdebd8-8825-4603-82a8-74e160e42c8f',
    is: 'Page',
    state: {
      count: 0,
      drawer: false,
      segmented: {
        fullwidth: false,
      },
      menu: {
        dense: true,
        selects: 'single',
      },
      badge: {
        variant: 'large',
      },
      card: {
        variant: 'elevated',
        clickable: true,
      },
      chip: {
        variant: 'assist',
        elevated: false,
      },
      progress: {
        value: 0.5,
      },
    },
    children: [
      {
        is: 'div',
        children: [
          {
            is: 'mdui-top-app-bar',
            children: [
              {
                is: 'mdui-button-icon',
                icon: 'menu',
                _id: 'f06eed6c-dda5-4502-aebd-1d62a0dfca71',
                onClick: '{{(e) => {\n  state.drawer = true\n}}}',
              },
              {
                is: 'mdui-top-app-bar-title',
                'lcd-selectable': false,
                children: [
                  {
                    is: 'span',
                    _id: 'ae7bf340b5809101',
                    children: 'Title',
                  },
                ],
                _id: '1656be78-3401-4fee-be7a-f2d059c034fd',
              },
            ],
            _id: '27eedf71-8b0b-480e-ba9b-f4b771d1b31f',
            scrollBehavior: 'elevate shrink',
            variant: 'medium',
          },
          {
            is: 'mdui-collapse',
            children: [
              {
                is: 'mdui-collapse-item',
                value: '1',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/iconoir:mouse-button-left.svg',
                        _id: '2c32b831-96a6-475d-888d-4ad3fbb49736',
                        class: '',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Button',
                        _id: '989ca392-83f6-4eac-8a6f-2f0c349bb145',
                      },
                    ],
                    _id: '0e4ae616-ca2b-45a8-94e9-1b48da3e105e',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'mdui-button',
                        children: [
                          {
                            is: 'span',
                            children: 'Elevated',
                            _id: 'd1bd4f02-869d-49fc-98a5-ec48f1fd4fb7',
                          },
                        ],
                        _id: '39a1864b-1089-4155-b9f7-8e4378a07701',
                        variant: 'elevated',
                      },
                      {
                        is: 'mdui-button',
                        children: [
                          {
                            is: 'span',
                            children: 'Filled',
                            _id: '281c56ab-74ee-4626-b1a1-3f10025c5cf6',
                          },
                        ],
                        _id: '8f0ccd1a-c85b-4e74-af71-97b52cf50030',
                      },
                      {
                        is: 'mdui-button',
                        children: [
                          {
                            is: 'span',
                            children: 'Tonal',
                            _id: 'b654cbdd-fd0d-48a5-b6bc-18c0280cca46',
                          },
                        ],
                        _id: 'be46585e-90ab-476b-9147-7b3ab2e54fe9',
                        variant: 'tonal',
                      },
                      {
                        is: 'mdui-button',
                        children: [
                          {
                            is: 'span',
                            children: 'Outlined',
                            _id: 'c081949d-d610-43c6-a22c-27d559aa0848',
                          },
                        ],
                        _id: '0ed1fa32-a986-49b4-81a3-94ab69baca19',
                        variant: 'outlined',
                      },
                      {
                        is: 'mdui-button',
                        children: [
                          {
                            is: 'span',
                            children: 'Text',
                            _id: 'fb0055dc-d021-43c1-a48b-6f58295933b9',
                          },
                        ],
                        _id: '865aff24-8384-4136-bceb-14752e9d41a1',
                        variant: 'text',
                      },
                      {
                        is: 'mdui-button',
                        children: [
                          {
                            is: 'span',
                            children: 'Disabled\n\n',
                            _id: '65dcaa49-0471-4382-be80-80a6eeee8a43',
                          },
                        ],
                        _id: 'ed0d4099-398a-48cb-a138-63cc358badaa',
                        disabled: true,
                        loading: true,
                      },
                    ],
                    _id: 'a60f94fb-0a79-4237-b450-0a88b310a52a',
                    style: {
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px 10px',
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: '81548828-b3a3-4cb1-8abd-9a51f0a85ed0',
              },
              {
                is: 'mdui-collapse-item',
                value: 'button-icon',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/iconoir:mouse-button-left.svg',
                        _id: 'be31fc7c-8bde-4065-87ae-80501fb9327a',
                        class: '',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Button Icon',
                        _id: '445c4fe5-eec4-482c-a7ea-acad05c286fa',
                      },
                    ],
                    _id: '96116818-27e3-41fe-9035-bad82e11481c',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'p',
                        children: [
                          {
                            is: 'span',
                            _id: 'ae7bf340b5809102',
                            children: 'variant',
                          },
                        ],
                        _id: '05c17eec-de7d-46ba-b985-a4e6deb5713f',
                        style: {
                          marginBottom: '8px',
                          marginTop: '8px',
                        },
                      },
                      {
                        is: 'div',
                        children: [
                          {
                            is: 'mdui-button-icon',
                            children: [
                              {
                                is: 'mdui-icon',
                                name: 'search',
                                _id: 'aed0ef13-1130-4b5d-a50b-b2253bc4e458',
                              },
                            ],
                            _id: 'da761480-c5cb-42cb-8d49-edb29219abcf',
                          },
                          {
                            is: 'mdui-button-icon',
                            children: [
                              {
                                is: 'mdui-icon',
                                name: 'search',
                                _id: 'd2864fb7-9ca3-4a58-83ac-d5ef683c777e',
                              },
                            ],
                            _id: 'b2191d8c-c350-4e0a-891c-f0186c425250',
                            variant: 'filled',
                          },
                          {
                            is: 'mdui-button-icon',
                            children: [
                              {
                                is: 'mdui-icon',
                                name: 'search',
                                _id: 'c64a76bf-0005-4e0a-8c4b-94a97b28ba63',
                              },
                            ],
                            _id: '2bba04ba-c61f-46d1-8cf3-8ba59309545c',
                            variant: 'tonal',
                          },
                          {
                            is: 'mdui-button-icon',
                            children: [
                              {
                                is: 'mdui-icon',
                                src: 'https://api.iconify.design/iconoir:mouse-button-left.svg',
                                _id: '2508523e-93b4-49d1-8e1d-f09975f1e8bd',
                              },
                            ],
                            _id: 'fa628b4e-b0cf-4dfb-8776-37d3fb7f7e73',
                            variant: 'outlined',
                          },
                        ],
                        _id: 'dc716c8b-7ec4-45d5-be62-9fcd5adfdac1',
                        style: {
                          display: 'flex',
                          gap: '0px 10px',
                        },
                      },
                      {
                        is: 'p',
                        children: [
                          {
                            is: 'span',
                            _id: 'ae7bf340b5809103',
                            children: 'link',
                          },
                        ],
                        _id: 'df387e3c-57b4-4127-ac37-a1cdd9dc7e56',
                        style: {
                          marginBottom: '8px',
                          marginTop: '8px',
                        },
                      },
                      {
                        is: 'mdui-button-icon',
                        children: [
                          {
                            is: 'mdui-icon',
                            name: 'search',
                            _id: '71e0b239-d505-4466-a325-122cf1db6253',
                          },
                        ],
                        _id: '0d470c3f-d730-44db-be38-0b079105b8c1',
                        variant: 'tonal',
                        href: 'https://www.mdui.org',
                        target: '_blank',
                      },
                      {
                        is: 'p',
                        children: [
                          {
                            is: 'span',
                            _id: 'ae7bf340b5809104',
                            children: 'selectable',
                          },
                        ],
                        _id: 'aa097034-643e-470f-b766-d1e902c790e0',
                        style: {
                          marginBottom: '8px',
                          marginTop: '8px',
                        },
                      },
                      {
                        is: 'mdui-button-icon',
                        children: [
                          {
                            is: 'mdui-icon',
                            name: 'favorite_border',
                            _id: 'ca51aee7-29c6-47ec-81b3-a3d360d5d3d2',
                          },
                          {
                            is: 'mdui-menu',
                            name: 'favorite',
                            slot: 'selected-icon',
                            _id: '2df6455d-19c7-4bc2-8976-cee9cb5dab5a',
                          },
                        ],
                        _id: 'a88e570f-673b-4f62-8795-56462582747b',
                        selectable: true,
                      },
                      {
                        is: 'p',
                        children: [
                          {
                            is: 'span',
                            _id: 'ae7bf340b5809105',
                            children: 'loading',
                          },
                        ],
                        _id: 'bfeb75cb-043e-40a3-8e8b-c27ed2540c3a',
                        style: {
                          marginBottom: '8px',
                          marginTop: '8px',
                        },
                      },
                      {
                        is: 'mdui-button-icon',
                        children: [
                          {
                            is: 'mdui-icon',
                            name: 'favorite_border',
                            _id: '45910b4b-3f8f-45e5-bc04-3fc23b082486',
                          },
                        ],
                        _id: '4d16ac4f-d6cb-4b04-bd4c-8be98a2a4203',
                        variant: 'tonal',
                        loading: true,
                      },
                    ],
                    _id: '9d481ecc-473a-41b8-88fc-66bd95a8e1b7',
                    style: {
                      gap: '10px 10px',
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: '718d867b-ef68-4acb-abfe-6cda1a46dc34',
              },
              {
                is: 'mdui-collapse-item',
                value: '2',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/solar:text-field-focus-broken.svg',
                        _id: '433c48b0-8414-4358-9fb4-cf05e91de84d',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'TextField',
                        _id: 'a761c63b-c6a6-4123-81ac-ed408bad28d4',
                      },
                    ],
                    _id: '044f5a16-3664-49ae-a87d-85383f52cfcd',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'mdui-text-field',
                        label: 'Label',
                        type: 'text',
                        children: [
                          {
                            is: 'mdui-menu-item',
                            value: 'item-1',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b580910b',
                                children: 'Item 1',
                              },
                            ],
                            _id: 'da7953ee-561c-41ba-8075-a47033f89fda',
                          },
                          {
                            is: 'mdui-menu-item',
                            value: 'item-2',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b580910c',
                                children: 'Item 2',
                              },
                            ],
                            _id: '55e21515-6e68-42ec-af61-8bcb480a1189',
                          },
                        ],
                        _id: '0a06e176-597a-4c04-a088-110d8ff326c3',
                        icon: 'search',
                        endIcon: 'downloading',
                        clearable: true,
                        prefix: '$',
                        suffix: '',
                        helper: 'filled',
                      },
                      {
                        is: 'mdui-text-field',
                        label: 'Label',
                        type: 'text',
                        children: [
                          {
                            is: 'mdui-menu-item',
                            value: 'item-1',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b580910d',
                                children: 'Item 1',
                              },
                            ],
                            _id: '2bbaf788-982a-48ec-8bf2-3e6befdfdf17',
                          },
                          {
                            is: 'mdui-menu-item',
                            value: 'item-2',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b580910e',
                                children: 'Item 2',
                              },
                            ],
                            _id: '4f7e6d95-17f3-469c-8520-84fb2131443c',
                          },
                        ],
                        _id: '34de56d8-c3ad-40c3-be8c-33293ff59d2e',
                        icon: 'search',
                        endIcon: 'downloading',
                        clearable: true,
                        prefix: '$',
                        suffix: '',
                        helper: 'outlined',
                        variant: 'outlined',
                      },
                    ],
                    _id: '4438c09b-618f-4b4e-bd03-312ef1f68bcb',
                    style: {
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: '6e04d357-dfc2-484f-8757-4a4c27fa692b',
              },
              {
                is: 'mdui-collapse-item',
                value: '3',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/mdi:form-select.svg',
                        _id: 'a6690650-4271-4e75-8904-1bbf7c002c7b',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Select\n\n',
                        _id: '47bb2844-59c0-4bd5-a70a-cc8bdfaeeb25',
                      },
                    ],
                    _id: 'e69c3dc6-3232-4217-a162-39bd4aaddd40',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'mdui-select',
                        label: 'label',
                        children: [
                          {
                            is: 'mdui-menu-item',
                            value: 'item-1',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b580910f',
                                children: 'Item 1',
                              },
                            ],
                            _id: 'e8cd1abb-79fc-4bf3-83e7-d665f889b752',
                          },
                          {
                            is: 'mdui-menu-item',
                            value: 'item-2',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809110',
                                children: 'Item 2',
                              },
                            ],
                            _id: '9444c797-7858-4c74-b2a4-1434312b897b',
                          },
                        ],
                        _id: '8e27007d-9f54-47d3-85c6-0a5221d8468f',
                        icon: 'search',
                        endIcon: 'downloading',
                        prefix: '',
                        suffix: '',
                        helper: 'Filled',
                        clearable: true,
                      },
                      {
                        is: 'mdui-select',
                        label: 'label',
                        children: [
                          {
                            is: 'mdui-menu-item',
                            value: 'item-1',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809111',
                                children: 'Item 1',
                              },
                            ],
                            _id: 'd53703bb-f372-4ffe-8d7d-4c8a96cc5e89',
                          },
                          {
                            is: 'mdui-menu-item',
                            value: 'item-2',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809112',
                                children: 'Item 2',
                              },
                            ],
                            _id: '659ef91e-0467-4d04-80c8-8e910aab8b23',
                          },
                        ],
                        _id: 'f2310394-64c4-4c8f-ac41-930fbcc5f617',
                        prefix: '$',
                        suffix: '￥',
                        helper: 'Outlined',
                        variant: 'outlined',
                        clearable: true,
                      },
                    ],
                    _id: '01fd095d-6c35-43da-b16e-4d2e898f78b2',
                    style: {
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: '5b73b202-10b4-4936-994c-aeef1b54c27d',
              },
              {
                is: 'mdui-collapse-item',
                value: 'switch',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/mdi:toggle-switch-outline.svg',
                        _id: 'a86482aa-7f06-463b-b5d2-ebeb007afe03',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Switch',
                        _id: '4fc2fc76-2484-499b-8d50-b775786dfdfb',
                      },
                    ],
                    _id: '5f74bbb5-eefc-43ca-a58b-e80007078b9a',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'mdui-switch',
                        _id: 'ea629410-1ac5-44e7-ac67-48154641b230',
                      },
                      {
                        is: 'mdui-switch',
                        _id: 'cdd2eb41-7ab6-4ce7-8aa2-efa075931315',
                        uncheckedIcon: 'arrow_forward',
                      },
                      {
                        is: 'mdui-switch',
                        _id: '076c726a-ecb9-4f41-abc6-f3aef95aaeff',
                        disabled: true,
                      },
                    ],
                    _id: '7477c02f-6db9-4d6d-ae5c-72c217db8bc0',
                    style: {
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      display: 'flex',
                      gap: '12px 12px',
                      flexWrap: 'wrap',
                    },
                  },
                ],
                _id: '4aa3ce1f-628c-45ff-b650-062c04d711e1',
              },
              {
                is: 'mdui-collapse-item',
                value: 'Slider',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/radix-icons:slider.svg',
                        _id: '2df6099b-c5a3-417f-a687-8cb6208c3800',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Silder',
                        _id: 'ad05d953-0f4e-4547-946d-0447da0e441b',
                      },
                    ],
                    _id: '68d5f605-e94d-4b97-9c87-d2fa1716bd53',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'mdui-slider',
                        _id: 'ce49bce1-beda-4a7e-91ef-b621be6e55e4',
                      },
                    ],
                    _id: 'a747306f-f2c5-45e2-816f-e2c7db342730',
                    style: {
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: '5f4503f4-3fb1-4cb6-9ee3-ca8aba91e698',
              },
              {
                is: 'mdui-collapse-item',
                value: 'radios',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/mdi:radiobox-marked.svg',
                        _id: '912a53ce-7483-46e3-93a3-5aa6d4c32e01',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Radio Group',
                        _id: '51c74c5b-9679-4b40-88a9-b3efbed99a97',
                      },
                    ],
                    _id: '7f66cc6b-a77c-4310-9a05-53b51f17106c',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'mdui-radio-group',
                        children: [
                          {
                            is: 'mdui-radio',
                            value: '1',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809113',
                                children: 'Radio-1',
                              },
                            ],
                            _id: '59b6d631-b32b-4910-9bf5-f51f70f67292',
                          },
                          {
                            is: 'mdui-radio',
                            value: '2',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809114',
                                children: 'Radio-2',
                              },
                            ],
                            _id: '838b475b-05c2-42f1-b2db-66a64b1bcf82',
                          },
                          {
                            is: 'mdui-radio',
                            value: '3',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809115',
                                children: 'Radio-3',
                              },
                            ],
                            _id: 'e6c7ef76-deb6-4210-9561-4076c066f4fb',
                          },
                        ],
                        _id: '0d5e2bcf-b8ee-4929-8d49-1d3e9799f9d4',
                      },
                    ],
                    _id: '68303f23-a283-44c5-a484-f4fa3577b6d4',
                    style: {
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: '93b349f8-d950-4fde-a64d-2d4dfc1c4cc3',
              },
              {
                is: 'mdui-collapse-item',
                value: 'checkbox',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/mdi:checkbox-marked-outline.svg',
                        _id: '515102db-aeaa-43cd-81f3-293efec4690a',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Checkbox',
                        _id: '0410dc61-d975-4695-8889-d6fd17f96ffd',
                      },
                    ],
                    _id: 'f7fa8fd8-3660-4a63-a248-34643129d5ab',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'mdui-checkbox',
                        children: [
                          {
                            is: 'span',
                            _id: 'ae7bf340b5809106',
                            children: 'Checkbox',
                          },
                        ],
                        _id: '9e8526f0-f95d-476f-bb61-551dd823123a',
                      },
                      {
                        is: 'mdui-checkbox',
                        children: [
                          {
                            is: 'span',
                            _id: 'ae7bf340b5809107',
                            children: 'Checkbox',
                          },
                        ],
                        _id: '68586721-8ec5-4fcf-a872-dc71f7b59f69',
                        checked: true,
                      },
                      {
                        is: 'mdui-checkbox',
                        children: [
                          {
                            is: 'span',
                            _id: 'ae7bf340b5809108',
                            children: 'Checkbox',
                          },
                        ],
                        _id: '23396255-c5c3-4430-9fbb-99220539f5e6',
                        disabled: true,
                      },
                    ],
                    _id: 'f10e81e1-b99d-4879-b831-29beefd846eb',
                    style: {
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: 'b243b89e-26b6-43ab-9e61-374e4b2e157e',
              },
              {
                is: 'mdui-collapse-item',
                value: 'segmented',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/bi:segmented-nav.svg',
                        _id: '7123c3d2-1ebd-4aad-b183-7ae3c072658c',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Segmented Button',
                        _id: 'bf7c00b2-faaa-4e13-9054-7fd80da4da05',
                      },
                    ],
                    _id: '9268d763-41cc-4362-9b58-82c4b89c72d2',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'div',
                        children: [
                          {
                            is: 'mdui-checkbox',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809116',
                                children: 'full-width',
                              },
                            ],
                            _id: 'fa99ef82-a8e2-4290-8113-4742f849f355',
                            checked: '{{state.segmented.fullWidth}}',
                            onChange: '{{(e) => {\n  state.segmented.fullWidth = e.target.checked\n}}}',
                          },
                          {
                            is: 'mdui-checkbox',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809117',
                                children: 'disabled',
                              },
                            ],
                            _id: '060cd0f4-cbb3-4c0d-8e49-d8e28247e705',
                            checked: '{{state.segmented.disabled}}',
                            onChange: '{{(e) => {\n  state.segmented.disabled = e.target.checked\n}}}',
                          },
                        ],
                        _id: '81caa7af-5f19-47f7-b62b-dd8435dc5037',
                      },
                      {
                        is: 'mdui-segmented-button-group',
                        children: [
                          {
                            is: 'mdui-segmented-button',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809118',
                                children: 'button-1',
                              },
                            ],
                            _id: 'a12dcb0d-fcef-4c2d-b973-69b1c6755b0e',
                          },
                          {
                            is: 'mdui-segmented-button',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809119',
                                children: 'button-2',
                              },
                            ],
                            _id: '013f1105-97a4-4041-b8e0-b71fd0ff04df',
                          },
                          {
                            is: 'mdui-segmented-button',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b580911a',
                                children: 'button-3',
                              },
                            ],
                            _id: 'de2255ce-5dca-4f67-84a3-f3cd533e96d6',
                          },
                        ],
                        _id: '353778df-3565-4001-9d89-dd76a975eee1',
                        fullWidth: '{{state.segmented.fullWidth}}',
                        disabled: '{{state.segmented.disabled}}',
                      },
                    ],
                    _id: '03ad02e4-4dca-4df9-8a92-41ff82b820fc',
                    style: {
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: '951dfcfd-c986-4713-9681-75eaf4e1bf79',
              },
              {
                is: 'mdui-collapse-item',
                value: 'menu',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/material-symbols:menu-book-outline.svg',
                        _id: 'ae7bf340b580911b',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Menu',
                        _id: 'ae7bf340b580911c',
                      },
                    ],
                    _id: 'ae7bf340b580911d',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'div',
                        children: [
                          {
                            is: 'mdui-checkbox',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b580911e',
                                children: 'dense',
                              },
                            ],
                            _id: 'ae7bf340b580911f',
                            checked: '{{state.menu.dense}}',
                            onChange: '{{(e) => {\n  state.menu.dense = e.target.checked\n}}}',
                          },
                          {
                            is: 'mdui-checkbox',
                            children: [
                              {
                                is: 'span',
                                _id: 'ae7bf340b5809120',
                                children: 'selectable',
                              },
                            ],
                            _id: 'ae7bf340b5809121',
                            checked: "{{state.menu.selects == 'single'}}",
                            onChange: "{{(e) => {\n  state.menu.selects = e.target.checked ? 'single' : ''\n}}}",
                          },
                          {
                            is: 'mdui-menu',
                            children: [
                              {
                                is: 'mdui-menu-item',
                                value: 1,
                                children: [
                                  {
                                    is: 'span',
                                    children: 'Item 1',
                                    _id: '04ec6c02c2323b04',
                                  },
                                  {
                                    is: 'mdui-icon',
                                    name: 'visibility',
                                    slot: 'icon',
                                    _id: '04ec6c02c2323b05',
                                  },
                                ],
                                _id: '04ec6c02c2323b01',
                              },
                              {
                                is: 'mdui-menu-item',
                                value: 2,
                                children: [
                                  {
                                    is: 'span',
                                    children: 'Item 2',
                                    _id: '04ec6c02c2323b06',
                                  },
                                  {
                                    is: 'mdui-icon',
                                    name: 'visibility',
                                    slot: 'icon',
                                    _id: '04ec6c02c2323b07',
                                  },
                                ],
                                _id: '04ec6c02c2323b02',
                              },
                              {
                                is: 'mdui-menu-item',
                                value: 3,
                                children: [
                                  {
                                    is: 'span',
                                    children: 'Item 3',
                                    _id: '04ec6c02c2323b08',
                                  },
                                  {
                                    is: 'mdui-icon',
                                    name: 'visibility',
                                    slot: 'icon',
                                    _id: '04ec6c02c2323b09',
                                  },
                                ],
                                _id: '04ec6c02c2323b03',
                              },
                            ],
                            _id: '04ec6c02c2323b00',
                            dense: '{{state.menu.dense}}',
                            selects: '{{state.menu.selects}}',
                          },
                        ],
                        _id: 'ae7bf340b5809122',
                      },
                    ],
                    _id: 'ae7bf340b580912a',
                    style: {
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: 'ae7bf340b580912b',
              },
              {
                is: 'mdui-collapse-item',
                value: 'badge',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/mdi:square-rounded-badge-outline.svg',
                        _id: 'c2a5f7e110987302',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Badge\n\n',
                        _id: 'c2a5f7e110987303',
                      },
                    ],
                    _id: 'c2a5f7e110987304',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'div',
                        children: [
                          {
                            is: 'mdui-segmented-button-group',
                            children: [
                              {
                                is: 'mdui-segmented-button',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'small',
                                    _id: '91355dfeef713b04',
                                  },
                                ],
                                _id: '91355dfeef713b01',
                                value: 'small',
                              },
                              {
                                is: 'mdui-segmented-button',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'large',
                                    _id: '91355dfeef713b05',
                                  },
                                ],
                                _id: '91355dfeef713b02',
                                value: 'large',
                              },
                            ],
                            _id: '91355dfeef713b00',
                            value: '{{state.badge.variant}}',
                            onChange: '{{(e) => {\n  state.badge.variant = e.target.value\n}}}',
                            selects: 'single',
                          },
                        ],
                        _id: 'c2a5f7e110987313',
                      },
                      {
                        is: 'mdui-badge',
                        variant: '{{state.badge.variant}}',
                        children: '99+',
                        _id: '1f9a9a6e28210000',
                      },
                    ],
                    _id: 'c2a5f7e110987314',
                    style: {
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: 'c2a5f7e110987315',
              },
              {
                is: 'mdui-collapse-item',
                value: 'card',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/mdi:card-outline.svg',
                        _id: '2d7df93dc6707401',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Card\n\n',
                        _id: '2d7df93dc6707402',
                      },
                    ],
                    _id: '2d7df93dc6707403',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'div',
                        children: [
                          {
                            is: 'mdui-segmented-button-group',
                            children: [
                              {
                                is: 'mdui-segmented-button',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'elevated',
                                    _id: '2d7df93dc6707404',
                                  },
                                ],
                                _id: '2d7df93dc6707405',
                                value: 'elevated',
                              },
                              {
                                is: 'mdui-segmented-button',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'filled',
                                    _id: '2d7df93dc6707406',
                                  },
                                ],
                                _id: '2d7df93dc6707407',
                                value: 'filled',
                              },
                              {
                                is: 'mdui-segmented-button',
                                children: [
                                  {
                                    is: 'span',
                                    children: '\noutlined',
                                    _id: '2d7df93dc670740d',
                                  },
                                ],
                                _id: '2d7df93dc670740e',
                                value: 'outlined',
                              },
                            ],
                            _id: '2d7df93dc6707408',
                            value: '{{state.card.variant}}',
                            onChange: '{{(e) => {\n  state.card.variant = e.target.value\n}}}',
                            selects: 'single',
                          },
                          {
                            is: 'mdui-checkbox',
                            children: [
                              {
                                is: 'span',
                                children: 'Checkbox',
                                _id: '9c9071e5fd749501',
                              },
                            ],
                            _id: '9c9071e5fd749500',
                            checked: '{{state.card.clickable}}',
                            onChange: '{{(e) => {\n  state.card.clickable = e.target.checked\n}}}',
                          },
                        ],
                        _id: '2d7df93dc6707409',
                      },
                      {
                        is: 'mdui-card',
                        children: [],
                        _id: '1f9a9a6e28210001',
                        style: {
                          width: '327px',
                          height: '100px',
                        },
                        variant: '{{state.card.variant}}',
                        clickable: '{{state.card.clickable}}',
                      },
                    ],
                    _id: '2d7df93dc670740b',
                    style: {
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: '2d7df93dc670740c',
              },
              {
                is: 'mdui-collapse-item',
                value: 'chip',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/material-symbols:finance-chip-outline.svg',
                        _id: '2b6ad22c50114f01',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Chip',
                        _id: '2b6ad22c50114f02',
                      },
                    ],
                    _id: '2b6ad22c50114f03',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'div',
                        children: [
                          {
                            is: 'mdui-segmented-button-group',
                            children: [
                              {
                                is: 'mdui-segmented-button',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'assist',
                                    _id: '2b6ad22c50114f04',
                                  },
                                ],
                                _id: '2b6ad22c50114f05',
                                value: 'assist',
                              },
                              {
                                is: 'mdui-segmented-button',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'filter',
                                    _id: '2b6ad22c50114f06',
                                  },
                                ],
                                _id: '2b6ad22c50114f07',
                                value: 'filter',
                              },
                              {
                                is: 'mdui-segmented-button',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'input',
                                    _id: '2b6ad22c50114f08',
                                  },
                                ],
                                _id: '2b6ad22c50114f09',
                                value: 'input',
                              },
                              {
                                is: 'mdui-segmented-button',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'suggestion',
                                    _id: 'e0cc10a15bb3220c',
                                  },
                                ],
                                _id: 'e0cc10a15bb3220d',
                                value: 'suggestion',
                              },
                            ],
                            _id: '2b6ad22c50114f0a',
                            value: '{{state.chip.variant}}',
                            onChange: '{{(e) => {\n  state.chip.variant = e.target.value\n}}}',
                            selects: 'single',
                          },
                          {
                            is: 'mdui-checkbox',
                            children: [
                              {
                                is: 'span',
                                children: 'Elevated',
                                _id: '2b6ad22c50114f0b',
                              },
                            ],
                            _id: '2b6ad22c50114f0c',
                            checked: '{{state.chip.elevated}}',
                            onChange: '{{(e) => {\n  state.chip.elevated = e.target.checked\n}}}',
                          },
                          {
                            is: 'div',
                            children: [
                              {
                                is: 'mdui-chip',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'chip',
                                    _id: 'e0cc10a15bb32202',
                                  },
                                ],
                                _id: 'e0cc10a15bb32203',
                                variant: '{{state.chip.variant}}',
                                elevated: '{{state.chip.elevated}}',
                              },
                              {
                                is: 'mdui-chip',
                                children: [
                                  {
                                    is: 'mdui-icon',
                                    src: 'https://api.iconify.design/iconoir:mouse-button-left.svg',
                                    _id: 'e0cc10a15bb32204',
                                    slot: 'icon',
                                  },
                                  {
                                    is: 'span',
                                    children: 'icon\n\n',
                                    _id: 'e0cc10a15bb32205',
                                  },
                                ],
                                _id: 'e0cc10a15bb32206',
                                variant: '{{state.chip.variant}}',
                                elevated: '{{state.chip.elevated}}',
                              },
                              {
                                is: 'mdui-chip',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'del\n\n',
                                    _id: 'e0cc10a15bb32207',
                                  },
                                ],
                                _id: 'e0cc10a15bb32208',
                                deletable: true,
                                variant: '{{state.chip.variant}}',
                                elevated: '{{state.chip.elevated}}',
                              },
                              {
                                is: 'mdui-chip',
                                children: [
                                  {
                                    is: 'span',
                                    children: 'toogle\n\n',
                                    _id: 'e0cc10a15bb32209',
                                  },
                                ],
                                _id: 'e0cc10a15bb3220a',
                                selectable: true,
                                selected: true,
                                variant: '{{state.chip.variant}}',
                                elevated: '{{state.chip.elevated}}',
                              },
                            ],
                            _id: 'e0cc10a15bb3220b',
                            style: {
                              display: 'flex',
                              gap: '0px 8px',
                            },
                          },
                        ],
                        _id: '2b6ad22c50114f0d',
                      },
                    ],
                    _id: '2b6ad22c50114f0f',
                    style: {
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: '2b6ad22c50114f10',
              },
              {
                is: 'mdui-collapse-item',
                value: 'linear-progress',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/arcticons:progressbar95.svg',
                        _id: 'e0cc10a15bb32229',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Linear Progress',
                        _id: 'e0cc10a15bb3222a',
                      },
                    ],
                    _id: 'e0cc10a15bb3222b',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'mdui-slider',
                        _id: 'c3eba729e5d41c01',
                        value: '{{state.progress.value}}',
                        onChange: '{{(e) => {\n  state.progress.value = e.target.value\n}}}',
                        max: 1,
                        step: 0.1,
                        nolabel: true,
                      },
                      {
                        is: 'mdui-linear-progress',
                        _id: '78e4257d8e193500',
                        value: '{{state.progress.value}}',
                      },
                      {
                        is: 'mdui-linear-progress',
                        _id: '78e4257d8e193501',
                      },
                    ],
                    _id: 'e0cc10a15bb32242',
                    style: {
                      paddingBottom: '16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    },
                  },
                ],
                _id: 'e0cc10a15bb32243',
              },
              {
                is: 'mdui-collapse-item',
                value: 'tooltip',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/mdi:tooltip-outline.svg',
                        _id: '0c3f4a01156ae390',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Tooltip\n\n',
                        _id: '0c3f4a01156ae391',
                      },
                    ],
                    _id: '0c3f4a01156ae392',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'mdui-tooltip',
                        children: [
                          {
                            is: 'mdui-button',
                            children: [
                              {
                                is: 'span',
                                children: 'Hover Me',
                                _id: '16496f7633463a03',
                              },
                            ],
                            _id: '16496f7633463a01',
                          },
                          {
                            is: 'span',
                            children: 'Plain tooltip',
                            slot: 'content',
                            _id: '16496f7633463a02',
                          },
                        ],
                        _id: '16496f7633463a00',
                        trigger: 'hover focus',
                      },
                    ],
                    _id: 'fbceac8314ba0804',
                    style: {
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      paddingBottom: '16px',
                    },
                  },
                ],
                _id: '0c3f4a01156ae397',
              },
              {
                is: 'mdui-collapse-item',
                value: 'function',
                children: [
                  {
                    is: 'mdui-list-item',
                    slot: 'header',
                    children: [
                      {
                        is: 'mdui-icon',
                        src: 'https://api.iconify.design/mdi:function.svg',
                        _id: '5d0542f83c3fb801',
                        slot: 'icon',
                      },
                      {
                        is: 'span',
                        children: 'Function\n\n',
                        _id: '5d0542f83c3fb802',
                      },
                    ],
                    _id: '5d0542f83c3fb803',
                  },
                  {
                    is: 'div',
                    children: [
                      {
                        is: 'mdui-button',
                        children: [
                          {
                            is: 'span',
                            children: 'Alert\n\n',
                            _id: '16496f7633463a06',
                            onClick: '{{}}',
                          },
                        ],
                        _id: '16496f7633463a05',
                        onClick: '{{(e) => {\n  window.mdui.alert({\n    headline: "Alert Title",\n    description: "Alert description",\n    confirmText: "OK",\n    onConfirm: () => console.log("confirmed"),\n  })\n}}}',
                      },
                      {
                        is: 'mdui-button',
                        children: [
                          {
                            is: 'span',
                            children: 'Prompt',
                            _id: '4f2b292d85db9c03',
                            onClick: '{{}}',
                          },
                        ],
                        _id: '4f2b292d85db9c04',
                        onClick: '{{(e) => {\n  window.mdui.prompt({\n    headline: "Prompt Title",\n    description: "Prompt description",\n    confirmText: "OK",\n    cancelText: "Cancel",\n    onConfirm: (value) => console.log("confirmed: " + value),\n    onCancel: () => console.log("canceled"),\n  })\n}}}',
                      },
                      {
                        is: 'mdui-button',
                        children: [
                          {
                            is: 'span',
                            children: 'Snackbar',
                            _id: '4f2b292d85db9c07',
                            onClick: '{{}}',
                          },
                        ],
                        _id: '4f2b292d85db9c08',
                        onClick: '{{(e) => {\n  window.mdui.snackbar({\n    message: "Photo archived",\n    action: "Undo",\n    onActionClick: () => console.log("click action button")\n  })\n}}}',
                      },
                    ],
                    _id: '16496f7633463a04',
                    style: {
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      paddingBottom: '16px',
                      display: 'flex',
                      gap: '8px 8px',
                    },
                  },
                ],
                _id: '5d0542f83c3fb809',
              },
            ],
            _id: 'af05cf3d-d4bf-407a-91b3-b9ea5bc86eb3',
          },
          {
            is: 'mdui-navigation-drawer',
            modal: true,
            closeOnEsc: true,
            closeOnOverlayClick: true,
            _id: '40bff344-0e5b-4fd4-8767-691fd3daaa29',
            open: '{{state.drawer}}',
            onClose: '{{(e) => {\n  state.drawer = false\n}}}',
            children: [
              {
                is: 'MdUiTabs2',
                placement: 'top-start',
                children: [
                  {
                    is: 'mdui-tab-panel',
                    label: 'Tab 1',
                    children: [
                      {
                        is: 'h1',
                        children: [
                          {
                            is: 'span',
                            _id: 'ae7bf340b5809109',
                            children: 'Panel 1',
                          },
                        ],
                        _id: '51dd1e1b-c542-48f8-a167-ccb364717b59',
                      },
                    ],
                    _id: '7805851a-c5a4-449e-9b6b-230e52b64635',
                  },
                  {
                    is: 'mdui-tab-panel',
                    label: 'Tab 2',
                    children: [
                      {
                        is: 'h1',
                        children: [
                          {
                            is: 'span',
                            _id: 'ae7bf340b580910a',
                            children: 'Panel 2',
                          },
                        ],
                        _id: '6986cafa-d73f-4891-ae4c-2fa41df33c5f',
                      },
                    ],
                    _id: 'a0173947-17bf-4782-9e89-dac2f3f97ded',
                  },
                ],
                _id: 'c56ba9f7-4aaa-4e41-956a-2aba35836e6e',
              },
            ],
          },
        ],
        _id: 'e16de66e-9578-47af-a4fc-1f678cc2563e',
      },
      {
        is: 'mdui-navigation-bar',
        value: 'bar-1',
        children: [
          {
            is: 'mdui-navigation-bar-item',
            value: 'bar-1',
            children: [
              {
                is: 'span',
                children: 'Label 1',
                _id: '6e38d7f5-11e7-4e61-a9ac-4e5c24119195',
              },
              {
                is: 'mdui-icon',
                slot: 'icon',
                name: 'place--outlined',
                _id: 'c8ff5c77-8185-48de-9746-010febe9af59',
              },
              {
                is: 'mdui-icon',
                slot: 'active-icon',
                name: 'place',
                _id: 'b330362f-5f62-482c-bf68-7ebf0b9f5a71',
              },
            ],
            _id: 'a4495c9c-433b-468c-93b3-138810525805',
          },
          {
            is: 'mdui-navigation-bar-item',
            value: 'bar-2',
            children: [
              {
                is: 'span',
                children: 'Label 2',
                _id: 'f6dbe2cd-7a5e-48e6-aecc-882baeab9fd0',
              },
              {
                is: 'mdui-icon',
                slot: 'icon',
                name: 'place--outlined',
                _id: '2ed0ba60-bce6-4482-863f-346dad273271',
              },
              {
                is: 'mdui-icon',
                slot: 'active-icon',
                name: 'place',
                _id: '05dc6f0c-147e-49f6-8041-b9d118bd5cf0',
              },
            ],
            _id: '0bb5f813-7f5c-45e7-9b49-96bf29b9df94',
          },
        ],
        _id: 'c5ac5d21-f900-4778-bb6c-0809253fc240',
      },
    ],
    plugins: ['/plugins/web', '/plugins/mdui'],
    designer: {
      canvas: {
        style: {
          width: '375px',
          height: '667px',
        },
      },
    },
  },
}
