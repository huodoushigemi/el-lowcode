import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import { autoimport } from './autoimport.js'
import { alias } from './alias.js'

export default function plugins() {
  return [
    // autoimport,
    postcss({
      // plugins: [cssnano]
      minimize: true
    }),
    alias,
  ]
}