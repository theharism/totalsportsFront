"use client";

import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { calculateRemainingTime, groupGamesByCategory } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { getAllGames } from "@/queries/getGamesList";
import _ from "lodash";
import { Game } from "@/types/games";
import Image from "next/image";

export default function Content() {
  const { data } = useQuery({ queryKey: ["games"], queryFn: getAllGames });
  const games = useMemo(() => _.get(data, "data", []), [data]);
  const [activeTab, setActiveTab] = useState("streams");
  const [filteredGames, setFilteredGames] = useState<any[]>([]);
  const [groupedGames, setGroupedGames] = useState<any[]>([]);

  useEffect(() => {
    let filtered = [];

    switch (activeTab) {
      case "streams":
        filtered = games.filter((game: Game) => game.status === "Live");
        break;
      case "schedule":
        filtered = games.filter((game: Game) => game.status === "Upcoming");
        break;
      case "results":
        filtered = games.filter((game: Game) => game.status === "Finished");
        break;
      default:
        filtered = games.filter((game: Game) => game.status === "Live");
    }

    setFilteredGames(filtered);

    // Group the filtered games by category
    const grouped = groupGamesByCategory(filtered);
    setGroupedGames(grouped);
  }, [activeTab, games]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="rounded-lg bg-[#1a1a1a] p-4">
      <Tabs
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
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800">
                     <Image
                        src={category.logo}
                        alt={category.name}
                        width={15}
                        height={15}
                        className="h-4 w-4 rounded-full object-cover"
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
                            {game.status === "Live"
                              ? "In progress"
                              : calculateRemainingTime(
                                  game.starting_date,
                                  game.starting_time
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
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          {groupedGames.length > 0 ? (
            groupedGames.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800">
                  <Image
                        src={category.logo}
                        alt={category.name}
                        width={15}
                        height={15}
                        className="h-4 w-4 rounded-full object-cover"
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
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800">
                      <Image
                        src={category.logo}
                        alt={category.name}
                        width={15}
                        height={15}
                        className="h-4 w-4 rounded-full object-cover"
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
      </Tabs>
    </div>
  );
}
