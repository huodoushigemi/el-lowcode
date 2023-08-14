import postcss from 'rollup-plugin-postcss'
import { autoimport } from './autoimport.js'
import { alias } from './alias.js'

export default function plugins() {
  return [
    // autoimport,
    postcss(),
    alias,
  ]
}