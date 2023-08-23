import { renameSync, rmdirSync } from 'fs'
import { removeSync } from 'fs-extra/esm'
import { execSync } from 'child_process'

console.info('==== pnpm docs:build')
execSync('pnpm docs:build')
 
console.info('==== remove dest')
removeSync('docs/.vitepress/dest')
renameSync('docs/.vitepress/dist', 'docs/.vitepress/dest')

console.info('==== git **')
execSync('git add */dest/*')
execSync('git commit -m docs')
execSync('git push')