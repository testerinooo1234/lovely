import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HeartLogo } from './HeartLogo'

const links = [
  { to: '/', label: 'home' },
  { to: '/browse', label: 'stories' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
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
          <span className="sr-only">menu</span>
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
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/browse" className="site-nav__cta" onClick={() => setOpen(false)}>
            find a story
          </Link>
        </nav>
      </div>
    </header>
  )
}
