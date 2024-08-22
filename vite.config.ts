import { defineConfig } from 'vite'
import { ALL_DEPS } from './build/all-pkgs.js'

// console.log(ALL_DEPS);

import { entries } from './build/plugins/alias'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  base: '/el-lowcode/designer',
  resolve: {
    alias: [
      ...entries,
    ]
  },
  optimizeDeps: {
    exclude: ['vue'],
  },
  server: {
    port: 5174
  },
  build: {
    outDir: 'docs/dest/designer',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const dep = [...ALL_DEPS, '@vue'].find(e => id.includes(`node_modules/${e}/`))
          if (dep && dep != 'vue') return dep.replaceAll('/', '-')
        }
      },
      plugins: [
        (await import('rollup-plugin-visualizer')).visualizer()
      ]
    }
  },
  plugins: [
    // vue(),
    {
      name: 'xxxxxxxxxxxxxxx',
      enforce: 'post',
      transform: {
        order: 'post',
        handler(code, id, options) {
          return code
            ?.replaceAll('\'/el-lowcode/designer', '\'http://localhost:5174/el-lowcode/designer')
            .replaceAll('\"/el-lowcode/designer', '\"http://localhost:5174/el-lowcode/designer')
        },
      },
      transformIndexHtml: {
        order: 'post',
        handler(code) {
          return code
            ?.replaceAll('\'/el-lowcode/designer', '\'http://localhost:5174/el-lowcode/designer')
            .replaceAll('\"/el-lowcode/designer', '\"http://localhost:5174/el-lowcode/designer')
        }
      }
    },
    (await import('unplugin-vue-macros/vite')).default({
      plugins: {
        vue: (await import('@vitejs/plugin-vue')).default(),
        vueJsx: (await import('@vitejs/plugin-vue-jsx')).default(), // if needed
      }
    }),
    (await import('unocss/vite')).default(),
    (await import('unplugin-vue-components/vite')).default({
      resolvers: [(await import('unplugin-icons/resolver')).default()]
    }),
    (await import('unplugin-icons/vite')).default({ autoInstall: true, compiler: 'vue3' }),
    (await import('vite-plugin-pages')).default({ dirs: 'designer/pages' }),
    
    { ...(await import('rollup-plugin-external-globals')).default({ vue: 'Vue' }), enforce: 'post' } as any,
  ]
}))
