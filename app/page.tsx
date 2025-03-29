import Header from "@/components/header"
import MainContent from "@/components/main-content"
import LeftSidebar from "@/components/left-sidebar"
import RightSidebar from "@/components/right-sidebar"
import { getGames } from "@/lib/api"

export default async function Home() {
  const games = await getGames()

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <div className="container mx-auto grid grid-cols-1 gap-4 p-4 md:grid-cols-4 lg:grid-cols-7">
        <div className="md:col-span-1 lg:col-span-1">
          <LeftSidebar />
        </div>
        <div className="md:col-span-2 lg:col-span-4">
          <MainContent games={games} />
        </div>
        <div className="md:col-span-1 lg:col-span-2">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

