export default {
  id: 'web',
  title: 'Web Demo',
  schema: {
    _id: 'a83f0659-3fda-4c60-b8a6-ff7cd1b9c82f',
    is: 'Page',
    state: {
      count: 0,
    },
    children: [
      {
        is: 'h1',
        children: 'V-Html',
        _id: '3fbac027-ed08-47fb-ab5f-d3e25fad61e1',
        style: {
          opacity: 0.6,
        },
      },
      {
        is: 'VHtml',
        innerHTML: '<h2>Title</h2><ul><li><strong>Bold</strong></li><li><a href="https://www.baidu.com" target="_blank">www.baidu.com</a></li><li><s>Element Plus 基于 Vue 3，面向设计师和开发者的组件库</s></li><li><span style="color: rgb(255, 77, 79);">red</span> <span style="color: rgb(115, 209, 61);">green</span> <span style="color: rgb(64, 169, 255);">blue </span><span style="background-color: rgb(207, 19, 34);">bg-red</span> <span style="background-color: rgb(56, 158, 13);">bg-green</span> <span style="background-color: rgb(29, 57, 196);">bg-blue</span></li></ul>',
        _id: '212dd25a-38bc-4621-a09d-9a27b894f473',
      },
      {
        is: 'h1',
        children: 'Input',
        _id: '9c245e3b-6213-459a-ae93-da9ae1c0db8e',
        style: {
          opacity: 0.6,
        },
      },
      {
        is: 'div',
        children: [
          {
            is: 'div',
            children: [
              {
                is: 'span',
                children: 'input',
                _id: 'cf15be73-abe4-4dd2-ab4e-bce3cb827387',
                style: {
                  width: '64px',
                  display: 'inline-block',
                },
              },
              {
                is: 'input',
                _id: '62aa4a99-eac6-42d8-8062-9b7e24367ab5',
              },
            ],
            _id: '50337e2e-b8a4-438c-8e4c-d2ef269fc2fe',
          },
          {
            is: 'div',
            children: [
              {
                is: 'span',
                children: 'number',
                _id: '8b65115d-c7a3-4009-8ef1-14f1ef6914a1',
                style: {
                  width: '64px',
                  display: 'inline-block',
                },
              },
              {
                is: 'input',
                _id: 'a96c2119-4e58-4bc4-9470-c71484d63789',
                type: 'number',
                style: {},
              },
            ],
            _id: 'a8012736-e5fe-49b6-bc22-61c48e130e31',
          },
          {
            is: 'div',
            children: [
              {
                is: 'span',
                children: 'range',
                _id: '84dd8ec1-59ef-43ea-b4da-e91f26039c40',
                style: {
                  width: '64px',
                  display: 'inline-block',
                },
              },
              {
                is: 'input',
                _id: 'cf8dd097-3a96-4d94-8174-2f9abc898262',
                type: 'range',
                style: {},
              },
            ],
            _id: 'de84769d-4f80-48ae-abf9-93ad16d8f616',
          },
          {
            is: 'div',
            children: [
              {
                is: 'span',
                children: 'radio',
                _id: 'f83c5cfd-7fdc-401f-ab2e-8481254f03d2',
                style: {
                  width: '64px',
                  display: 'inline-block',
                },
              },
              {
                is: 'input',
                _id: 'cc71795c-6e4d-4ed4-a59c-de60c40f684b',
                type: 'radio',
                style: {},
              },
            ],
            _id: 'dae1599f-d94e-4386-9ba6-f9de9f90223a',
          },
          {
            is: 'div',
            children: [
              {
                is: 'span',
                children: 'checkbox',
                _id: 'a157a26c-1eda-4caf-8b90-1f3803ef96c4',
                style: {
                  width: '64px',
                  display: 'inline-block',
                },
              },
              {
                is: 'input',
                _id: '3c99c52c-2b7b-408a-8134-2cbad0e6a62e',
                type: 'checkbox',
                style: {},
              },
            ],
            _id: '9bcf938f-14e5-4f84-bb70-c2ad1d69bf0f',
          },
          {
            is: 'div',
            children: [
              {
                is: 'span',
                children: 'color',
                _id: 'c654bcfa-a8b7-4c47-b1fb-380d1bcc4a0d',
                style: {
                  width: '64px',
                  display: 'inline-block',
                },
              },
              {
                is: 'input',
                _id: '715607b2-71ff-4414-97f6-5dac59b69fde',
                type: 'color',
                style: {},
              },
            ],
            _id: '3e731394-6b2d-483b-934a-fde40972b11b',
          },
          {
            is: 'div',
            children: [
              {
                is: 'span',
                children: 'date',
                _id: '0db0dd0f-4852-415f-8742-c071eefb38fa',
                style: {
                  width: '64px',
                  display: 'inline-block',
                },
              },
              {
                is: 'input',
                _id: '61c57b1c-beac-411d-a05e-e082c3fbb882',
                type: 'date',
                style: {},
              },
            ],
            _id: 'ce9cc034-1d48-47a6-9c6b-c9810a1a8ce9',
          },
          {
            is: 'div',
            children: [
              {
                is: 'span',
                children: 'datetime',
                _id: 'f6ffa39d-b0f9-4f5d-97a6-2d2bebb5da87',
                style: {
                  width: '64px',
                  display: 'inline-block',
                },
              },
              {
                is: 'input',
                _id: '45bfeace-eaaa-488a-8a23-0eacc21b133a',
                type: 'datetime-local',
                style: {},
              },
            ],
            _id: 'b40a5eb4-d924-4a0d-8431-a78d498a6dab',
          },
          {
            is: 'div',
            children: [
              {
                is: 'span',
                children: 'month',
                _id: '6397ec4d-ae7b-4e07-ad79-40b070514aca',
                style: {
                  width: '64px',
                  display: 'inline-block',
                },
              },
              {
                is: 'input',
                _id: '4ae2b114-6303-4899-9fdf-6d6299d0dd13',
                type: 'month',
                style: {},
              },
            ],
            _id: 'da291f59-4878-42bd-ba2c-5bde052c9f52',
          },
          {
            is: 'div',
            children: [
              {
                is: 'span',
                children: 'time',
                _id: '45f44659-a3e5-4f47-8ef4-c0738d165532',
                style: {
                  width: '64px',
                  display: 'inline-block',
                },
              },
              {
                is: 'input',
                _id: '66f1fc1d-7305-4747-8780-3d9b7e89f83c',
                type: 'time',
                style: {},
              },
            ],
            _id: '9e3369c4-eb83-4249-a670-8bf4bdc78ce7',
          },
        ],
        _id: 'f3b6b256-5cfb-47d5-8d2f-0725ab4497a1',
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '4px 0px',
        },
      },
      {
        is: 'h1',
        children: 'Button',
        _id: '8c934697-265c-4781-8170-76227d1eed92',
        style: {
          opacity: 0.6,
        },
      },
      {
        is: 'button',
        children: [
          {
            is: 'span',
            children: 'button',
            _id: '6e055a4e-d467-4708-9c58-a16633cf458e',
          },
        ],
        _id: '65593e8a-52bd-4907-9f90-489a6b8a1cbf',
      },
      {
        is: 'h1',
        children: 'Details',
        _id: 'b664d9e2-ee6c-4abd-b77f-cf7a5bfe771d',
        style: {
          opacity: 0.6,
        },
      },
      {
        is: 'details',
        children: [
          {
            is: 'summary',
            children: [
              {
                is: 'span',
                children: 'title',
                _id: '4194fe66-1964-44b2-b8d4-22875c05299e',
              },
            ],
            _id: '6bf96ab7-6e31-4740-80f3-8c2a9e30753b',
          },
          {
            is: 'div',
            children: [
              {
                is: 'p',
                children: 'Element Plus 基于 Vue 3，面向设计师和开发者的组件库',
                _id: 'a59d3766-4c5a-48c8-8d67-4bb3272a2ef9',
              },
            ],
            _id: '051b72b0-ad5d-4ad6-9fb4-c32ec6215936',
          },
        ],
        _id: '27d8423b-e72b-4c40-afa4-ab84729a4b89',
      },
      {
        is: 'h1',
        children: 'Image',
        _id: '3c9deb12-6d68-4a75-868a-e2e358e94865',
        style: {
          opacity: 0.6,
        },
      },
      {
        is: 'img',
        src: 'https://element-plus.org/images/element-plus-logo-small.svg',
        style: {
          height: '128px',
        },
        _id: 'f2724c37-e3e0-4b29-ba7b-bb31f7b64198',
        loading: 'eager',
      },
      {
        is: 'h1',
        children: 'Wang-Editor',
        _id: '72027f79-96c7-4364-8470-344a282f4a46',
        style: {
          opacity: 0.6,
        },
      },
      {
        is: 'wangeditor',
        modelValue: '',
        placeholder: '请输入内容...',
        style: {
          border: '1px solid #ccc',
        },
        _id: 'd9c911e3-0282-433f-b26a-7ce7de2529af',
        toolbar: {},
      },
      {
        is: 'p',
        children: '',
        _id: 'a963520e-ba97-4696-9118-159231c030dc',
      },
    ],
    plugins: ['/plugins/web'],
    designer: {
      canvas: {
        style: {
          width: '768px',
          height: '1024px',
        },
      },
    },
    style: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
}
