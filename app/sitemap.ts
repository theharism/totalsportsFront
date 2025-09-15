import { MetadataRoute } from 'next'
import { getAllBlogs } from '@/queries/getBlogsList'
import { getAllCategories } from '@/queries/getCategoryList'
import { getAllGames } from '@/queries/getGamesList'
import { getAllTeams } from '@/queries/getTeamsList'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://totalsportek.world'

  const blogs = await getAllBlogs()
  const categories = await getAllCategories()
  const games = await getAllGames()
  const teams = await getAllTeams()

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const blogUrls =
    blogs?.data?.map((b: any) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    })) || []

  const categoryUrls =
    categories?.data?.map((c: any) => ({
      url: `${baseUrl}/league/${c.slug}`,
      lastModified: new Date(c.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    })) || []

  const gameUrls =
    games?.data?.map((g: any) => ({
      url: `${baseUrl}/game/${g.slug}`,
      lastModified: new Date(g.updatedAt),
      changeFrequency: 'daily',
      priority: 1.0,
    })) || []

  const teamUrls =
    teams?.data?.map((t: any) => ({
      url: `${baseUrl}/team/${t.slug}`,
      lastModified: new Date(t.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    })) || []

  return [...staticUrls, ...blogUrls, ...categoryUrls, ...gameUrls, ...teamUrls]
}
