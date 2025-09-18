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
        {/* adcash start*/}
        <script
          type="text/javascript"
          src="//totalsportek.world/aiman.js"
        ></script>

        {/* adcash end*/}

        {/* monetag start*/}
        {/* <meta name="monetag" content="4f46dc0cea68c7fd9b4c5afcf7575e56"></meta>
        <script
          src="https://fpyf8.com/88/tag.min.js"
          data-zone="171473"
          data-cfasync="false"
          defer
        ></script> */}
        {/* monetag end*/}

        {/* schema start*/}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TotalSportek",
              alternateName: "Total Sportek",
              url: "https://totalsportek.world",
              logo: {
                "@type": "ImageObject",
                url: "https://totalsportek.world/logo.png",
                width: "112",
                height: "112",
              },
            }),
          }}
        />
        {/* schema end*/}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              aclib.runPop({ zoneId: '10314354' });

              // Always load Monetag AFTER Adcash
              const monetag = document.createElement("script");
              monetag.src = "https://fpyf8.com/88/tag.min.js";
              monetag.async = true;
              monetag.setAttribute("data-zone", "171473");
              monetag.setAttribute("data-cfasync", "false");
              document.head.appendChild(monetag);
            `,
          }}
        />

        {/* Histats.com START */}
        <div id="histats_counter"></div>

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var _Hasync = _Hasync || [];
              _Hasync.push(['Histats.start', '1,4977880,4,431,112,75,00011111']);
              _Hasync.push(['Histats.fasi', '1']);
              _Hasync.push(['Histats.track_hits', '']);
              (function() {
                var hs = document.createElement('script');
                hs.type = 'text/javascript';
                hs.async = true;
                hs.src = ('//s10.histats.com/js15_as.js');
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
              })();
            `,
          }}
        />

        <noscript>
          <a href="/" target="_blank">
            <img
              src="//sstatic1.histats.com/0.gif?4977880&101"
              alt="php hit counter"
              border="0"
            />
          </a>
        </noscript>
        {/* Histats.com END */}
      </head>
      <body>
        <div className="relative overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
