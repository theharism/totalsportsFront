import Image from "next/image"
import Link from "next/link"
import { getTeams } from "@/lib/api"

export default async function RightSidebar() {
  const teams = await getTeams()

  return (
    <div className="rounded-lg bg-[#1a1a1a] p-4">
      <h2 className="mb-4 text-xl font-bold text-white">Top Teams</h2>
      <ul className="space-y-3">
        {teams.map((team: any) => (
          <li key={team._id}>
            <Link href={`/team/${team.slug}`} className="flex items-center gap-2 text-gray-300 hover:text-white">
              {team.logo ? (
                <Image
                  src={`http://localhost:3000/${team.logo}`}
                  alt={team.name}
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-800">
                  <span className="text-xs">{team.name.charAt(0)}</span>
                </div>
              )}
              <span>{team.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

