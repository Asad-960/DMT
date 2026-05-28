import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DMT - Dental Medical Tourism CRM',
  description: 'AI-powered CRM for dental medical tourism clinics in Turkey',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}
