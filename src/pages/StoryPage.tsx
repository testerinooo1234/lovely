import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Pager } from '../components/Pager'
import { StoryCard } from '../components/StoryCard'
import { StoryTags } from '../components/StoryTags'
import { getStoryBySlug, stories } from '../data/stories'
import {
  getChapterReadingMinutes,
  getStoryChapters,
  isMultiChapter,
} from '../lib/chapters'
import { formatDate, getReadingMinutes } from '../lib/search'
import { flattenStoryParagraphs, paginateParagraphs } from '../lib/storyPages'

/** Parse 1-based positive ints from the URL; invalid → fallback. */
function parsePositiveInt(value: string | null, fallback: number): number {
  if (value == null || value === '') return fallback
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) && n >= 1 ? n : fallback
}

/**
 * Build story location search params.
 * - chapter omitted when single-chapter, or multi-chapter chapter 1 on page 1
 * - page omitted when page 1 (unless multi-chapter and chapter > 1, still omit page=1)
 */
function storySearchParams(
  multiChapter: boolean,
  chapterOneBased: number,
  pageOneBased: number,
): URLSearchParams {
  const next = new URLSearchParams()
  if (multiChapter && chapterOneBased > 1) {
    next.set('chapter', String(chapterOneBased))
  }
  if (pageOneBased > 1) {
    next.set('page', String(pageOneBased))
  }
  return next
}

function paramsMatchLocation(
  params: URLSearchParams,
  multiChapter: boolean,
  chapterOneBased: number,
  pageOneBased: number,
): boolean {
  const expected = storySearchParams(multiChapter, chapterOneBased, pageOneBased)
  return (
    params.get('chapter') === expected.get('chapter') &&
    params.get('page') === expected.get('page')
  )
}

export function StoryPage() {
  const { slug } = useParams()
  const [params, setParams] = useSearchParams()
  const story = slug ? getStoryBySlug(slug) : undefined
  const pageStartRef = useRef<HTMLDivElement>(null)
  const scrollToPageStart = useRef(false)
  // undefined until first story entry so mount-from-browse still scrolls to top
  const lastSlugRef = useRef<string | undefined>(undefined)
  const prevLocRef = useRef<string | null>(null)

  const chapters = useMemo(
    () => (story ? getStoryChapters(story) : []),
    [story],
  )
  const multiChapter = story ? isMultiChapter(story) : false

  const requestedChapter = parsePositiveInt(params.get('chapter'), 1)
  const requestedPage = parsePositiveInt(params.get('page'), 1)

  const safeChapterIndex =
    chapters.length === 0
      ? 0
      : Math.min(Math.max(requestedChapter, 1), chapters.length) - 1
  const currentChapter = chapters[safeChapterIndex]
  const pages = useMemo(
    () =>
      currentChapter
        ? paginateParagraphs(flattenStoryParagraphs(currentChapter.pages))
        : [[]],
    [currentChapter],
  )
  const totalPages = Math.max(1, pages.length)
  const safePageIndex = Math.min(Math.max(requestedPage, 1), totalPages) - 1
  const urlChapter = safeChapterIndex + 1
  const urlPage = safePageIndex + 1

  // Land at the top whenever a story is opened or the slug changes.
  // (Must not init lastSlugRef to `slug` — then first mount never counts as a change,
  // and the browse scroll position sticks.)
  useLayoutEffect(() => {
    if (!story || !slug) return
    if (slug === lastSlugRef.current) return

    const previousSlug = lastSlugRef.current
    lastSlugRef.current = slug
    scrollToPageStart.current = false
    prevLocRef.current = null
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // Reset chapter/page only when switching stories in-session — not on first
    // open, so deep links like ?chapter=2&page=3 still work.
    if (
      previousSlug != null &&
      (params.get('chapter') != null || params.get('page') != null)
    ) {
      setParams(new URLSearchParams(), { replace: true })
    }
  }, [story, slug, params, setParams])

  // Keep URL canonical (clamp out-of-range / strip defaults) without stacking history.
  useEffect(() => {
    if (!story) return
    if (slug !== lastSlugRef.current) return

    if (!paramsMatchLocation(params, multiChapter, urlChapter, urlPage)) {
      setParams(storySearchParams(multiChapter, urlChapter, urlPage), {
        replace: true,
      })
    }
  }, [
    story,
    slug,
    params,
    multiChapter,
    urlChapter,
    urlPage,
    setParams,
  ])

  // Explicit pager clicks set scrollToPageStart; back/forward restores a sensible
  // scroll target (page body for page changes, window top for chapter changes).
  useLayoutEffect(() => {
    if (!story) return
    const key = `${slug}:${safeChapterIndex}:${safePageIndex}`
    const prev = prevLocRef.current
    prevLocRef.current = key
    if (prev == null) return
    if (!prev.startsWith(`${slug}:`)) return

    if (scrollToPageStart.current) {
      scrollToPageStart.current = false
      pageStartRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' })
      return
    }

    if (prev === key) return

    const prevChapter = prev.slice((slug?.length ?? 0) + 1).split(':')[0]
    if (prevChapter === String(safeChapterIndex)) {
      pageStartRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [story, slug, safeChapterIndex, safePageIndex])

  function goToPage(nextZeroBased: number) {
    scrollToPageStart.current = true
    setParams(storySearchParams(multiChapter, urlChapter, nextZeroBased + 1))
  }

  function goToChapter(nextZeroBased: number) {
    scrollToPageStart.current = false
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setParams(storySearchParams(multiChapter, nextZeroBased + 1, 1))
  }

  if (!story || !currentChapter) {
    return (
      <div className="page">
        <div className="empty-state">
          <h1>story not found</h1>
          <p>that page has slipped into the dark.</p>
          <Link to="/browse" className="btn btn--primary">
            back to stories
          </Link>
        </div>
      </div>
    )
  }

  const currentPage = pages[safePageIndex] ?? []
  const related = stories
    .filter(
      (s) =>
        s.id !== story.id &&
        (s.author === story.author || s.tags.some((t) => story.tags.includes(t))),
    )
    .slice(0, 3)

  return (
    <div className="page story-page">
      <article className="story-reader">
        <header className="story-reader__header">
          <p className="story-reader__kicker">
            <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
            <span aria-hidden="true"> · </span>
            <span>{getReadingMinutes(story)} min read</span>
            {multiChapter && (
              <>
                <span aria-hidden="true"> · </span>
                <span>
                  {chapters.length}{' '}
                  {chapters.length === 1 ? 'chapter' : 'chapters'}
                </span>
              </>
            )}
          </p>
          <h1 className="story-reader__title">{story.title}</h1>
          <p className="story-reader__author">
            by{' '}
            <Link
              to={`/author/${encodeURIComponent(story.author)}`}
              className="author-link"
            >
              {story.author}
            </Link>
          </p>
          <StoryTags tags={story.tags} className="story-reader__tags" />
          {!multiChapter && story.excerpt.trim() && (
            <p className="story-reader__summary">{story.excerpt.trim()}</p>
          )}
          {multiChapter && (
            <div className="story-chapter-select">
              <label>
                <span className="sr-only">Chapter</span>
                <select
                  className="story-chapter-select__control"
                  value={safeChapterIndex}
                  aria-label={`Chapter ${safeChapterIndex + 1} of ${chapters.length}`}
                  onChange={(event) => goToChapter(Number(event.target.value))}
                >
                  {chapters.map((chapter, i) => (
                    <option key={`${i}-${chapter.name}`} value={i}>
                      {i + 1}. {chapter.name}
                    </option>
                  ))}
                </select>
              </label>
              <p className="story-chapter-select__meta">
                <span className="story-chapter-select__minutes">
                  {getChapterReadingMinutes(currentChapter)} min
                </span>
                {currentChapter.summary.trim() && (
                  <span className="story-chapter-select__summary">
                    {currentChapter.summary.trim()}
                  </span>
                )}
              </p>
            </div>
          )}
        </header>

        <div ref={pageStartRef} className="story-reader__page">
          {totalPages > 1 && (
            <Pager
              className="pager--top"
              pageIndex={safePageIndex}
              totalPages={totalPages}
              onGoToPage={goToPage}
              label="story pages (top)"
            />
          )}
          <div className="story-reader__body">
            {currentPage.map((paragraph, i) => (
              <p key={`${safeChapterIndex}-${safePageIndex}-${i}`}>{paragraph}</p>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <Pager
            pageIndex={safePageIndex}
            totalPages={totalPages}
            onGoToPage={goToPage}
            label="story pages (bottom)"
          />
        )}

        <footer className="story-reader__footer">
          <Link to="/browse" className="btn btn--ghost">
            ← more stories
          </Link>
          <Link
            to={`/author/${encodeURIComponent(story.author)}`}
            className="btn btn--primary"
          >
            more by {story.author}
          </Link>
        </footer>
      </article>

      {related.length > 0 && (
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">
              you may also <span className="text-accent">want</span>
            </h2>
          </div>
          <div className="story-grid">
            {related.map((s, i) => (
              <StoryCard key={s.id} story={s} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
