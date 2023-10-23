const e={id:"custom-component",title:"自定义组件",schema:()=>({is:"Page",_id:"cebde1a5-23ee-498e-a179-cc2df5c3fe38",children:[{is:"AQrcode",_id:"45ea7e8f-45f0-4faa-8666-e814da6b0ad3",value:"https://www.antdv.com/",icon:"https://www.antdv.com/assets/logo.1ef800a8.svg",bgColor:"#ffffff80",style:{margin:"auto"}},{is:"ASegmented",_id:"ddec7e6b-e038-4bed-8b18-aaf22d1c7c9c",options:"{{['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}}",value:"{{state.segmented}}","onUpdate:value":"{{val => state.segmented = val}}"},{is:"AButton",_id:"ecac862d-39aa-4690-a41a-67e188f1d805",children:"Primary Button",type:"primary"},{is:"MyAudio",_id:"6e8473c8-bd70-43f7-b1eb-b7152fe1851c",controls:!0,src:"https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"},{is:"sl-split-panel",_id:"b0d5407a-4c15-4c53-ac97-8397c89b68a9",children:[{is:"div",_id:"bf167330-53ca-4bfa-bb48-f603b451f2e4",slot:"start",children:[{is:"img",_id:"fbcbdfc7-513b-46d3-9ee1-25259f4a12ec",src:"https://element-plus.gitee.io/images/element-plus-logo.svg",style:{width:"100%"},loading:"eager"}]},{is:"div",_id:"4e885867-9257-4415-b936-d8446c1b2393",slot:"end",children:[{is:"img",_id:"ba1b9a59-7eb7-44f8-b7fd-6bdf995477c9",src:"https://element-plus.gitee.io/images/element-plus-logo.svg",style:{width:"100%"},loading:"eager"}]}],position:44}],state:{count:0},esm:{MyAudio:`import { createElementVNode as _createElementVNode, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = { style: {"padding":"20px"} }
const _hoisted_2 = /*#__PURE__*/_createElementVNode("p", null, "我是自定义的 audio 组件", -1 /* HOISTED */)

\r
export const el_lowcode = {\r
  is: 'MyAudio',\r
  label: '音频',\r
  props: [\r
    { lp: 'src' },\r
    { lp: 'autoplay', type: 'switch' },\r
    { lp: 'loop', type: 'switch' },\r
    { lp: 'muted', type: 'switch' },\r
  ],\r
  defaultProps: () => ({\r
    controls: true,\r
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',\r
  })\r
}\r


const __sfc__ = /*#__PURE__*/Object.assign({ name: 'MyAudio' }, {
  setup(__props) {
\r
\r

return (_ctx, _cache) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    _createElementVNode("audio", _normalizeProps(_guardReactiveProps(_ctx.$attrs)), null, 16 /* FULL_PROPS */)
  ]))
}
}

})

const styleEl = document.createElement('style')
    styleEl.innerHTML =  \`\`
    document.body.append(styleEl)


export default __sfc__`,AButton:`\r
import { Button } from 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/antd.esm.min.js'\r
\r
const __sfc__ = Button\r
\r
export const el_lowcode = {\r
  // 组件显示名\r
  label: '按钮',\r
  // 右侧的属性面板\r
  props: [\r
    { lp: 'children' },\r
    { lp: 'type', type: 'radio-group', options: ['primary', 'ghost', 'dashed', 'default'], el: { type: '' } },\r
    { lp: 'block', type: 'switch' },\r
    { lp: 'disabled', type: 'switch' },\r
    { lp: 'ghost', type: 'switch' },\r
    { lp: 'danger', type: 'switch' },\r
  ],\r
  // 属性默认值\r
  defaultProps: () => ({\r
    children: 'Primary Button',\r
    type: 'primary',\r
  })\r
}\r


const styleEl = document.createElement('style')
    styleEl.innerHTML =  \`
@import 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/reset.css'\r
\`
    document.body.append(styleEl)


export default __sfc__`,AQrcode:`\r
import { QRCode } from 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/antd.esm.min.js'\r
\r
const __sfc__ = QRCode\r
\r
export const el_lowcode = {\r
  // 组件显示名\r
  label: '二维码',\r
  // 右侧的属性面板\r
  props: [\r
    { lp: ['url', 'value'] },\r
    { lp: 'icon' },\r
    { lp: 'type', type: 'radio-group', displayValue: 'canvas', options: ['canvas', 'svg'] },\r
    { lp: 'bg-color', type: 'color-picker' },\r
    { lp: 'error-level', type: 'radio-group', displayValue: 'M', options: ['L', 'M', 'Q', 'H'] },\r
  ],\r
  // 属性默认值\r
  defaultProps: () => ({\r
    value: 'https://www.antdv.com/',\r
    icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',\r
    bgColor: '#ffffff80'\r
  })\r
}\r


const styleEl = document.createElement('style')
    styleEl.innerHTML =  \`
@import 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/reset.css'\r
\`
    document.body.append(styleEl)


export default __sfc__`,ASegmented:`\r
import { Segmented } from 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/antd.esm.min.js'\r
\r
const __sfc__ = Segmented\r
\r
export const el_lowcode = {\r
  // 组件显示名\r
  label: '分段',\r
  // 右侧的属性面板\r
  props: [\r
    { lp: 'options', scripable: true }\r
  ],\r
  // 属性默认值\r
  defaultProps: () => ({\r
    options: \`{{['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}}\`,\r
    value: '{{state.segmented}}',\r
    'onUpdate:value': '{{val => state.segmented = val}}'\r
  })\r
}\r


const styleEl = document.createElement('style')
    styleEl.innerHTML =  \`
@import 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/reset.css'\r
\`
    document.body.append(styleEl)


export default __sfc__`,MyCard:`import { createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, createVNode as _createVNode, mergeProps as _mergeProps, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = ["src"]
const _hoisted_2 = /*#__PURE__*/_createElementVNode("br", null, null, -1 /* HOISTED */)
const _hoisted_3 = /*#__PURE__*/_createElementVNode("br", null, null, -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createElementVNode("small", null, "6 weeks old", -1 /* HOISTED */)
const _hoisted_5 = { slot: "footer" }

import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/card/card.js'\r
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/button/button.js'\r
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/rating/rating.js'\r
\r
// 组件名（必须）\r
\r
export const el_lowcode = {\r
  // 组件显示名\r
  label: '卡片',\r
  // 右侧的属性面板\r
  props: [\r
    { lp: 'cover' },\r
    { lp: 'title' },\r
    { lp: 'desc' },\r
  ],\r
  // 属性默认值\r
  defaultProps: () => ({\r
    cover: 'https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',\r
    title: 'Mittens',\r
    desc: 'This kitten is as cute as he is playful. Bring him home today'\r
  })\r
}\r


const __sfc__ = /*#__PURE__*/Object.assign({ name: 'MyCard' }, {
  props: {\r
  cover: String,\r
  title: String,\r
  desc: String,\r
},
  setup(__props) {
\r
\r
\r
\r
\r
function onClick() {\r
  alert('clicked')\r
}\r

return (_ctx, _cache) => {
  const _component_sl_button = _resolveComponent("sl-button")
  const _component_sl_rating = _resolveComponent("sl-rating")
  const _component_sl_card = _resolveComponent("sl-card")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createCommentVNode(" see https://shoelace.style/components/card "),
    _createVNode(_component_sl_card, _mergeProps({ class: "card-overview" }, _ctx.$attrs), {
      default: _withCtx(() => [
        _createElementVNode("img", {
          slot: "image",
          src: __props.cover
        }, null, 8 /* PROPS */, _hoisted_1),
        _createElementVNode("strong", null, _toDisplayString(__props.title), 1 /* TEXT */),
        _hoisted_2,
        _createTextVNode(" " + _toDisplayString(__props.desc), 1 /* TEXT */),
        _hoisted_3,
        _hoisted_4,
        _createElementVNode("div", _hoisted_5, [
          _createVNode(_component_sl_button, {
            variant: "primary",
            pill: "",
            onClick: onClick
          }, {
            default: _withCtx(() => [
              _createTextVNode("More Info")
            ]),
            _: 1 /* STABLE */
          }),
          _createVNode(_component_sl_rating)
        ])
      ]),
      _: 1 /* STABLE */
    }, 16 /* FULL_PROPS */)
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}
}

})

const styleEl = document.createElement('style')
    styleEl.innerHTML =  \`
@import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/themes/dark.css';
.card-overview {\r
  max-width: 300px;\r
  font-size: 16px;\r
  line-height: 1.8;
}
.card-overview small {\r
  color: var(--sl-color-neutral-500);
}
.card-overview [slot='footer'] {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;
}\r
\`
    document.body.append(styleEl)


export default __sfc__`,"sl-split-panel":`\r
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/split-panel/split-panel.js'\r
import uuid from 'https://cdn.jsdelivr.net/npm/uuid/dist/esm-browser/v4.js'\r
\r
export const el_lowcode = {\r
  is: 'sl-split-panel',\r
  // 组件显示名\r
  label: '分割面板',\r
  layout: true,\r
  // 右侧的属性面板\r
  props: [\r
    { lp: 'position', type: 'slider' },\r
    { lp: 'vertical', type: 'switch', displayValue: false },\r
    { lp: 'disabled', type: 'switch', displayValue: false },\r
  ],\r
  // 属性默认值\r
  defaultProps: () => ({\r
    children: [\r
      { is: 'div', _id: uuid(), slot: 'start', children: [] },\r
      { is: 'div', _id: uuid(), slot: 'end', children: [] },\r
    ]\r
  })\r
}\r

const __sfc__ = {}

const styleEl = document.createElement('style')
    styleEl.innerHTML =  \`
@import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/themes/dark.css';\r
\`
    document.body.append(styleEl)


export default __sfc__`},customComponents:{MyAudio:"MyAudio",AButton:"AButton",AQrcode:"AQrcode",ASegmented:"ASegmented",MyCard:"MyCard"},extraElLowcodeWidgets:{MyAudio:"MyAudio",AButton:"AButton",AQrcode:"AQrcode",ASegmented:"ASegmented",MyCard:"MyCard","sl-split-panel":"sl-split-panel"},style:{"text-align":"center"}})};export{e as default};
