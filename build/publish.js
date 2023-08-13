import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { cwd, pkgDir }  from './utils.js'
import rootPkg from '../package.json' assert { type: 'json' }

// 版本号同步
function verSync(pack) {
  const pkgPath = path.join(cwd, pkgDir(pack), 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  pkg.version = rootPkg.version
  writeFileSync(pkgPath, JSON.stringify(pkg, null, '  '))
}

// 发布
function publish(pack) {
  verSync(pack)
  execSync(`cd ${pkgDir(pack)} && npm publish`)
}

publish('el-form-render')
publish('crud')
