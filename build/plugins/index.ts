import { autoimport } from './autoimport'
import { unocss } from './unocss'

export default function plugins() {
  return [
    autoimport,
    unocss
  ]
}