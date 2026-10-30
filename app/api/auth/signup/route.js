import { createClient } from '../../../../utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const supabase = await createClient()
    const { email, password } = await request.json()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${new URL(request.url).origin}/auth/callback`,
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Cadastro realizado! Verifique seu e-mail.' })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 })
  }
}
