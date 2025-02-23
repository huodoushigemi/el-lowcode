import Lines from './snippets.line'
import Bars from './snippets.bar'

export const snippets = [
  ...Lines,
  ...Bars
]

snippets.forEach(e => {
  e.cover ??= `/imgs/echarts/${e.id}.png`
})