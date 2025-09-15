export const revalidate = 60;

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import _ from "lodash"
import { getBlogBySlug } from "@/queries/getBlogBySlug"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blogData = await getBlogBySlug(params.slug)
  const blog = _.get(blogData, "data", {})

  const publishedTime = blog?.createdAt
    ? new Date(blog.createdAt).toISOString()
    : new Date().toISOString(); // fallback

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://totalsportek.com/blog/${params.slug}`,
      type: 'article',
      publishedTime,
    },
    other: {
      'article:published_time': publishedTime,
    },
  }
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  // Fetch blog data
  const blogData = await getBlogBySlug(params.slug)
  const blog = _.get(blogData, "data", {})
  // Fetch related blogs for the sidebar
//   const relatedBlogsData = await getRelatedBlogs(blog.category?._id)
//   const relatedBlogs = _.get(relatedBlogsData, "data", [])

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="text-blue-500 hover:underline">
            Totalsportek
          </Link>
          <span className="text-gray-600">/</span>
          <Link href="/blog" className="text-blue-500 hover:underline">
            Blog
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">{blog.title}</span>
        </div>

        <div className="grid grid-cols-1">
          {/* Main Content */}
          <div className="lg:col-span-1">
            <BlogContent blog={blog} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function BlogContent({ blog }: { blog: any }) {
  if (!blog || !blog.title) {
    return <div className="rounded-lg bg-[#1a1a1a] p-6 text-white">Blog not found</div>
  }

  return (
    <article className="rounded-lg bg-[#1a1a1a] p-6">
      <h1 className="mb-6 text-3xl font-bold text-white">{blog.title}</h1>

      {blog.image && (
        <div className="mb-6 overflow-hidden rounded-lg">
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={450}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {blog.description && <div className="mb-6 text-lg font-medium text-gray-300">{blog.description}</div>}

      {blog.content ? (
        <div
          className="prose prose-invert max-w-none prose-headings:text-orange-500 prose-a:text-blue-400 prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      ) : (
        <div className="text-gray-300">
          <p>Content not available.</p>
        </div>
      )}

      {/* Category and tags */}
      {blog.category && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-400">Category:</span>
          <Link
            href={`/league/${blog.category.slug}`}
            className="rounded-md bg-orange-500 px-3 py-1 text-sm font-medium text-white hover:bg-orange-600"
          >
            {blog.category.name}
          </Link>
        </div>
      )}
    </article>
  )
}
