'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const handleAuth = async (e, type) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setIsError(false)

    try {
      const res = await fetch(`/api/auth/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Ocorreu um erro no processo.')
      }

      setMessage(data.message || 'Operação realizada com sucesso!')
      if (type === 'login') {
        window.location.href = '/dashboard'
      }
    } catch (err) {
      setIsError(true)
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6' }}>
      <form style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#1f2937' }}>Autenticação</h2>
        
        {message && (
          <div style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', backgroundColor: isError ? '#fee2e2' : '#dcfce7', color: isError ? '#b91c1c' : '#15803d', fontSize: '0.875rem' }}>
            {message}
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563' }}>E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563' }}>Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
        </div>

        <button type="submit" disabled={loading} onClick={(e) => handleAuth(e, 'login')} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '0.5rem', fontSize: '1rem' }}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>

        <button type="button" disabled={loading} onClick={(e) => handleAuth(e, 'signup')} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
          Criar Conta
        </button>
      </form>
    </div>
  )
}
