import { Link } from 'react-router-dom'

type TagChipProps = {
  tag: string
  active?: boolean
  onClick?: () => void
  to?: string
}

export function TagChip({ tag, active, onClick, to }: TagChipProps) {
  const className = `tag-chip${active ? ' tag-chip--active' : ''}`

  if (to) {
    return (
      <Link to={to} className={className}>
        {tag}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} aria-pressed={active}>
        {tag}
      </button>
    )
  }

  return <span className={className}>{tag}</span>
}
