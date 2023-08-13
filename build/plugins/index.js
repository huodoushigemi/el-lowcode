import { autoimport } from './autoimport.js'
import postcss from 'rollup-plugin-postcss'

export default function plugins() {
  return [
    // autoimport,
    postcss()
  ]
}