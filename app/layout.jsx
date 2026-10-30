export const metadata = {
  title: 'Next.js + Supabase Auth',
  description: 'Sistema de autenticação',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
