import { ElCollapse, ElCollapseItem } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
import { Obj } from '@el-lowcode/utils'
import { normalizeItem } from 'el-form-render'
import { BoxProps } from './box'
import { ENUM_SIZE } from '../const'
import { ElLowcodeConfig } from './type'
import { el_lowcode_widgets } from './el_lowcode_widgets'

export const formItemPropsConfig = ({ exclude = [''] } = {}) => [
  { lp: ['key', 'prop'], required: true, scriptable: false, el: { clearable: false } },
  { lp: 'label' },
  { lp: 'description', el: { type: 'textarea', autosize: { minRows: 2, maxRows: 4 } } },
  { is: ElCollapse, class: 'mb18', children: { is: ElCollapseItem, title: '校验', children: 
    [
      { lp: ['validator', 'rules.validator'], scriptable: true },
      { lp: ['pattern', 'rules.pattern'] },
      { lp: ['pattern-hint', 'rules.message'] }
    ]
    .map(e => normalizeItem(e))
  }},
  { lp: 'required', type: 'switch' },
  { lp: ['disabled', 'el.disabled'], type: 'switch' },
  { lp: ['readonly', 'el.readonly'], type: 'switch' },
  { lp: ['clearable', 'el.clearable'], type: 'switch' },
  { lp: ['size', 'el.size'], type: 'radio-group', options: ENUM_SIZE },
  { lp: ['placeholder', 'el.placeholder'] },
]
  // @ts-ignore
  .map(e => normalizeItem(e))
  .filter(e => !exclude.includes(e.label))

export const parseAttrs = (config: ElLowcodeConfig, extra?: Obj): BoxProps => {
  const attrs = {} as BoxProps
  Object.assign(attrs, { is: config.is, _id: uuidv4() }, config.defaultProps?.(), extra)
  return attrs
}

export const sloveConfig = (el?: BoxProps) => {
  if (!el) return
  const is = el.el?.is || el.is
  if (!el_lowcode_widgets[is]) console.error(`${is}: Unable to find a matching configuration of ${is}`, el)
  return el_lowcode_widgets[is]
}
