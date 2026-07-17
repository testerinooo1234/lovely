import { authors } from '../data/authors'
import { stories } from '../data/stories'

export type AuthorSummary = {
  handle: string
  storyCount: number
  /** Up to 5 most-used tags, sorted alphabetically for display. */
  topTags: string[]
}

function topTagsForStories(
  authorStories: typeof stories,
  limit = 5,
): string[] {
  const counts = new Map<string, number>()
  for (const story of authorStories) {
    for (const tag of story.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag)
    .sort((a, b) => a.localeCompare(b))
}

export function getAuthorSummaries(): AuthorSummary[] {
  return authors
    .map((author) => {
      const key = author.handle.toLowerCase()
      const authorStories = stories.filter((s) => s.author.toLowerCase() === key)
      return {
        handle: author.handle,
        storyCount: authorStories.length,
        topTags: topTagsForStories(authorStories, 5),
      }
    })
    .sort((a, b) => a.handle.localeCompare(b.handle))
}
