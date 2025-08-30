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
          <meta name="monetag" content="4f46dc0cea68c7fd9b4c5afcf7575e56"></meta>
          <script id="aclib" type="text/javascript" src="//acscdn.com/script/aclib.js"></script>
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
