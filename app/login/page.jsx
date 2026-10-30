"use client" // Obrigatório para formulários interativos e hooks no Next.js App Router

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setIsError(false)

    try {
      // Faz a requisição para a rota de API interna que corrigimos no passo anterior
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro ao fazer login.')
      }

      setMessage('Login realizado com sucesso! Redirecionando...')
      
      // Atualiza a página e redireciona para a Dashboard/Home protegida
      router.refresh()
      setTimeout(() => {
        router.push('/')
      }, 1500)

    } catch (err) {
      setIsError(true)
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'sans-serif'
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        maxWidth: '360px',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>Entrar</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="email" style={{ fontSize: '14px', color: '#666' }}>E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="password" style={{ fontSize: '14px', color: '#666' }}>Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>

        {message && (
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            marginTop: '10px',
            color: isError ? '#ff3333' : '#00b000',
            fontWeight: 'bold'
          }}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
