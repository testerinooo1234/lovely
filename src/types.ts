export type Author = {
  /** Matches Story.author */
  handle: string
  /** Short public bio shown on the site. */
  bio: string
  /**
   * Craft notes for writing new stories in this author's voice.
   * Used by the Cursor `/add-story` command — keep specific and actionable.
   */
  writingStyle: string
  favoriteTags: string[]
}

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
