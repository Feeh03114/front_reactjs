import SiderBar from '@/components/siderbar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="utf-8" />
        <title>Teste Técnico</title>
        <link rel="icon" href="/Nlogouniso.png" />
      </head>
      <body className={inter.className}>
        <SiderBar>
          {children}
        </SiderBar>
      </body>
    </html>
  )
}
