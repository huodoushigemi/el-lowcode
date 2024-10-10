import prettyBytes from 'pretty-bytes'

export function download(text: string, filename: string) {
  const file = new File([text], filename, { type: 'text/plain' })
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  a.click()
  URL.revokeObjectURL(url)
}

export function fileSelect(opt?: { accept?: string; maxSize?: number, multiple?: boolean }) {
  const opts = { accept: '*/*', multiple: false, maxSize: Infinity, ...opt}
  return new Promise<File[]>((resolve, reject) => {
    const input = document.createElement('input')
    input.accept = opts.accept
    input.multiple = opts.multiple
    input.type = 'file'
    input.onchange = () => {
      const errs = Array.from(input.files || []).filter(e => e.size > opts.maxSize)
      if (errs.length) {
        const msg = `文件大小限制 ${prettyBytes(opts.maxSize)}\n` + errs.map(e => ` ◾ ${e.name} — ${prettyBytes(e.size)}`).join('\n')
        alert(msg)
        return reject(msg)
      }
      resolve(Array.from(input.files || []))
    }
    input.click()
  })
}

export async function chooseImg(opt?: { base64?: boolean, maxSize: number, multiple: boolean }) {
  const opts = { base64: false, ...opt}
  const imgs = await fileSelect({ accept: 'image/*', ...opts })
  if (opts.base64) {
    return Promise.all(imgs.map(e => fileToBase64(e)))
  }
  else {
    return imgs
  }
}

export function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}
