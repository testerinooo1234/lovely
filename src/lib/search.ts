import type { Story } from '../types'
import { flattenAllChapterParagraphs } from './chapters'
import { expandSearchTerms } from './searchSynonyms'

export type SearchFilters = {
  query: string
  tags: string[]
}

const searchBlobCache = new WeakMap<Story, string>()

/** Lowercased blob of title, author, excerpt, tags, and full body text. */
export function getStorySearchBlob(story: Story): string {
  const cached = searchBlobCache.get(story)
  if (cached) return cached

  const blob = [
    story.title,
    story.author,
    story.excerpt,
    story.tags.join(' '),
    ...flattenAllChapterParagraphs(story),
  ]
    .join('\n')
    .toLowerCase()

  searchBlobCache.set(story, blob)
  return blob
}

function storyMatchesQuery(story: Story, query: string): boolean {
  const terms = expandSearchTerms(query)
  if (terms.length === 0) return true

  const blob = getStorySearchBlob(story)
  return terms.some((term) => blob.includes(term))
}

export function filterStories(stories: Story[], filters: SearchFilters): Story[] {
  const q = filters.query.trim()
  const activeTags = filters.tags.map((t) => t.toLowerCase())

  return stories.filter((story) => {
    const matchesQuery = !q || storyMatchesQuery(story, q)

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

export function getReadingMinutes(
  story: Pick<Story, 'pages' | 'firstChapterName' | 'chapters'>,
): number {
  const words = flattenAllChapterParagraphs(story)
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
