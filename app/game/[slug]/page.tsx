import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { getGames } from "@/lib/api"
import StreamsTable from "@/components/streams-table"

async function getGameStreams(gameId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/streams/game/${gameId}`)
    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error("Error fetching game streams:", error)
    return []
  }
}

export default async function GamePage({ params }: { params: { slug: string } }) {
  // Fetch all games to find the matching one
  const games = await getGames()
  const game = games.find((g: any) => g.slug === params.slug)

  if (!game) {
    return <div>Game not found</div>
  }

  // Fetch streams for this game
  const streams = await getGameStreams(game._id)

  // Format the date and time
  const date = new Date(game.starting_date)
  const formattedDate = date.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="text-orange-500 hover:underline">
            Totalsportek
          </Link>
          <span className="text-gray-600">/</span>
          <Link href={`/category/${game.category.slug}`} className="text-blue-500 hover:underline">
            {game.category.name} Streams
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">{game.name}</span>
        </div>

        {/* Game Info Card */}
        <div className="mb-8 rounded-lg bg-[#1a1a1a] p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
              <span className="text-sm">{game.category.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{game.category.name}</h2>
              <p className="text-sm text-gray-400">
                {formattedDate} {game.starting_time}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-1 flex-col items-center text-center">
              {game.team_one.logo ? (
                <Image
                  src={`http://localhost:3000/${game.team_one.logo}`}
                  alt={game.team_one.name}
                  width={80}
                  height={80}
                  className="mb-2 h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                  <span className="text-2xl font-bold">{game.team_one.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{game.team_one.name}</h3>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-md bg-red-600 px-4 py-1 text-sm font-bold text-white">
                {game.status === "Live" ? "LIVE" : game.status.toUpperCase()}
              </div>
              <div className="flex gap-4 text-3xl font-bold text-white">
                <span>-</span>
                <span>-</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center text-center">
              {game.team_two.logo ? (
                <Image
                  src={`http://localhost:3000/${game.team_two.logo}`}
                  alt={game.team_two.name}
                  width={80}
                  height={80}
                  className="mb-2 h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                  <span className="text-2xl font-bold">{game.team_two.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{game.team_two.name}</h3>
            </div>
          </div>
        </div>

        {/* Streams Section */}
        <div className="rounded-lg bg-[#1a1a1a] p-6">
          <h3 className="mb-6 text-xl font-bold text-white">Live Streams</h3>
          <StreamsTable streams={streams} />
        </div>
      </div>
    </div>
  )
}

