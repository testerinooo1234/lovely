import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthorBio } from '../components/AuthorBio'
import { StoryCard } from '../components/StoryCard'
import { getAuthorByHandle } from '../data/authors'
import { stories } from '../data/stories'

export function AuthorPage() {
  const { handle } = useParams()
  const author = handle ? getAuthorByHandle(handle) : undefined
  const canonical = author?.handle ?? handle?.trim() ?? ''

  const authorStories = useMemo(() => {
    if (!canonical) return []
    const key = canonical.toLowerCase()
    return stories.filter((s) => s.author.toLowerCase() === key)
  }, [canonical])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [handle])

  if (!canonical || (!author && authorStories.length === 0)) {
    return (
      <div className="page">
        <div className="empty-state">
          <h1>author not found</h1>
          <p>that name isn’t in the archive.</p>
          <Link to="/browse" className="btn btn--primary">
            back to stories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page author-page">
      {author ? (
        <AuthorBio author={author} storyCount={authorStories.length} linkName={false} />
      ) : (
        <header className="page-header">
          <p className="page-header__eyebrow">author</p>
          <h1 className="page-header__title">{canonical}</h1>
          <p className="page-header__lede">
            {authorStories.length}{' '}
            {authorStories.length === 1 ? 'story' : 'stories'} in the archive
          </p>
        </header>
      )}

      {authorStories.length === 0 ? (
        <div className="empty-state">
          <p>no stories here yet.</p>
          <Link to="/browse" className="btn btn--ghost">
            browse the archive
          </Link>
        </div>
      ) : (
        <div className="story-grid">
          {authorStories.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
