import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FamilyFuture Planner',
  description: '家族の未来を一緒に計画しよう。子育てにかかる費用を可視化し、学校選びから投資プランまで、家族みんなで協力して未来を築いていきましょう。',
  keywords: ['家族', '子育て', '教育費', '投資', '学校選び', '費用計画'],
  authors: [{ name: 'FamilyFuture Planner Team' }],
  creator: 'FamilyFuture Planner',
  publisher: 'FamilyFuture Planner',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#16a34a',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} ${notoSansJP.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 