"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Calendar, Clock, Trophy, Star } from "lucide-react";
import Link from "next/link";
import { calculateRemainingTime, groupGamesByCategory } from "@/lib/utils";
import { Game } from "@/types/games";
import Image from "next/image";
import { web_sports, mobile_sports } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Content({
  games,
  isCategory,
}: {
  games: Game[];
  isCategory: boolean;
}) {
  const [activeTab, setActiveTab] = useState("streams");
  const [groupedGames, setGroupedGames] = useState<any[]>([]);
  const [importantGames, setImportantGames] = useState<any[]>([]);
  const [sports, setSports] = useState(web_sports);
  const [maxAds, setMaxAds] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  const [mounted, setMounted] = useState(false);
  const [timeMap, setTimeMap] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSports(mobile_sports);
    } else {
      setSports(web_sports);
    }
  }, [isMobile]);

  useEffect(() => {
    const importantGames = games.filter(
      (game: Game) =>
        game.important && (game.status === "Live" || game.status === "Upcoming")
    );
    setImportantGames(importantGames);
  }, [games]);

  useEffect(() => {
    setIsLoading(true);
    let filtered: Game[] = [];

    if (!isCategory) {
      switch (activeTab) {
        case "streams":
          filtered = games.filter(
            (game: Game) => game.status === "Live" || game.status === "Upcoming"
          );
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
    } else {
      filtered = games;
    }

    const grouped = groupGamesByCategory(filtered);
    setGroupedGames(grouped);
    setIsLoading(false);
  }, [activeTab, games, isCategory]);

  useEffect(() => {
    if (!mounted) return;

    const computeAll = () => {
      const map: Record<string, string> = {};
      for (const g of games) {
        const key = (g && (g._id ?? g.slug)) || JSON.stringify(g);
        try {
          map[key] = calculateRemainingTime(
            (g as any).status,
            (g as any).starting_date,
            (g as any).starting_time,
            (g as any).ending_date,
            (g as any).ending_time
          );
        } catch (e) {
          map[key] = "";
        }
      }
      setTimeMap(map);
    };

    computeAll();
    const t = setInterval(computeAll, 30000);
    return () => clearInterval(t);
  }, [mounted, games]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Live":
        return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />;
      case "Upcoming":
        return <Clock className="w-4 h-4 text-blue-400" />;
      case "Scheduled":
        return <Calendar className="w-4 h-4 text-purple-400" />;
      case "Finished":
        return <Trophy className="w-4 h-4 text-green-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "text-red-400 bg-red-400/10";
      case "Upcoming":
        return "text-blue-400 bg-blue-400/10";
      case "Scheduled":
        return "text-purple-400 bg-purple-400/10";
      case "Finished":
        return "text-green-400 bg-green-400/10";
      default:
        return "text-orange-400 bg-orange-400/10";
    }
  };

  // Function to check if a game is F1 or MotoGP
  const isF1OrMotoGP = (game: any) => {
    const categoryName = game.category?.name?.toLowerCase() || '';
    const gameName = game.name?.toLowerCase() || '';
    return categoryName.includes('f1') || categoryName.includes('formula 1') || 
           categoryName.includes('moto') || categoryName.includes('motogp') ||
           gameName.includes('f1') || gameName.includes('formula 1') ||
           gameName.includes('moto') || gameName.includes('motogp');
  };

  const GameCard = ({ game, isImportant = false }: { game: any; isImportant?: boolean }) => {
    const key = (game && (game._id ?? game.slug)) || JSON.stringify(game);
    const timeText = mounted ? timeMap[key] ?? "" : "";
    const showVS = game?.type === "Teams" && !isF1OrMotoGP(game);
    
    return (
      <div
        className={`group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1a1a1a] to-[#222222] border ${
          isImportant
            ? "border-orange-400/30 shadow-lg shadow-orange-400/10"
            : "border-gray-800/50 hover:border-gray-700/50"
        } transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-4">
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Status and Time Column */}
            <div className="flex items-center gap-3">
            <div className="flex flex-col items-start gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${getStatusColor(game.status)}`}>
                  {getStatusIcon(game.status)}
                  <span className="hidden sm:inline">
                    {game.status === "Live" ? "LIVE" : game.status?.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  <time
                    dateTime={`${game.starting_date}T${game.starting_time}`}
                    title={`Starts: ${game.starting_date} ${game.starting_time} - Ends: ${game.ending_date} ${game.ending_time}`}
                  >
                    {timeText}
                  </time>
                </div>
              </div>
            </div>

            {/* Teams/Game Name Column */}
            <div className="flex-1">
              {game?.type === "Teams" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-100 truncate">
                      {game?.team_one?.name}
                    </span>
                    {showVS && (
                      <span className="text-xs text-red-400 font-bold px-2">VS</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-100 truncate">
                      {game?.team_two?.name}
                    </span>
                    {!showVS && game.status === "Live" && (
                      <span className="text-xs text-red-400 font-bold px-2">LIVE</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-sm font-medium text-gray-100">
                  {game?.name}
                </div>
              )}
            </div>

            {/* Action Column */}
            <div className="flex items-center justify-end gap-2">
              {isImportant && (
                <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
              )}
              <Link
                href={`/game/${game.slug}`}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-orange-500/20 border border-gray-700/50 hover:border-orange-400/50 transition-all duration-200 group/link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover/link:text-orange-400 transition-colors duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CategorySection = ({ category }: { category: any }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#FFFFFF] border border-gray-700/50">
          <Image
            src={category.logo}
            alt={category.name}
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            {category.name}
          </h3>
          <p className="text-xs text-gray-400">
            {category.games.length} {category.games.length === 1 ? 'game' : 'games'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {category.games.map((game: any) => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center gap-3 pb-3">
            <div className="w-10 h-10 bg-gray-800 rounded-lg animate-pulse" />
            <div className="space-y-1">
              <div className="w-32 h-4 bg-gray-800 rounded animate-pulse" />
              <div className="w-20 h-3 bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
          {[1, 2].map((j) => (
            <div key={j} className="h-20 bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );

  const EmptyState = ({ message, icon: Icon }: { message: string; icon: any }) => (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400 space-y-4">
      <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center">
        <Icon className="w-8 h-8" />
      </div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );

  return (
    <>
      {mounted && (
        <div className="flex gap-4 overflow-x-auto mt-2 pb-4 scrollbar-hide sm:hidden">
          <div className="flex gap-4 min-w-max px-1">
            {sports?.map((sport) => (
              <Link
                key={sport.name}
                href={sport.href}
                className="flex flex-col items-center gap-2 min-w-[70px] p-3 rounded-xl bg-gray-800/30 hover:bg-gray-700/50 border border-gray-800/50 hover:border-gray-600/50 transition-all duration-200"
                title={sport.name}
              >
                <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                  {sport.icon === "blog" && isMobile ? (
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  ) : (
                    <Image
                      src={sport.icon}
                      alt={sport.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  )}
                </div>
                <span className="text-xs text-gray-300 text-center leading-tight font-medium">
                  {sport.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#161616] border border-gray-800/50 shadow-2xl">
        {!isCategory && (
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="p-6 border-b border-gray-800/50">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gray-900/50 rounded-xl border border-gray-800/50">
                <TabsTrigger
                  value="results"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-400 font-medium rounded-lg transition-all duration-200"
                >
                  RESULTS
                </TabsTrigger>
                <TabsTrigger
                  value="streams"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-400 font-medium rounded-lg transition-all duration-200"
                >
                  LIVE
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-400 font-medium rounded-lg transition-all duration-200"
                >
                  SCHEDULE
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="streams" className="space-y-8 mt-0">
                {importantGames.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-gradient-to-r from-orange-400/20 via-orange-300/10 to-orange-400/20">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/30">
                        <Star className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          Featured Games
                        </h3>
                        <p className="text-xs text-gray-400">
                          Don't miss these important matches
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {importantGames.map((game: any) => (
                        <GameCard key={game._id} game={game} isImportant={true} />
                      ))}
                    </div>
                  </div>
                )}

                {isLoading ? (
                  <LoadingSkeleton />
                ) : groupedGames.length > 0 ? (
                  <div className="space-y-8">
                    {groupedGames.map((category) => (
                      <CategorySection key={category.id} category={category} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message="No live streams available at the moment"
                    icon={Clock}
                  />
                )}
              </TabsContent>

              <TabsContent value="schedule" className="space-y-8 mt-0">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : groupedGames.length > 0 ? (
                  <div className="space-y-8">
                    {groupedGames.map((category) => (
                      <CategorySection key={category.id} category={category} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message="No upcoming matches scheduled"
                    icon={Calendar}
                  />
                )}
              </TabsContent>

              <TabsContent value="results" className="space-y-8 mt-0">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : groupedGames.length > 0 ? (
                  <div className="space-y-8">
                    {groupedGames.map((category) => (
                      <CategorySection key={category.id} category={category} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message="No results available"
                    icon={Trophy}
                  />
                )}
              </TabsContent>
            </div>
          </Tabs>
        )}

        {isCategory && (
          <div className="p-6">
            {isLoading ? (
              <LoadingSkeleton />
            ) : groupedGames.length > 0 ? (
              <div className="space-y-8">
                {groupedGames.map((category) => (
                  <CategorySection key={category.id} category={category} />
                ))}
              </div>
            ) : (
              <EmptyState
                message="No games available at the moment"
                icon={Clock}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}