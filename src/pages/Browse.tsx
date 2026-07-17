import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { StoryCard } from '../components/StoryCard'
import { TagChip } from '../components/TagChip'
import { getAuthorByHandle } from '../data/authors'
import { getAllTags, getTopTags, stories } from '../data/stories'
import { filterStories, shuffleStories } from '../lib/search'

const VISIBLE_TAG_LIMIT = 10
const MOBILE_PAGE_SIZE = 10
const DESKTOP_PAGE_SIZE = 20
const MOBILE_QUERY = '(max-width: 720px)'

function usePageSize() {
  const [pageSize, setPageSize] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
      ? MOBILE_PAGE_SIZE
      : DESKTOP_PAGE_SIZE,
  )

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    function sync() {
      setPageSize(media.matches ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE)
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return pageSize
}

export function Browse() {
  const [params, setParams] = useSearchParams()
  const allTags = useMemo(() => getAllTags(), [])
  const topTags = useMemo(() => getTopTags(VISIBLE_TAG_LIMIT), [])
  const [showAllTags, setShowAllTags] = useState(false)
  const resultsRef = useRef<HTMLElement>(null)
  const pageSize = usePageSize()

  const query = params.get('q') ?? ''
  const activeTags = params.getAll('tag')
  const rawPage = params.get('page')
  const parsedPage = rawPage == null ? 1 : Number.parseInt(rawPage, 10)
  const filterKey = `${query}\0${activeTags.join('\0')}`
  // Scroll once when landing with filters already in the URL (e.g. homepage mood chips).
  const pendingScrollRef = useRef(Boolean(query || activeTags.length > 0))
  // Keep unfiltered browse order stable across pages; reshuffle when filters clear.
  const shuffleSeedRef = useRef<number | null>(null)

  const [draftQuery, setDraftQuery] = useState(query)
  const isUnfiltered = query.trim() === '' && activeTags.length === 0

  const visibleTags = useMemo(() => {
    if (showAllTags) return allTags
    const extras = activeTags.filter((tag) => !topTags.includes(tag))
    return [...topTags, ...extras].sort((a, b) => a.localeCompare(b))
  }, [showAllTags, allTags, topTags, activeTags])

  useEffect(() => {
    setDraftQuery(query)
  }, [query])

  const results = useMemo(() => {
    const filtered = filterStories(stories, { query, tags: activeTags })
    if (!isUnfiltered) {
      shuffleSeedRef.current = null
      return filtered
    }
    if (shuffleSeedRef.current == null) {
      shuffleSeedRef.current = Math.floor(Math.random() * 0x7fffffff)
    }
    return shuffleStories(filtered, shuffleSeedRef.current)
  }, [query, activeTags, isUnfiltered])

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize))
  const page =
    Number.isFinite(parsedPage) && parsedPage > 0
      ? Math.min(parsedPage, totalPages)
      : 1
  const pageStart = (page - 1) * pageSize
  const pageStories = results.slice(pageStart, pageStart + pageSize)

  // Old author bookmarks landed on browse?q=handle — send them to the author page.
  const authorRedirect = useMemo(() => {
    if (activeTags.length > 0) return undefined
    const q = query.trim()
    if (!q) return undefined
    return getAuthorByHandle(q)
  }, [query, activeTags])

  useEffect(() => {
    if (!query && activeTags.length === 0) {
      pendingScrollRef.current = false
      return
    }
    if (!pendingScrollRef.current) return
    pendingScrollRef.current = false
    // Wait for the clear button to mount before measuring scroll position.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  }, [filterKey, query, activeTags])

  // Keep ?page= in range when filters or page size change.
  useEffect(() => {
    const desired = page <= 1 ? null : String(page)
    if (rawPage === desired) return
    const next = new URLSearchParams(params)
    if (desired == null) next.delete('page')
    else next.set('page', desired)
    setParams(next, { replace: true })
  }, [page, rawPage, params, setParams])

  if (authorRedirect) {
    return <Navigate to={`/author/${encodeURIComponent(authorRedirect.handle)}`} replace />
  }

  function updateParams(nextQuery: string, nextTags: string[], nextPage = 1) {
    const next = new URLSearchParams()
    if (nextQuery.trim()) next.set('q', nextQuery.trim())
    for (const tag of nextTags) next.append('tag', tag)
    if (nextPage > 1) next.set('page', String(nextPage))
    setParams(next, { replace: true })
  }

  function goToPage(nextPage: number) {
    const clamped = Math.min(Math.max(1, nextPage), totalPages)
    updateParams(query, activeTags, clamped)
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function toggleTag(tag: string) {
    const nextTags = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag]
    pendingScrollRef.current = nextTags.length > 0 || Boolean(query)
    updateParams(query, nextTags, 1)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const nextQuery = draftQuery.trim()
    // Exact author handle still redirects via authorRedirect once params update.
    if (activeTags.length === 0 && getAuthorByHandle(nextQuery)) {
      updateParams(nextQuery, activeTags, 1)
      return
    }
    pendingScrollRef.current = true
    updateParams(nextQuery, activeTags, 1)
    // Same query still needs an explicit scroll because filterKey may not change.
    if (nextQuery === query) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      })
    }
  }

  function clearFilters() {
    setDraftQuery('')
    setParams({}, { replace: true })
  }

  const rangeStart = results.length === 0 ? 0 : pageStart + 1
  const rangeEnd = Math.min(pageStart + pageSize, results.length)

  return (
    <div className="page browse">
      <header className="page-header page-header--compact">
        <h1 className="page-header__title">
          the <span className="text-accent">archive</span>
        </h1>
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
          <button type="button" className="btn btn--ghost btn--small" onClick={clearFilters}>
            clear tags
          </button>
        </div>
      )}

      <section ref={resultsRef} className="browse-results" aria-live="polite">
        <p className="results-count">
          {results.length === 0
            ? '0 stories'
            : `showing ${rangeStart}–${rangeEnd} of ${results.length} ${
                results.length === 1 ? 'story' : 'stories'
              }`}
          {query ? ` for “${query}”` : ''}
          {activeTags.length > 0 ? ` · tagged ${activeTags.join(', ')}` : ''}
        </p>

        {results.length === 0 ? (
          <div className="empty-state">
            <p>nothing matches — try a softer search, or clear the tags.</p>
          </div>
        ) : (
          <>
            <div className="story-grid">
              {pageStories.map((story, i) => (
                <StoryCard key={story.id} story={story} index={i} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="browse-pager" aria-label="search results pages">
                <button
                  type="button"
                  className="btn btn--ghost btn--small"
                  disabled={page <= 1}
                  onClick={() => goToPage(page - 1)}
                >
                  ← previous
                </button>
                <span className="browse-pager__status">
                  {page} of {totalPages}
                </span>
                <button
                  type="button"
                  className="btn btn--ghost btn--small"
                  disabled={page >= totalPages}
                  onClick={() => goToPage(page + 1)}
                >
                  next →
                </button>
              </nav>
            )}
          </>
        )}
      </section>
    </div>
  )
}
