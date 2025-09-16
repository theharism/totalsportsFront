import Script from 'next/script'
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
          <script type="text/javascript" src="//totalsportek.world/aiman.js"></script>
          {/* <script id="aclib" type="text/javascript" src="//acscdn.com/script/aclib.js"></script> */}
          <meta name="monetag" content="4f46dc0cea68c7fd9b4c5afcf7575e56"></meta>
          <script src="https://fpyf8.com/88/tag.min.js" data-zone="171473" async data-cfasync="false"></script>
          <Script id="ld-json-org" type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TotalSportek",
              "url": "https://totalsportek.world",
              "logo": "https://totalsportek.world/logo.png",
            })}
          </Script>
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `(s => {
                s.dataset.zone = '9798088';
                s.src = 'https://al5sm.com/tag.min.js';
              })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));`,
            }}
          ></script> */}
        </head>
        <body>
        <div className="relative overflow-x-hidden">
            {children}
        </div>
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
