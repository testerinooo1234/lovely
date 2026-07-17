import { Link } from 'react-router-dom'
import type { Story } from '../types'
import { formatDate, getReadingMinutes } from '../lib/search'
import { StoryTags } from './StoryTags'

type StoryCardProps = {
  story: Story
  index?: number
  showTags?: boolean
}

export function StoryCard({ story, index = 0, showTags = true }: StoryCardProps) {
  return (
    <article
      className="story-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="story-card__meta">
        <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{getReadingMinutes(story)} min</span>
      </div>

      <h2 className="story-card__title">
        <Link to={`/story/${story.slug}`}>{story.title}</Link>
      </h2>

      <p className="story-card__author">
        by{' '}
        <Link
          to={`/author/${encodeURIComponent(story.author)}`}
          className="author-link"
        >
          {story.author}
        </Link>
      </p>

      <p className="story-card__excerpt">{story.excerpt}</p>

      {showTags && <StoryTags tags={story.tags} className="story-card__tags" />}
    </article>
  )
}
