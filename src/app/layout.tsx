import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/nav'
import { Toaster } from '@/components/_ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Desafio App Masters - Estágio 2024',
  description:
    'Desafio de projeto para a vaga de estágio em desenvolvedor TypeScript na App Masters. Desenvolvido com Next.js!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Nav />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
