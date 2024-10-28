export default [
  {
    is: 'border-01',
    label: 'border-01',
    cover: new URL('./icons/border-01.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#4FD2DDFF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#235FA7FF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
      { lp: ['duration', 'dur'], type: 'input-number', el: { step: .5, min: .5 } }
    ],
    defaultProps: () => ({
      colors: ['#4FD2DDFF', '#235FA7FF'],
      bg: '#00000000',
      dur: .5,
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-02',
    label: 'border-02',
    cover: new URL('./icons/border-02.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#6586ECFF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#2CF7FEFF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
    ],
    defaultProps: () => ({
      colors: ['#6586ECFF', '#2CF7FEFF'],
      bg: '#00000000',
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-03',
    label: 'border-03',
    cover: new URL('./icons/border-03.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#6586ECFF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#2CF7FEFF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
    ],
    defaultProps: () => ({
      colors: ['#6586ECFF', '#2CF7FEFF'],
      bg: '#00000000',
      style: { width: '500px', height: '300px' },
    })
  },

  // todo
  {
    is: 'border-04',
    label: 'border-04',
    cover: new URL('./icons/border-04.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#8aaafb' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#1f33a2' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
      { lp: 'title' },
    ],
    defaultProps: () => ({
      colors: ['#8aaafb', '#1f33a2'],
      bg: '#00000000',
      title: '边框',
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-05',
    label: 'border-05',
    cover: new URL('./icons/border-05.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#1D48C4FF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#D3E1F8FF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
    ],
    defaultProps: () => ({
      colors: ['#1D48C4FF', '#D3E1F8FF'],
      bg: '#00000000',
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-06',
    label: 'border-06',
    cover: new URL('./icons/border-06.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#3140ADFF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#1089FFFF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
    ],
    defaultProps: () => ({
      colors: ['#3140ADFF', '#1089FFFF'],
      bg: '#00000000',
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-07',
    label: 'border-07',
    cover: new URL('./icons/border-07.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#11EEFDFF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#0078D2FF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
    ],
    defaultProps: () => ({
      colors: ['#11EEFDFF', '#0078D2FF'],
      bg: '#00000000',
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-08',
    label: 'border-08',
    cover: new URL('./icons/border-08.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#235FA7FF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#4FD2DDFF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
      { lp: ['duration', 'dur'], type: 'input-number', el: { step: .5, min: .5 } },
      { lp: 'reverse', type: 'switch', displayValue: false },
    ],
    defaultProps: () => ({
      colors: ['#235FA7FF', '#4FD2DDFF'],
      bg: '#00000000',
      dur: 3,
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-09',
    label: 'border-09',
    cover: new URL('./icons/border-09.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#3140ADFF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#235FA7FF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
    ],
    defaultProps: () => ({
      colors: ['#3140ADFF', '#235FA7FF'],
      bg: '#00000000',
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-10',
    label: 'border-10',
    cover: new URL('./icons/border-10.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#1089FFFF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#0000FFFF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
    ],
    defaultProps: () => ({
      colors: ['#1089FFFF', '#0000FFFF'],
      bg: '#00000000',
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-11',
    label: 'border-11',
    cover: new URL('./icons/border-11.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#2862B7FF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#2862B7FF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
    ],
    defaultProps: () => ({
      colors: ['#2862B7FF', '#2862B7FF'],
      bg: '#00000000',
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-12',
    label: 'border-12',
    cover: new URL('./icons/border-12.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#2862B7FF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#2862B7FF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
    ],
    defaultProps: () => ({
      colors: ['#2862B7FF', '#2862B7FF'],
      bg: '#00000000',
      style: { width: '500px', height: '300px' },
    })
  },

  {
    is: 'border-13',
    label: 'border-13',
    cover: new URL('./icons/border-13.png', import.meta.url).href,
    category: 'Border',
    props: [
      { lp: 'colors', children: [{ is: 'div', class: 'flex space-x-8', children: [
        { prop: 'colors.0', type: 'color-picker', defaultValue: '#2862B7FF' },
        { prop: 'colors.1', type: 'color-picker', defaultValue: '#4B77B7FF' },
      ] }] },
      { lp: 'bg', type: 'color-picker' },
    ],
    defaultProps: () => ({
      colors: ['#2862B7FF', '#4B77B7FF'],
      bg: '#00000000',
      style: { width: '500px', height: '300px' },
    })
  },
]