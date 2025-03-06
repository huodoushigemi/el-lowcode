import Default from './widgets.default'
import Web from './widgets.web'

import page from '../page/config'
import grid from '../grid/config'

export const widgets = [
  page,
  grid,
  ...Web,
  ...Default,
]

widgets.forEach(e => {
  e.cover ??= `/imgs/web/${e.is}.png`
})

export default widgets