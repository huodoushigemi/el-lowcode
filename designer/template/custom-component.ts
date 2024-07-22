export default {
  id: 'custom-component',
  title: '自定义组件',
  schema: () => ({
    is: 'Page',
    _id: 'cebde1a5-23ee-498e-a179-cc2df5c3fe38',
    children: [
      {
        is: 'AQrcode',
        _id: '45ea7e8f-45f0-4faa-8666-e814da6b0ad3',
        value: 'https://www.antdv.com/',
        icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
        bgColor: '#ffffff80',
        style: {
          margin: 'auto',
        },
      },
      {
        is: 'ASegmented',
        _id: 'ddec7e6b-e038-4bed-8b18-aaf22d1c7c9c',
        options: "{{['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}}",
        value: '{{state.segmented}}',
        'onUpdate:value': '{{val => state.segmented = val}}',
      },
      {
        is: 'AButton',
        _id: 'ecac862d-39aa-4690-a41a-67e188f1d805',
        children: 'Primary Button',
        type: 'primary',
      },
      {
        is: 'MyAudio',
        _id: '6e8473c8-bd70-43f7-b1eb-b7152fe1851c',
        controls: true,
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
      },
      {
        is: 'sl-split-panel',
        _id: 'b0d5407a-4c15-4c53-ac97-8397c89b68a9',
        children: [
          {
            is: 'div',
            _id: 'bf167330-53ca-4bfa-bb48-f603b451f2e4',
            slot: 'start',
            children: [
              {
                is: 'img',
                _id: 'fbcbdfc7-513b-46d3-9ee1-25259f4a12ec',
                src: 'https://element-plus.gitee.io/images/element-plus-logo.svg',
                style: {
                  width: '100%',
                },
                loading: 'eager',
              },
            ],
          },
          {
            is: 'div',
            _id: '4e885867-9257-4415-b936-d8446c1b2393',
            slot: 'end',
            children: [
              {
                is: 'img',
                _id: 'ba1b9a59-7eb7-44f8-b7fd-6bdf995477c9',
                src: 'https://element-plus.gitee.io/images/element-plus-logo.svg',
                style: {
                  width: '100%',
                },
                loading: 'eager',
              },
            ],
          },
        ],
        position: 44,
      },
    ],
    state: {
      count: 0,
    },
    esm: {
      MyAudio: "import { createElementVNode as _createElementVNode, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, openBlock as _openBlock, createElementBlock as _createElementBlock } from \"vue\"\n\nconst _hoisted_1 = { style: {\"padding\":\"20px\"} }\nconst _hoisted_2 = /*#__PURE__*/_createElementVNode(\"p\", null, \"我是自定义的 audio 组件\", -1 /* HOISTED */)\n\n\r\nexport const el_lowcode = {\r\n  is: 'MyAudio',\r\n  label: '音频',\r\n  props: [\r\n    { lp: 'src' },\r\n    { lp: 'autoplay', type: 'switch' },\r\n    { lp: 'loop', type: 'switch' },\r\n    { lp: 'muted', type: 'switch' },\r\n  ],\r\n  defaultProps: () => ({\r\n    controls: true,\r\n    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',\r\n  })\r\n}\r\n\n\nconst __sfc__ = /*#__PURE__*/Object.assign({ name: 'MyAudio' }, {\n  setup(__props) {\n\r\n\r\n\nreturn (_ctx, _cache) => {\n  return (_openBlock(), _createElementBlock(\"div\", _hoisted_1, [\n    _hoisted_2,\n    _createElementVNode(\"audio\", _normalizeProps(_guardReactiveProps(_ctx.$attrs)), null, 16 /* FULL_PROPS */)\n  ]))\n}\n}\n\n})\n\nconst styleEl = document.createElement('style')\n    styleEl.innerHTML =  ``\n    document.body.append(styleEl)\n\n\nexport default __sfc__",
      AButton: "\r\nimport { Button } from 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/antd.esm.min.js'\r\n\r\nconst __sfc__ = Button\r\n\r\nexport const el_lowcode = {\r\n  // 组件显示名\r\n  label: '按钮',\r\n  // 右侧的属性面板\r\n  props: [\r\n    { lp: 'children' },\r\n    { lp: 'type', type: 'radio-group', options: ['primary', 'ghost', 'dashed', 'default'], el: { type: '' } },\r\n    { lp: 'block', type: 'switch' },\r\n    { lp: 'disabled', type: 'switch' },\r\n    { lp: 'ghost', type: 'switch' },\r\n    { lp: 'danger', type: 'switch' },\r\n  ],\r\n  // 属性默认值\r\n  defaultProps: () => ({\r\n    children: 'Primary Button',\r\n    type: 'primary',\r\n  })\r\n}\r\n\n\nconst styleEl = document.createElement('style')\n    styleEl.innerHTML =  `\n@import 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/reset.css'\r\n`\n    document.body.append(styleEl)\n\n\nexport default __sfc__",
      AQrcode: "\r\nimport { QRCode } from 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/antd.esm.min.js'\r\n\r\nconst __sfc__ = QRCode\r\n\r\nexport const el_lowcode = {\r\n  // 组件显示名\r\n  label: '二维码',\r\n  // 右侧的属性面板\r\n  props: [\r\n    { lp: ['url', 'value'] },\r\n    { lp: 'icon' },\r\n    { lp: 'type', type: 'radio-group', displayValue: 'canvas', options: ['canvas', 'svg'] },\r\n    { lp: 'bg-color', type: 'color-picker' },\r\n    { lp: 'error-level', type: 'radio-group', displayValue: 'M', options: ['L', 'M', 'Q', 'H'] },\r\n  ],\r\n  // 属性默认值\r\n  defaultProps: () => ({\r\n    value: 'https://www.antdv.com/',\r\n    icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',\r\n    bgColor: '#ffffff80'\r\n  })\r\n}\r\n\n\nconst styleEl = document.createElement('style')\n    styleEl.innerHTML =  `\n@import 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/reset.css'\r\n`\n    document.body.append(styleEl)\n\n\nexport default __sfc__",
      ASegmented: "\r\nimport { Segmented } from 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/antd.esm.min.js'\r\n\r\nconst __sfc__ = Segmented\r\n\r\nexport const el_lowcode = {\r\n  // 组件显示名\r\n  label: '分段',\r\n  // 右侧的属性面板\r\n  props: [\r\n    { lp: 'options', scripable: true }\r\n  ],\r\n  // 属性默认值\r\n  defaultProps: () => ({\r\n    options: `{{['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}}`,\r\n    value: '{{state.segmented}}',\r\n    'onUpdate:value': '{{val => state.segmented = val}}'\r\n  })\r\n}\r\n\n\nconst styleEl = document.createElement('style')\n    styleEl.innerHTML =  `\n@import 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/reset.css'\r\n`\n    document.body.append(styleEl)\n\n\nexport default __sfc__",
      MyCard: 'import { createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, createVNode as _createVNode, mergeProps as _mergeProps, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"\n\nconst _hoisted_1 = ["src"]\nconst _hoisted_2 = /*#__PURE__*/_createElementVNode("br", null, null, -1 /* HOISTED */)\nconst _hoisted_3 = /*#__PURE__*/_createElementVNode("br", null, null, -1 /* HOISTED */)\nconst _hoisted_4 = /*#__PURE__*/_createElementVNode("small", null, "6 weeks old", -1 /* HOISTED */)\nconst _hoisted_5 = { slot: "footer" }\n\nimport \'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/card/card.js\'\r\nimport \'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/button/button.js\'\r\nimport \'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/rating/rating.js\'\r\n\r\n// 组件名（必须）\r\n\r\nexport const el_lowcode = {\r\n  // 组件显示名\r\n  label: \'卡片\',\r\n  // 右侧的属性面板\r\n  props: [\r\n    { lp: \'cover\' },\r\n    { lp: \'title\' },\r\n    { lp: \'desc\' },\r\n  ],\r\n  // 属性默认值\r\n  defaultProps: () => ({\r\n    cover: \'https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80\',\r\n    title: \'Mittens\',\r\n    desc: \'This kitten is as cute as he is playful. Bring him home today\'\r\n  })\r\n}\r\n\n\nconst __sfc__ = /*#__PURE__*/Object.assign({ name: \'MyCard\' }, {\n  props: {\r\n  cover: String,\r\n  title: String,\r\n  desc: String,\r\n},\n  setup(__props) {\n\r\n\r\n\r\n\r\n\r\nfunction onClick() {\r\n  alert(\'clicked\')\r\n}\r\n\nreturn (_ctx, _cache) => {\n  const _component_sl_button = _resolveComponent("sl-button")\n  const _component_sl_rating = _resolveComponent("sl-rating")\n  const _component_sl_card = _resolveComponent("sl-card")\n\n  return (_openBlock(), _createElementBlock(_Fragment, null, [\n    _createCommentVNode(" see https://shoelace.style/components/card "),\n    _createVNode(_component_sl_card, _mergeProps({ class: "card-overview" }, _ctx.$attrs), {\n      default: _withCtx(() => [\n        _createElementVNode("img", {\n          slot: "image",\n          src: __props.cover\n        }, null, 8 /* PROPS */, _hoisted_1),\n        _createElementVNode("strong", null, _toDisplayString(__props.title), 1 /* TEXT */),\n        _hoisted_2,\n        _createTextVNode(" " + _toDisplayString(__props.desc), 1 /* TEXT */),\n        _hoisted_3,\n        _hoisted_4,\n        _createElementVNode("div", _hoisted_5, [\n          _createVNode(_component_sl_button, {\n            variant: "primary",\n            pill: "",\n            onClick: onClick\n          }, {\n            default: _withCtx(() => [\n              _createTextVNode("More Info")\n            ]),\n            _: 1 /* STABLE */\n          }),\n          _createVNode(_component_sl_rating)\n        ])\n      ]),\n      _: 1 /* STABLE */\n    }, 16 /* FULL_PROPS */)\n  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))\n}\n}\n\n})\n\nconst styleEl = document.createElement(\'style\')\n    styleEl.innerHTML =  `\n@import \'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/themes/dark.css\';\n.card-overview {\r\n  max-width: 300px;\r\n  font-size: 16px;\r\n  line-height: 1.8;\n}\n.card-overview small {\r\n  color: var(--sl-color-neutral-500);\n}\n.card-overview [slot=\'footer\'] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\n}\r\n`\n    document.body.append(styleEl)\n\n\nexport default __sfc__',
      'sl-split-panel': "\r\nimport 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/split-panel/split-panel.js'\r\nimport uuid from 'https://cdn.jsdelivr.net/npm/uuid/dist/esm-browser/v4.js'\r\n\r\nexport const el_lowcode = {\r\n  is: 'sl-split-panel',\r\n  // 组件显示名\r\n  label: '分割面板',\r\n  layout: true,\r\n  // 右侧的属性面板\r\n  props: [\r\n    { lp: 'position', type: 'slider' },\r\n    { lp: 'vertical', type: 'switch', displayValue: false },\r\n    { lp: 'disabled', type: 'switch', displayValue: false },\r\n  ],\r\n  // 属性默认值\r\n  defaultProps: () => ({\r\n    children: [\r\n      { is: 'div', _id: uuid(), slot: 'start', children: [] },\r\n      { is: 'div', _id: uuid(), slot: 'end', children: [] },\r\n    ]\r\n  })\r\n}\r\n\nconst __sfc__ = {}\n\nconst styleEl = document.createElement('style')\n    styleEl.innerHTML =  `\n@import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/themes/dark.css';\r\n`\n    document.body.append(styleEl)\n\n\nexport default __sfc__",
    },
    customComponents: {
      MyAudio: 'MyAudio',
      AButton: 'AButton',
      AQrcode: 'AQrcode',
      ASegmented: 'ASegmented',
      MyCard: 'MyCard',
    },
    extraElLowcodeWidgets: {
      MyAudio: 'MyAudio',
      AButton: 'AButton',
      AQrcode: 'AQrcode',
      ASegmented: 'ASegmented',
      MyCard: 'MyCard',
      'sl-split-panel': 'sl-split-panel',
    },
    style: {
      'text-align': 'center',
    },
    plugins: [
      "/el-lowcode/designer/packages/designer/plugins/web",
      "/el-lowcode/designer/packages/designer/plugins/ant-design-vue"
    ],
  }),
}
