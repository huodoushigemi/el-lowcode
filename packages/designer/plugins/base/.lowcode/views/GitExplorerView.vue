<template>
  <Tree
    :data="designerCtx.root.children"
    :props="{ id: '_id', label: e => e['data-layer'] || (isString(e.children) && e.children) || e.is, children: e => typeof e.children == 'string' ? void 0 : e.children }"
    draggable
    :dropable="({ to }) => to.dir"
  />
</template>

<script setup>
import { inject } from 'vue'
import { isString } from '@vue/shared'
import { Tree } from '@el-lowcode/designer'
import http from 'https://unpkg.com/isomorphic-git/http/web/index.js'

const designerCtx = inject('designerCtx')

const dir = '/test-dir'

const fs = window.fs
const pfs = window.pfs
const git = window.git

const files = ref([])

;(async () => {
  await pfs.stat(dir).catch(() => pfs.mkdir(dir))

  const remotes = await git.listRemotes({ fs, dir })

  if (remotes.length) {
    await git.fastForward({ fs, http, dir, ref: 'master', singleBranch: true })
  } else {
    await git.clone({
      fs,
      http,
      dir,
      corsProxy: location.origin,
      url: 'https://gitee.com/httpsgiteecomepalserver/git-test.git',
      ref: 'master',
      singleBranch: true,
      depth: 1,
      onAuth: url => {
        return { username: prompt('Enter username'), password: prompt('Enter password') }
      },
      onAuthSuccess: (url, auth) => {
  
      },
      onAuthFailure(url, auth) {
        if (confirm('Access was denied. Try again?')) {
          return { username: prompt('Enter username'), password: prompt('Enter password') }
        } else {
          return { cancel: true }
        }
      }
    })
  }

  files.value = await git.listFiles({ fs, dir: '/test-dir' })
})()
</script>