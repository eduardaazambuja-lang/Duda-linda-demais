export default function LoginPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2 style={{ margin: '0 0 10px 0' }}>Login</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="seu@email.com" required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" placeholder="••••••••" required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Entrar
        </button>
      </form>
    </div>
  )
}
