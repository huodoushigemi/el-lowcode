export { default as CompView } from './layout/components/CompView.vue'
export { default as Tree } from './layout/components/Tree.vue'

import './style.scss'

export * from './layout/interface'

export { default }  from './layout/index.vue'

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
