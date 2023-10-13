import { ENUM_SIZE } from "../../const";

export default {
  is: 'ElButton',
  label: 'button',
  props: [
    { lp: ['text', 'children'] },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
    { lp: 'type', type: 'select', options: ['default', 'primary', 'success', 'warning', 'danger', 'info'] },
    { lp: 'plain', type: 'switch' },
    { lp: 'text', type: 'switch' },
    { lp: 'bg', type: 'switch' },
    { lp: 'link', type: 'switch' },
    { lp: 'round', type: 'switch' },
    { lp: 'circle', type: 'switch' },
    { lp: 'disabled', type: 'switch' },
    { lp: 'native-type', options: ['submit', 'reset'] },
  ],
  defaultProps: () => ({
    children: 'button'
  })
}