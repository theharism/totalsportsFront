export const revalidate = 60;

import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import StreamsTable from "@/components/streams-table"
import { getStreamsByGameSlug } from "@/queries/getStreamsByGameSlug"
import _ from "lodash"
import { getGameBySlug } from "@/queries/getGameBySlug"
import { MatchCountdown } from "@/components/ui/countdown"

export default async function GamePage({ params }: { params: { slug: string } }) {
  // Fetch streams for this game
  const gameData = await getGameBySlug(params.slug)
  const game = _.get(gameData, "data", {})
  const data = await getStreamsByGameSlug(params.slug)
  const streams = _.get(data, "data", [])

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
            <div className="flex h-10 w-10 items-center justify-center">
              {game.category.logo ? (
                <Image
                  src={game.category.logo}
                  alt={game.category.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              ) : (
                <span className="text-sm">{game.category.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{game.category.name}</h2>
              <p className="text-sm text-gray-400">
                {formattedDate} {game.starting_time}
              </p>
            </div>
          </div>

          {/* Mobile Layout - Horizontal */}
          <div className="flex items-center justify-between gap-2 md:hidden">
            {/* Team One - Mobile */}
            {game.type === "Teams" && <div className="flex flex-1 flex-col items-center gap-2">
              {game.team_one.logo ? (
                <Image
                  src={game.team_one.logo}
                  alt={game.team_one.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                  <span className="text-sm font-bold">{game.team_one.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-sm font-bold text-white truncate">{game.team_one.name}</h3>
            </div>}
            {game.type === "Events" && <div className="flex flex-1 flex-col items-center gap-2">
              {game.event_logo ? (
                <Image
                  src={game.event_logo}
                  alt={game.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                  <span className="text-sm font-bold">{game.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-sm font-bold text-white truncate">{game.name}</h3>
            </div>}

            {/* Status - Mobile */}
            <div className="flex flex-col items-center px-2">
              <div className="mb-1 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white">
                {game.status === "Live" ? "LIVE" : game.status.toUpperCase()}
              </div>
              <div className="flex gap-1 text-lg font-bold text-white">
                {/* <span>-</span>
                <span>-</span> */}
                <MatchCountdown startingDate={game.starting_date} startingTime={game.starting_time} />
              </div>
            </div>

            {/* Team Two - Mobile */}
            {game.type === "Teams" && <div className="flex flex-1 flex-col items-center justify-end gap-2">
              {game.team_two.logo ? (
                <Image
                  src={game.team_two.logo}
                  alt={game.team_two.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                  <span className="text-sm font-bold">{game.team_two.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-sm font-bold text-white truncate text-right">{game.team_two.name}</h3>
            </div>}
          </div>

          {/* Desktop Layout - Vertical */}
          <div className="hidden md:flex flex-col items-center justify-between gap-8 md:flex-row">
            {game.type === "Teams" && <div className="flex flex-1 flex-col items-center text-center">
              {game.team_one.logo ? (
                <Image
                  src={game.team_one.logo}
                  alt={game.team_one.name}
                  width={80}
                  height={80}
                  className="mb-2 h-20 w-20 object-cover"
                />
              ) : (
                <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                  <span className="text-2xl font-bold">{game.team_one.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{game.team_one.name}</h3>
            </div>}
            {game.type === "Events" && <div className="flex flex-1 flex-col items-center gap-2">
              {game.event_logo ? (
                <Image
                  src={game.event_logo}
                  alt={game.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                  <span className="text-sm font-bold">{game.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-sm font-bold text-white truncate">{game.name}</h3>
            </div>}
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-md bg-red-600 px-4 py-1 text-sm font-bold text-white">
                {game.status === "Live" ? "LIVE" : game.status.toUpperCase()}
              </div>
              <div className="flex gap-4 text-3xl font-bold text-white">
                {/* <span>-</span>
                <span>-</span> */}
                <MatchCountdown startingDate={game.starting_date} startingTime={game.starting_time} />
              </div>
            </div>

            {game.type === "Teams" && <div className="flex flex-1 flex-col items-center text-center">
              {game.team_two.logo ? (
                <Image
                  src={game.team_two.logo}
                  alt={game.team_two.name}
                  width={80}
                  height={80}
                  className="mb-2 h-20 w-20 object-cover"
                />
              ) : (
                <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                  <span className="text-2xl font-bold">{game.team_two.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{game.team_two.name}</h3>
            </div>}
          </div>
        </div>

        {/* Streams Section */}
        <div className="rounded-lg bg-[#1a1a1a] p-6">
          <h3 className="mb-6 text-xl font-bold text-white">Live Streams</h3>
          <StreamsTable streams={streams} />
          <div className="py-5">
            <h1 className="text-4xl mb-1 font-bold text-white">TotalSportek {game.name}</h1>
            <h3 className="text-xl mb-1 font-medium text-white">Watch {game.name} at UK time on {game.starting_date} {game.starting_time}</h3>
            <h3 className="text-xl mb-1 font-medium text-white">Watch {game.name} live stream Online</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
