export default {
  is: 'Page',
  label: 'page',
  layout: true,
  drag: false,
  props: [
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
  })
}