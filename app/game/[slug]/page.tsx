export const revalidate = 60;

import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import StreamsTable from "@/components/streams-table"
import { getStreamsByGameSlug } from "@/queries/getStreamsByGameSlug"
import _ from "lodash"
import { getGameBySlug } from "@/queries/getGameBySlug"
import { MatchCountdown } from "@/components/ui/countdown"
import { ChevronRight, Calendar, Clock, Trophy, Play, Star } from "lucide-react"

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

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "live":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse"
      case "upcoming":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
      case "scheduled":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
      case "finished":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white"
      default:
        return "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "live":
        return <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      case "upcoming":
        return <Clock className="w-4 h-4" />
      case "scheduled":
        return <Calendar className="w-4 h-4" />
      case "finished":
        return <Trophy className="w-4 h-4" />
      default:
        return <Play className="w-4 h-4" />
    }
  }

  const TeamCard = ({ team, isEvent = false, eventName = "", eventLogo = "" }) => (
    <div className="flex flex-1 flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50">
      <div className="relative">
        {isEvent ? (
          eventLogo ? (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-800/50 border border-gray-600/50 flex items-center justify-center overflow-hidden">
              <Image
                src={eventLogo}
                alt={eventName}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600/50 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-gray-300">
                {eventName?.charAt(0) || "E"}
              </span>
            </div>
          )
        ) : (
          team?.logo ? (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-800/50 border border-gray-600/50 flex items-center justify-center overflow-hidden">
              <Image
                src={team.logo}
                alt={team.name}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600/50 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-gray-300">
                {team?.name?.charAt(0) || "T"}
              </span>
            </div>
          )
        )}
      </div>
      <div className="text-center">
        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
          {isEvent ? eventName : team?.name}
        </h3>
        <p className="text-xs text-gray-400">
          {isEvent ? "Event" : "Team"}
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link 
              href="/" 
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors font-medium"
            >
              Totalsportek
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <Link 
              href={`/category/${game.category?.slug}`} 
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors font-medium"
            >
              {game.category?.name} Streams
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-gray-400 font-medium">{game.name}</span>
          </nav>
        </div>

        {/* Game Info Card */}
        <div className="mb-8 rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#161616] border border-gray-800/50 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center overflow-hidden">
                {game.category?.logo ? (
                  <Image
                    src={game.category.logo}
                    alt={game.category.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold text-gray-300">
                    {game.category?.name?.charAt(0) || "C"}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
                  {game.category?.name}
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{game.starting_time} UTC</span>
                  </div>
                </div>
              </div>
              {game.important && (
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-400/30 rounded-lg">
                  <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span className="text-xs font-semibold text-orange-400">FEATURED</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 md:p-8">
            {game.type === "Teams" ? (
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <TeamCard team={game.team_one} />
                
                {/* VS Section */}
                <div className="flex flex-col items-center gap-4 px-4">
                  <div className={`px-6 py-3 rounded-2xl font-bold text-sm md:text-base flex items-center gap-2 ${getStatusColor(game.status)}`}>
                    {getStatusIcon(game.status)}
                    {game.status === "Live" ? "LIVE" : game.status?.toUpperCase()}
                  </div>
                  
                  <div className="text-2xl md:text-3xl font-bold text-gray-500">VS</div>
                  
                  {game.status?.toLowerCase() !== "live" && (
                    <div className="text-center">
                      <div className="text-2xl md:text-4xl font-bold text-white mb-2">
                        <MatchCountdown 
                          startingDate={game.starting_date} 
                          startingTime={game.starting_time} 
                        />
                      </div>
                      <p className="text-xs text-gray-400">Time Remaining</p>
                    </div>
                  )}
                </div>

                <TeamCard team={game.team_two} />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <TeamCard 
                  team={null} 
                  isEvent={true} 
                  eventName={game.name} 
                  eventLogo={game.event_logo} 
                />
                
                <div className="flex flex-col items-center gap-4">
                  <div className={`px-6 py-3 rounded-2xl font-bold text-sm md:text-base flex items-center gap-2 ${getStatusColor(game.status)}`}>
                    {getStatusIcon(game.status)}
                    {game.status === "Live" ? "LIVE" : game.status?.toUpperCase()}
                  </div>
                  
                  {game.status?.toLowerCase() !== "live" && (
                    <div className="text-center">
                      <div className="text-2xl md:text-4xl font-bold text-white mb-2">
                        <MatchCountdown 
                          startingDate={game.starting_date} 
                          startingTime={game.starting_time} 
                        />
                      </div>
                      <p className="text-xs text-gray-400">Time Remaining</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Streams Section */}
        <div className="rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#161616] border border-gray-800/50 shadow-2xl overflow-hidden">
          {/* Streams Header */}
          <div className="px-6 py-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/30 flex items-center justify-center">
                  <Play className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Live Streams</h2>
                  <p className="text-sm text-gray-400">Available streaming options</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center">
                <span className="text-sm font-bold text-orange-400">{streams.length}</span>
              </div>
            </div>
          </div>

          {/* Streams Content */}
          <div className="p-6">
            <StreamsTable streams={streams} />
            
            {/* SEO Content */}
            <div className="mt-8 pt-8 border-t border-gray-800/50">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Totalsportek {game.name}
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6"></div>
                </div>
                
                <div className="grid gap-4 md:gap-6">
                  <div className="p-4 md:p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                      Watch {game.name} at UK time on {game.starting_date} {game.starting_time} UTC
                    </h3>
                    <p className="text-gray-400">
                      Don't miss this exciting match! Set your reminders and enjoy high-quality streaming.
                    </p>
                  </div>
                  
                  <div className="p-4 md:p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                      Watch {game.name} live stream Online
                    </h3>
                    <p className="text-gray-400">
                      Experience the thrill of live sports with our premium streaming service. Multiple quality options available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
