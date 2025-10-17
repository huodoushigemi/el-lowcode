import { execSync } from 'child_process'
import fse from 'fs-extra'
import { pkgDir, pkgJson } from './utils.js'
import { ALL_PKGS } from '../build/all-pkgs.js'
import rootPkg from '../package.json' assert { type: 'json' }

// 版本号同步
function verSync(pack) {
  const pkg = pkgJson(pack)
  pkg.version = rootPkg.version
  for (const name of ALL_PKGS) {
    pkg.dependencies?.[name] && (pkg.dependencies[name] = `^${pkg.version}`);
    pkg.peerDependencies?.[name] && (pkg.peerDependencies[name] = `^${pkg.version}`);
  }
  pkgJson(pack, pkg)

  fse.copyFileSync(pkgDir(pack, 'package.json'), pkgDir(pack, 'dist/package.json'))
}

// 发布
function publish(pack) {
  verSync(pack)
  execSync(`npm publish --access public --registry https://registry.npmjs.org/`, { cwd: pkgDir(pack, 'dist') })
}

publish('render')
// publish('crud')
publish('el-lowcode')
