import { isString } from '@vue/shared'

export const str = (lp, extra) => ({ lp, displayValue: '', ...extra })
export const opts = (lp, options, extra) => ({ lp, options, ...extra })
export const radios = (lp, options, extra) => ({ lp, type: 'radio-group', options, ...extra, el: { type: 'button', ...extra?.el } })
export const chekcs = (lp, options, extra) => ({ lp, type: 'checkbox-group', options, ...extra, el: { type: 'button', ...extra?.el } })
export const bool = (lp, displayValue = false, extra) => ({ lp, type: 'switch', displayValue, ...extra })
export const num = (lp, displayValue, extra) => ({ lp, type: 'input-number', displayValue, set: v => v == null ? void 0 : v, ...extra })
export const color = lp => ({ lp, type: 'color-picker' })

export const txt = () => ({ lp: ['text', 'children'], hide: o => !isString(o.children) })
export const hr = () => ({ is: 'hr', class: '-mx8' })

export const grid2 = children => ({ is: 'div', class: 'grid grid-cols-2 gap-x-12', children })
export const grid3 = children => ({ is: 'div', class: 'grid grid-cols-3 gap-x-12', children })

export const Text = (s, extra) => ({ is: 'span', children: s, ...extra })

export const virtualProp = (props, p1, p2) => (p2 in props) || Object.defineProperty(props, p2, {
  get() { return this[p1] },
  set(v) { this[p1] = v },
  enumerable: false
})

export function vmodel(prop, extra) {
  const label = prop ? `v-model : ${prop}` : `v-model`
  prop = prop ? camelize(prop) : 'modelValue'
  return { lp: [label, `vModels.${prop}.0`], out: (v, model) => (v || (delete model.vModels[prop]), {}), script: false, ...extra, el: { spellcheck: false } }
}

export function vmodelInput(prop = 'value', extra) {
  return {
    lp: ['v-model', `vModels.${prop}`],
    get: v => v?.[0] || '',
    set: v => v ? ([v, null, ['onInput', 'e => e.target.value']]) : void 0,
    out: (v, model) => (v || (delete model.vModels[prop]), {}),
    script: false,
    ...extra,
    el: { spellcheck: false }
  }
}