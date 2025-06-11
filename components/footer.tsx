import Link from "next/link"

export default function Footer() {
  const mainLinks = [
    { name: "StreamEast", href: "/streameast" },
    { name: "TOTALSPORTEK", href: "/" },
    { name: "FOOTYBITE", href: "/footybite" },
    { name: "NFLBITE", href: "/nflbite" },
    { name: "NBABITE", href: "/nbabite" },
    { name: "SPORTSURGE", href: "/sportsurge" },
    { name: "HESGOAL", href: "/hesgoal" },
    { name: "SOCCER", href: "/soccer" },
  ]

  const streamLinks = [
    { name: "STREAMS", href: "/streams" },
    { name: "FOOTBALL STREAMS", href: "/football-streams" },
    { name: "CRACKSTREAMS", href: "/crackstreams" },
    { name: "METHSTREAMS", href: "/methstreams" },
    { name: "F1 STREAMS", href: "/f1-streams" },
    { name: "FREE STREAMS", href: "/free-streams" },
  ]

  const additionalLinks = [
    { name: "Hoofoot", href: "/hoofoot" },
    { name: "STREAM2WATCH", href: "/stream2watch" },
  ]

  const liveStreamLinks = [
    { name: "Liverpool Live Stream", href: "/liverpool-live-stream" },
    { name: "Juventus Stream", href: "/juventus-stream" },
    { name: "Premier League Live Stream", href: "/premier-league-live-stream" },
    { name: "Champions League", href: "/champions-league" },
    { name: "Formula 1 Live Stream", href: "/formula-1-live-stream" },
  ]

  return (
    <footer className="text-white py-4 mt-auto border-t border-gray-600">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-3">
          <h3 className="text-base font-medium">
            {"Trending Today by "}
            <span className="text-orange-500 font-bold">TOTALSPORTEK</span>
          </h3>
        </div>

        {/* Main Links Row 1 */}
        <div className="text-center mb-2">
          <div className="flex flex-wrap justify-center items-center gap-1">
            {mainLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-orange-500 hover:text-orange-400 transition-colors text-xs md:text-sm"
                >
                  {link.name}
                </Link>
                {index < mainLinks.length - 1 && <span className="text-orange-500 mx-1">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Stream Links Row 2 */}
        <div className="text-center mb-2">
          <div className="flex flex-wrap justify-center items-center gap-1">
            {streamLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-orange-500 hover:text-orange-400 transition-colors text-xs md:text-sm"
                >
                  {link.name}
                </Link>
                {index < streamLinks.length - 1 && <span className="text-orange-500 mx-1">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Additional Links Row 3 */}
        <div className="text-center mb-4">
          <div className="flex flex-wrap justify-center items-center gap-1">
            {additionalLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-orange-500 hover:text-orange-400 transition-colors text-xs md:text-sm"
                >
                  {link.name}
                </Link>
                {index < additionalLinks.length - 1 && <span className="text-orange-500 mx-1">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Live Stream Links */}
        <div className="text-center mb-4">
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            {liveStreamLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-gray-300 transition-colors text-xs"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center">
          <p className="text-gray-400 text-xs">
            {"Always free website. visit homepage at "}
            <Link
              href="https://totalsportek.world"
              className="text-gray-400 hover:text-gray-300 underline transition-colors"
            >
              TOTALSPORTEK.WORLD
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
