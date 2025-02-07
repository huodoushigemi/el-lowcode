<template>
  <div flex="~ col" class="py6 hfull">
    <div ref="scrollRef" class="flex flex-col flex-1 overflow-auto scroll-smooth">
      <div class="flex mb6 space-x-12">
        <div>
          MODEL
          <select class="vs-input py4 mt4" v-model="form.model">
            <template v-for="ai in AI">
              <hr />
              <optgroup :label="ai.name">
                <option v-for="val in ai.models" :value="val">
                  {{ val }}
                </option>
              </optgroup>
            </template>
          </select>
        </div>
    
        <div flex="~ 1 col">
          API KEY
          <input class="vs-input mt4" v-model="form.key" />
        </div>
      </div>

      <template v-for="msg in msgs">
        <div v-if="msg.self" class="p14 mt8" style="background: var(--vs-li-inactiveSelectionBg)">
          <div class="flex aic">
            <i-carbon:user-avatar-filled-alt class="w24 h24 mr4" />
            Me
          </div>
          <wc-mdit :content="msg.content" css="pre { padding: 8px; max-height: 192px; overflow: auto; background: #0a0a0a66; }" .options="{ breaks: true }" />
          <img :src="msg.image" class="block" style="width: -webkit-fill-available; max-height: 192px; object-fit: contain;" />
        </div>
        <div v-else class="p14" style="background: var(--vs-li-hover-bg)" @click="ok">
          <div class="flex aic">
            <!-- <i-ri:bilibili-fill class="w24 h24 mr8"/> -->
             <img class="w42 h42 mr8" :src="ai(msg.model).icon" />
            <!-- AI Assistant -->
             <div class="flex flex-col">
               <div>{{ ai(msg.model).name }}</div>
               <div class="op60" style="font-size: 12px;">{{ msg.model }}</div>
             </div>
          </div>
          <i-eos-icons:three-dots-loading v-if="!msg.content" style="width: 48px; height: 48px" />
          <wc-mdit v-else="msg.content" :content="msg.content" :css="`wc-hljs { padding: 8px; max-height: 192px; overflow: auto; background: #0a0a0a66; } ${!msg.done && blinkCaret}`" .options="{ highlight, linkify: true }" />
          <div class="vs-actions flex justify-end space-x-4">
            <!-- <i-pajamas:live-preview v-if="msg.done" class="vs-ai vs-li mla" title="View" @click="showModal(msg.content)" />
            <i-tdesign:file-import v-if="msg.done" class="vs-ai vs-li" title="Import to designer" @click="replaceCanvas(msg.content)" /> -->
            <i-solar:refresh-bold class="vs-ai vs-li" title="Import to designer" />
          </div>
        </div>
      </template>
    </div>
  
    <div ref="dropZone" class="relative m6 flex aic jcc b-1 rd-8 cursor-pointer" style="height: 96px" @click="fileSelect({ accept: 'image/*' }).then(e => send(e[0]))">
      <div v-if="isOverDropZone" class="absolute inset-0 op40 bg-#808080/40 rd-8" style="outline: 4px solid #808080;" />
      <div >Drop image here or&ensp;<span c-blue>click to upload</span></div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
import { toReactive, useDropZone, useLocalStorage } from '@vueuse/core'
import { fileSelect, fileToBase64, html2schema } from '@el-lowcode/utils'
import 'wc-mdit'
import 'wc-hljs'
import { AI } from './ai'

const props = defineProps(['lcd', 'onOk'])

const ai = v => AI.find(e => e.models.includes(v))

const form = toReactive(useLocalStorage('ai:options', {
  key: AI[0].key,
  model: AI[0].models[0],
}))

watch(() => ai(form.model), v => {
  form.key = v.key
})

const msgs = ref([
  {
    content: '```html\n<div>xxx</div>\n```',
    done: 1,
    model: 'gpt-4o'
  }
])

const dropZone = ref()
const { isOverDropZone } = useDropZone(dropZone, { dataTypes: e => e.some(e => e.includes('image')), onDrop: e => e?.[0] && send(e[0]) })

async function send(file, content = '将图片转为 HTML + Tailwind\n- 使用 CDN 引入 Tailwind: `\<script src="https://cdn.tailwindcss.com">\<\/script\>`\n- 颜色均使用 style 属性设置') {
  msgs.value.push({
    self: 1,
    image: await fileToBase64(file),
    content,
  })
  msgs.value.push({
    controller: new AbortController(),
    content: '',
    done: 0,
    model: form.model,
  })
  
  setTimeout(() => scrollRef.value.scrollTop = scrollRef.value.scrollHeight, 0)
  
  const row = msgs.value[msgs.value.length - 1]
  
  try {
    for await (const text of ai(form.model).stream(form, [content, file], row.controller)) {
      row.content += text
      stickyBottom()
    }
  } catch (e) {
    row.content = '❌ Error'
    throw e
  } finally {
    row.controller = void 0
    row.done = 1
  }
}

// 光标闪烁的竖线
const blinkCaret = `
.markdown-body > *:last-child::after,
.markdown-body:empty::after {
  content: ' ';
  display: inline-block;
  margin: 0 2px;
  width: 4px;
  line-height: 1em;
  opacity: 0.8;
  animation: blink-caret .75s infinite;
}

@keyframes blink-caret {
  from, to { background: transparent; }
  50% { background: currentColor; }
}
`


const scrollRef = ref()

// 置底
async function stickyBottom() {
  const isSticky = scrollRef.value?.scrollHeight - (scrollRef.value?.scrollTop + scrollRef.value?.clientHeight) < 60
  await Promise.resolve()
  if (isSticky) setTimeout(() => {
    scrollRef.value.style.scrollBehavior = 'unset'
    scrollRef.value.scrollTop = scrollRef.value.scrollHeight
    scrollRef.value.style.scrollBehavior = ''
  }, 0)
}

function highlight(code, lang) {
  const code2 = [
    `<div style="display: flex; justify-content: end; align-items: center; gap: 8px; padding: 4px 6px; background: #ffffff10">
      <div style="display: flex; align-items: center; margin-right: auto; opacity: .8">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M14.18 4.276a.75.75 0 0 1 .531.918l-3.973 14.83a.75.75 0 0 1-1.45-.389l3.974-14.83a.75.75 0 0 1 .919-.53m2.262 3.053a.75.75 0 0 1 1.059-.056l1.737 1.564c.737.662 1.347 1.212 1.767 1.71c.44.525.754 1.088.754 1.784c0 .695-.313 1.258-.754 1.782c-.42.499-1.03 1.049-1.767 1.711l-1.737 1.564a.75.75 0 0 1-1.004-1.115l1.697-1.527c.788-.709 1.319-1.19 1.663-1.598c.33-.393.402-.622.402-.818s-.072-.424-.402-.817c-.344-.409-.875-.89-1.663-1.598l-1.697-1.527a.75.75 0 0 1-.056-1.06m-8.94 1.06a.75.75 0 1 0-1.004-1.115L4.761 8.836c-.737.662-1.347 1.212-1.767 1.71c-.44.525-.754 1.088-.754 1.784c0 .695.313 1.258.754 1.782c.42.499 1.03 1.049 1.767 1.711l1.737 1.564a.75.75 0 0 0 1.004-1.115l-1.697-1.527c-.788-.709-1.319-1.19-1.663-1.598c-.33-.393-.402-.622-.402-.818s.072-.424.402-.817c.344-.409.875-.89 1.663-1.598z"/></svg>
        ${lang}</div>
      <button style="display: flex; align-items: center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M7 18V2h13v16zm2-2h9V4H9zm-6 6V6h2v14h11v2zm6-6V4z"/></svg></button>
      <button type="submit" data-code="${code}">OK</button>
    </div>`.replace(/\s+/g, ' '),
    lang != 'html' ? `<wc-hljs code="${code}" lang="${lang}"></wc-hljs>` : ''
  ].filter(e => e).join('')
  return (
    `<pre ${lang == 'html' ? 'style="margin-bottom: 0;"' : ''}>${code2}</pre>` + 
    (lang == 'html' ? `<iframe srcdoc="<style>html,body{margin:0;}</style>${code}<div />" style="display:block; border:0; margin-bottom: 13px; width:100%; max-height:256px;" onload="this.height = this.contentDocument.documentElement.offsetHeight" />` : '')
  )
}

async function ok(e) {
  const btn = e.composedPath().find(e => e.nodeType == Node.ELEMENT_NODE && e.tagName == 'BUTTON' && e.type == 'submit')
  const code = btn?.getAttribute('data-code')

  const node = props.lcd.active
  const i = node.index
  node.parent.data.children.splice(i, 1, ...await html2schema(code))
  node.parent.children[i].click()

  props.onOk()
}
</script>