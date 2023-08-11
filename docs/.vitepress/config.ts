import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "el-lowcode",
  description: "vue3 + element-plus / lowcode",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'el-form-render',
        items: [
          { text: '基础使用 basic', link: '/el-form-render/basic' },
          { text: 'Runtime API Examples', link: '/markdown-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/huodoushigemi/el-lowcode' }
    ]
  },

  vite: {
    plugins: [
      AutoImport({ imports: 'vue' }),
      MarkdownPreview(),
    ],
  },
})
