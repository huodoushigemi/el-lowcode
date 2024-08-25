// export * from './components/components'

export { default as CompView } from './layout/components/CompView.vue'
export { default as Tree } from './layout/components/Tree.vue'

import './style.scss'

export * from './layout/interface'

export { default }  from './layout/index.vue'

document.addEventListener('keydown', e => {
  const i =
    e.key == 'ArrowUp' ? -1 :
    e.key == 'ArrowDown' ? 1 : 0
  const ul = e.target as HTMLElement
  const li = ul.querySelector('.focused') ?? ul.querySelector('.selected')
  const curr = li?.getAttribute('data-index') || -1
  const next = ul.querySelector(`[data-index="${+curr + i}"]`)
  if (next) {
    ul.classList.add('element-focused')
    li?.classList.remove('focused')
    next.classList.add('focused')
  }
  if (e.key == 'Enter') {
    li?.click()
  }
})

document.addEventListener('click', async e => {
  await Promise.resolve()
  const ul = e.composedPath().find(e => e.getAttribute?.('tabindex')) as HTMLElement
  const li = e.composedPath().find(e => e.getAttribute?.('data-index')) as HTMLElement
  if (ul && !li) {
    ul.classList.remove('element-focused')
    ul.querySelector('.focused')?.classList.remove('focused')
  }
  else if (ul && li) {
    ul.classList.add('element-focused')
    ul.querySelector('.focused')?.classList.remove('focused')
    li.classList.add('focused')
  }
})
