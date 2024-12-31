const SIZES = ['large', 'default', 'small']

export default [
  {
    is: 'ElButton',
    label: 'button',
    category: '基础组件',
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'type', type: 'select', options: ['default', 'primary', 'success', 'warning', 'danger', 'info'] },
        { lp: 'plain', type: 'switch' },
        { lp: 'size', type: 'radio-group', class: 'col-span-2', options: SIZES },
        { lp: 'text', type: 'switch' },
        { lp: 'bg', type: 'switch' },
        { lp: 'round', type: 'switch' },
        { lp: 'circle', type: 'switch' },
      ] },
      { lp: 'link', type: 'switch' },
      { lp: 'disabled', type: 'switch' },
      { lp: 'native-type', options: ['submit', 'reset'] },
    ],
    defaultProps: () => ({
      children: 'button',
    }),
  },
  
  {
    is: 'ElLink',
    label: 'link',
    category: '基础组件',
    props: [
      { lp: ['text', 'children'] },
      { lp: 'href' },
      { lp: 'target', type: 'radio-group', options: ['_self', '_blank'] },
      { lp: 'disabled', type: 'switch' },
      { lp: 'underline', type: 'switch', displayValue: true },
      { lp: 'type', type: 'select', options: ['default', 'primary', 'success', 'warning', 'danger', 'info'] },
    ],
    defaultProps: () => ({
      children: 'link',
      type: 'primary',
      href: 'https://element-plus.gitee.io'
    })
  },

  {
    is: 'ElText',
    label: 'text',
    category: '基础组件',
    props: [
      { lp: 'children' },
      { lp: 'type', type: 'select', options: ['', 'primary', 'success', 'warning', 'danger', 'info'] },
      { lp: 'size', type: 'radio-group', options: SIZES },
      { lp: 'tag' },
    ],
    defaultProps: () => ({
      children: '文本'
    })
  },

  {
    is: 'ElCard',
    label: 'card',
    category: '容器',
    vSlots: ['header', 'footer'],
    props: [
      { lp: 'body-class' },
      { lp: 'body-style', el: { type: 'textarea', autosize: { minRows: 4, maxRows: 12 } } },
      { lp: 'shadow', type: 'radio-group', displayValue: 'always', options: ['always', 'never', 'hover'] }
    ],
    defaultProps: () => ({
      children: {
        header: { children: [{ is: 'span', children: 'Title' }] },
        default: { children: [] }
      }
    })
  },

  {
    is: 'ElCarousel',
    label: 'carousel',
    category: '容器',
    drag: { from: 'ElCarouselItem' },
    props: [
      { lp: 'height' },
      { lp: 'initial-index', type: 'input-number' },
      { lp: 'interval', type: 'input-number', displayValue: 3000 },
      { lp: 'trigger', type: 'radio-group', displayValue: 'hover', options: ['hover', 'click'] },
      { lp: ['card', 'type'], type: 'switch', el: { activeValue: 'card', inactiveValue: undefined } },
      { lp: 'loop', type: 'switch', displayValue: true },
      { lp: 'direction', type: 'radio-group', displayValue: 'horizontal', options: ['horizontal', 'vertical'] },
      { lp: 'autoplay', type: 'switch', displayValue: true },
      { lp: 'motion-blur', type: 'switch' },
      { lp: ['items', 'children'], el: { is: 'OptionsInput', props: { V: 'name' }, new: i => ({ is: 'ElCarouselItem', children: [{ is: 'h1', children: `item ${i + 1}` }] }) } }
    ],
    defaultProps: () => ({
      autoplay: true,
      height: '150px',
      children: [
        { is: 'ElCarouselItem', children: [{ is: 'h1', children: `item 1` }] },
        { is: 'ElCarouselItem', children: [{ is: 'h1', children: `item 2` }] }
      ]
    })
  },
  {
    is: 'ElCarouselItem',
    label: 'carousel-item',
    hidden: true,
    drag: { to: 'ElCarousel' },
    defaultProps: () => ({
      children: []
    })
  },

  {
    is: 'ElTabs',
    label: 'tabs',
    category: '容器',
    drag: { from: 'ElTabPane' },
    props: props => [
      { lp: 'tab-position', type: 'radio-group', options: ['top', 'right', 'bottom', 'left'] },
      { lp: 'stretch', type: 'switch' },
      { lp: 'type', type: 'radio-group', options: [{ label: 'default', value: undefined }, 'card', 'border-card'] },
      { lp: ['tabs', 'children'], el: { is: 'OptionsInput', props: { V: 'name' }, new: i => ({ is: 'ElTabPane', label: `tab${i + 1}`, children: [] }) } }
    ],
    defaultProps: (ctx) => ({
      children: [
        ctx.newProps('ElTabPane', { label: 'tab1' }),
        ctx.newProps('ElTabPane', { label: 'tab2' }),
      ]
    })
  },
  {
    is: 'ElTabPane',
    label: 'tab-pane',
    hidden: true,
    drag: { to: 'ElTabs' },
    vSlots: ['label'],
    props: [
      { lp: 'label' },
      { lp: 'name' },
      { lp: 'disabled', type: 'switch' },
      { lp: 'lazy', type: 'switch' },
    ],
    defaultProps: () => ({
      children: [
        { is: 'h1', children: (Math.random() * 100).toFixed() }
      ]
    })
  },

  {
    is: 'ElFormItemRender',
    label: 'field',
    category: '表单',
    drag: { from: [], ancestor: ['ElForm', 'ElForm-c', 'ElForm-lcd'] },
    vSlots: ['label'],
    props: (props, ctx) => ([
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: ['标签', 'label'] },
        { lp: ['key', 'prop'], script: false, el: { clearable: false } },
      ] },
      { lp: ['必填', 'required'], type: 'switch' },
      // { lp: 'description', el: { type: 'textarea', autosize: { minRows: 2, maxRows: 4 } } },
      { is: 'ElCollapse', class: 'mb18', children: [{ is: 'ElCollapseItem', title: '校验', children: [
          { lp: ['validator', 'rules.validator'], script: true },
          { lp: ['pattern', 'rules.pattern'] },
          { lp: ['pattern-hint', 'rules.message'] }
        ]
      }]},
      // { lp: ['size', 'el.size'], type: 'radio-group', options: ENUM_SIZE },
    ]),
    defaultProps: (ctx) => ({
      is: 'ElFormItemRender',
      label: 'field',
      prop: `input`,
      children: [ctx.newProps('ElInput')],
    }),
    purify: props => ({
      ...props,
      // defaultValue: void 0,
      children: [{ ...props.children[0], defaultValue: void 0 }]
    }),
    JSONSchemaOutput: (props, ctx) => {
      const el = props.children[0] || {}
      return {
        title: props.label,
        description: props.description,
        pattern: props.rules?.pattern,
        default: el.defaultValue,
        enum: el.children?.map(e => e.value),
        enumNames: el.children?.map(e => e.label),
        ...ctx.widgets[el.is].JSONSchemaOutput?.(el, ctx)
      }
    }
  },

  {
    is: 'ElInput',
    label: 'input',
    category: '数据输入',
    vSlots: ['prefix', 'suffix', 'prepend', 'append'],
    props: [
      { lp: ['v-model', 'vModels.modelValue.0'], script: false },
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'readonly', type: 'switch' },
        { lp: 'clearable', type: 'switch' },
        { lp: 'autofocus', type: 'switch' },
        { lp: 'type', options: ['text', 'textarea', 'password', 'number'], displayValue: 'text' },
        { lp: 'placeholder' },
        { lp: 'minlength', type: 'input-number' },
        { lp: 'maxlength', type: 'input-number' },
      ] },
      { lp: 'show-word-limit', type: 'switch' },
      { lp: 'size', type: 'radio-group', options: SIZES },
    ],
    defaultProps: () => ({
      defaultValue: '',
    }),
    JSONSchemaOutput: (props) => ({
      minLength: props.minlength,
      maxLength: props.maxlength,
    })
  },

  {
    is: 'ElInputNumber',
    label: 'number',
    category: '数据输入',
    vSlots: ['prefix', 'suffix'],
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'readonly', type: 'switch' },
        { lp: 'min', type: 'input-number' },
        { lp: 'max', type: 'input-number' },
        { lp: 'step', type: 'input-number' },
        { lp: 'precision', type: 'input-number' },
        { lp: 'controls', type: 'switch', displayValue: true },
      ] },
      { lp: 'size', type: 'radio-group', options: SIZES },
    ],
    defaultProps: () => ({
      defaultValue: 0,
      controlsPosition: 'right',
    }),
    JSONSchemaOutput: (props) => ({
      type: 'number',
      minimum: props.min,
      maximum: props.max,
      multipleOf: props.step,
    })
  },

  {
    is: 'ElSelect',
    label: 'select',
    category: '数据输入',
    drag: { from: 'ElOption' },
    vSlots: ['prefix'],
    props: (props, ctx) => [
      { lp: ['v-model', 'vModels.modelValue.0'], script: false },
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'clearable', type: 'switch' },
        { lp: 'allow-create', type: 'switch' },
      ] },
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'multiple', type: 'switch' },
        props.multiple && { lp: ['multiple-limit', 'multipleLimit'], type: 'input-number' },
      ] },
      { lp: 'placeholder' },
      { lp: ['options', 'children'], el: { is: 'OptionsInput', new: i => ({ is: 'ElOption', label: `opt ${i + 1}`, value: `${i + 1}` }) }  }
    ],
    defaultProps: () => ({
      // todo
      // defaultValue: '',
      filterable: true,
      defaultFirstOption: true,
      children: [
        { is: 'ElOption', label: `opt 1`, value: `1` },
        { is: 'ElOption', label: `opt 2`, value: `2` },
        { is: 'ElOption', label: `opt 3`, value: `3` },
      ]
    }),
    JSONSchemaOutput: (props) => ({
      // todo
      // minLength: props.minlength,
      // maxLength: props.maxlength,
    })
  },
  {
    is: 'ElOption',
    label: 'option',
    category: '数据输入',
    drag: { to: 'ElSelect', disabled: true },
    hidden: true,
    props: (props, ctx) => [
      { lp: 'label' },
      { lp: 'value' },
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
      ] }
    ]
  },

  {
    is: 'ElSwitch',
    label: 'switch',
    category: '数据输入',
    props: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'width', type: 'input-number' },
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'active-text' },
        { lp: 'inactive-text' },
        { lp: 'active-value' },
        { lp: 'inactive-value' },
      ] },
    ],
    defaultProps: () => ({
      defaultValue: false,
    }),
    JSONSchemaOutput: (props) => ({
      type: 'boolean',
    })
  },

  {
    is: 'ElCheckboxGroup',
    label: 'checkboxs',
    category: '数据输入',
    drag: { from: ['ElCheckbox', 'ElCheckboxButton'] },
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'button', type: 'switch', el: { activeValue: 'button', inactiveValue: undefined } },
        { lp: 'min', type: 'input-number', el: { min: 0 } },
        { lp: 'max', type: 'input-number', el: { min: 0 } },
        { lp: 'fill', type: 'color-picker' },
      ] },
      { lp: ['options', 'children'], el: { is: 'OptionsInput', new: i => ({ is: 'ElCheckbox', label: `opt ${i + 1}`, value: `${i + 1}` }) }  }
    ],
    defaultProps: () => ({
      defaultValue: [],
      children: [
        { is: 'ElCheckbox', label: `opt 1`, value: `1` },
        { is: 'ElCheckbox', label: `opt 2`, value: `2` },
        { is: 'ElCheckbox', label: `opt 3`, value: `3` },
      ]
    }),
    JSONSchemaOutput: (props) => ({
      type: 'array',
      minItems: props.min,
      maxItems: props.max,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    })
  },
  {
    is: 'ElCheckbox',
    label: 'checkbox',
    category: '数据输入',
    drag: { to: 'ElCheckboxGroup' },
    hidden: true,
    props: [{ lp: 'label' },{ lp: 'value' }],
  },

  {
    is: 'ElRadioGroup',
    label: 'radios',
    category: '数据输入',
    drag: { from: ['ElRadio', 'ElRadioButton'] },
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'button', type: 'switch', el: { activeValue: 'button', inactiveValue: undefined } },
        { lp: 'fill', type: 'color-picker' },
      ] },
      { lp: ['options', 'children'], el: { is: 'OptionsInput', new: i => ({ is: 'ElRadio', label: `opt ${i + 1}`, value: `${i + 1}` }) }  }
    ],
    defaultProps: () => ({
      defaultValue: '',
      children: [
        { is: 'ElRadio', label: `opt 1`, value: `1` },
        { is: 'ElRadio', label: `opt 2`, value: `2` },
        { is: 'ElRadio', label: `opt 3`, value: `3` },
      ]
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
    })
  },
  {
    is: 'ElRadio',
    label: 'radio',
    category: '数据输入',
    drag: { to: 'ElRadioGroup' },
    hidden: true,
    props: [{ lp: 'label' }, { lp: 'value' }],
  },

  {
    is: 'ElSlider',
    label: 'slider',
    category: '数据输入',
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'show-tooltip', type: 'switch', displayValue: true },
        { lp: 'min', type: 'input-number' },
        { lp: 'max', type: 'input-number' },
        { lp: 'step', type: 'input-number' },
        { lp: 'show-input', type: 'switch' },
        { lp: 'show-stops', type: 'switch' },
      ] },
    ],
    defaultProps: () => ({
      defaultValue: 0,
    }),
    JSONSchemaOutput: (props) => ({
      type: 'number',
      minimum: props.min,
      maximum: props.max,
      multipleOf: props.step,
    })
  },

  {
    is: 'ElRate',
    label: 'rate',
    category: '数据输入',
    props: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'max', type: 'input-number', displayValue: 5 },
      // { lp: ['low-threshold', 'el.lowThreshold'], type: 'input-number', displayValue: 2 },
      // { lp: ['high-threshold', 'el.highThreshold'], type: 'input-number', displayValue: 4 },
      { lp: 'void-color', type: 'color-picker' },
      { lp: 'size', type: 'radio-group', options: SIZES },
    ],
    defaultProps: () => ({
      defaultValue: 0,
    }),
    JSONSchemaOutput: (props) => ({
      type: 'number',
      maximum: props.max,
    })
  },

  {
    is: 'ElDatePicker',
    label: 'date',
    category: '数据输入',
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'readonly', type: 'switch' },
        { lp: 'clearable', type: 'switch' },
        { lp: 'type', options: ['year', 'month', 'date', 'datetime', 'week'], style: 'grid-column: 1 / 2' },
        { lp: ['show-format', 'format'], options: ['YYYY-MM-DD', 'YYYY/MM/DD'], displayValue: 'YYYY-MM-DD' },
        { lp: 'placeholder' },
      ] },
    ],
    defaultProps: () => ({
      defaultValue: '',
      valueFormat: 'YYYY-MM-DD',
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
      format: 'date',
    })
  },

  {
    is: 'ElTimePicker',
    label: 'time',
    category: '数据输入',
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'readonly', type: 'switch' },
        { lp: 'clearable', type: 'switch' },
        { lp: ['show-format', 'format'], displayValue: 'HH:mm:ss', options: ['HH:mm:ss', 'hh:mm:ss', 'HH时mm分ss秒', 'hh时mm分ss秒'] },
        { lp: 'placeholder' },
      ] },
    ],
    defaultProps: () => ({
      defaultValue: '',
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
      format: 'time',
    })
  },

  {
    is: 'ElSegmented',
    label: 'segmented',
    category: '数据输入',
    props: [
      // { lp: ['value', 'modelValue'] },
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'block', type: 'switch' },
      ] },
      { lp: 'size', type: 'segmented', options: SIZES },
      { lp: 'options', el: { is: 'OptionsInput', new: i => ({ label: `opt ${i + 1}`, value: `${i + 1}` }) }  }
    ],
    defaultProps: () => ({
      options: [{ label: `opt 1`, value: `1` }, { label: `opt 2`, value: `2` }, { label: `opt 3`, value: `3` }]
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string'
    })
  },

  {
    is: 'ElColorPicker',
    label: 'color',
    category: '数据输入',
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'show-alpha', type: 'switch' },
      ] },
    ],
    defaultProps: () => ({
      defaultValue: '',
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
    })
  },

  {
    is: 'ElDescriptions',
    label: 'descriptions',
    category: '数据展示',
    drag: { from: 'ElDescriptionsItem' },
    props: [
      { lp: 'title' },
      { lp: 'extra' },
      { lp: 'border', type: 'switch' },
      { lp: 'column', type: 'input-number' },
      { lp: 'direction', type: 'radio-group', options: ['vertical', 'horizontal'] },
      { lp: 'size', type: 'radio-group', options: SIZES, displayValue: 'default' },
      { lp: ['cols', 'children'], el: { is: 'OptionsInput', props: { V: 'children' }, new: i => ({ is: 'ElDescriptionsItem', label: `title${i + 1}`, children: `content${i + 1}` }) } },
    ],
    defaultProps: () => ({
      column: 3,
      border: true,
      children: [
        { is: 'ElDescriptionsItem', label: `Username`, children: `kooriookami` },
        { is: 'ElDescriptionsItem', label: `Telephone`, children: `18100000000` },
        { is: 'ElDescriptionsItem', label: `Place`, children: `Suzhou` },
        { is: 'ElDescriptionsItem', label: `Remarks`, children: `School` },
        { is: 'ElDescriptionsItem', label: `Address`, children: `No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province` },
      ]
    })
  },
  {
    is: 'ElDescriptionsItem',
    label: 'item',
    hidden: true,
    drag: { to: 'ElDescriptions' },
    vSlots: ['label'],
    props: [
      { lp: 'label' },
      { lp: ['value', 'children'] },
      { lp: 'span', type: 'input-number', displayValue: 1 },
      { lp: 'align', displayValue: 'left', type: 'radio-group', options: ['left', 'center', 'right'] },
      { lp: 'label-align', displayValue: 'left', type: 'radio-group', options: ['left', 'center', 'right'] },
    ],
  },

  {
    is: 'ElTable',
    label: 'table',
    category: '数据展示',
    drag: { from: 'ElTableColumn' },
    vSlots: ['append'],
    props: [
      { lp: 'data' },
      { lp: ['cols', 'children'], el: { is: 'OptionsInput', props: { V: 'prop' }, new: i => ({ is: 'ElTableColumn', label: `title${i + 1}`, prop: `key${i + 1}` }) } },
      { lp: 'stripe', type: 'switch' },
      { lp: 'border', type: 'switch' },
    ],
    defaultProps: () => ({
      children: [
        { is: 'ElTableColumn', label: 'Name', prop: 'name' },
        { is: 'ElTableColumn', label: 'Age', prop: 'age' },
        { is: 'ElTableColumn', label: 'Sex', prop: 'sex' },
      ]
    })
  },
  {
    is: 'ElTableColumn',
    label: 'table-column',
    category: '数据展示',
    hidden: true,
    drag: { to: 'ElTable', disabled: true },
    vSlots: ['header'],
    props: [
      { lp: ['title', 'label'] },
      { lp: ['key', 'prop'] },
      { lp: 'width', type: 'input-number' },
      { lp: 'fixed', options: ['left', 'right'] },
      { lp: 'align', options: ['left', 'center', 'right'] },
      { lp: 'render-header', script: true },
      { lp: 'formatter', script: true, displayValue: '(row, col, val, i) => val' },
    ],
  },

  {
    is: 'ElStatistic',
    label: 'statistic',
    category: '数据展示',
    props: [
      { lp: 'title' },
      { lp: 'value', type: 'input-number' },
      { lp: 'precision', type: 'input-number', displayValue: 0 },
      { lp: 'prefix' },
      { lp: 'suffix' }, 
      { lp: 'decimal-separator', displayValue: '.' },
      { lp: 'group-separator', displayValue: ',' },
    ],
    defaultProps: () => ({
      title: 'Daily active users',
      value: 268500
    })
  },

  {
    is: 'ElTag',
    label: 'tag',
    category: '数据展示',
    props: [
      { lp: ['text', 'children'] },
      { lp: 'effect', type: 'radio-group', options: ['dark', 'light'] },
      { lp: 'size', type: 'radio-group', options: SIZES },
      { lp: 'type', type: 'radio-group', options: ['success', 'info', 'warning', 'danger'], el: { type: '' } },
      { lp: ['border', 'hit'], type: 'switch' },
      { lp: ['bg', 'color'], type: 'color-picker' },
      { lp: 'round', type: 'switch' },
    ],
    defaultProps: () => ({
      children: 'Tag',
    }),
  },

  {
    is: 'ElProgress',
    label: 'progress',
    category: '数据展示',
    vSlots: ['default'],
    props: [
      { lp: ['value', 'percentage'], type: 'input-number' },
      { lp: 'stroke-width', type: 'input-number', displayValue: 6 },
      { lp: 'type', type: 'radio-group', displayValue: 'line', options: ['line', 'circle', 'dashboard'] },
      { lp: 'text-inside', type: 'switch' },
      { lp: 'color', type: 'color-picker' },
    ],
    defaultProps: () => ({
      percentage: 50,
      format: '{{v => `${v}%`}}'
    })
  },

  {
    is: 'ElAlert',
    label: 'alert',
    category: '反馈组件',
    vSlots: ['title', 'default'],
    props: [
      { lp: 'title' },
      { lp: 'description' },
      { lp: 'show-icon', type: 'switch' },
      { lp: 'center', type: 'switch' },
      { lp: 'type', type: 'radio-group', options: ['success', 'warning', 'info', 'error'] },
    ],
    defaultProps: () => ({
      type: 'success',
      showIcon: true,
      children: {
        title: { children: [{ is: 'span', children: 'Success alert' }] },
        default: { children: [{ is: 'span', children: 'More text description' }] },
      }
    })
  },

  {
    is: 'ElTooltip-lcd',
    label: 'tooltip',
    category: '反馈组件',
    vSlots: ['content'],
    props: [
      { lp: 'content' },
      { lp: 'effect', type: 'radio-group', options: ['dark', 'light'] },
      { lp: 'trigger', type: 'radio-group', options: ['hover', 'click', 'focus'] },
      { lp: 'offset', type: 'input-number' },
    ],
    defaultProps: () => ({
      content: 'content',
      children: {
        content: { children: [{ is: 'span', children: 'content' }] },
        default: { children: [{ is: 'span', children: 'text' }] }
      }
    })
  },

  {
    is: 'ElDivider',
    label: 'divider',
    props: [
      { lp: ['text', 'children'] },
      { lp: 'direction', type: 'radio-group', displayValue: 'horizontal', options: ['horizontal', 'vertical'] },
      { lp: 'border-style', type: 'radio-group', displayValue: 'solid', options: ['solid', 'dashed'] },
      { lp: 'content-position', type: 'radio-group', options: ['left', 'right', 'center'] },
    ],
    defaultProps: () => ({
      
    })
  }
]