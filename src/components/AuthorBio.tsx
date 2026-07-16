import { Link } from 'react-router-dom'
import type { Author } from '../types'

type AuthorBioProps = {
  author: Author
  storyCount?: number
}

export function AuthorBio({ author, storyCount }: AuthorBioProps) {
  return (
    <aside className="author-bio" aria-label={`about ${author.handle}`}>
      <div className="author-bio__header">
        <p className="author-bio__kicker">author</p>
        <h2 className="author-bio__name">
          <Link
            to={`/browse?q=${encodeURIComponent(author.handle)}`}
            className="author-link"
          >
            {author.handle}
          </Link>
        </h2>
        {typeof storyCount === 'number' && (
          <p className="author-bio__count">
            {storyCount} {storyCount === 1 ? 'story' : 'stories'}
          </p>
        )}
      </div>
      <p className="author-bio__text">{author.bio}</p>
      {author.favoriteTags.length > 0 && (
        <p className="author-bio__tags">
          often writes:{' '}
          {author.favoriteTags.map((tag, i) => (
            <span key={tag}>
              {i > 0 && ', '}
              <Link to={`/browse?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
            </span>
          ))}
        </p>
      )}
    </aside>
  )
}
