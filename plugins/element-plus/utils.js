export const ENUM_SIZE = ['large', 'default', 'small']

export const formItemPropsConfig = ({ exclude = [''] } = {}) => [
  { is: 'div', class: 'grid grid-cols-3', children: [
    { lp: 'label' },
    { lp: ['key', 'prop'], required: true, script: false, el: { clearable: false } },
  ] },
  { lp: 'description', el: { type: 'textarea', autosize: { minRows: 2, maxRows: 4 } } },
  { is: 'ElCollapse', class: 'mb18', children: [{ is: 'ElCollapseItem', title: '校验', children: 
    [
      { lp: ['validator', 'rules.validator'], script: true },
      { lp: ['pattern', 'rules.pattern'] },
      { lp: ['pattern-hint', 'rules.message'] }
    ]
  }]},
  { lp: 'required', type: 'switch' },
  { lp: ['disabled', 'el.disabled'], type: 'switch' },
  { lp: ['readonly', 'el.readonly'], type: 'switch' },
  { lp: ['clearable', 'el.clearable'], type: 'switch' },
  { lp: ['size', 'el.size'], type: 'radio-group', options: ENUM_SIZE },
  { lp: ['placeholder', 'el.placeholder'] },
]
  .filter(e => Array.isArray(e.lp) ? !exclude.includes(e.lp[0]) : !exclude.includes(e.lp))
