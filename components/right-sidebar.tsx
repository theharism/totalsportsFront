import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { BookOpen, Calendar, Clock, ExternalLink, FileText } from "lucide-react";

interface RightSidebarProps {
  blogs?: Blog[];
}

export default function RightSidebar({ blogs = [] }: RightSidebarProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  const BlogCard = ({ blog }: { blog: Blog }) => (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block overflow-hidden rounded-xl bg-gradient-to-br from-[#1e1e1e] to-[#1a1a1a] border border-gray-800/50 hover:border-orange-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-400/5 hover:scale-[1.02]"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          width={300}
          height={200}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Reading Time Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg border border-gray-700/50">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-orange-400" />
            <span className="text-xs text-white font-medium">3 min</span>
          </div>
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-orange-500/20 backdrop-blur-sm rounded-lg border border-orange-400/30">
          <span className="text-xs text-orange-400 font-semibold">SPORTS</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Date and Author */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(blog.createdAt || blog.publishedAt || new Date().toISOString())}</span>
          <span>•</span>
          <span>Sports News</span>
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-gray-100 line-clamp-2 group-hover:text-orange-400 transition-colors duration-200 leading-relaxed">
          {blog.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
          {blog.description}
        </p>

        {/* Read More Link */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-800/50">
          <span className="text-xs text-orange-400 font-semibold group-hover:text-orange-300 transition-colors">
            Read More
          </span>
          <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-orange-400 transition-colors" />
        </div>
      </div>
    </Link>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="overflow-hidden rounded-xl bg-gray-900/30 animate-pulse">
          <div className="aspect-video bg-gray-800" />
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-800 rounded" />
              <div className="w-20 h-3 bg-gray-800 rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-800 rounded" />
              <div className="w-3/4 h-4 bg-gray-800 rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-gray-800 rounded" />
              <div className="w-full h-3 bg-gray-800 rounded" />
              <div className="w-2/3 h-3 bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <div className="w-16 h-16 rounded-2xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center mb-4">
        <FileText className="w-8 h-8" />
      </div>
      <h3 className="text-sm font-semibold text-gray-400 mb-2">No Blogs Available</h3>
      <p className="text-xs text-gray-600 text-center">
        Check back later for the latest sports news and updates
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Main Blogs Section */}
      <div className="rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#161616] border border-gray-800/50 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/30">
                <BookOpen className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Latest Blogs</h2>
                <p className="text-xs text-gray-400">Sports news & updates</p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-800/50 flex items-center justify-center">
              <span className="text-xs font-semibold text-orange-400">{blogs.length}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {!blogs ? (
            <LoadingSkeleton />
          ) : blogs.length > 0 ? (
            <div className="space-y-4">
              {blogs.map((blog: Blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/5 border border-blue-400/20 p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 mx-auto flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Get the latest sports news, match analysis, and exclusive content delivered to your inbox.
            </p>
          </div>
          <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-400/25">
            Coming Soon
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-400/20 p-4 text-center">
          <div className="text-lg font-bold text-green-400">24/7</div>
          <div className="text-xs text-gray-400">Live Coverage</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-400/20 p-4 text-center">
          <div className="text-lg font-bold text-orange-400">50+</div>
          <div className="text-xs text-gray-400">Sports Covered</div>
        </div>
      </div>
    </div>
  );
}