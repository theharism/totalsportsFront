import Link from "next/link";

export default function Header() {
  const sports = [
    { name: "Football", href: "#" },
    { name: "MMA", href: "#" },
    { name: "Boxing", href: "#" },
    { name: "Formula 1", href: "#" },
    { name: "NBA", href: "#" },
    { name: "NFL", href: "#" },
    { name: "NHL", href: "#" },
    { name: "MLB", href: "#" },
    { name: "Blog", href: "#" },
  ];

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex flex-col items-center justify-start space-y-2 px-4 py-2 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Link
          href="/"
          className="text-2xl font-bold text-orange-500 md:text-2xl spa tracking-widest"
        >
          TOTALSPORTEK
        </Link>
        <div className="h-4 sm:h-0 sm:w-0"></div>
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {sports.map((sport) => (
        <Link
          key={sport.name}
          href={sport.href}
          className="text-xs hover:text-orange-500 md:text-sm tracking-widest"
        >
          {sport.name}
        </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
