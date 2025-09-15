import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { getTeams } from "@/lib/api"
import TeamGames from "@/components/team-games"
import _ from "lodash"
import { getBlogByTeam } from "@/queries/getBlogByTeam"
import { getGamesByTeam } from "@/queries/getGamesList"
import { getTeamBySlug } from "@/queries/getTeamBySlug"
import { TotalsportekMetadata } from "@/constants/metadata";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = TotalsportekMetadata.teams[params.slug as keyof typeof TotalsportekMetadata.teams]

  if (!page) return {}

  const teamData = await getTeamBySlug(params.slug);
  const team = _.get(teamData, "data", {});
  const blogData = await getBlogByTeam(team._id);
  const blog = _.get(blogData, "data", []);
  
  const publishedTime = blog?.createdAt
    ? new Date(blog.createdAt).toISOString()
    : new Date().toISOString(); // fallback

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://totalsportek.com/team/${params.slug}`,
    },
    other: {
      'article:published_time': publishedTime,
    },
    alternates: {
      canonical: `https://totalsportek.world/team/${params.slug}`,
    },
  }
}

export default async function TeamPage({ params }: { params: { slug: string } }) {

  const { slug } = params;
  const teamData = await getTeamBySlug(slug);
  const gamesData = await getGamesByTeam(slug);
  const games = _.get(gamesData, "data", []);
  const team = _.get(teamData, "data", {});
  
  const blogData = await getBlogByTeam(team._id);
  const blog = _.get(blogData, "data", []);

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
          <Link href="#" className="text-blue-500 hover:underline">
            Soccer Streams
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">{team.name} Live Stream</span>
        </div>

        {/* Team Header */}
        <div className="mb-8 flex items-center gap-4">
          {team.logo ? (
            <Image
              src={team.logo}
              alt={team.name}
              width={64}
              height={64}
              className="h-16 w-16 object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a1a]">
              <span className="text-2xl font-bold text-white">{team.name.charAt(0)}</span>
            </div>
          )}
          <h1 className="text-3xl font-bold text-white">{team.name} Live Stream</h1>
        </div>

        {/* Games Section */}
        <div className="rounded-lg bg-[#1a1a1a] p-6">
          <TeamGames games={games} teamId={team._id} />
        </div>

        <div className="rounded-lg bg-[#1a1a1a] p-6">
          {blog?.map((blog: any) => (
            <div key={blog._id} className="blog" dangerouslySetInnerHTML={{ __html: blog.content }} />
          ))}
        </div>
      </div>
    </div>
  )
}

