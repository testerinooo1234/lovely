/** Target words per reader page (~2 minutes at 230 WPM). */
export const WORDS_PER_STORY_PAGE = 480

/** If the final page is shorter than this fraction of the target, fold it into the previous page. */
const MIN_LAST_PAGE_RATIO = 0.35

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

/**
 * Split a flat paragraph list into pages of roughly {@link WORDS_PER_STORY_PAGE} words.
 * Never breaks mid-paragraph; a single oversized paragraph gets its own page.
 */
export function paginateParagraphs(
  paragraphs: string[],
  targetWords = WORDS_PER_STORY_PAGE,
): string[][] {
  const usable = paragraphs.map((p) => p.trim()).filter(Boolean)
  if (usable.length === 0) return [[]]

  const pages: string[][] = []
  let current: string[] = []
  let currentWords = 0

  for (const paragraph of usable) {
    const words = wordCount(paragraph)
    if (current.length > 0 && currentWords + words > targetWords) {
      pages.push(current)
      current = []
      currentWords = 0
    }
    current.push(paragraph)
    currentWords += words
  }

  if (current.length > 0) pages.push(current)

  // Avoid a stub final page when a few leftover paragraphs would look sparse.
  if (pages.length >= 2) {
    const last = pages[pages.length - 1]
    const lastWords = last.reduce((sum, p) => sum + wordCount(p), 0)
    if (lastWords < targetWords * MIN_LAST_PAGE_RATIO) {
      pages[pages.length - 2] = [...pages[pages.length - 2], ...last]
      pages.pop()
    }
  }

  return pages
}

/** Flatten author-defined page groups into a single paragraph stream. */
export function flattenStoryParagraphs(pages: string[][]): string[] {
  return pages.flat().map((p) => p.trim()).filter(Boolean)
}
