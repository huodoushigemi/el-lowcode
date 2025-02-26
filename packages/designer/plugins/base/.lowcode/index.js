import { defineAsyncComponent, h, reactive, watchEffect, triggerRef, toRef, toRaw, nextTick, watchSyncEffect } from 'vue'
import { isPlainObject } from '@vue/shared'
import { useEventListener } from '@vueuse/core'
import { get, html2schema, set, toArr, uid } from '@el-lowcode/utils'
import { genCode, quickPick, showDialog } from '../../../utils'
import MonacoEditor from '../../../layout/components/monaco-editor.vue'
import DS from './DS.vue'
import ExportCode from './ExportCode.vue'

export function activate(lcd) {
  // 文本元素 开启编辑模式
  watchEffect(cleaup => {
    const node = lcd.active
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
          lcd.activeId = void 0
          await nextTick()
          lcd.activeId = node.id
        }
        e.stopPropagation()
      })
      addEvent('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
      })
    }, { once: true })
  })

  // 共享 Vue 内存，以便实现数据响应
  watchSyncEffect(() => {
    if (!lcd.canvas.window) return
    const win = lcd.canvas.window
    win.Vue = window.Vue
    win.VueDemi = window.VueDemi
    win.Moveable = window.Moveable
  })

  // iframe 滚动穿透处理
  useEventListener(() => lcd.state.infiniteViewer.disabled ? void 0 : lcd.canvas.window?.document, 'wheel', e => {
    const { frameElement, WheelEvent } = lcd.canvas.window
    if (e.altKey) {
      if (
        e.deltaY < 0 && window.scrollY == 0 ||
        e.deltaY > 0 && window.scrollY + 1 >= (document.documentElement.scrollHeight - window.innerHeight)
      ) {
        e.preventDefault()
        e.stopPropagation()
      }
      return
    }
    e.preventDefault()
    e.stopPropagation()
    
    const rect = frameElement.getBoundingClientRect()
    const x = e.x + rect.x, y = e.y + rect.y
    
    const event = new WheelEvent(e.type, {
      ...pick(e, [
        'deltaMode', 'deltaX', 'deltaY', 'deltaZ',
        'button', 'buttons',
        'screenX', 'screenY',
        'detail', 'which',
        'altKey', 'ctrlKey', 'metaKey', 'shiftKey',
        // 'modifierAltGraph', 'modifierCapsLock', 'modifierFn', 'modifierFnLock', 'modifierHyper', 'modifierNumLock', 'modifierScrollLock', 'modifierSuper', 'modifierSymbol', 'modifierSymbolLock',
        'bubbles', 'cancelable', 'composed'
      ]),
      // view: parent,
      clientX: x, clientY: y,
    })
    
    frameElement.dispatchEvent(event)
  }, { passive: false, capture: true })
}

export const contributes = (lcd) => ({
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
      { id: 'snippets', is: defineAsyncComponent(() => import('./views/SnippetsView.vue')) }
    ],
    'comp-tree': [
      { id: 'comp-tree', is: defineAsyncComponent(() => import('./views/SnippetsView.vue')) }
    ],
    'schema-sourcecode': [
      { id: 'schema-sourcecode', is: defineAsyncComponent(() => import('./views/Schema.vue')) }
    ],
    'plugin-market': [
      { id: 'plugin-market', is: defineAsyncComponent(() => import('./views/SnippetsView.vue')) }
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
    { command: 'toggleDevice', icon: { class: 'mr4 h20!', src: 'https://api.iconify.design/material-symbols:devices-outline.svg' }, class: 'ml0!', style: 'background: #3655b5', children: devices.find(e => e.eq([lcd.canvas.w, lcd.canvas.h]))?.label || 'auto' },
    { command: 'clear', icon: 'https://api.iconify.design/tdesign:close.svg' },
    { command: 'undo', icon: 'https://api.iconify.design/mdi:undo-variant.svg', class: 'mr0!', disabled: () => !lcd.state.history.canUndo },
    { command: 'redo', icon: 'https://api.iconify.design/mdi:redo-variant.svg', class: 'ml0!', disabled: () => !lcd.state.history.canRedo },
    { command: 'openExportCode', icon: 'https://api.iconify.design/tdesign:download.svg' },
  ],
  commands: [
    { command: 'toggleDevice', cb: () => toggleDevice(lcd) },
    { command: 'openState', title: 'Open State', cb: () => openState(lcd) },
    { command: 'openDataSource', title: 'Open Data Source', cb: () => openDataSource(lcd) },
    { command: 'openExportCode', title: 'Open Export Code', cb: () => openExportCode(lcd) },
    { command: 'clear', title: 'Clear', cb: () => (lcd.canvas.window.unmount(), lcd.root = { _id: uid(), is: 'Page', children: [], state: { count: 0 }, plugins: [] }) },
    { command: 'undo', title: 'Undo', cb: () => lcd.state.history.undo() },
    { command: 'redo', title: 'Redo', cb: () => lcd.state.history.redo() },
  ],
  // todo
  menus: {
    'node/context': node => [
      { label: '上移', icon: 'https://api.iconify.design/solar:arrow-up-linear.svg', disabled: () => node.vSlotName || !node.prev, click: () => node.after(node.prev) },
      { label: '下移', icon: 'https://api.iconify.design/solar:arrow-down-linear.svg', disabled: () => node.vSlotName || !node.next, click: () => node.before(node.next) },
      { label: '拷贝', icon: 'https://api.iconify.design/solar:copy-line-duotone.svg', disabled: () => node.vSlotName || !node.parent, click: () => node.after(node.clone()) },
      { label: '清空', icon: 'https://api.iconify.design/solar:broom-broken.svg', class: 'hover:c-red', click: () => node.empty() },
      { label: '删除', icon: 'https://api.iconify.design/solar:trash-bin-minimalistic-linear.svg', class: 'hover:c-red', disabled: () => !node.parent, click: () => node.remove() },
      { is: 'hr' },
      { label: '代码', icon: 'https://api.iconify.design/solar:code-bold.svg', click: () => showCode(node) },
      { label: '导出为', icon: 'https://api.iconify.design/material-symbols:imagesmode-outline-rounded.svg', children: [
        { label: 'PNG', icon: 'https://api.iconify.design/ic:outline-photo-size-select-actual.svg', click: () => toImg(node.el, 'png', node.is) },
        { label: 'JPG', icon: 'https://api.iconify.design/ic:outline-photo-size-select-actual.svg', click: () => toImg(node.el, 'jpg', node.is) },
        { label: 'WEBP', icon: 'https://api.iconify.design/ic:outline-photo-size-select-actual.svg', click: () => toImg(node.el, 'webp', node.is) },
        { label: 'PDF', icon: 'https://api.iconify.design/streamline:convert-pdf-2.svg', click: () => toPdf(node) },
        { label: 'SVG', icon: 'https://api.iconify.design/tabler:file-type-svg.svg', click: () => toImg(node.el, 'svg', node.is) },
      ] },
      { is: 'hr' },
      { label: 'v-slots', vIf: vSlots(node), icon: 'https://api.iconify.design/fa6-solid:check-to-slot.svg', children: 
        vSlots(node)?.map(slot => ({ label: slot, checked: () => !!node.vSlots[slot], click: () => node.vSlots[slot] = node.vSlots[slot] ? void 0 : true }))
      },
      { label: 'slot', vIf: slots(node), icon: 'https://api.iconify.design/fa6-solid:check-to-slot.svg', children:
        slots(node)?.map(slot => ({ label: slot, checked: () => node.data.slot == slot, click: () => node.data.slot = node.data.slot == slot ? void 0 : slot }))
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

  // const { Repl, useStore } = await import('@vue/repl')
  // const CodeMirror = await import('@vue/repl/codemirror-editor').then(e => e.default)
  // const Monaco = await import('@vue/repl/monaco-editor').then(e => e.default)

  // const store = useStore(toRefs({
  //   showOutput: false,
  // }))

  showDialog({ title: '代码', ok }, () => [
    // h(ElSegmented, { ...vmodel(state, 'lang'), options: [{ label: 'Html ', value: 'html' }, { label: 'Schema', value: 'json' }], onChange: langChange }),
    h(MonacoEditor, { ...vmodel(state, 'code'), class: 'mt12', language: state.lang, style: 'height: 500px' }),
    // h(Repl, { editor: Monaco, style: 'height: 500px', theme: 'dark', showImportMap: false, showTsConfig: false, clearConsole: false,  })
  ])
  
  async function ok() {
    const json = await ({
      html: () => html2schema(state.code),
      json: () => JSON.parse(state.code)
    })[state.lang]()
  
    const i = node.index
    
    node.parent.data.children.splice(i, 1, ...toArr(json))
    node.parent.children[i].click()
  }
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

async function openState(lcd) {
  const { default: JSON5 } = await import('https://unpkg.com/json5@2.2.3/dist/index.min.mjs')
  let code = `export default ${JSON5.stringify(lcd.root.state || {}, void 0, '  ')}`
  await lcd.showDialog({ is: 'el-drawer', title: 'State', modalClass: 'props', size: '400px' }, () => [
    h(MonacoEditor, { modelValue: code, 'onUpdate:modelValue': v => code = v, language: 'javascript', autofocus: true }),
  ])
  lcd.root.state = JSON5.parse(code.replace(/^export default/, ''))
}

async function openDataSource(lcd) {
  await lcd.showDialog({ is: 'el-drawer', title: 'State', modalClass: 'props', size: '400px' }, () => h(DS, { modelValue: lcd.ds?.list, 'onUpdate:modelValue': v => set(lcd, 'ds.list', v) }))
}

async function openExportCode(lcd) {
  await lcd.showDialog({ is: 'el-drawer', size: '60%', withHeader: false, withFooter: false, direction: 'rtl', okText: 'Download' }, () => h(ExportCode, { modelValue: lcd.state.ds }))
}

const devices = [['iPhone SE', '375,667'], ['iPhone12 Pro', '390,844'], ['iPad Mini', '768,1024']].map(e => ({
  label: e[0],
  description: e[1].replace(',', ' × '),
  value: e[1].split(',').map(e => +e),
  eq: (v) => v?.join(',') == e[1]
}))

async function toggleDevice(lcd) {
  const [w, h] = await quickPick({ items: devices, value: [lcd.canvas.w, lcd.canvas.h] })
  lcd.canvas.w = w
  lcd.canvas.h = h
}