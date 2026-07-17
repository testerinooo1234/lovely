import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StoryCard } from '../components/StoryCard'
import { StoryTags } from '../components/StoryTags'
import { getStoryBySlug, stories } from '../data/stories'
import { formatDate, getReadingMinutes } from '../lib/search'
import { flattenStoryParagraphs, paginateParagraphs } from '../lib/storyPages'

function StoryPager({
  pageIndex,
  totalPages,
  onGoToPage,
  label,
}: {
  pageIndex: number
  totalPages: number
  onGoToPage: (page: number) => void
  label: string
}) {
  return (
    <nav className="story-pager" aria-label={label}>
      <button
        type="button"
        className="btn btn--ghost"
        disabled={pageIndex === 0}
        onClick={() => onGoToPage(Math.max(0, pageIndex - 1))}
      >
        ← previous
      </button>
      <label className="story-pager__jump">
        <span className="sr-only">Go to page</span>
        <select
          className="story-pager__select"
          value={pageIndex}
          aria-label={`Page ${pageIndex + 1} of ${totalPages}`}
          onChange={(event) => onGoToPage(Number(event.target.value))}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i} value={i}>
              {i + 1} / {totalPages}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="btn btn--ghost"
        disabled={pageIndex >= totalPages - 1}
        onClick={() => onGoToPage(Math.min(totalPages - 1, pageIndex + 1))}
      >
        next →
      </button>
    </nav>
  )
}

export function StoryPage() {
  const { slug } = useParams()
  const story = slug ? getStoryBySlug(slug) : undefined
  const [pageIndex, setPageIndex] = useState(0)
  const pageStartRef = useRef<HTMLDivElement>(null)
  const scrollToPageStart = useRef(false)

  useEffect(() => {
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

  const pages = paginateParagraphs(flattenStoryParagraphs(story.pages))
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
        </header>

        <div ref={pageStartRef} className="story-reader__page">
          {totalPages > 1 && (
            <StoryPager
              pageIndex={safePageIndex}
              totalPages={totalPages}
              onGoToPage={goToPage}
              label="story pages (top)"
            />
          )}
          <div className="story-reader__body">
            {currentPage.map((paragraph, i) => (
              <p key={`${safePageIndex}-${i}`}>{paragraph}</p>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <StoryPager
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
