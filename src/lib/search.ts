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

/** Mulberry32 — tiny seeded PRNG for stable shuffles across pagination. */
function mulberry32(seed: number): () => number {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

/** Fisher–Yates shuffle; same seed ⇒ same order. */
export function shuffleStories(list: Story[], seed: number): Story[] {
  const next = [...list]
  const random = mulberry32(seed)
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
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
