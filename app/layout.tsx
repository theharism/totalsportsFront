import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Totalsportek',
  description: 'Totalsportek',
  generator: 'Totalsportek',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
        <body>
            {children}
        </body>
      </html>
  )
}
