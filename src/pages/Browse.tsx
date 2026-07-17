import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AuthorBio } from '../components/AuthorBio'
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

  const query = params.get('q') ?? ''
  const activeTags = params.getAll('tag')

  const [draftQuery, setDraftQuery] = useState(query)

  const visibleTags = useMemo(() => {
    if (showAllTags) return allTags
    const extras = activeTags.filter((tag) => !topTags.includes(tag))
    return [...topTags, ...extras]
  }, [showAllTags, allTags, topTags, activeTags])

  useEffect(() => {
    setDraftQuery(query)
  }, [query])

  const results = useMemo(
    () => filterStories(stories, { query, tags: activeTags }),
    [query, activeTags],
  )

  const matchedAuthor = useMemo(() => {
    const q = query.trim()
    if (!q) return undefined
    const author = getAuthorByHandle(q)
    if (!author) return undefined
    const allByAuthor = stories.filter((s) => s.author === author.handle)
    if (allByAuthor.length === 0) return undefined
    const showingAll =
      activeTags.length === 0 &&
      results.length === allByAuthor.length &&
      results.every((s) => s.author === author.handle)
    return showingAll ? author : undefined
  }, [query, activeTags, results])

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

      <p className="results-count">
        {results.length} {results.length === 1 ? 'story' : 'stories'}
        {query ? ` for “${query}”` : ''}
        {activeTags.length > 0 ? ` · tagged ${activeTags.join(', ')}` : ''}
      </p>

      {matchedAuthor && (
        <AuthorBio
          author={matchedAuthor}
          storyCount={stories.filter((s) => s.author === matchedAuthor.handle).length}
        />
      )}

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
