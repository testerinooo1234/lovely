import { Link } from 'react-router-dom'
import type { Story } from '../types'
import { formatDate, getReadingMinutes } from '../lib/search'
import { TagChip } from './TagChip'

/** How many tags to show on cards and story headers (all tags still used for search/filter). */
export const MAX_VISIBLE_STORY_TAGS = 5

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

      {showTags && (
        <div className="story-card__tags">
          {story.tags.slice(0, MAX_VISIBLE_STORY_TAGS).map((tag) => (
            <TagChip key={tag} tag={tag} to={`/browse?tag=${encodeURIComponent(tag)}`} />
          ))}
        </div>
      )}
    </article>
  )
}
