import Link from "next/link";
import Image from "next/image";
import { Trophy, Users, ChevronRight, Star } from "lucide-react";

export default function LeftSidebar({
  categories,
  teams,
}: {
  categories: any[];
  teams: any[];
}) {
  const SectionCard = ({
    title,
    icon: Icon,
    children,
    count,
  }: {
    title: string;
    icon: any;
    children: React.ReactNode;
    count: number;
  }) => (
    <div className="rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#161616] border border-gray-800/50 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/30">
              <Icon className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">{title}</h2>
              <p className="text-xs text-gray-400">{count} available</p>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-gray-800/50 flex items-center justify-center">
            <span className="text-xs font-semibold text-orange-400">{count}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );

  const ItemLink = ({
    href,
    logo,
    name,
    fallbackChar,
    isTeam = false,
  }: {
    href: string;
    logo?: string;
    name: string;
    fallbackChar: string;
    isTeam?: boolean;
  }) => (
    <Link
      href={href}
      className="group flex items-center justify-between p-3 rounded-xl bg-gray-900/30 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-600/5 border border-gray-800/30 hover:border-orange-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-400/5"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          {logo ? (
            <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center overflow-hidden">
              <Image
                src={logo}
                alt={name}
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600/50 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-300">
                {fallbackChar}
              </span>
            </div>
          )}
          
          {/* Team indicator */}
          {isTeam && (
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border border-gray-900 flex items-center justify-center">
              <Users className="w-2 h-2 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-200 truncate block">
            {name}
          </span>
          <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
            {isTeam ? "Team" : "League"}
          </span>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-orange-400 transition-all duration-200 group-hover:translate-x-1" />
    </Link>
  );

  const EmptyState = ({ type }: { type: string }) => (
    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
      <div className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700/50 flex items-center justify-center mb-3">
        {type === "leagues" ? (
          <Trophy className="w-6 h-6" />
        ) : (
          <Users className="w-6 h-6" />
        )}
      </div>
      <p className="text-sm font-medium">No {type} available</p>
      <p className="text-xs text-gray-600 mt-1">Check back later</p>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/30 animate-pulse">
          <div className="w-8 h-8 rounded-lg bg-gray-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-800 rounded w-3/4" />
            <div className="h-2 bg-gray-800 rounded w-1/2" />
          </div>
          <div className="w-4 h-4 bg-gray-800 rounded" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Leagues Section */}
      <SectionCard
        title="Top Leagues"
        icon={Trophy}
        count={categories?.length || 0}
      >
        {!categories ? (
          <LoadingSkeleton />
        ) : categories.length > 0 ? (
          <div className="space-y-2">
            {categories.map((category: any, index) => (
              <ItemLink
                key={category._id}
                href={`/category/${category.slug}`}
                logo={category.logo}
                name={category.name}
                fallbackChar={category.name.charAt(0).toUpperCase()}
                isTeam={false}
              />
            ))}
          </div>
        ) : (
          <EmptyState type="leagues" />
        )}
      </SectionCard>

      {/* Top Teams Section */}
      <SectionCard
        title="Top Teams"
        icon={Users}
        count={teams?.length || 0}
      >
        {!teams ? (
          <LoadingSkeleton />
        ) : teams.length > 0 ? (
          <div className="space-y-2">
            {teams.map((team: any, index) => (
              <ItemLink
                key={team._id}
                href={`/team/${team.slug}`}
                logo={team.logo}
                name={team.name}
                fallbackChar={team.name.charAt(0).toUpperCase()}
                isTeam={true}
              />
            ))}
          </div>
        ) : (
          <EmptyState type="teams" />
        )}
      </SectionCard>

      {/* Premium Feature Teaser (Optional) */}
      {/* <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-400/20 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Premium Stats</h3>
            <p className="text-xs text-gray-400">Advanced analytics</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Get detailed team performance, player stats, and match predictions.
        </p>
        <button className="w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:shadow-lg">
          Learn More
        </button>
      </div> */}
    </div>
  );
}