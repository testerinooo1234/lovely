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

/** A named chapter body. Multi-chapter stories always give every chapter a name. */
export type StoryChapter = {
  name: string
  /**
   * Short chapter blurb for the story-page chapter dropdown.
   * Distinct from the story's catalog `excerpt`. Required for multi-chapter stories.
   */
  summary: string
  /**
   * Chapter body as one or more paragraph groups.
   * Reader pagination is computed at runtime from the flattened paragraphs —
   * manual group boundaries are not treated as page breaks.
   */
  pages: string[][]
}

export type Story = {
  id: string
  slug: string
  title: string
  author: string
  excerpt: string
  /**
   * Opening body (sole chapter for single-chapter stories; chapter 1 when
   * `chapters` is set). Reader pagination flattens these paragraph groups.
   */
  pages: string[][]
  /**
   * Name for the opening body in `pages`. Required when `chapters` is set.
   * Omitted for single-chapter stories (no chapter dropdown).
   */
  firstChapterName?: string
  /**
   * Short blurb for the opening chapter in the story-page dropdown.
   * Required when `chapters` is set; distinct from `excerpt`.
   */
  firstChapterSummary?: string
  /**
   * Additional named chapters after the first.
   * Browse/author catalog still list this as one story; read time sums all chapters.
   */
  chapters?: StoryChapter[]
  tags: string[]
  publishedAt: string
  featured?: boolean
}
