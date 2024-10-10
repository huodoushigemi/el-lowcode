import { chooseImg } from '@el-lowcode/utils'

export default {
  is: 'ElImage',
  label: 'image',
  category: '基础组件',
  props: props => [
    { lp: 'src', el: { autofocus: true } },
    { is: 'button', class: 'vs-btn mb18', onClick: async () => props.src = (await chooseImg({ base64: true, maxSize: 1024 * 200 }))[0], children: [
      { is: 'div', class: 'mask-icon mr4 w24 h18', style: 'mask-image: url(https://api.iconify.design/tdesign:cloud-upload.svg)' }, 'upload'
    ] },
    { lp: 'fit', type: 'radio-group', options: ['fill', 'contain', 'cover'] },
    { lp: ['lazy', 'loading'], type: 'switch', el: { activeValue: 'lazy', inactiveValue: 'eager' } },
    { lp: 'alt' },
    // { lp: ['preview-src-list', 'previewSrcList'], type: 'switch' },
  ],
  defaultProps: () => ({
    src: 'https://element-plus.org/images/element-plus-logo-small.svg',
    style: { height: '128px' }
  })
}