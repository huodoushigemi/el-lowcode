import { createApp, provide, defineAsyncComponent, h, reactive, watchEffect, triggerRef, toRef, toRaw, nextTick } from 'vue'
import { isPlainObject } from '@vue/shared'
import { ElMessageBox, ElSegmented } from 'element-plus'
import { get, html2schema, set, toArr } from '@el-lowcode/utils'
import { genCode, showDialog } from '../../../utils'
import MonacoEditor from '../../../layout/components/monaco-editor.vue'

function create(AsyncComp) {
  let app
  return {
    mount(container, designerCtx) {
      app = createApp({ provide: { designerCtx }, render: () => h(AsyncComp) })
      app.mount(container)
    },
    unmount: () => app.unmount()
  }
}

export function activate(designerCtx) {
  // 文本元素 开启编辑模式
  watchEffect(cleaup => {
    const node = designerCtx.active
    if (!node?.el || !node?.text) return
    const { el } = node
    const addEvent = (event, cb, opt) => { el.addEventListener(event, cb, opt); cleaup(() => el.removeEventListener(event, cb)) }
    const addAttr = (k, v) => { el.setAttribute(k, v); cleaup(() => el.removeAttribute(k)) }

    addEvent('click', () => {
      const text = el.innerText
      addAttr('lcd-text', '')
      addAttr('contenteditable', 'plaintext-only')
      addAttr('spellcheck', 'false')
      cleaup(() => el.ownerDocument.getSelection()?.empty())
      cleaup(() => el.innerText != text && triggerRef(toRef(node.data, 'children')))
      
      addEvent('input', (e) => {
        e.stopPropagation()
        toRaw(node.data).children = el.innerText
      })
      addEvent('keydown', async (e) => {
        if (e.key == 'Enter') {
          e.preventDefault()
          designerCtx.activeId = void 0
          await nextTick()
          designerCtx.activeId = node.id
        }
        e.stopPropagation()
      })
      addEvent('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
      })
    }, { once: true })
  })
}

export function deactivate(designer) {

}

export const contributes = (designerCtx) => ({
  activitybar: [
    {
      id: 'widgets',
      title: '组件',
      icon: 'https://api.iconify.design/tdesign:widget.svg'
    },
    // {
    //   id: 'git-explorer',
    //   title: '资源管理器',
    //   icon: 'https://api.iconify.design/vscode-icons:default-folder.svg'
    // },
    {
      id: 'snippets',
      title: '片段',
      icon: 'https://api.iconify.design/pajamas:snippet.svg'
    },
    {
      id: 'comp-tree',
      title: '组件树',
      icon: 'https://api.iconify.design/tdesign:tree-list.svg'
    },
    {
      id: 'schema-sourcecode',
      title: 'Schema 源码',
      icon: 'https://api.iconify.design/tdesign:braces.svg'
    },
    {
      id: 'plugin-market',
      title: '插件市场',
      icon: 'https://api.iconify.design/tdesign:extension.svg'
    },
  ],
  views: {
    'snippets': [
      { id: 'snippets', renderer: create(defineAsyncComponent(() => import('./views/SnippetsView.vue'))) }
    ],
    'comp-tree': [
      { id: 'comp-tree', renderer: create(defineAsyncComponent(() => import('./views/CompTreeView.vue'))) }
    ],
    'schema-sourcecode': [
      { id: 'schema-sourcecode', renderer: create(defineAsyncComponent(() => import('./views/Schema.vue'))) }
    ],
    'plugin-market': [
      { id: 'plugin-market', renderer: create(defineAsyncComponent(() => import('./views/PluginsView.vue'))) }
    ],
    
  },
  // todo
  customEditors: [
    {
      id: 'schema.json.editor',
      displayName: '',
      selector: [
        { filenamePattern: '*.schema.json' }
      ],
      priority: 'default',
    },
    {
      id: 'img.editor',
      displayName: '',
      selector: [
        { filenamePattern: '*.+(jp{,e}g|png|svg|gif)' }
      ],
      priority: 'default',
    },
    {
      id: 'md.editor',
      displayName: '',
      selector: [
        { filenamePattern: '*.md' }
      ],
      priority: 'default',
    },
    {
      id: 'md.editor',
      displayName: '',
      selector: [
        { filenamePattern: '*.+(js{,x}|ts{,x}|html|vue|json)' }
      ],
      priority: 'default',
    }
  ],
  statusbar: [
    // { text: 'statusbar-test', command: 'lcd.toggleDevice' },
    // { text: 'statusbar-right', align: 'right', onClick: () => alert(11) },
  ],
  commands: [
    { command: 'lcd.toggleDevice', title: 'Toggle Device' },
    { command: 'lcd.clear', title: 'Clear' },
    { command: 'lcd.undo', title: 'Undo' },
    { command: 'lcd.redo', title: 'Redo' },
    { command: 'lcd.download', title: 'Download' },
  ],
  // todo
  menus: {
    'node/context': node => [
      { label: '上移', icon: 'https://api.iconify.design/solar:arrow-up-linear.svg', disabled: () => node.vSlotName || !node.prev, onClick: () => node.after(node.prev) },
      { label: '下移', icon: 'https://api.iconify.design/solar:arrow-down-linear.svg', disabled: () => node.vSlotName || !node.next, onClick: () => node.before(node.next) },
      { label: '拷贝', icon: 'https://api.iconify.design/solar:copy-line-duotone.svg', disabled: () => node.vSlotName || !node.parent, onClick: () => node.after(node.clone()) },
      { label: '清空', icon: 'https://api.iconify.design/solar:broom-broken.svg', class: 'hover:c-red', onClick: () => node.empty() },
      { label: '删除', icon: 'https://api.iconify.design/solar:trash-bin-minimalistic-linear.svg', class: 'hover:c-red', disabled: () => !node.parent, onClick: () => node.remove() },
      { is: 'hr' },
      { label: '代码', icon: 'https://api.iconify.design/solar:code-bold.svg', onClick: () => showCode(node) },
      { label: '导出为', icon: 'https://api.iconify.design/material-symbols:imagesmode-outline-rounded.svg', children: [
        { label: 'PNG', icon: 'https://api.iconify.design/ic:outline-photo-size-select-actual.svg', click: () => toImg(node.el, 'png', node.is) },
        { label: 'JPG', icon: 'https://api.iconify.design/ic:outline-photo-size-select-actual.svg', click: () => toImg(node.el, 'jpg', node.is) },
        { label: 'WEBP', icon: 'https://api.iconify.design/ic:outline-photo-size-select-actual.svg', click: () => toImg(node.el, 'webp', node.is) },
        { label: 'PDF', icon: 'https://api.iconify.design/streamline:convert-pdf-2.svg', click: () => toPdf(node) },
        { label: 'SVG', icon: 'https://api.iconify.design/tabler:file-type-svg.svg', click: () => toImg(node.el, 'svg', node.is) },
      ] },
      { is: 'hr' },
      { label: 'v-slots', vIf: vSlots(node), icon: 'https://api.iconify.design/fa6-solid:check-to-slot.svg', children: 
        vSlots(node)?.map(slot => ({ label: slot, checked: () => !!node.vSlots[slot], onClick: () => node.vSlots[slot] = node.vSlots[slot] ? void 0 : [] }))
      },
      { label: 'slot', vIf: slots(node), icon: 'https://api.iconify.design/fa6-solid:check-to-slot.svg', children:
        slots(node)?.map(slot => ({ label: slot, checked: () => node.data.slot == slot, onClick: () => node.data.slot = node.data.slot == slot ? void 0 : slot }))
      },
      { is: 'hr' },
    ],
    // todo
    'view/title': [
      {
        command: '',
        when: e => e.view.id == 'plugin-market.views.all',
        group: 'navigation' // inline
      }
    ],
    // todo
    'view/item/context': [
      {
        command: '',
        when: e => e.view.id == 'plugin-market.views.all',
        group: 'navigation'
      }
    ],
    // todo
    'editor/context': [

    ],
    // todo
    'editor/title': [
      
    ],
    // todo
    'editor/title/context': [
      
    ],
  }
})


const vSlots = node => isPlainObject(node.config?.vSlots) ? Object.keys(node.config?.vSlots) : node.config?.vSlots
const slots = node => node.parent?.config?.slots

async function showCode(node) {
  const vmodel = (model, prop) => ({ modelValue: get(model, prop), 'onUpdate:modelValue': v => set(model, prop, v) })
  const state = reactive({ lang: 'html', code: '' })

  await langChange()
  async function langChange() {
    state.code = await ({
      html: () => genCode.vue$(node).then(e => e.template),
      json: () => JSON.stringify(node.data, void 0, '  ')
    })[state.lang]()
  }

  await showDialog({ title: '代码' }, () => [
    h(ElSegmented, { ...vmodel(state, 'lang'), options: [{ label: 'Html ', value: 'html' }, { label: 'Schema', value: 'json' }], onChange: langChange }),
    h(MonacoEditor, { ...vmodel(state, 'code'), class: 'mt12', language: state.lang, style: 'height: 500px' }),
  ])

  const json = await ({
    html: () => html2schema(state.code),
    json: () => JSON.parse(state.code)
  })[state.lang]()

  const i = node.index
  
  node.parent.data.children.splice(i, 1, ...toArr(json))
  node.parent.children[i].click()
}

function toPdf(node) {
  node.el.ownerDocument.defaultView.print()
}

async function toImg(el, format, filename) {
  await new Promise(resolve => setTimeout(resolve, 300))
  let dataUrl = ''
  if (format == 'svg') {
    const lib = await import('https://unpkg.com/html-to-image@1.11.11/es/index.js')
    dataUrl = await lib[{ png: 'toPng', jpg: 'toJpeg', webp: 'toWebp', svg: 'toSvg' }[format]](el, { style: { margin: 0, overflow: 'hidden' } })
  } else {
    const lib = await import('https://unpkg.com/modern-screenshot@4.5.5/dist/index.mjs')
    dataUrl = await lib[{ png: 'domToPng', jpg: 'domToJpeg', webp: 'domToWebp', svg: 'domToForeignObjectSvg' }[format]](el, { style: { margin: 0, overflow: 'hidden' }, scale: devicePixelRatio })
    if (dataUrl?.nodeType == Node.ELEMENT_NODE) {
      // todo
      console.log(dataUrl);
    }
  }
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = `${filename}.${Date.now()}.${format}`
  a.click()
}

window.toPng = (el) => toImg(el, 'png', designerCtx.active.is)