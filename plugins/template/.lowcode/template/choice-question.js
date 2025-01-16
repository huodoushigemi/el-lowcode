export default {
  id: 'choice-question',
  title: '选择填空',
  cover: () => import('./choice-question.png?url').then(e => e.default),
  schema: {
    children: [
      {
        is: 'ElFormLcd',
        _id: '15870304-528c-4f18-b4c2-7529dcb30837',
        labelWidth: 20,
        style: {
          overflow: 'hidden',
        },
        children: [
          {
            is: 'h2',
            _id: '44ad8bba-071b-4e13-ba07-a1fe02cc8c21',
            children: '选择题',
          },
          {
            is: 'p',
            _id: 'e8528607-9d5c-4d57-b770-8f9be6017490',
            children: '1. 哪一个是正确的？',
          },
          {
            is: 'hljs',
            _id: 'c63abc01-0ace-492e-8215-f35828d04e87',
            theme: 'a11y-dark',
            lang: 'javascript',
            code: "const bird = {\n  size: 'small'\n}\n\nconst mouse = {\n  name: 'Mickey',\n  small: true\n}",
            style: {
              'margin-left': '20px',
            },
          },
          {
            is: 'ElFormItemRender',
            _id: '926bd712-0d10-476f-9dac-7bec3b29bbbd',
            label: '',
            prop: 'radio1',
            defaultValue: '',
            children: [
              {
                is: 'ElRadioGroup',
                _id: '926bd712-0d10-476f-9dac-7bec3b29bbbx',
                type: false,
                size: 'default',
                disabled: false,
                children: [
                  {
                    is: 'ElRadio',
                    _id: '926bd712-0d10-476f-9dac-7bec3b29bbbx-1',
                    label: 'A. mouse.bird.size 是无效的',
                    value: 'a',
                  },
                  {
                    is: 'ElRadio',
                    _id: '926bd712-0d10-476f-9dac-7bec3b29bbbx-2',
                    label: 'B. mouse[bird.size] 是无效的',
                    value: 'b',
                  },
                  {
                    is: 'ElRadio',
                    _id: '926bd712-0d10-476f-9dac-7bec3b29bbbx-3',
                    label: 'C. mouse[bird["size"]] 是无效的',
                    value: 'c',
                  },
                  {
                    is: 'ElRadio',
                    _id: '926bd712-0d10-476f-9dac-7bec3b29bbbx-4',
                    label: 'D. 以上三个选项都是有效的',
                    value: 'd',
                  },
                ],
              },
            ],
            style: {
              marginTop: '10px',
            },
          },
          {
            is: 'p',
            _id: 'e1e4b887-c9e5-4b9e-ac0c-a2fdf97f8de4',
            children: '2. 下面打印正确的是',
          },
          {
            is: 'hljs',
            _id: '6b90872c-62a1-4aa3-a0f7-6bbffbcf5c5f',
            theme: 'a11y-dark',
            lang: 'javascript',
            code: 'var obj = {}; \nconsole.log(delete obj.p)',
            style: {
              'margin-left': '20px',
            },
          },
          {
            is: 'ElFormItemRender',
            label: '',
            prop: 'radio2',
            children: [
              {
                is: 'ElRadioGroup',
                defaultValue: '',
                children: [
                  {
                    is: 'ElRadio',
                    label: 'A. true',
                    value: 'a',
                    _id: '76f470a0-c992-46f5-a882-097891b2b3f5',
                  },
                  {
                    is: 'ElRadio',
                    label: 'B. false',
                    value: 'b',
                    _id: '9b5b134f-0106-4c61-8431-fd6f66cdd9f6',
                  },
                  {
                    is: 'ElRadio',
                    label: 'C. 报错',
                    value: 'c',
                    _id: '41745aa9-bb84-422d-a9ff-e6e9a6d76705',
                  },
                  {
                    is: 'ElRadio',
                    label: 'D. undefined',
                    value: 'd',
                    _id: '55d4b0c5-d8d8-4833-a60e-2d57cd2810d4',
                  },
                ],
                _id: 'e558488f-5b7d-4f55-9b3b-693fc8354d4a',
              },
            ],
            _id: '929d0c2c-6a75-47d0-b2ae-c078e341baee',
            style: {
              marginTop: '10px',
            },
          },
          {
            is: 'p',
            _id: 'd1e766ab-f61e-4544-9f81-486ecc685a0f',
            children: '3. 下面打印正确的是',
          },
          {
            is: 'hljs',
            _id: '8544bf64-b2a9-4f4d-a452-a0f50f274730',
            theme: 'a11y-dark',
            lang: 'javascript',
            code: "var f = function () { console.log('1'); } \nfunction f() { console.log('2'); } \nf()",
            style: {
              'margin-left': '20px',
            },
          },
          {
            is: 'ElFormItemRender',
            label: '',
            prop: 'radio3',
            children: [
              {
                is: 'ElRadioGroup',
                defaultValue: '',
                children: [
                  {
                    is: 'ElRadio',
                    label: 'A. 1',
                    value: 'a',
                    _id: 'd3c4690e-9ea5-403e-be62-738357eaa740',
                  },
                  {
                    is: 'ElRadio',
                    label: 'B. 2',
                    value: 'b',
                    _id: 'cada806b-b675-4ca5-8f82-f5cabe7bf5fc',
                  },
                  {
                    is: 'ElRadio',
                    label: 'C. 报错',
                    value: 'c',
                    _id: 'a5cabb1c-e394-4e31-97ce-207440b5159c',
                  },
                  {
                    is: 'ElRadio',
                    label: 'D. undefined',
                    value: 'd',
                    _id: 'fa2fbac0-4a4a-45ff-b935-e67b263d0551',
                  },
                ],
                _id: 'e1c1ca0d-9ede-4d0e-8a8c-08e80b420fa4',
              },
            ],
            _id: 'e531f778-10f5-4afa-ad24-334171fa586d',
            style: {
              marginTop: '10px',
            },
          },
          {
            is: 'h2',
            _id: '206f027a-5269-4a72-963f-b8921014d8f8',
            children: '填空题',
          },
          {
            is: 'p',
            _id: 'd2ebe941-821c-4c6d-9c00-f16be7aa3c8b',
            children: '1. 下面打印 name 值是什么',
          },
          {
            is: 'hljs',
            _id: '97d169a7-6bec-4786-a324-34c2514caa95',
            theme: 'a11y-dark',
            lang: 'javascript',
            code: 'var name = "jimmy";\nvar a = {\n    name: "chimmy",\n    fn : function () {\n        console.log(this.name); \n    }\n}\na.fn();',
            style: {
              'margin-left': '20px',
            },
          },
          {
            is: 'ElFormItemRender',
            label: '',
            prop: 'input1',
            children: [
              {
                is: 'ElInput',
                defaultValue: '',
                _id: '2b480b38-6605-476b-baa1-998b2ecf8e5a',
                placeholder: '答',
              },
            ],
            _id: '5b8113e7-73eb-49ab-9cff-a234f39b56e1',
            style: {
              marginTop: '10px',
            },
          },
        ],
        model: '{{state.formData}}',
      },
    ],
    state: {
      count: 0,
      formData: {},
    },
    is: 'Page',
    _id: '13f4e3cc-2aca-4f04-8507-f9d52411a34a',
    style: {
      padding: '12px',
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
