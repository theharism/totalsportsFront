"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { calculateRemainingTime, groupGamesByCategory } from "@/lib/utils";
import { Game } from "@/types/games";
import Image from "next/image";
import { web_sports, mobile_sports } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Content({games, isCategory}: {games: Game[], isCategory: boolean}) {
  const [activeTab, setActiveTab] = useState("streams");
  const [groupedGames, setGroupedGames] = useState<any[]>([]);
  const [sports, setSports] = useState(web_sports)
  const isMobile = useIsMobile()

   useEffect(() => {
    if (isMobile) {
      setSports(mobile_sports)
    } else {
      setSports(web_sports)
    }
  }, [isMobile])

  useEffect(() => {
    let filtered = [];

    if(!isCategory) {
      switch (activeTab) {
        case "streams":
          filtered = games.filter((game: Game) => game.status === "Live" || game.status === "Upcoming");
          break;
        case "schedule":
          filtered = games.filter((game: Game) => game.status === "Scheduled");
          break;
        case "results":
          filtered = games.filter((game: Game) => game.status === "Finished");
          break;
        default:
          filtered = games;
      }
    }
    else {
      filtered = games;
    }
    // Group the filtered games by category
    const grouped = groupGamesByCategory(filtered);
    setGroupedGames(grouped);
  }, [activeTab, games]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <>
    <div className="flex gap-4 overflow-x-auto mt-2 pb-2 scrollbar-hide sm:hidden">
      <div className="flex gap-4 min-w-max">
        {sports?.map((sport) => (
          <Link
            key={sport.name}
            href={sport.href}
            className="flex flex-col items-center gap-1 min-w-[60px] hover:opacity-75 transition-opacity"
            title={sport.name}
          >
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
              {sport.icon === "blog" && isMobile ? (
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              ) : (
                <Image
                  src={`/uploads/${sport.icon}`}
                  alt={sport.name}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              )}
            </div>
            <span className="text-xs text-gray-300 text-center leading-tight">{sport.name}</span>
          </Link>
        ))}
      </div>
    </div>
    <div className="rounded-lg bg-[#1a1a1a] p-4">
      {!isCategory && <Tabs
        defaultValue="streams"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="mb-4 grid w-full grid-cols-7 bg-[#121212]">
          <div className="col-span-2" />
          <div className="col-span-3 flex justify-center space-x-4">
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-[#00222e] data-[state=active]:text-white text-white data-[state=active]:rounded-3xl"
            >
              RESULTS
            </TabsTrigger>
            <TabsTrigger
              value="streams"
              className="data-[state=active]:bg-[#00222e] data-[state=active]:text-white text-white data-[state=active]:rounded-3xl"
            >
              STREAMS
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-[#00222e] data-[state=active]:text-white text-white data-[state=active]:rounded-3xl"
            >
              SCHEDULE
            </TabsTrigger>
          </div>
          <div className="col-span-2" />
        </TabsList>

        <TabsContent value="streams" className="space-y-6">
          {groupedGames.length > 0 ? (
            groupedGames.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                  <div className="flex h-6 w-6 items-center justify-center">
                     <Image
                        src={category.logo}
                        alt={category.name}
                        width={15}
                        height={15}
                        className="h-6 w-6 object-cover"
                      />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-2">
                  {category.games.map((game: any) => (
                    <div
                      key={game._id}
                      className="flex items-center justify-between rounded-md bg-[#222222] p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-full flex-col justify-center">
                          <div className="h-full w-1 rounded-full bg-orange-500"></div>
                        </div>
                        <div>
                          <div className="text-sm text-orange-500">
                            {calculateRemainingTime(
                                  game.starting_date,
                                  game.starting_time,
                                  game.ending_date,
                                  game.ending_time
                                )}
                          </div>
                        </div>
                      </div>

                      {game?.type === 'Teams' ? <div className="flex flex-1 flex-col px-4">
                        <div className="text-sm text-gray-200">
                          {game?.team_one?.name}
                        </div>
                        <div className="text-sm text-gray-200">
                          {game?.team_two?.name}
                        </div>
                      </div> : <div className="flex flex-1 flex-col px-4">
                        <div className="text-sm text-gray-200">
                          {game?.name}
                        </div>
                      </div>}

                      <Link
                        href={`/game/${game.slug}`}
                        className="rounded-md p-2 hover:bg-[#333333]"
                      >
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
                  <div className="flex h-6 w-6 items-center justify-center">
                  <Image
                        src={category.logo}
                        alt={category.name}
                        width={15}
                        height={15}
                        className="h-6 w-6 object-cover"
                      />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-2">
                  {category.games.map((game: any) => (
                    <div
                      key={game._id}
                      className="flex items-center justify-between rounded-md bg-[#222222] p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-full flex-col justify-center">
                          <div className="h-full w-1 rounded-full bg-orange-500"></div>
                        </div>
                        <div>
                          <div className="text-sm text-orange-500">
                            {new Date(`${game.starting_date.split("T")[0]}T${game.starting_time}`).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col px-4">
                        <div className="text-sm text-gray-200">
                          {game?.team_one?.name}
                        </div>
                        <div className="text-sm text-gray-200">
                          {game?.team_two?.name}
                        </div>
                      </div>

                      <Link
                        href={`/game/${game.slug}`}
                        className="rounded-md p-2 hover:bg-[#333333]"
                      >
                        <ExternalLink className="h-5 w-5 text-gray-400" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-40 items-center justify-center text-gray-400">
              No upcoming matches scheduled
            </div>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {groupedGames.length > 0 ? (
            groupedGames.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                  <div className="flex h-6 w-6 items-center justify-center">
                      <Image
                        src={category.logo}
                        alt={category.name}
                        width={15}
                        height={15}
                        className="h-6 w-6 object-cover"
                      />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-2">
                  {category.games.map((game: any) => (
                    <div
                      key={game._id}
                      className="flex items-center justify-between rounded-md bg-[#222222] p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-full flex-col justify-center">
                          <div className="h-full w-1 rounded-full bg-orange-500"></div>
                        </div>
                        <div>
                          <div className="text-sm text-orange-500">
                            Finished
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col px-4">
                        <div className="text-sm text-gray-200">
                          {game?.team_one?.name}
                        </div>
                        <div className="text-sm text-gray-200">
                          {game?.team_two?.name}
                        </div>
                      </div>

                      <Link
                        href={`/game/${game.slug}`}
                        className="rounded-md p-2 hover:bg-[#333333]"
                      >
                        <ExternalLink className="h-5 w-5 text-gray-400" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-40 items-center justify-center text-gray-400">
              No results available
            </div>
          )}
        </TabsContent>
      </Tabs>}
      {isCategory && (
        <div className="w-full">
          <div className="space-y-6">
            {groupedGames.length > 0 ? (
              groupedGames.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                    <div className="flex h-6 w-6 items-center justify-center">
                      <Image
                          src={category.logo}
                          alt={category.name}
                          width={15}
                          height={15}
                          className="h-6 w-6 object-cover"
                        />
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {category.name}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {category.games.map((game: any) => (
                      <div
                        key={game._id}
                        className="flex items-center justify-between rounded-md bg-[#222222] p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-full flex-col justify-center">
                            <div className="h-full w-1 rounded-full bg-orange-500"></div>
                          </div>
                          <div>
                            <div className="text-sm text-orange-500">
                              {calculateRemainingTime(
                                    game.starting_date,
                                    game.starting_time,
                                    game.ending_date,
                                    game.ending_time
                                  )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col px-4">
                          <div className="text-sm text-gray-200">
                            {game?.team_one?.name}
                          </div>
                          <div className="text-sm text-gray-200">
                            {game?.team_two?.name}
                          </div>
                        </div>

                        <Link
                          href={`/game/${game.slug}`}
                          className="rounded-md p-2 hover:bg-[#333333]"
                        >
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
          </div> 
        </div>
      )}
    </div>
    </>
  );
}
