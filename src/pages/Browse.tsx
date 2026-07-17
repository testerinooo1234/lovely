import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { StoryCard } from '../components/StoryCard'
import { TagChip } from '../components/TagChip'
import { getAuthorByHandle } from '../data/authors'
import { getAllTags, getTopTags, stories } from '../data/stories'
import { filterStories } from '../lib/search'

const VISIBLE_TAG_LIMIT = 10

export function Browse() {
  const [params, setParams] = useSearchParams()
  const allTags = useMemo(() => getAllTags(), [])
  const topTags = useMemo(() => getTopTags(VISIBLE_TAG_LIMIT), [])
  const [showAllTags, setShowAllTags] = useState(false)
  const resultsRef = useRef<HTMLElement>(null)

  const query = params.get('q') ?? ''
  const activeTags = params.getAll('tag')
  const filterKey = `${query}\0${activeTags.join('\0')}`

  const [draftQuery, setDraftQuery] = useState(query)

  const visibleTags = useMemo(() => {
    if (showAllTags) return allTags
    const extras = activeTags.filter((tag) => !topTags.includes(tag))
    return [...topTags, ...extras]
  }, [showAllTags, allTags, topTags, activeTags])

  useEffect(() => {
    setDraftQuery(query)
  }, [query])

  useEffect(() => {
    if (!query && activeTags.length === 0) return
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [filterKey, query, activeTags])

  const results = useMemo(
    () => filterStories(stories, { query, tags: activeTags }),
    [query, activeTags],
  )

  // Old author bookmarks landed on browse?q=handle — send them to the author page.
  const authorRedirect = useMemo(() => {
    if (activeTags.length > 0) return undefined
    const q = query.trim()
    if (!q) return undefined
    return getAuthorByHandle(q)
  }, [query, activeTags])

  if (authorRedirect) {
    return <Navigate to={`/author/${encodeURIComponent(authorRedirect.handle)}`} replace />
  }

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
      </form>

      <div className="filter-row">
        {visibleTags.map((tag) => (
          <TagChip
            key={tag}
            tag={tag}
            active={activeTags.includes(tag)}
            onClick={() => toggleTag(tag)}
          />
        ))}
        {allTags.length > VISIBLE_TAG_LIMIT && (
          <button
            type="button"
            className="tag-chip tag-chip--more"
            onClick={() => setShowAllTags((v) => !v)}
            aria-expanded={showAllTags}
          >
            {showAllTags ? 'show less' : `+${allTags.length - VISIBLE_TAG_LIMIT} more`}
          </button>
        )}
      </div>

      {(query || activeTags.length > 0) && (
        <div className="filter-clear">
          <button type="button" className="btn btn--ghost" onClick={clearFilters}>
            clear tags
          </button>
        </div>
      )}

      <section ref={resultsRef} className="browse-results" aria-live="polite">
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
      </section>
    </div>
  )
}
