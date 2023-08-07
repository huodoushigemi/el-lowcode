import fs from 'fs'
import path from 'path'

const dirs = fs.readdirSync(path.join(process.cwd(), 'packages'))
console.log(dirs);