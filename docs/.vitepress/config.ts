import { defineConfig } from 'vitepress'
import Jsx from '@vitejs/plugin-vue-jsx'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { ALL_PKGS } from '../../build/all-pkgs.js'

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
          { text: 'options 属性', link: '/el-form-render/options' },
          { text: '自定义组件', link: '/el-form-render/is' },
          { text: 'ant-design-vue', link: '/el-form-render/antdv' },
          { text: 'naive-ui', link: '/el-form-render/naive-ui' },
          { text: 'vant-ui', link: '/el-form-render/vant' },
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
          { text: '获取值', link: '/crud/value' },
          { text: '勾选行', link: '/crud/select' },
        ]
      },

      {
        text: 'Render',
        items: [
          { text: '快速开始', link: '/render/quickstart' },
          { text: '基础使用', link: '/render/basic' },
        ]
      },

      {
        text: 'Designer',
        items: [
          // { text: '快速开始', link: '/designer/basic' },
          { text: '自定义组件', link: '/designer/custom-component' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/huodoushigemi/el-lowcode' }
    ]
  },

  base: '/el-lowcode',
  outDir: './dest',

  vite: {
    optimizeDeps: {
      exclude: ALL_PKGS,
    },
    ssr: {
      noExternal: ['vite-plugin-markdown-preview'],
    },
    plugins: [
      MarkdownPreview(),
      UnoCSS(),
      Jsx(),
      Components({ resolvers: [IconsResolver()] }),
      Icons({ autoInstall: true }),
    ],
  },
})
