"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { calculateRemainingTime } from "@/lib/api"

interface Team {
  _id: string
  name: string
  logo: string
  slug: string
}

interface Category {
  _id: string
  name: string
  link: string
  slug: string
}

interface Game {
  _id: string
  name: string
  slug: string
  starting_date: string
  starting_time: string
  status: string
  team_one: Team
  team_two: Team
  category: Category
}

export default function TeamGames({ games, teamId }: { games: Game[]; teamId: string }) {
  const [activeTab, setActiveTab] = useState("all")

  // Filter games based on status
  const filteredGames = games.filter((game) => {
    if (activeTab === "live") return game.status === "Live"
    if (activeTab === "upcoming") return game.status === "Upcoming"
    if (activeTab === "finished") return game.status === "Finished"
    return true // "all" tab
  })

  // Sort games by date
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (a.status === "Live" && b.status !== "Live") return -1
    if (a.status !== "Live" && b.status === "Live") return 1
    return new Date(a.starting_date).getTime() - new Date(b.starting_date).getTime()
  })

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 flex gap-4 border-b border-gray-800">
        <button
          className={`pb-2 text-sm font-medium ${
            activeTab === "all" ? "border-b-2 border-orange-500 text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Matches
        </button>
        <button
          className={`pb-2 text-sm font-medium ${
            activeTab === "live" ? "border-b-2 border-orange-500 text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("live")}
        >
          Live
        </button>
        <button
          className={`pb-2 text-sm font-medium ${
            activeTab === "upcoming" ? "border-b-2 border-orange-500 text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`pb-2 text-sm font-medium ${
            activeTab === "finished" ? "border-b-2 border-orange-500 text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("finished")}
        >
          Finished
        </button>
      </div>

      {/* Games List */}
      <div className="space-y-2">
        {sortedGames.map((game) => {
          // Determine which team to show first (the other team)
          const isTeamOne = game.team_one._id === teamId
          const otherTeam = isTeamOne ? game.team_two : game.team_one
          const currentTeam = isTeamOne ? game.team_one : game.team_two

          return (
            <div key={game._id} className="flex items-center justify-between rounded-md bg-[#222222] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-full flex-col justify-center">
                  <div className="h-full w-1 rounded-full bg-orange-500"></div>
                </div>
                <div>
                  <div className="text-sm text-orange-500">
                    {game.status === "Live"
                      ? "In progress"
                      : game.status === "Finished"
                        ? "Finished"
                        : calculateRemainingTime(game.starting_date, game.starting_time)}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-4">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  {otherTeam.logo ? (
                    <Image
                      src={`http://localhost:3000/${otherTeam.logo}`}
                      alt={otherTeam.name}
                      width={16}
                      height={16}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-800">
                      <span className="text-[10px]">{otherTeam.name.charAt(0)}</span>
                    </div>
                  )}
                  {otherTeam.name}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  {currentTeam.logo ? (
                    <Image
                      src={`http://localhost:3000/${currentTeam.logo}`}
                      alt={currentTeam.name}
                      width={16}
                      height={16}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-800">
                      <span className="text-[10px]">{currentTeam.name.charAt(0)}</span>
                    </div>
                  )}
                  {currentTeam.name}
                </div>
              </div>

              <Link href={`/game/${game.slug}`} className="rounded-md p-2 hover:bg-[#333333]">
                <ExternalLink className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          )
        })}

        {sortedGames.length === 0 && (
          <div className="flex h-40 items-center justify-center text-gray-400">No matches available</div>
        )}
      </div>
    </div>
  )
}

