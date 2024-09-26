export async function createClient() {
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.45.4')
  const supabase = createClient(
    'https://oxbkrsyagojtbckytbjx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Ymtyc3lhZ29qdGJja3l0Ymp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNzQzNTAsImV4cCI6MjA0Mjg1MDM1MH0.M3O3VPvgfaxtMaasBIM-rgPw90l1GAG_m-_RQqMbNMc'
  )

  // await supabase.auth.signUp({ email: '123@qq.com', password: '123456' })

  return supabase
}