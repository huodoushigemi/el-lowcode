import { h, resolveComponent } from 'vue'
import { get, pick, set, unFn } from "@el-lowcode/utils"

export const FONT_STYLES = ['normal', 'italic', 'oblique']
export const FONT_WEIGHTS = ['normal', 'bold', 'bolder', 'lighter']
export const FONT_FAMILYS = ['sans-serif', 'serif', 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei']
export const FONT_OVERFLOWS = ['none', 'truncate', 'break', 'breakAll']
export const LINE_TYPES = ['solid', 'dashed', 'dotted']

export const Collapse1 = ({ title, oper, open }, { slots }) => (
  h(resolveComponent('Collapse'), { title, class: oper && 'enable', defaultOpen: open }, {
    extra: () => oper && h(resolveComponent('ElSwitch'), { modelValue: oper[0](), 'onUpdate:modelValue': oper[1], class: 'mx8', onClick: e => e.stopPropagation() }),
    default: slots.default
  })
)

export const Collapse2 = ({ title, oper }, { slots }) => (
  h(resolveComponent('Collapse'), { title, class: oper && 'enable', style: 'padding: 0 8px; background: var(--el-fill-color-extra-light); --el-collapse-header-height: 28px' }, {
    extra: () => oper && h(resolveComponent('ElSwitch'), { modelValue: oper[0](), 'onUpdate:modelValue': oper[1], onClick: e => e.stopPropagation() }),
    default: slots.default
  })
)

export const genDisplayValue = (model, prop, displayValue) => [
  () => get(model, prop) == null ? displayValue : get(model, prop),
  v => set(model, prop, v == displayValue ? void 0 : v)
]

export const displayValue = (v1) => (v) => v == null ? v1 : v

export function normalized(arr) {
  arr.forEach(e => {
    if (!e) return
    if (typeof e == 'object' && !e.is) e.script ??= false
    if (Array.isArray(e.children)) normalized(e.children)
  })
  return arr
}

export const enable = (model, label, prop, defaultValue, children, ) => ({ is: 'ElFormRender', model, size: 'small', style: 'padding: 1px 12px; background: var(--el-fill-color-light);', children: [
  { is: 'div', class: 'flex aic', children: [
    { is: 'div', style: 'margin: 6px 0; font-weight: bold; text-transform: capitalize;', children: label },
    prop.prop ? prop : { prop, type: 'switch', class: 'mla mb0', defaultValue }
  ] },
  ...(get(model, prop.prop ?? prop) ? children : [])
] })

export const enable2 = (model, title, oper, children, open) => ({ is: Collapse1, title, oper, open, children: () => [
  { is: 'ElFormRender', model, size: 'small', labelPosition: 'top', children }
] })

export const enable3 = (model, title, oper, children) => ({ is: Collapse2, title, oper, children: () => [
  { is: 'ElFormRender', model, size: 'small', labelPosition: 'top', children }
] })

export const num = (lp, opt) => ({ lp, ...opt, el: { is: 'InputNumber', unit: null, min: 0, hideUnit: true, ...opt?.el } })
export const nums = (lp, opt) => ({ lp, ...opt, el: { is: 'InputNumbers', unit: null, min: 0, hideUnit: true, ...opt?.el } })
export const num1 = (prop, opt) => ({ prop, ...opt, el: { is: 'InputNumber', unit: null, hideUnit: true } })

export const color = (lp, opt) => ({ lp, type: 'color-picker', ...opt, el: { size: 'small', ...opt?.el } })
export const opts = (lp, options, opt) => ({ lp, type: 'select', options, ...opt })
export const radios = (lp, options, opt) => ({ lp, type: 'radio-group', options, ...opt })
export const segm = (lp, options, opt) => ({ lp, type: 'segmented', options, ...opt, el: { block: true, wfull: '', ...opt?.el } })
export const segm2 = (lp, options, opt) => ({ lp, type: 'segmented', options, ...opt, el: { ...opt?.el } })
export const checks = (lp, options, opt) => ({ lp, type: 'checkbox-group', options, ...opt, el: { type: 'button' } })

export const bool = (lp, displayValue = false, opt) => ({ lp, type: 'switch', displayValue, ...opt })

export const details = (label, children) => ({ is: "details", children: [
  { is: 'summary', class: 'my8', style: 'text-transform: capitalize;', children: label },
  ...children
] })

export const _shadowStyleItems = (ks, prefix) => {
  const n = p => [prefix, p].filter(e => e).join('.')
  const props = {
    shadowBlur: num(['shadow-blur', n('shadowBlur')], { el: { max: 50 } }),
    shadowColor: color(['shadow-color', n('shadowColor')], { el: { size: 'small' } }),
    shadowOffsetX: num(['shadow-x', n('shadowOffsetX')]),
    shadowOffsetY: num(['shadow-y', n('shadowOffsetY')]),
    // shadowOffset: { lp: ['shadow-offset', ''], children: [num(['', n('shadowOffsetX')]), num(['', n('shadowOffsetY')])] },
    shadowOffset: nums(['shadow-xy', ''], { get: (v, model) => [get(model, n('shadowOffsetX')), get(model, n('shadowOffsetY'))], set: (v, model) => (set(model, n('shadowOffsetX'), v[0] || 0), set(model, n('shadowOffsetY'), v[1] || 0), void 0), el: { min: -50 } }) 
  }
  return pick(props, ks)
}

export const shadowStyleItems = (ks, prefix) => {
  return Object.values(pick(_shadowStyleItems(ks, prefix), ks))
}

export const lineStyleItems = (ks, prefix) => {
  const n = p => [prefix, p].filter(e => e).join('.')
  const props = {
    ..._shadowStyleItems(ks, prefix),
    type: opts(['border', n('type')], LINE_TYPES),
    width: num(['width', n('width')], { el: { max: 10 } }),
    color: color(['color', n('color')], { el: { size: 'small' } }),
  }
  return Object.values(pick(props, ks))
}

export const textStyleItems = (ks, prefix) => {
  const n = p => [prefix, p].filter(e => e).join('.')
  const props = {
    ..._shadowStyleItems(ks, prefix),
    fontSize: num(['size', n('fontSize')], { displayValue: 12 }),
    color: color(['color', n('color')], { el: { size: 'small' } }),
    fontStyle: opts(['style', n('fontStyle')], FONT_STYLES),
    fontWeight: opts(['weight', n('fontWeight')], FONT_WEIGHTS),
    fontFamily: opts(['family', n('fontFamily')], FONT_FAMILYS),
    lineHeight: num(['line-height', n('lineHeight')]),
    backgroundColor: color(['background-color', n('backgroundColor')]),
    width: num(['w', n('width')]),
    height: num(['h', n('height')]),
    overflow: opts(['overflow', n('overflow')], FONT_OVERFLOWS),
    formatter: { lp: ['format', n('formatter')], displayValue: '{value}' },
    rotate: num(['r °', n('rotate')], { el: { min: -180, max: 180 } }),
  }
  return Object.values(pick(props, ks))
}

export const borderStyleItems = (ks, prefix) => {
  const n = p => [prefix, p].filter(e => e).join('.')
  const props = {
    borderType: opts(['border-type', n('borderType')], LINE_TYPES),
    borderWidth: num(['border-width', n('borderWidth')], { el: { max: 10 } }),
    borderColor: color(['border-color', n('borderColor')], { el: { size: 'small' } }),
  }
  return Object.values(pick(props, ks))
}

export const areaStyleItems = (ks, prefix) => {
  const n = p => [prefix, p].filter(e => e).join('.')
  const props = {
    color: color(['color', n('color')]),
    opacity: num(['opacity', n('opacity')], { displayValue: .7, el: { step: .01, max: 1 } }),
  }
  return Object.values(pick(props, ks))
}

export const enable3Symbol = model => enable3(model, 'symbol', [() => model.symbol != 'none', v => model.symbol = v ? 'emptyCircle' : 'none'], () => [
  segm(['', 'symbol'], [['⭕', 'emptyCircle'], ['🔴', 'circle'], ['🟥', 'rect'], ['🔺', 'triangle'], ['📍',  'pin']], { displayValue: 'emptyCircle', style: 'margin-bottom: 8px' }),
  { is: 'div', class: 'grid grid-cols-3 gap-x-8 [&>*]:mb8', size: 'small', children: [
    num(['size', 'symbolSize'], { displayValue: 4 }),
    nums(['offset', 'symbolOffset'], { el: { len: 2, min: -50, placeholder: ['x', 'y'] } }),
    num(['r °', 'symbolRotate'], { el: { min: -360, max: 360 } }),
  ] },
])