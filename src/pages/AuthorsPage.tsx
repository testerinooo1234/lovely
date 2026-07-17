import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TagChip } from '../components/TagChip'
import { getAuthorSummaries } from '../lib/authorStats'

export function AuthorsPage() {
  const summaries = useMemo(() => getAuthorSummaries(), [])

  return (
    <div className="page authors-page">
      <header className="page-header page-header--compact">
        <h1 className="page-header__title">
          the <span className="text-accent">authors</span>
        </h1>
      </header>

      <div className="author-list">
        {summaries.map((author, index) => (
          <article
            key={author.handle}
            className="author-list__item"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <div className="author-list__header">
              <h2 className="author-list__name">
                <Link
                  to={`/author/${encodeURIComponent(author.handle)}`}
                  className="author-link"
                >
                  {author.handle}
                </Link>
              </h2>
              <p className="author-list__count">
                {author.storyCount}{' '}
                {author.storyCount === 1 ? 'story' : 'stories'}
              </p>
            </div>
            {author.topTags.length > 0 && (
              <div className="author-list__tags">
                {author.topTags.map((tag) => (
                  <TagChip
                    key={tag}
                    tag={tag}
                    to={`/browse?tag=${encodeURIComponent(tag)}`}
                  />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
