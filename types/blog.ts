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
}
  