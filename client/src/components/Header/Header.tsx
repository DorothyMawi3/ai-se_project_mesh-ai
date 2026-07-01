import { NavLink } from 'react-router-dom';
import './Header.css';

type Props = {
  onMenuOpen: () => void;
  onMenuClose: () => void;
  isMobileMenuOpen: boolean;
};

export default function Header({
  onMenuOpen,
  onMenuClose,
  isMobileMenuOpen,
}: Props) {
  return (
    <header className={isMobileMenuOpen ? 'header header_mobile' : 'header'}>
      <button
        type="button"
        className="header__menu-btn"
        aria-label="Open menu"
        onClick={onMenuOpen}
      />

      <div className="header__logo">MeshAI</div>

      <nav
        className={
          isMobileMenuOpen ? 'header__nav header__nav_mobile' : 'header__nav'
        }
      >
        <NavLink to="/" onClick={onMenuClose}>
          Intro
        </NavLink>
        <NavLink to="/chat" onClick={onMenuClose}>
          Chat
        </NavLink>
        <NavLink to="/knowledge" onClick={onMenuClose}>
          Knowledge
        </NavLink>
      </nav>
    </header>
  );
}
