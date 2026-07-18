/** Shared prev / page-select / next controls (0-based pageIndex). */
export function Pager({
  pageIndex,
  totalPages,
  onGoToPage,
  label,
  className = '',
}: {
  pageIndex: number
  totalPages: number
  onGoToPage: (page: number) => void
  label: string
  className?: string
}) {
  return (
    <nav className={`pager ${className}`.trim()} aria-label={label}>
      <button
        type="button"
        className="btn btn--ghost"
        disabled={pageIndex === 0}
        onClick={() => onGoToPage(Math.max(0, pageIndex - 1))}
      >
        ← previous
      </button>
      <label className="pager__jump">
        <span className="sr-only">Go to page</span>
        <select
          className="pager__select"
          value={pageIndex}
          aria-label={`Page ${pageIndex + 1} of ${totalPages}`}
          onChange={(event) => onGoToPage(Number(event.target.value))}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i} value={i}>
              {i + 1} / {totalPages}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="btn btn--ghost"
        disabled={pageIndex >= totalPages - 1}
        onClick={() => onGoToPage(Math.min(totalPages - 1, pageIndex + 1))}
      >
        next →
      </button>
    </nav>
  )
}
