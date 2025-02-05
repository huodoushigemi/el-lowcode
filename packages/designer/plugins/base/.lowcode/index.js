import { isPlainObject } from '@vue/shared'
import { createApp, provide, defineAsyncComponent, h, reactive, watchEffect } from 'vue'
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
      { label: '上移', icon: 'https://api.iconify.design/solar:arrow-up-linear.svg', disabled: () => !node.prev, onClick: () => node.after(node.prev) },
      { label: '下移', icon: 'https://api.iconify.design/solar:arrow-down-linear.svg', disabled: () => !node.next, onClick: () => node.before(node.next) },
      { label: '拷贝', icon: 'https://api.iconify.design/solar:copy-line-duotone.svg', onClick: () => node.after(node.clone()) },
      { label: '清空', icon: 'https://api.iconify.design/solar:broom-broken.svg', hover: 'c-red', onClick: () => node.empty() },
      { label: '删除', icon: 'https://api.iconify.design/solar:trash-bin-minimalistic-linear.svg', hover: 'c-red', onClick: () => node.remove() },
      { is: 'hr' },
      // todo
      { label: '代码', icon: 'https://api.iconify.design/solar:code-bold.svg', onClick: () => showCode(node) },
      { is: 'hr' },
      { label: 'v-slots', vIf: vSlots(node), icon: 'https://api.iconify.design/fa6-solid:check-to-slot.svg', children: 
        vSlots(node)?.map(slot => ({ label: slot, checked: () => !!node.vSlots[slot], onClick: () => node.vSlots[slot] = node.vSlots[slot] ? void 0 : [] }))
      },
      { label: 'slot', vIf: slots(node), icon: 'https://api.iconify.design/fa6-solid:check-to-slot.svg', children:
        slots(node)?.map(slot => ({ label: slot, checked: () => node.data.slot == slot, onClick: () => node.data.slot = node.data.slot == slot ? void 0 : slot }))
      },
    ],
    'view/title': [
      {
        command: '',
        when: e => e.view.id == 'plugin-market.views.all',
        group: 'navigation' // inline
      }
    ],
    'view/item/context': [
      {
        command: '',
        when: e => e.view.id == 'plugin-market.views.all',
        group: 'navigation'
      }
    ],
    'editor/context': [

    ],
    'editor/title': [
      
    ],
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
  console.log(node.parent.data);
  
  node.parent.data.children.splice(i, 1, ...toArr(json))
  node.parent.children[i].click()
}