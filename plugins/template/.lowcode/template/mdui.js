export default {
  id: 'MDUI',
  title: 'MDUI Demo',
  schema: {
    _id: '14bdebd8-8825-4603-82a8-74e160e42c8f',
    is: 'Page',
    state: {
      count: 0,
      drawer: false,
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
                children: 'Title',
                _id: '1656be78-3401-4fee-be7a-f2d059c034fd',
              },
            ],
            _id: '27eedf71-8b0b-480e-ba9b-f4b771d1b31f',
            scrollBehavior: 'shrink elevate',
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
                            children: 'Item 1',
                            _id: 'da7953ee-561c-41ba-8075-a47033f89fda',
                          },
                          {
                            is: 'mdui-menu-item',
                            value: 'item-2',
                            children: 'Item 2',
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
                            children: 'Item 1',
                            _id: '2bbaf788-982a-48ec-8bf2-3e6befdfdf17',
                          },
                          {
                            is: 'mdui-menu-item',
                            value: 'item-2',
                            children: 'Item 2',
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
                        children: 'Panel 1',
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
                        children: 'Panel 2',
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
          {
            is: 'mdui-navigation-bar-item',
            value: 'bar-3',
            children: [
              {
                is: 'span',
                children: 'Label 3',
                _id: '33529824-ef3c-41a0-b409-b2f891c257ce',
              },
              {
                is: 'mdui-icon',
                slot: 'icon',
                name: 'place--outlined',
                _id: 'd5d79a8d-83ec-48ad-a9fb-18a1cefdf19e',
              },
              {
                is: 'mdui-icon',
                slot: 'active-icon',
                name: 'place',
                _id: 'a67e798b-a310-4e48-924d-4912c1aca801',
              },
            ],
            _id: '9e59e5d8-6c3e-41c9-be80-e3bd751acc9b',
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
