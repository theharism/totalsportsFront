// app/sitemap/route.ts
import { NextResponse } from 'next/server'
import { getAllBlogs } from '@/queries/getBlogsList'
import { getAllCategories } from '@/queries/getCategoryList'
import { getAllGames } from '@/queries/getGamesList'
import { getAllTeams } from '@/queries/getTeamsList'

export async function GET() {
  const baseUrl = 'https://totalsportek.world'

  const blogs = await getAllBlogs()
  const categories = await getAllCategories()
  const games = await getAllGames()
  const teams = await getAllTeams()
  
  const urls = [
    { loc: baseUrl, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/blog`, lastmod: new Date().toISOString() },
    ...(blogs?.data?.map((b: any) => ({ loc: `${baseUrl}/blog/${b.slug}`, lastmod: new Date(b.updatedAt).toISOString() })) || []),
    ...(categories?.data?.map((c: any) => ({ loc: `${baseUrl}/category/${c.slug}`, lastmod: new Date(c.updatedAt).toISOString() })) || []),
    ...(games?.data?.map((g: any) => ({ loc: `${baseUrl}/game/${g.slug}`, lastmod: new Date(g.updatedAt).toISOString() })) || []),
    ...(teams?.data?.map((t: any) => ({ loc: `${baseUrl}/team/${t.slug}`, lastmod: new Date(t.updatedAt).toISOString() })) || []),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${urls
      .map(
        (u) => `
      <url>
        <loc>${u.loc}</loc>
        <lastmod>${u.lastmod}</lastmod>
        <priority>1.00</priority>
      </url>`
      )
      .join('')}
  </urlset>`

  return new NextResponse(sitemap, { headers: { 'Content-Type': 'application/xml' } })
}
