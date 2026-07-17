import { useEffect, useState, type MouseEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { HeartLogo } from './HeartLogo'

const GITHUB_URL = 'https://github.com/testerinooo1234/lovely'
const HOME_HREF = import.meta.env.BASE_URL || '/'

const links = [
  { to: '/', label: 'home' },
  { to: '/browse', label: 'stories' },
  { to: '/authors', label: 'authors' },
]

function isOnHome() {
  const base = HOME_HREF.replace(/\/$/, '')
  const path = window.location.pathname.replace(/\/$/, '')
  return path === base || path === ''
}

function hardGoHome() {
  if (isOnHome()) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    window.location.reload()
    return
  }
  window.location.assign(HOME_HREF)
}

function scrollPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

export function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  function goBrowseTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    setOpen(false)
    navigate('/browse')
    // Beat any same-route scroll restoration so we land on the browse header, not results.
    scrollPageTop()
    requestAnimationFrame(scrollPageTop)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/browse" className="brand" onClick={goBrowseTop}>
          <HeartLogo size={22} className="brand__heart" />
          <span className="brand__name">lovely</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'close menu' : 'open menu'}</span>
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>

        <nav id="site-nav" className={`site-nav${open ? ' site-nav--open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `site-nav__link${isActive ? ' site-nav__link--active' : ''}`
              }
              onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                if (link.to === '/') {
                  event.preventDefault()
                  setOpen(false)
                  hardGoHome()
                  return
                }
                if (link.to === '/browse') {
                  goBrowseTop(event)
                  return
                }
                setOpen(false)
              }}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={GITHUB_URL}
            className="site-nav__link site-nav__link--external"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            github
          </a>
          <Link to="/browse" className="site-nav__cta" onClick={goBrowseTop}>
            find a story
          </Link>
        </nav>
      </div>
    </header>
  )
}
