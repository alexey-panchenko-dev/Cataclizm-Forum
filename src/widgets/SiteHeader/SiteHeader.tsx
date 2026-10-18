import { Menu, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppStore } from '@/app/store/useAppStore';
import { navigationItems } from '@/shared/config/navigation';
import './SiteHeader.css';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profile = useAppStore((state) => state.profile);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <Link className="logo" to="/" aria-label="После катастрофы, главная">
        <span className="logo-mark">ПК</span>
        <span>После катастрофы</span>
      </Link>

      <nav
        className={isMenuOpen ? 'main-nav main-nav--open' : 'main-nav'}
        aria-label="Основная навигация"
      >
        {navigationItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={closeMenu}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <NavLink className="profile-link" to="/profile">
          <UserRound size={17} />
          {profile?.nickname ?? 'Профиль'}
        </NavLink>
        <button
          className="menu-button"
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
