export default {
  is: 'Page',
  label: 'page',
  drag: false,
  props: [
    { lp: 'fit', options: ['contain', 'cover', 'fill', 'scrollY', 'scrollX'] }
    // {
    //   is: () => {
    //     const designerCtx = inject(designerCtxKey)!
    //     // todo
    //     return h(ElButton, { type: 'primary', text: true, bg: true, size: 'default', onClick: () =>  designerCtx.openState = !designerCtx.openState }, () => 'state')
    //   }
    // }
  ],
  defaultProps: () => ({
    children: [],
    state: {
      count: 0
    }
  }),
  purify(props) {
    props = { ...props }
    delete props.state
    delete props.plugins
    delete props.designer
    return props
  }
}