import fg from 'fast-glob'

console.log(
  fg.sync(`packages/utils/**/*.(ts|vue)`, { ignore: ['**/node_modules', '**/dist'] })
);