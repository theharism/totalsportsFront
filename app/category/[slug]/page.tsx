import Header from "@/components/header"
import Link from "next/link"
import { getCategories } from "@/lib/api"
import CategoryGames from "@/components/category-games"

async function getCategoryGames(categoryId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/games/category/${categoryId}`)
    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error("Error fetching category games:", error)
    return []
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Fetch all categories to find the matching one
  const categories = await getCategories()
  const category = categories.find((c: any) => c.slug === params.slug)

  if (!category) {
    return <div>Category not found</div>
  }

  // Fetch games for this category
  const games = await getCategoryGames(category._id)

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
          <span className="text-gray-400">{category.name} Live Stream</span>
        </div>

        {/* Category Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a1a]">
            <span className="text-2xl font-bold text-white">{category.name.charAt(0)}</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{category.name} Matches Live Stream</h1>
        </div>

        {/* Games Section */}
        <div className="rounded-lg bg-[#1a1a1a] p-6">
          <CategoryGames games={games} />
        </div>
      </div>
    </div>
  )
}

