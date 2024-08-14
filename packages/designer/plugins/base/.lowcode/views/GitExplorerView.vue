<template>
  <Tree
    :data="tree"
    :props="{ id: 'path', label: 'name', children: 'files' }"
    #default="{ node, data }"
  >
    <img v-if="!data.files" :src="extIcons[data.name] ?? extIcons[data.ext] ?? extIcons.txt" mr5 w14 h14 object-contain />
    {{ data.name }}
  </Tree>
</template>

<script setup>
import { inject, ref } from 'vue'
import { Tree } from '@el-lowcode/designer'
import http from 'https://unpkg.com/isomorphic-git/http/web/index.js'
import { extIcons } from './data'

const designerCtx = inject('designerCtx')

const dir = '/test-dir'

const fs = window.fs
const pfs = window.pfs
const git = window.git

const tree = ref([])

async function readdir(dir) {
  const files = await pfs.readdir(dir).catch(() => [])
  const ps = files.map(async name => {
    const path = `${dir}/${name}`
    const file = await pfs.stat(path)
    if (file.isFile()) {
      return { type: 'file', name, path, ext: name.split('.').length >= 2 ? name.split('.').pop() : undefined }
    } else {
      return { type: 'dir', name, path, files: await readdir(path) }
    }
  })
  return await Promise.all(ps)
}

async function refresh() {
  tree.value = await readdir(dir)
  console.log(tree.value);
  
}

refresh()

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
      // url: location.origin + '/httpsgiteecomepalserver/git-test.git',
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
  
  refresh()
})()
</script>