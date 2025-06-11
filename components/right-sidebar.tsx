import Link from "next/link"
import Image from "next/image"
import { Blog } from "@/types/blog"
interface RightSidebarProps {
  blogs?: Blog[]
}

export default function RightSidebar({ blogs = [] }: RightSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-[#1a1a1a] p-4">
      <h2 className="mb-8 ml-4 text-xs font-semibold text-white">Blogs</h2>
        <div className="space-y-4">
          {blogs.map((blog: Blog) => (
            <Link
            key={blog._id}
            href={`/blog/${blog.slug}`}
            className="group block overflow-hidden rounded-lg bg-[#2a2a2a] transition-all hover:bg-[#333333]"
          >
            <div className="aspect-video w-full overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                width={300}
                height={200}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h4 className="mb-2 text-sm font-bold text-white line-clamp-2 group-hover:text-orange-400 transition-colors">
                {blog.title}
              </h4>
              <p className="text-xs text-gray-300 line-clamp-3">{blog.description}</p>
            </div>
          </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
