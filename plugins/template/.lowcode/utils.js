import { ElLoadingService, ElMessage } from 'element-plus'

export async function createClient() {
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.45.4')
  const supabase = createClient(
    'https://oxbkrsyagojtbckytbjx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Ymtyc3lhZ29qdGJja3l0Ymp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNzQzNTAsImV4cCI6MjA0Mjg1MDM1MH0.M3O3VPvgfaxtMaasBIM-rgPw90l1GAG_m-_RQqMbNMc'
  )

  // await supabase.auth.signUp({ email: '123@qq.com', password: '123456' })

  return supabase
}

export async function uploadLcd(json) {
  const text = JSON.stringify(json)
  const hash = (await import('md5')).default(text) + '.lcd.json'

  const supabase = await createClient()
  const storage = supabase.storage.from('lcd')

  const url = `${storage.url}/object/public/${storage.bucketId}/${hash}`

  try {
    const file = new File([text], hash, { type: 'text/plain' })
    await storage.upload(hash, file, { cacheControl: 3600 * 24 * 7, upsert: true })
  } catch (e) {
    console.error(e)
  }

  return url
}

export async function previewLcd(json) {
  const loading = ElLoadingService()

  const url = await uploadLcd(json)

  setTimeout(() => loading.close(), 600)
  
  const sw = screen.width, sh = screen.height
  const w = Math.min(parseInt(json.designer?.canvas?.style?.width || sw), sw)
  const h = Math.min(parseInt(json.designer?.canvas?.style?.height || sh), sh)
  
  const win = window.open(
    `/demo.html?file=${encodeURIComponent(url)}`,
    '_blank',
    `popup,width=${w},height=${h},left=${sw - w >> 1},top=${sh - h >> 1}`
  )

  window.addEventListener('focus', () => win.close(), { once: true })

  return win
}

export function copyText(text) {
  const input = Object.assign(document.createElement('input'), { style: { position: 'fixed', top: 0, left: 0, visibility: 'hidden' }, value: text })
  document.body.append(input)
  input.select()
  if (document.execCommand('copy')) {
    ElMessage.success({ message: '已复制到剪切板', offset: 32 })
  } else {
    ElMessage.error({ message: '复制失败', offset: 32 })
  }
  input.remove()
}