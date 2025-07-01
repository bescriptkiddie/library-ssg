import type { Metadata } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans_SC({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

const notoSerif = Noto_Serif_SC({
  variable: '--font-noto-serif',
  subsets: ['latin'],
  weight: ['600', '700']
})

export const metadata: Metadata = {
  title: '智慧殿堂 - 精选思考，深度阅读',
  description: 'AI生成的读书笔记分享平台，汇聚深度思考与智慧洞察'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} antialiased bg-paper text-main font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
