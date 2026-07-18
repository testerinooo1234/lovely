import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Pager } from '../components/Pager'
import { StoryCard } from '../components/StoryCard'
import { StoryTags } from '../components/StoryTags'
import { getStoryBySlug, stories } from '../data/stories'
import { getStoryChapters, isMultiChapter } from '../lib/chapters'
import { formatDate, getReadingMinutes } from '../lib/search'
import { flattenStoryParagraphs, paginateParagraphs } from '../lib/storyPages'

export function StoryPage() {
  const { slug } = useParams()
  const story = slug ? getStoryBySlug(slug) : undefined
  const [chapterIndex, setChapterIndex] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const pageStartRef = useRef<HTMLDivElement>(null)
  const scrollToPageStart = useRef(false)

  useEffect(() => {
    setChapterIndex(0)
    setPageIndex(0)
    scrollToPageStart.current = false
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  useLayoutEffect(() => {
    if (!scrollToPageStart.current) return
    scrollToPageStart.current = false
    pageStartRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [pageIndex])

  function goToPage(next: number) {
    scrollToPageStart.current = true
    setPageIndex(next)
  }

  function goToChapter(next: number) {
    scrollToPageStart.current = false
    setChapterIndex(next)
    setPageIndex(0)
  }

  if (!story) {
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

  const chapters = getStoryChapters(story)
  const multiChapter = isMultiChapter(story)
  const safeChapterIndex = Math.min(chapterIndex, chapters.length - 1)
  const currentChapter = chapters[safeChapterIndex] ?? chapters[0]
  const pages = paginateParagraphs(flattenStoryParagraphs(currentChapter.pages))
  const totalPages = Math.max(1, pages.length)
  const safePageIndex = Math.min(pageIndex, totalPages - 1)
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
          {multiChapter && (
            <label className="story-chapter-select">
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
