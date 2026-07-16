import { Link } from 'react-router-dom'
import { HeartLogo } from './HeartLogo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <HeartLogo size={18} className="brand__heart" />
          <span>lovely</span>
        </div>
        <p className="site-footer__note">
          written desire for adults. fictional. consensual within the page.
        </p>
        <div className="site-footer__links">
          <Link to="/browse">stories</Link>
        </div>
      </div>
    </footer>
  )
}
