// totalsportsFront/types/blog.ts
export interface Blog {
  _id: string
  title: string
  description: string
  slug: string
  image: string
  category: {
    name: string
    slug: string
  }

  // 👇 add these optional fields so TS stops complaining
  createdAt?: string
  publishedAt?: string
}
