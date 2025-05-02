import Header from "@/components/header"
import MainContent from "@/components/main-content"
import LeftSidebar from "@/components/left-sidebar"
import RightSidebar from "@/components/right-sidebar"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getAllGames } from "@/queries/getGamesList"
import { getAllTeams } from "@/queries/getTeamsList"
import { getAllCategories } from "@/queries/getCategoryList"

export default async function Home() {
  const queryClient = new QueryClient()
  
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["games"],
      queryFn: getAllGames,
    }),
    queryClient.prefetchQuery({
      queryKey: ["teams"],
      queryFn: getAllTeams,
    }),
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: getAllCategories,
    })
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-[#121212]">
        <Header />
        <div className="container mx-auto grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-4 lg:grid-cols-12">
          <div className="md:col-span-1 lg:col-span-3">
            <LeftSidebar />
          </div>
          <div className="md:col-span-2 lg:col-span-6">
            <MainContent />
          </div>
          <div className="md:col-span-1 lg:col-span-3">
            <RightSidebar />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}

