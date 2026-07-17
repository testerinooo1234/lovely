import { useState } from 'react'
import { TagChip } from './TagChip'

/** Tags shown before the expand control; full list still used for search/filter. */
export const MAX_VISIBLE_STORY_TAGS = 5

type StoryTagsProps = {
  tags: string[]
  className?: string
}

export function StoryTags({ tags, className = '' }: StoryTagsProps) {
  const [expanded, setExpanded] = useState(false)
  const hiddenCount = tags.length - MAX_VISIBLE_STORY_TAGS
  const visible = expanded || hiddenCount <= 0 ? tags : tags.slice(0, MAX_VISIBLE_STORY_TAGS)

  if (tags.length === 0) return null

  return (
    <div className={className}>
      {visible.map((tag) => (
        <TagChip key={tag} tag={tag} to={`/browse?tag=${encodeURIComponent(tag)}`} />
      ))}
      {hiddenCount > 0 && (
        <button
          type="button"
          className="tag-chip tag-chip--more"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? 'show less' : `+${hiddenCount} more`}
        </button>
      )}
    </div>
  )
}
