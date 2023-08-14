import path from 'path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import AutoImport from 'unplugin-auto-import/vite'
import { ALL_PKGS } from '../../build/all-pkgs.js'
import { cwd, pkgDir } from '../../build/utils.js'

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
          { text: '基础使用', link: '/el-form-render/basic' },
          { text: 'Runtime API Examples', link: '/markdown-examples' },
        ]
      },
      {
        text: 'crud',
        items: [
          { text: '基础使用', link: '/crud/basic' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/huodoushigemi/el-lowcode' }
    ]
  },

  vite: {
    optimizeDeps: {
      exclude: ALL_PKGS,
    },
    resolve: {
      alias: ALL_PKGS.map(pkg => ({
        find: pkg,
        replacement: path.join(cwd, pkgDir(pkg.replace('@el-lowcode/', ''), 'index.ts'))
      }))
    },
    plugins: [
      AutoImport({ imports: 'vue' }),
      MarkdownPreview(),
    ],
  },
})
