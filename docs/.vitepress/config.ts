import path from 'path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import AutoImport from 'unplugin-auto-import/vite'
import { ALL_PKGS } from '../../build/all-pkgs.js'
import { cwd, pkgDir } from '../../build/utils.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "El Lowcode",
  description: "一款高效的低代码神器",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/el-form-render/quickstart' }
    ],

    sidebar: [
      {
        text: 'el-form-render',
        items: [
          { text: '快速开始', link: '/el-form-render/quickstart' },
          { text: '基础使用', link: '/el-form-render/basic' },
          // { text: 'Runtime API Examples', link: '/markdown-examples' },
        ]
      },
      {
        text: 'crud',
        items: [
          { text: '快速开始', link: '/crud/quickstart' },
          { text: '基础使用', link: '/crud/basic' },
          { text: '插槽', link: '/crud/slot' },
          { text: '属性', link: '/crud/attrs' },
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
