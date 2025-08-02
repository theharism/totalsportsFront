export const revalidate = 60;

import Header from "@/components/header"
import MainContent from "@/components/main-content"
import LeftSidebar from "@/components/left-sidebar"
import RightSidebar from "@/components/right-sidebar"
import { getGamesByCategory } from "@/queries/getGamesList"
import _ from "lodash"
import { getTopCategories } from "@/queries/getTopCategoriesList"
import { getTopTeams } from "@/queries/getTopTeamsList"
import Footer from "@/components/footer"
import { getAllBlogs } from "@/queries/getBlogsList"
import { getBlogByCategorySlug } from "@/queries/getBlogByCategorySlug";
import { TotalsportekMetadata } from "@/constants/metadata";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = TotalsportekMetadata.categories[params.slug as keyof typeof TotalsportekMetadata.categories]

  if (!page) return {}

  let blog = [];
  if(params.slug !== "All" && params.slug !== "blog") {
    const blogData = await getBlogByCategorySlug(params.slug);
    blog = _.get(blogData, "data", []);  
  }

  const publishedTime = blog?.createdAt
    ? new Date(blog.createdAt).toISOString()
    : new Date().toISOString(); // fallback

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://totalsportek.com/${params.slug}`,
    },
    other: {
      'article:published_time': publishedTime,
    },
  }
}

export default async function Home({ params }: { params: { slug: string } }) {
  let games = [];
  if(params.slug !== "blog") {
    const gamesData = await getGamesByCategory(params.slug)
    games = _.get(gamesData, "data", [])
  }

  const categoriesData = await getTopCategories()
  const teamsData = await getTopTeams()
  const blogsData = await getAllBlogs();

  const categories = _.get(categoriesData, "data", [])
  const teams = _.get(teamsData, "data", [])
  const blogs = _.get(blogsData, "data", [])
  let blog = [];
  if(params.slug !== "All" && params.slug !== "blog") {
    const blogData = await getBlogByCategorySlug(params.slug);
    blog = _.get(blogData, "data", []);  
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <div className="container mx-auto grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-4 lg:grid-cols-12">
        {/* Main Content - First on mobile, center on desktop */}
        <div className="order-1 md:order-2 md:col-span-2 lg:col-span-6">
          <MainContent games={games} isCategory={true} blog={blog} />
        </div>

        {/* Left Sidebar - Second on mobile, first on desktop */}
        <div className="order-2 md:order-1 md:col-span-1 lg:col-span-3">
          <LeftSidebar categories={categories} teams={teams} />
        </div>

        {/* Right Sidebar - Third on mobile, third on desktop */}
        <div className="order-3 md:order-3 md:col-span-1 lg:col-span-3">
          <RightSidebar blogs={blogs} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
