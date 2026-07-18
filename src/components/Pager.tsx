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
        className="btn btn--ghost pager__btn"
        disabled={pageIndex === 0}
        aria-label="Previous page"
        onClick={() => onGoToPage(Math.max(0, pageIndex - 1))}
      >
        <span aria-hidden="true">← </span>
        <span className="pager__btn-label pager__btn-label--full" aria-hidden="true">
          previous
        </span>
        <span className="pager__btn-label pager__btn-label--short" aria-hidden="true">
          prev
        </span>
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
        className="btn btn--ghost pager__btn"
        disabled={pageIndex >= totalPages - 1}
        aria-label="Next page"
        onClick={() => onGoToPage(Math.min(totalPages - 1, pageIndex + 1))}
      >
        <span aria-hidden="true">next →</span>
      </button>
    </nav>
  )
}
