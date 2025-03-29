"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { calculateRemainingTime, groupGamesByCategory } from "@/lib/api"

export default function MainContent({ games }: { games: any[] }) {
  const [activeTab, setActiveTab] = useState("streams")
  const [filteredGames, setFilteredGames] = useState<any[]>([])
  const [groupedGames, setGroupedGames] = useState<any[]>([])

  useEffect(() => {
    // Filter games based on active tab
    let filtered = []

    switch (activeTab) {
      case "streams":
        filtered = games.filter((game) => game.status === "Live")
        break
      case "schedule":
        filtered = games.filter((game) => game.status === "Upcoming")
        break
      case "results":
        filtered = games.filter((game) => game.status === "Finished")
        break
      default:
        filtered = games.filter((game) => game.status === "Live")
    }

    setFilteredGames(filtered)

    // Group the filtered games by category
    const grouped = groupGamesByCategory(filtered)
    setGroupedGames(grouped)
  }, [activeTab, games])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="rounded-lg bg-[#1a1a1a] p-4">
      <Tabs defaultValue="streams" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3 bg-[#121212]">
          <TabsTrigger value="results" className="data-[state=active]:bg-[#0e0e0e]">
            RESULTS
          </TabsTrigger>
          <TabsTrigger value="streams" className="data-[state=active]:bg-[#0e0e0e]">
            STREAMS
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-[#0e0e0e]">
            SCHEDULE
          </TabsTrigger>
        </TabsList>

        <TabsContent value="streams" className="space-y-6">
          {groupedGames.length > 0 ? (
            groupedGames.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800">
                    <span className="text-xs">{category.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white">{category.name}</h3>
                </div>

                <div className="space-y-2">
                  {category.games.map((game: any) => (
                    <div key={game._id} className="flex items-center justify-between rounded-md bg-[#222222] p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-full flex-col justify-center">
                          <div className="h-full w-1 rounded-full bg-orange-500"></div>
                        </div>
                        <div>
                          <div className="text-sm text-orange-500">
                            {game.status === "Live"
                              ? "In progress"
                              : calculateRemainingTime(game.starting_date, game.starting_time)}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col px-4">
                        <div className="text-sm text-gray-200">{game.team_one.name}</div>
                        <div className="text-sm text-gray-200">{game.team_two.name}</div>
                      </div>

                      <Link href={`/game/${game.slug}`} className="rounded-md p-2 hover:bg-[#333333]">
                        <ExternalLink className="h-5 w-5 text-gray-400" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-40 items-center justify-center text-gray-400">
              No live streams available at the moment
            </div>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          {groupedGames.length > 0 ? (
            groupedGames.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800">
                    <span className="text-xs">{category.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white">{category.name}</h3>
                </div>

                <div className="space-y-2">
                  {category.games.map((game: any) => (
                    <div key={game._id} className="flex items-center justify-between rounded-md bg-[#222222] p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-full flex-col justify-center">
                          <div className="h-full w-1 rounded-full bg-orange-500"></div>
                        </div>
                        <div>
                          <div className="text-sm text-orange-500">
                            {calculateRemainingTime(game.starting_date, game.starting_time)}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col px-4">
                        <div className="text-sm text-gray-200">{game.team_one.name}</div>
                        <div className="text-sm text-gray-200">{game.team_two.name}</div>
                      </div>

                      <Link href={`/game/${game.slug}`} className="rounded-md p-2 hover:bg-[#333333]">
                        <ExternalLink className="h-5 w-5 text-gray-400" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-40 items-center justify-center text-gray-400">No upcoming matches scheduled</div>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {groupedGames.length > 0 ? (
            groupedGames.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800">
                    <span className="text-xs">{category.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white">{category.name}</h3>
                </div>

                <div className="space-y-2">
                  {category.games.map((game: any) => (
                    <div key={game._id} className="flex items-center justify-between rounded-md bg-[#222222] p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-full flex-col justify-center">
                          <div className="h-full w-1 rounded-full bg-orange-500"></div>
                        </div>
                        <div>
                          <div className="text-sm text-orange-500">Finished</div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col px-4">
                        <div className="text-sm text-gray-200">{game.team_one.name}</div>
                        <div className="text-sm text-gray-200">{game.team_two.name}</div>
                      </div>

                      <Link href={`/game/${game.slug}`} className="rounded-md p-2 hover:bg-[#333333]">
                        <ExternalLink className="h-5 w-5 text-gray-400" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-40 items-center justify-center text-gray-400">No results available</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

