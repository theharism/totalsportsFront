import Header from "@/components/header";
import Link from "next/link";
import Image from "next/image";
import _ from "lodash";
import TeamGames from "@/components/team-games";
import { getBlogByTeam } from "@/queries/getBlogByTeam";
import { getGamesByTeam } from "@/queries/getGamesList";
import { getTeamBySlug } from "@/queries/getTeamBySlug";
import { TotalsportekMetadata } from "@/constants/metadata";
import {
  ChevronRight,
  Trophy,
  Calendar,
  Users,
  FileText,
  ExternalLink,
  Play,
  Star,
} from "lucide-react";

// -------------------
// Metadata
// -------------------
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = TotalsportekMetadata.teams[params.slug as keyof typeof TotalsportekMetadata.teams];
  if (!page) return {};

  const teamData = await getTeamBySlug(params.slug);
  const team = _.get(teamData, "data", {});
  const blogData = await getBlogByTeam(team._id);
  const blog = _.get(blogData, "data", []);

  const publishedTime =
    blog?.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString();

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://totalsportek.com/team/${params.slug}`,
    },
    other: {
      "article:published_time": publishedTime,
    },
  };
}

// -------------------
// Page Component
// -------------------
export default async function TeamPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const teamData = await getTeamBySlug(slug);
  const gamesData = await getGamesByTeam(slug);
  const team = _.get(teamData, "data", {});
  const games = _.get(gamesData, "data", []);
  const blogData = await getBlogByTeam(team._id);
  const blog = _.get(blogData, "data", []);

  const getStatsData = () => {
    const totalGames = games.length;
    const liveGames = games.filter((game) => game.status === "Live").length;
    const upcomingGames = games.filter(
      (game) => game.status === "Upcoming" || game.status === "Scheduled"
    ).length;
    const finishedGames = games.filter((game) => game.status === "Finished").length;

    return { totalGames, liveGames, upcomingGames, finishedGames };
  };

  const { totalGames, liveGames, upcomingGames, finishedGames } = getStatsData();

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: any;
    label: string;
    value: number;
    color: string;
  }) => (
    <div
      className={`p-4 rounded-xl bg-gradient-to-br ${color} border border-opacity-20 text-center`}
    >
      <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-lg bg-white/10">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-white/80">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Enhanced Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link
              href="/"
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors font-medium"
            >
              Totalsportek
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <Link
              href="#"
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors font-medium"
            >
              {team.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-gray-400 font-medium">{team.name} Live Stream</span>
          </nav>
        </div>

        {/* Enhanced Team Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#161616] border border-gray-800/50 shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Team Logo */}
              <div className="relative">
                {team.logo ? (
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
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {team.name?.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Featured Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-gray-900">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Team Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {team.name} Live Stream
                </h1>
                <p className="text-gray-400 text-lg mb-4">
                  Watch live {team.name} games and follow their journey across all competitions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Trophy}
            label="Total Games"
            value={totalGames}
            color="from-blue-500/20 to-blue-600/10 border-blue-400/20"
          />
          <StatCard
            icon={Play}
            label="Live Now"
            value={liveGames}
            color="from-red-500/20 to-red-600/10 border-red-400/20"
          />
          <StatCard
            icon={Calendar}
            label="Upcoming"
            value={upcomingGames}
            color="from-orange-500/20 to-orange-600/10 border-orange-400/20"
          />
          <StatCard
            icon={Users}
            label="Completed"
            value={finishedGames}
            color="from-green-500/20 to-green-600/10 border-green-400/20"
          />
        </div>

        {/* Enhanced Games Section */}
        <div className="mb-8 rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#161616] border border-gray-800/50 shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{team.name} Games</h2>
                  <p className="text-sm text-gray-400">All fixtures and live matches</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-400">{totalGames}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <TeamGames games={games} teamId={team._id} />
          </div>
        </div>

        {/* Enhanced Blog Section */}
        {blog && blog.length > 0 && (
          <div className="rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#161616] border border-gray-800/50 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Team News & Insights</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {blog.map((blogPost: any) => (
                <div
                  key={blogPost._id}
                  className="prose prose-invert max-w-none rounded-2xl bg-gray-900/30 border border-gray-800/50 p-6 hover:border-gray-700/50 transition-colors"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {/* <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-400/20 p-6 md:p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 mx-auto flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Follow {team.name} Closely</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get instant updates, live match coverage, and exclusive team insights. 
              Join millions of fans who never miss a moment with Totalsportek.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold">
                <Star className="w-5 h-5" />
                Follow {team.name}
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-all duration-200 font-semibold">
                <ExternalLink className="w-5 h-5" />
                View All Teams
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
