export const revalidate = 60;

import Header from "@/components/header";
import Link from "next/link";
import CategoryGames from "@/components/category-games";
import { getGamesByCategory } from "@/queries/getGamesList";
import { getCategoryBySlug } from "@/queries/getCategoryBySlug";
import _ from "lodash";
import Image from "next/image";
import { getBlogByCategory } from "@/queries/getBlogByCategory";
import { TotalsportekMetadata } from "@/constants/metadata";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = TotalsportekMetadata.leagues[params.slug as keyof typeof TotalsportekMetadata.leagues]

  if (!page) return {}

  const categoryData = await getCategoryBySlug(params.slug);
  const category = _.get(categoryData, "data", {});
  const blogData = await getBlogByCategory(category._id);
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
      url: `https://totalsportek.com/league/${params.slug}`,
    },
    other: {
      'article:published_time': publishedTime,
    },
    alternates: {
      canonical: `https://totalsportek.world/league/${params.slug}`,
    },
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categoryData = await getCategoryBySlug(slug);
  const gamesData = await getGamesByCategory(slug);
  const games = _.get(gamesData, "data", []);
  const category = _.get(categoryData, "data", {});
  const blogData = await getBlogByCategory(category._id);
  const blog = _.get(blogData, "data", []);
  
  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link 
          target="_blank"
          rel="noopener noreferrer"
          href="/" className="text-orange-500 hover:underline">
            Totalsportek
          </Link>
          <span className="text-gray-600">/</span>
          <Link href="#" className="text-blue-500 hover:underline">
            {category.name}
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">{category.name} Live Stream</span>
        </div>

        {/* Category Header */}
        <div className="mb-8 flex items-center gap-4">
          {category.logo ? (
                      <Image
                        src={category.logo}
                        alt={category.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover"
                      />
                    ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a1a]">
            <span className="text-2xl font-bold text-white">{category.name.charAt(0)}</span>
          </div>
                    )}
          <h1 className="text-3xl font-bold text-white">{category.name} Matches Live Stream</h1>
        </div>

        {/* Games Section */}
        <div className="rounded-lg bg-[#1a1a1a] p-6">
          <CategoryGames games={games} />
        </div>

        <div className="rounded-lg bg-[#1a1a1a] p-6">
          {blog?.map((blog: any) => (
            <div className="blog" key={blog._id} dangerouslySetInnerHTML={{ __html: blog.content }} />
          ))}
        </div>
      </div>
    </div>
  );
}