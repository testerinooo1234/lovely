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
  /**
   * Story body as one or more paragraph groups.
   * Reader pagination is computed at runtime from the flattened paragraphs —
   * manual group boundaries are not treated as page breaks.
   */
  pages: string[][]
  tags: string[]
  publishedAt: string
  featured?: boolean
}
