export type Story = {
  id: string
  slug: string
  title: string
  author: string
  excerpt: string
  /** Each page is an array of paragraphs. */
  pages: string[][]
  tags: string[]
  publishedAt: string
  featured?: boolean
}
