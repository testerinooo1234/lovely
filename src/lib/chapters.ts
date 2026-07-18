import type { Story, StoryChapter } from '../types'
import { flattenStoryParagraphs } from './storyPages'

const WORDS_PER_MINUTE = 230

/** True when the story has named chapters beyond the opening body. */
export function isMultiChapter(story: Pick<Story, 'chapters'>): boolean {
  return Boolean(story.chapters?.length)
}

/** Total chapter count (always ≥ 1). */
export function getChapterCount(story: Pick<Story, 'chapters'>): number {
  return 1 + (story.chapters?.length ?? 0)
}

/**
 * Resolve the full ordered chapter list.
 * Single-chapter stories return one entry (name/summary may be empty — UI hides the dropdown).
 */
export function getStoryChapters(
  story: Pick<
    Story,
    'pages' | 'firstChapterName' | 'firstChapterSummary' | 'chapters'
  >,
): StoryChapter[] {
  if (!story.chapters?.length) {
    return [
      {
        name: story.firstChapterName ?? '',
        summary: story.firstChapterSummary ?? '',
        pages: story.pages,
      },
    ]
  }
  return [
    {
      name: story.firstChapterName ?? 'Chapter 1',
      summary: story.firstChapterSummary ?? '',
      pages: story.pages,
    },
    ...story.chapters,
  ]
}

/** Flatten every chapter into one paragraph stream (search / total read time). */
export function flattenAllChapterParagraphs(
  story: Pick<
    Story,
    'pages' | 'firstChapterName' | 'firstChapterSummary' | 'chapters'
  >,
): string[] {
  return getStoryChapters(story).flatMap((chapter) =>
    flattenStoryParagraphs(chapter.pages),
  )
}

/** Reading minutes for a single chapter body. */
export function getChapterReadingMinutes(
  chapter: Pick<StoryChapter, 'pages'>,
): number {
  const words = flattenStoryParagraphs(chapter.pages)
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
