export const revalidate = 60;

import Header from "@/components/header";
import Link from "next/link";
import CategoryGames from "@/components/category-games";
import { getGamesByCategory } from "@/queries/getGamesList";
import { getCategoryBySlug } from "@/queries/getCategoryBySlug";
import _ from "lodash";
import Image from "next/image";
import { getBlogByCategory } from "@/queries/getBlogByCategory";
import { TotalsportekMetadata } from "@/constants/metadata";
import { ChevronRight, Trophy, Calendar, Users, FileText, ExternalLink, Play, Star } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = TotalsportekMetadata.leagues[params.slug as keyof typeof TotalsportekMetadata.leagues]
  if (!page) return {}
  
  const categoryData = await getCategoryBySlug(params.slug);
  const category = _.get(categoryData, "data", {});
  const blogData = await getBlogByCategory(category._id);
  const blog = _.get(blogData, "data", []);
  
  const publishedTime = blog?.createdAt
    ? new Date(blog.createdAt).toISOString()
    : new Date().toISOString();

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://totalsportek.com/category/${params.slug}`,
    },
    other: {
      'article:published_time': publishedTime,
    },
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categoryData = await getCategoryBySlug(slug);
  const gamesData = await getGamesByCategory(slug);
  const games = _.get(gamesData, "data", []);
  const category = _.get(categoryData, "data", {});
  const blogData = await getBlogByCategory(category._id);
  const blog = _.get(blogData, "data", []);

  const getStatsData = () => {
    const totalGames = games.length;
    const liveGames = games.filter(game => game.status === "Live").length;
    const upcomingGames = games.filter(game => game.status === "Upcoming" || game.status === "Scheduled").length;
    const finishedGames = games.filter(game => game.status === "Finished").length;

    return { totalGames, liveGames, upcomingGames, finishedGames };
  };

  const { totalGames, liveGames, upcomingGames, finishedGames } = getStatsData();

  const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: number, color: string }) => (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${color} border border-opacity-20 text-center`}>
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
              {category.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-gray-400 font-medium">{category.name} Live Stream</span>
          </nav>
        </div>

        {/* Enhanced Category Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#161616] border border-gray-800/50 shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Category Logo */}
              <div className="relative">
                {category.logo ? (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-800/50 border border-gray-600/50 flex items-center justify-center overflow-hidden">
                    <Image
                      src={category.logo}
                      alt={category.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {category.name?.charAt(0)}
                    </span>
                  </div>
                )}
                
                {/* Featured Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center border-2 border-gray-900">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Category Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {category.name} Matches Live Stream
                </h1>
                <p className="text-gray-400 text-lg mb-4">
                  Watch live {category.name} matches and enjoy high-quality streaming
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
          {/* Games Header */}
          <div className="px-6 py-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/30 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{category.name} Games</h2>
                  <p className="text-sm text-gray-400">Live matches and schedules</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center">
                <span className="text-sm font-bold text-orange-400">{totalGames}</span>
              </div>
            </div>
          </div>

          {/* Games Content */}
          <div className="p-6">
            <CategoryGames games={games} />
          </div>
        </div>

        {/* Enhanced Blog Section */}
        {blog && blog.length > 0 && (
          <div className="rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#161616] border border-gray-800/50 shadow-2xl overflow-hidden">
            {/* Blog Header */}
            <div className="px-6 py-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Latest News & Analysis</h2>
                    <p className="text-sm text-gray-400">Expert insights and updates</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-400">{blog.length}</span>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="p-6">
              <div className="space-y-6">
                {blog.map((blogPost: any) => (
                  <div 
                    key={blogPost._id} 
                    className="prose prose-invert prose-orange max-w-none rounded-2xl bg-gray-900/30 border border-gray-800/50 p-6 hover:border-gray-700/50 transition-colors"
                  >
                    <div 
                      className="blog-content"
                      dangerouslySetInnerHTML={{ __html: blogPost.content }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        {/* <div className="mt-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-400/20 p-6 md:p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 mx-auto flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Never Miss a {category.name} Match
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get real-time updates, live scores, and high-quality streams for all {category.name} matches. 
              Join millions of fans who trust Totalsportek for their sports streaming needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold">
                <Star className="w-5 h-5" />
                Follow {category.name}
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-all duration-200 font-semibold">
                <ExternalLink className="w-5 h-5" />
                View All Leagues
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}