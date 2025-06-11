import Header from "@/components/header"
import MainContent from "@/components/main-content"
import LeftSidebar from "@/components/left-sidebar"
import RightSidebar from "@/components/right-sidebar"
import { getGamesByCategory } from "@/queries/getGamesList"
import _ from "lodash"
import { getTopCategories } from "@/queries/getTopCategoriesList"
import { getTopTeams } from "@/queries/getTopTeamsList"

export default async function Home({ params }: { params: { slug: string } }) {
  
  const gamesData = await getGamesByCategory(params.slug)
  const games = _.get(gamesData, "data", []);

  const categoriesData = await getTopCategories();
  const teamsData = await getTopTeams();

  const categories = _.get(categoriesData, "data", []);
  const teams = _.get(teamsData, "data", []);

  return (
      <div className="min-h-screen bg-[#121212]">
        <Header />
        <div className="container mx-auto grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-4 lg:grid-cols-12">
          <div className="md:col-span-1 lg:col-span-3">
            <LeftSidebar categories={categories} teams={teams}/>
          </div>
          <div className="md:col-span-2 lg:col-span-6">
            <MainContent games={games}/>
          </div>
          <div className="md:col-span-1 lg:col-span-3">
            <RightSidebar />
          </div>
        </div>
      </div>
  )
}

