import path from 'path'
import { build } from 'vite'
import fs from 'fs'
import fse from 'fs-extra/esm'
import { ALL_DEPS, ALL_PKGS } from './all-pkgs.js'
import { mergeConfig } from './defaultConfig.js'

async function build1(input, outDir) {
  await build(mergeConfig({
    configFile: false,
    mode: 'production',
    build: {
      outDir,
      target: 'esnext',
      lib: {
        entry: input,
        formats: ['es'],
        fileName: '[name]',
      },
      minify: false,
      copyPublicDir: false,
      rollupOptions: {
        // treeshake: 'smallest',
        manualChunks: (id) => {
          const dep = [...ALL_DEPS, '@vue'].find(e => id.includes(`node_modules/${e}/`))
          if (dep && dep != 'vue') return dep.replaceAll('/', '-')
        },
      }
    },
    plugins: [
      (await import('vite-plugin-css-injected-by-js')).default({ relativeCSSInjection: true }),
      // (await import('rollup-plugin-visualizer')).visualizer(),
    ]
  }))

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
// await buildPlugin('element-plus')
// await buildPlugin('echarts')
// await buildPlugin('ant-design-vue')
// await buildPlugin('naive-ui')
// await buildPlugin('mdui')
// await buildPlugin('material-web')
// await buildPlugin('shoelace')
// await buildPlugin('threejs')
// await buildPlugin('chatgpt')
// await buildPlugin('template')
