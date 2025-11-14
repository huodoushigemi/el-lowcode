import path from 'path'
import { ALL_DEPS } from './build/all-pkgs.js'
import { defineConfig, mergeConfig, Plugin } from 'vite'
import { defaultConfig } from './build/defaultConfig.js'

// https://vitejs.dev/config/
const config = defineConfig({
  base: './',
  define: {
    'process.env': process.env
  },
  server: {
    host: '0.0.0.0',
    port: 5174
  },
  build: {
    // outDir: 'docs/dest/designer',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        index: '/index.html',
        demo: '/demo.html',
      },
      output: {
        manualChunks: (id, meta) => {
          // const dep = [...ALL_DEPS, '@vue'].find(e => id.includes(`node_modules/${e}/`))
          // if (dep && dep != 'vue') return dep.replaceAll('/', '-')
          const dep = [...ALL_DEPS].find(e => id.includes(`node_modules/${e}/`))
          if (dep) return dep.replaceAll('/', '-')
        }
      },
      external: ['vue', 'vue-demi'],
      plugins: [
        (await import('rollup-plugin-visualizer')).visualizer() as any,
      ]
    }
  },
  plugins: [
    (await import('vite-plugin-pages')).default({ dirs: 'designer/pages' }),
  ]
})

export default env => mergeConfig(defaultConfig(env), config)