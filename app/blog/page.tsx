export const revalidate = 60;

import Header from "@/components/header"
import _ from "lodash"
import Footer from "@/components/footer"
import { getAllBlogs } from "@/queries/getBlogsList"
import { TotalsportekMetadata } from "@/constants/metadata";
import Link from "next/link"
import Image from "next/image"
import { Blog } from "@/types/blog"

export async function generateMetadata() {
  const page = TotalsportekMetadata.categories['blog'];

  if (!page) return {}

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://totalsportek.com/blog`,
    },
    other: {
      'article:published_time': new Date().toISOString(),
    },
    alternates: {
      canonical: `https://totalsportek.world/blog`,
    },
  }
}

export default async function Home() {
 
  const blogsData = await getAllBlogs();
  const blogs = _.get(blogsData, "data", [])

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <div className="container mx-auto px-4 py-6 flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="rounded-lg bg-[#1a1a1a] p-6">
            {/* ✅ Grid layout for blogs */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {blogs.map((blog: Blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog.slug}`}
                  className="group block overflow-hidden rounded-lg bg-[#2a2a2a] transition-all hover:bg-[#333333] shadow-lg">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="mb-2 text-2xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                      {blog.title}
                    </h4>
                    <p className="text-xl text-gray-300">{blog.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            {/* ✅ End Grid */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
