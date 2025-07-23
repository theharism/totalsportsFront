import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { getTeams } from "@/lib/api"
import TeamGames from "@/components/team-games"
import _ from "lodash"
import { getBlogByTeam } from "@/queries/getBlogByTeam"

async function getTeamGames(teamId: string) {
  try {
    const response = await fetch(`/api/v1/games/team/${teamId}`)
    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error("Error fetching team games:", error)
    return []
  }
}

export default async function TeamPage({ params }: { params: { slug: string } }) {
  // Fetch all teams to find the matching one
  const teams = await getTeams()
  const team = teams.find((t: any) => t.slug === params.slug)

  if (!team) {
    return <div>Team not found</div>
  }

  // Fetch games for this team
  const games = await getTeamGames(team._id)
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

