import { pick } from '@el-lowcode/utils'

const tabProps = ['label', 'value', 'icon', 'inline', 'autofocus', 'tabindex']

function MdUiTabs2(_, { slots }) {
  const children = slots.default?.()
  children.forEach(e => {
    e.props.value ||= e.props.label
    e.props.slot = 'panel'
  })
  return (
    <mdui-tabs {..._} value={_.value || children[0]?.props.value}>
      {children?.map(({ props: opt }) => 
        <mdui-tab {...pick(opt, tabProps)}>
          {opt.label}
        </mdui-tab>,
      )}
      {children}
    </mdui-tabs>
  )
}

export default MdUiTabs2