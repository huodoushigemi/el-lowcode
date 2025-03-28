import { isString } from '@vue/shared'
import { fileSelect, fileToBase64 } from '@el-lowcode/utils'
import { decode } from 'https://unpkg.com/js-base64/base64.mjs'

export const AI = [
  // {
  //   name: 'DeepSeek',
  //   icon: 'https://api-docs.deepseek.com/zh-cn/img/favicon.svg',
  //   key: decode('c2stMzkzNWVjYzUxYzJiNGYxMzhmNzM0ZjU2YzVkODNhZjc='),
  //   models: ['deepseek-reasoner', 'deepseek-chat'],
  //   stream: (opt, content, c) => openai({ url: 'https://api.deepseek.com', ...opt }, content, c)
  // },
  {
    name: 'OpenAI',
    icon: 'https://openai.com/icon.svg',
    key: decode('c2stcHJvai13UlY0Z2lFMndGQk5oMVJNWkpnU09rWG9GYjhyOFVuQUNBVVBwMUJzd0tMTnlGMjJ0bzBQcG5xZXpJVEJEdFRXSUhVNldjOUF5aFQzQmxia0ZKcU1iUGhDM0hTYnZ3QklBZzBadE81eVdJVklONEVMQ2FJcGlBdVdxWjljal81MGlrWGU2TExaZERyZE9jYnhVN3hMdzlobE0wUUE='),
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'],
    stream: (opt, content, c) => openai(opt, content, c)
  },
  {
    name: 'Gemini',
    icon: 'https://www.google.com.hk/images/branding/googleg/1x/googleg_standard_color_128dp.png',
    key: decode('QUl6YVN5QTItdEF6RXk4X2plTHhqbU1mZGszZ2VtaTY2TFZUXzVF'),
    models: ['gemini-2.0-flash', 'gemini-1.5-flash'],
    stream: (opt, content, c) => gemini(opt, content, c)
  }
]

async function* openai(opt, content = [], controller) {
  const OpenAI = await import('https://unpkg.com/openai@4.82.0/index.mjs').then(e => e.default)
  const openai = new OpenAI({
    baseURL: opt.url,
    apiKey: opt.key,
    dangerouslyAllowBrowser: true
  })
  content = await Promise.all(content.map(async e => 
    isString(e) ? { type: 'text', content: e } :
    e instanceof File ? { typr: 'image_url', image_url: { url: await fileToBase64(e) } } :
    void 0
  ))
  try {
    const stream = await openai.chat.completions.create({
      messages: [{ role: 'user', content }],
      model: opt.model ?? 'deepseek-chat',
      stream: true
    })
    for await (const chunk of stream) {
      yield chunk.choices[0]?.delta?.content || ''
    }
  } catch (e) {
    yield e.message
  }
}

async function* gemini(opt, content = [], controller) {
  const { GoogleGenerativeAI } = await import('https://unpkg.com/@google/generative-ai@0.21.0/dist/index.mjs')
  const model = (new GoogleGenerativeAI(opt.key)).getGenerativeModel({ model: opt.model })
  content = await Promise.all(content.map(async e => 
    isString(e) ? e :
    e instanceof File ? { inlineData: { data: (await fileToBase64(e)).split(',')[1], mimeType: e.type } } :
    void 0
  ))
  try {
    const { stream } = await model.generateContentStream(content, controller)
    for await (const res of stream) {
      yield res.text()
    }
  } catch (e) {
    yield e.message
  }
}