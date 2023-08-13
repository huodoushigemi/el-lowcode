import AutoImport from 'unplugin-auto-import/vite'

export const autoimport = AutoImport({
  imports: ['vue', '@vueuse/core'],
  // see: https://www.jianshu.com/p/1739e6bcb543
  ignore: ['h']
})
