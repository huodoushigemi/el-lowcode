import postcss from 'rollup-plugin-postcss'
// import cssnano from 'cssnano'
import { alias } from './alias.js'

export default function plugins() {
  return [
    // autoimport,
    postcss({
      // plugins: [cssnano],
      minimize: true
    }),
    alias,
  ]
}