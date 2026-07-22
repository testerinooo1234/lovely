import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  applyStoryFontSize,
  DEFAULT_STORY_FONT_SIZE,
  isStoryFontSizeId,
  readStoryFontSizeCookie,
  STORY_FONT_SIZES,
  type StoryFontSizeId,
  writeStoryFontSizeCookie,
} from '../lib/storyFontSize'
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

function SettingsCogIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.74 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.43.34.68.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.25.42.5.42h3.84c.25 0 .45-.18.5-.42l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.25.12.54.02.68-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z" />
    </svg>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [storyFontSize, setStoryFontSize] = useState<StoryFontSizeId>(
    DEFAULT_STORY_FONT_SIZE,
  )
  const navigate = useNavigate()
  const settingsId = useId()
  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = readStoryFontSizeCookie()
    setStoryFontSize(saved)
    applyStoryFontSize(saved)
  }, [])

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

  useEffect(() => {
    if (!settingsOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setSettingsOpen(false)
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      if (!settingsRef.current?.contains(target)) {
        setSettingsOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [settingsOpen])

  function closeMenus() {
    setOpen(false)
    setSettingsOpen(false)
  }

  function goBrowseTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    closeMenus()
    navigate('/browse')
    // Beat any same-route scroll restoration so we land on the browse header, not results.
    scrollPageTop()
    requestAnimationFrame(scrollPageTop)
  }

  function onStoryFontChange(value: string) {
    if (!isStoryFontSizeId(value)) return
    setStoryFontSize(value)
    writeStoryFontSizeCookie(value)
    applyStoryFontSize(value)
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
                  closeMenus()
                  hardGoHome()
                  return
                }
                if (link.to === '/browse') {
                  goBrowseTop(event)
                  return
                }
                closeMenus()
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
            onClick={closeMenus}
          >
            github
          </a>

          <div className="site-nav__settings" ref={settingsRef}>
            <button
              type="button"
              className="site-nav__settings-toggle"
              aria-expanded={settingsOpen}
              aria-controls={settingsId}
              onClick={() => setSettingsOpen((v) => !v)}
            >
              <span className="sr-only">
                {settingsOpen ? 'Close settings' : 'Open settings'}
              </span>
              <SettingsCogIcon />
            </button>

            <div
              id={settingsId}
              className={`site-nav__settings-panel${
                settingsOpen ? ' site-nav__settings-panel--open' : ''
              }`}
            >
              <p className="site-nav__settings-label">Settings</p>
              <label className="site-nav__setting">
                <span className="site-nav__setting-name">Story text size</span>
                <select
                  className="site-nav__setting-select"
                  value={storyFontSize}
                  aria-label="Story text size"
                  onChange={(event) => onStoryFontChange(event.target.value)}
                >
                  {STORY_FONT_SIZES.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
