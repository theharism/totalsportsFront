// import { MetadataRoute } from 'next'
// import { getAllBlogs } from '@/queries/getBlogsList'
// import { getGamesByCategory } from '@/queries/getGamesList'
// import { getTopCategories } from "@/queries/getTopCategoriesList"
// import { getTopTeams } from "@/queries/getTopTeamsList"
// import { web_sports } from '@/lib/constants'

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const baseUrl = 'https://totalsportek.world'

//   const blogs = await getAllBlogs()
//   const categories = await getTopCategories()
//   const games = await getGamesByCategory("All")
//   const teams = await getTopTeams()

//   const staticUrls: MetadataRoute.Sitemap = [
//     {
//       url: encodeURI(baseUrl),
//       lastModified: new Date(),
//       priority: 1.0,
//     },
//   ]

//     const streamsUrls =
//     web_sports?.map((s: any) => ({
//       url: encodeURI(`${baseUrl}${s.href}`),
//       lastModified: new Date().toISOString(),
//       priority: 0.80,
//     })) || []

//     const categoryUrls =
//     categories?.data?.map((c: any) => ({
//       url: encodeURI(`${baseUrl}/league/${c.slug}`),
//       lastModified: new Date(c.updatedAt).toISOString(),
//       priority: 0.80,
//     })) || []

//     const teamUrls =
//     teams?.data?.map((t: any) => ({
//       url: encodeURI(`${baseUrl}/team/${t.slug}`),
//       lastModified: new Date(t.updatedAt).toISOString(),
//       priority: 0.80,
//     })) || []

//   const blogUrls =
//     blogs?.data?.map((b: any) => ({
//       url: encodeURI(`${baseUrl}/blog/${b.slug}`),
//       lastModified: new Date(b.updatedAt).toISOString(),
//       priority: 0.80,
//     })) || []

//   const gameUrls =
//     games?.data?.map((g: any) => ({
//       url: encodeURI(`${baseUrl}/game/${g.slug}`),
//       lastModified: new Date(g.updatedAt).toISOString(),
//       priority: 0.64,
//     })) || []

//     const categoryImages =
//     categories?.data?.map((c: any) => ({
//       url: encodeURI(`${baseUrl}/${c.logo}`),
//       lastModified: new Date(c.updatedAt).toISOString(),
//       priority: 0.80,
//     })) || []

//     const teamImages =
//     teams?.data?.map((t: any) => ({
//       url: encodeURI(`${baseUrl}/${t.logo}`),
//       lastModified: new Date(t.updatedAt).toISOString(),
//       priority: 0.80,
//     })) || []

//   const blogImages =
//     blogs?.data?.map((b: any) => ({
//       url: encodeURI(`${baseUrl}/${b.image}`),
//       lastModified: new Date(b.updatedAt).toISOString(),
//       priority: 0.80,
//     })) || []

//   return [...staticUrls, ...streamsUrls, ...categoryUrls, ...teamUrls, ...blogUrls, ...gameUrls, ...categoryImages, ...teamImages, ...blogImages]
// }

import { MetadataRoute } from "next";
import { getAllBlogs } from "@/queries/getBlogsList";
import { getGamesByCategory } from "@/queries/getGamesList";
import { getTopCategories } from "@/queries/getTopCategoriesList";
import { getTopTeams } from "@/queries/getTopTeamsList";
import { web_sports } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://totalsportek.world";

  const blogs = await getAllBlogs();
  const categories = await getTopCategories();
  const games = await getGamesByCategory("All");
  const teams = await getTopTeams();

  // 🔹 Homepage
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: encodeURI(baseUrl),
      lastModified: new Date(),
      priority: 1.0,
    },
  ];

  // 🔹 Sports streams pages
  const streamsUrls =
    web_sports?.map((s: any) => ({
      url: encodeURI(`${baseUrl}${s.href}`),
      lastModified: new Date().toISOString(),
      priority: 0.9,
    })) || [];

  // 🔹 Category pages (with logos)
  const categoryUrls =
    categories?.data?.map((c: any) => ({
      url: encodeURI(`${baseUrl}/league/${c.slug}`),
      lastModified: new Date(c.updatedAt).toISOString(),
      priority: 0.85,
      images: c.logo ? [encodeURI(`${baseUrl}/${c.logo}`)] : [],
    })) || [];

  // 🔹 Team pages (with logos)
  const teamUrls =
    teams?.data?.map((t: any) => ({
      url: encodeURI(`${baseUrl}/team/${t.slug}`),
      lastModified: new Date(t.updatedAt).toISOString(),
      priority: 0.8,
      images: t.logo ? [encodeURI(`${baseUrl}/${t.logo}`)] : [],
    })) || [];

  // 🔹 Blog posts (with blog images)
  const blogUrls =
    blogs?.data?.map((b: any) => ({
      url: encodeURI(`${baseUrl}/blog/${b.slug}`),
      lastModified: new Date(b.updatedAt).toISOString(),
      priority: 0.75,
      images: b.image ? [encodeURI(`${baseUrl}/${b.image}`)] : [],
    })) || [];

  // 🔹 Games (change often, lower priority)
  const gameUrls =
    games?.data?.map((g: any) => ({
      url: encodeURI(`${baseUrl}/game/${g.slug}`),
      lastModified: new Date(g.updatedAt).toISOString(),
      priority: 0.64,
    })) || [];

  // ✅ Final sitemap
  return [
    ...staticUrls,
    ...streamsUrls,
    ...categoryUrls,
    ...teamUrls,
    ...blogUrls,
    ...gameUrls,
  ];
}
