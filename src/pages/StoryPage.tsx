import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TagChip } from '../components/TagChip'
import { getStoryBySlug, stories } from '../data/stories'
import { formatDate, getReadingMinutes } from '../lib/search'
import { StoryCard } from '../components/StoryCard'

export function StoryPage() {
  const { slug } = useParams()
  const story = slug ? getStoryBySlug(slug) : undefined
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    setPageIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pageIndex])

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

  const totalPages = story.pages.length
  const currentPage = story.pages[pageIndex] ?? []
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
            {totalPages > 1 && (
              <>
                <span aria-hidden="true"> · </span>
                <span>
                  page {pageIndex + 1} of {totalPages}
                </span>
              </>
            )}
          </p>
          <h1 className="story-reader__title">{story.title}</h1>
          <p className="story-reader__author">
            by{' '}
            <Link
              to={`/browse?q=${encodeURIComponent(story.author)}`}
              className="author-link"
            >
              {story.author}
            </Link>
          </p>
          <div className="story-reader__tags">
            {story.tags.map((tag) => (
              <TagChip key={tag} tag={tag} to={`/browse?tag=${encodeURIComponent(tag)}`} />
            ))}
          </div>
        </header>

        <div className="story-reader__body">
          {currentPage.map((paragraph, i) => (
            <p key={`${pageIndex}-${i}`}>{paragraph}</p>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="story-pager" aria-label="story pages">
            <button
              type="button"
              className="btn btn--ghost"
              disabled={pageIndex === 0}
              onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            >
              ← previous
            </button>
            <span className="story-pager__status">
              {pageIndex + 1} / {totalPages}
            </span>
            <button
              type="button"
              className="btn btn--ghost"
              disabled={pageIndex >= totalPages - 1}
              onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
            >
              next →
            </button>
          </nav>
        )}

        <footer className="story-reader__footer">
          <Link to="/browse" className="btn btn--ghost">
            ← more stories
          </Link>
          <Link
            to={`/browse?q=${encodeURIComponent(story.author)}`}
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
