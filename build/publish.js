import { execSync } from 'child_process'
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
}

// 发布
function publish(pack) {
  verSync(pack)
  execSync(`cd ${pkgDir(pack)} && npm publish --access public`)
}

publish('render')
publish('el-form-render')
publish('crud')
publish('el-lowcode')
