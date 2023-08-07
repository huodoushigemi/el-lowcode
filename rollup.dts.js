import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'

export default defineConfig({
  input: 'packages/utils/dist/index.d.ts',
  output: [{ file: 'packages/utils/dist/index1.d.ts', format: 'es' }],
  external: id => !/^[./]/.test(id),
  plugins: [dts()]
})
