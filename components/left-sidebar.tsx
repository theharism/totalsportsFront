import Link from "next/link"
import { getCategories } from "@/lib/api"

export default async function LeftSidebar() {
  const categories = await getCategories()

  return (
    <div className="rounded-lg bg-[#1a1a1a] p-4">
      <h2 className="mb-4 text-xl font-bold text-white">Top Leagues</h2>
      <ul className="space-y-3">
        {categories.map((category: any) => (
          <li key={category._id}>
            <Link
              href={`/category/${category.slug}`}
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-800">
                <span className="text-xs">{category.name.charAt(0)}</span>
              </div>
              <span>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

