import './globals.css'

export const metadata = {
  icons: {
    icon: "/favicon.ico", // default icon
    shortcut: "/favicon.ico", // for older browsers
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
        <head>
          <meta name="admaven-placement" content="BqdU5qdaH" />
        </head>
        <body>
            {children}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  aclib.runAutoTag({
                    zoneId: 'oe1htbed2d',
                  });
                `,
              }}
            />
        </body>
      </html>
  )
}
