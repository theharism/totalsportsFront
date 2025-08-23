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
          <script id="aclib" type="text/javascript" src="//acscdn.com/script/aclib.js"></script>
          <meta name="admaven-placement" content="BqdU5qdaH" />
          {/* <script type='text/javascript' src='//pl27491559.profitableratecpm.com/07/e6/b7/07e6b712def0677913a7fd0e2007363c.js'></script> */}
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
