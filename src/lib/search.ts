import type { Story } from '../types'

export type SearchFilters = {
  query: string
  tags: string[]
}

export function filterStories(stories: Story[], filters: SearchFilters): Story[] {
  const q = filters.query.trim().toLowerCase()
  const activeTags = filters.tags.map((t) => t.toLowerCase())

  return stories.filter((story) => {
    const matchesQuery =
      !q ||
      story.title.toLowerCase().includes(q) ||
      story.author.toLowerCase().includes(q) ||
      story.excerpt.toLowerCase().includes(q) ||
      story.tags.some((tag) => tag.toLowerCase().includes(q))

    const matchesTags =
      activeTags.length === 0 ||
      activeTags.every((tag) => story.tags.some((t) => t.toLowerCase() === tag))

    return matchesQuery && matchesTags
  })
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const WORDS_PER_MINUTE = 230

export function getReadingMinutes(story: Pick<Story, 'pages'>): number {
  const words = story.pages
    .flat()
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
