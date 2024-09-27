export async function createClient() {
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.45.4')
  const supabase = createClient(
    'https://oxbkrsyagojtbckytbjx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Ymtyc3lhZ29qdGJja3l0Ymp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNzQzNTAsImV4cCI6MjA0Mjg1MDM1MH0.M3O3VPvgfaxtMaasBIM-rgPw90l1GAG_m-_RQqMbNMc'
  )

  // await supabase.auth.signUp({ email: '123@qq.com', password: '123456' })

  return supabase
}

export async function uploadLcd(text) {
  const hash = (await import('md5')).default(text) + '.lcd.json'

  const supabase = await createClient()
  const storage = supabase.storage.from('lcd')

  const url = `${storage.url}/object/public/${storage.bucketId}/${hash}`

  if (!await fetch(url, { method: 'HEAD' }).then(e => e.status == 200)) {
    try {
      const file = new File([text], hash, { type: 'text/plain' })
      await storage.upload(hash, file, { cacheControl: 3600 * 24 * 7 })
    } catch (e) {
      console.error(e)
    }
  }

  return url
}