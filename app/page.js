import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = await createClient()

  // Busca os dados do usuário atual na sessão
  const { data: { user }, error } = await supabase.auth.getUser()

  // Se não houver usuário logado ou ocorrer um erro, protege a rota mandando para o login
  if (error || !user) {
    redirect('/login')
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#f9f9f9',
      color: '#333'
    }}>
      <div style={{
        padding: '40px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        textAlign: 'center'
      }}>
        <h1>Área Restrita</h1>
        <p style={{ color: '#666', margin: '15px 0' }}>
          Bem-vindo de volta! Você está autenticado como:
        </p>
        <code style={{
          backgroundColor: '#eee',
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '15px',
          display: 'block',
          marginBottom: '20px'
        }}>
          {user.email}
        </code>
        
        <form action={async () => {
          'use server'
          const supabase = await createClient()
          await supabase.auth.signOut()
          redirect('/login')
        }}>
          <button type="submit" style={{
            padding: '10px 20px',
            backgroundColor: '#ff3333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Sair da Conta
          </button>
        </form>
      </div>
    </div>
  )
}
