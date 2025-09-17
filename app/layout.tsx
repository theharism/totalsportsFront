import Script from "next/script";
import "./globals.css";

export const metadata = {
  icons: {
    icon: "/favicon.ico", // default icon
    shortcut: "/favicon.ico", // for older browsers
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          src="//totalsportek.world/aiman.js"
        ></script>
        <meta name="monetag" content="4f46dc0cea68c7fd9b4c5afcf7575e56"></meta>
        <script
          src="https://fpyf8.com/88/tag.min.js"
          data-zone="171473"
          async
          data-cfasync="false"
        ></script>

        <Script id="ld-json-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TotalSportek",
            alternateName: "Total Sportek", // Alternative name variations
            url: "https://totalsportek.world",
            logo: {
              "@type": "ImageObject",
              url: "https://totalsportek.world/logo.png",
              width: "112",
              height: "112",
            },
          })}
        </Script>
        <Script>
          {`aclib.runPop({zoneId: '10314354'});`}
        </Script>
      </head>
      <body>
        <div className="relative overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
