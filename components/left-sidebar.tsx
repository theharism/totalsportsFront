import Link from "next/link";
import Image from "next/image";

export default function LeftSidebar({categories, teams}: {categories: any[], teams: any[]}) {
  // const categoriesData = await getTopCategories();
  // const teamsData = await getTopTeams();

  // const categories = _.get(categoriesData, "data", []);
  // const teams = _.get(teamsData, "data", []);

  return (
    <>
      <div className="rounded-xl mb-2 bg-[#1a1a1a] px-4 py-3">
        <h2 className="mb-8 ml-4 text-xs font-semibold text-white">Top Leagues</h2>
        <ul className="space-y-5">
          {categories.map((category: any) => (
            <li key={category._id}>
              <Link
                href={`/category/${category.slug}`}
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                {category.logo ? (
                  <Image
                    src={category.logo}
                    alt={category.name}
                    width={15}
                    height={15}
                    className="h-4 w-4 object-cover"
                  />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-800">
                    <span className="text-xs">{category.name.charAt(0)}</span>
                  </div>
                )}
                <span className="ml-2 text-xs">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl mt-2 bg-[#1a1a1a] px-4 py-3">
        <h2 className="mb-8 ml-4 text-xs font-semibold text-white">Top Teams</h2>
        <ul className="space-y-5">
          {teams.map((team: any) => (
            <li key={team._id}>
              <Link
                href={`/team/${team.slug}`}
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                {team.logo ? (
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={15}
                    height={15}
                    className="h-4 w-4 object-cover"
                  />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-800">
                    <span className="text-xs">{team.name.charAt(0)}</span>
                  </div>
                )}
                <span className="ml-2 text-xs">{team.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
