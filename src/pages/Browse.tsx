import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { StoryCard } from '../components/StoryCard'
import { TagChip } from '../components/TagChip'
import { getAllTags, stories } from '../data/stories'
import { filterStories } from '../lib/search'

export function Browse() {
  const [params, setParams] = useSearchParams()
  const allTags = useMemo(() => getAllTags(), [])

  const query = params.get('q') ?? ''
  const activeTags = params.getAll('tag')

  const [draftQuery, setDraftQuery] = useState(query)

  useEffect(() => {
    setDraftQuery(query)
  }, [query])

  const results = useMemo(
    () => filterStories(stories, { query, tags: activeTags }),
    [query, activeTags],
  )

  function updateParams(nextQuery: string, nextTags: string[]) {
    const next = new URLSearchParams()
    if (nextQuery.trim()) next.set('q', nextQuery.trim())
    for (const tag of nextTags) next.append('tag', tag)
    setParams(next, { replace: true })
  }

  function toggleTag(tag: string) {
    const nextTags = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag]
    updateParams(query, nextTags)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    updateParams(draftQuery, activeTags)
  }

  function clearFilters() {
    setDraftQuery('')
    setParams({}, { replace: true })
  }

  return (
    <div className="page browse">
      <header className="page-header">
        <h1 className="page-header__title">
          the <span className="text-accent">archive</span>
        </h1>
        <p className="page-header__lede">
          search by title, author, or skim the tags until something catches.
        </p>
      </header>

      <form className="search-panel" onSubmit={onSubmit}>
        <label className="search-panel__field">
          <span className="sr-only">search stories</span>
          <input
            type="search"
            value={draftQuery}
            onChange={(e) => setDraftQuery(e.target.value)}
            placeholder="title, author, keyword…"
            className="search-input"
          />
        </label>
        <button type="submit" className="btn btn--primary">
          search
        </button>
        {(query || activeTags.length > 0) && (
          <button type="button" className="btn btn--ghost" onClick={clearFilters}>
            clear
          </button>
        )}
      </form>

      <div className="filter-row">
        {allTags.map((tag) => (
          <TagChip
            key={tag}
            tag={tag}
            active={activeTags.includes(tag)}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </div>

      <p className="results-count">
        {results.length} {results.length === 1 ? 'story' : 'stories'}
        {query ? ` for “${query}”` : ''}
        {activeTags.length > 0 ? ` · tagged ${activeTags.join(', ')}` : ''}
      </p>

      {results.length === 0 ? (
        <div className="empty-state">
          <p>nothing matches — try a softer search, or clear the tags.</p>
        </div>
      ) : (
        <div className="story-grid">
          {results.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
