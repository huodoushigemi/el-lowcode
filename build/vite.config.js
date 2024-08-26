// import { build } from './build.js'
import path from 'path'
import { build, defineConfig } from 'vite'
import fs from 'fs'
import fse from 'fs-extra/esm'
import { cwd } from './utils.js'
import { entries } from './plugins/alias.js'
import { ALL_DEPS, ALL_PKGS } from './all-pkgs.js'

// @ts-ignore
// export default defineConfig(async () => ({

export const defaultConfig = defineConfig({
  root: cwd,
  resolve: {
    alias: [
      ...entries,
    ]
  },
  plugins: [
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
    (await import('unplugin-icons/vite')).default({ autoInstall: true }),
  ]
})

async function build1(input, outDir) {
  await build({
    configFile: false,
    root: cwd,
    resolve: {
      alias: [
        ...entries,
      ]
    },
    build: {
      outDir,
      target: 'esnext',
      lib: {
        entry: input,
        formats: ['es'],
        fileName: '[name]',
      },
      cssCodeSplit: true,
      minify: false,
      copyPublicDir: false,
      rollupOptions: {
        treeshake: 'smallest',
        manualChunks: (id) => {
          const dep = [...ALL_DEPS, '@vue'].find(e => id.includes(`node_modules/${e}/`))
          if (dep && dep != 'vue') return dep.replaceAll('/', '-')
        },
      }
    },
    plugins: [
      (await import('unplugin-vue-macros/vite')).default({
        plugins: {
          vue: (await import('@vitejs/plugin-vue')).default(),
          vueJsx: (await import('@vitejs/plugin-vue-jsx')).default(), // if needed
        }
      }),
      (await import('vite-plugin-css-injected-by-js')).default({ relativeCSSInjection: true }),
      (await import('unocss/vite')).default(),
      (await import('unplugin-vue-components/vite')).default({
        resolvers: [(await import('unplugin-icons/resolver')).default()]
      }),
      (await import('unplugin-icons/vite')).default({ autoInstall: true }),

      (await import('rollup-plugin-external-globals')).default(id => (
        id == 'vue' ? 'Vue' :
        id == 'vue-demi' ? 'Vue' :
        id.includes('monaco-editor') ? 'MonacoEditor' : void 0
      ))

      // (await import('rollup-plugin-visualizer')).visualizer(),
    ]
  })

  ;['package.json', 'README.md'].forEach(name => {
    const file = path.join(path.dirname(input), name)
    if (fs.existsSync(file)) fse.copySync(file, path.join(outDir, name))
  })
}

async function buildPlugin(name) {
  await build1(`plugins/${name}/index.js`, `dist/plugins/${name}`)
  await build1(`plugins/${name}/.lowcode/index.js`, `dist/plugins/${name}/.lowcode`)
}


await buildPlugin('web')
await buildPlugin('element-plus')
await buildPlugin('echarts')
await buildPlugin('ant-design-vue')
await buildPlugin('naive-ui')
await buildPlugin('mdui')
await buildPlugin('material-web')
await buildPlugin('shoelace')
await buildPlugin('threejs')
await buildPlugin('chatgpt')
await buildPlugin('template')
