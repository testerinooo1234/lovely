import type { Story, StoryChapter } from '../types'
import { flattenStoryParagraphs } from './storyPages'

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
 * Single-chapter stories return one entry (name may be empty — UI hides the dropdown).
 */
export function getStoryChapters(
  story: Pick<Story, 'pages' | 'firstChapterName' | 'chapters'>,
): StoryChapter[] {
  if (!story.chapters?.length) {
    return [{ name: story.firstChapterName ?? '', pages: story.pages }]
  }
  return [
    { name: story.firstChapterName ?? 'Chapter 1', pages: story.pages },
    ...story.chapters,
  ]
}

/** Flatten every chapter into one paragraph stream (search / total read time). */
export function flattenAllChapterParagraphs(
  story: Pick<Story, 'pages' | 'firstChapterName' | 'chapters'>,
): string[] {
  return getStoryChapters(story).flatMap((chapter) =>
    flattenStoryParagraphs(chapter.pages),
  )
}
