export default {
  is: 'ElImage',
  label: 'image',
  props: [
    { lp: 'src', el: { autofocus: true } },
    { lp: 'fit', type: 'radio-group', options: ['fill', 'contain', 'cover'] },
    { lp: ['lazy', 'loading'], type: 'switch', el: { activeValue: 'lazy', inactiveValue: 'eager' } },
    { lp: 'alt' },
    // { lp: ['preview-src-list', 'previewSrcList'], type: 'switch' },
  ],
  defaultProps: () => ({
    src: 'https://element-plus.gitee.io/images/element-plus-logo.svg'
  })
}