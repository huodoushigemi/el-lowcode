import { ALL_DEPS } from './build/all-pkgs.js'
import { mergeConfig } from './build/defaultConfig.js'

// https://vitejs.dev/config/
export default mergeConfig({
  base: './',
  optimizeDeps: {
    exclude: ['vue'],
  },
  server: {
    port: 5174
  },
  build: {
    // outDir: 'docs/dest/designer',
    // emptyOutDir: false,
    rollupOptions: {
      input: {
        index: '/index.html',
        demo: '/demo.html',
      },
      output: {
        manualChunks: (id) => {
          const dep = [...ALL_DEPS, '@vue'].find(e => id.includes(`node_modules/${e}/`))
          if (dep && dep != 'vue') return dep.replaceAll('/', '-')
        }
      },
      plugins: [
        (await import('rollup-plugin-visualizer')).visualizer(),
      ]
    }
  },
  plugins: [
    // (await import('./build/plugins/rollup-plugin-transform-html')).default(),
    (await import('vite-plugin-pages')).default({ dirs: 'designer/pages' }),
  ]
})