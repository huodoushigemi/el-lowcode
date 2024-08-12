// export * from './components/components'

export { default as CompView } from './layout/components/CompView.vue'
export { default as Tree } from './layout/components/Tree.vue'

import './style.scss'

export * from './layout/interface'

import Layout from './layout/index.vue'
export default Layout

document.addEventListener('keydown', e => {
  const i =
    e.key == 'ArrowUp' ? -1 :
    e.key == 'ArrowDown' ? 1 : 0
  const target = (e.target as HTMLElement).querySelector('.focused') ?? (e.target as HTMLElement).querySelector('.selected')
  const curr = target?.getAttribute('data-index') || -1
  const next = (e.target as HTMLElement).querySelector(`[data-index="${+curr + i}"]`)
  if (next) {
    target?.classList.remove('focused')
    next.classList.add('focused')
  }

  if (e.key == 'Enter') {
    target?.click()
  }
})

document.addEventListener('click', e => {
  const target = e.composedPath().find(e => e.getAttribute?.('data-index'))
  if (target) {
    Promise.resolve().then(() => {
      target.classList.add('focused')
    })
  }
})

document.addEventListener('mousedown', e => {
  const focused = document.querySelector('.focused')
  focused?.classList.remove('focused')
})