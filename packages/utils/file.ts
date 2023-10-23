export function download(text: string, filename: string) {
  const file = new File([text], filename, { type: 'text/plain' })
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  a.click()
  URL.revokeObjectURL(url)
}