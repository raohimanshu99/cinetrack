import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import './Navbar.css';

class NavBrand extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false };
  }

  render() {
    return (
      <Link
        to="/"
        className="nav-brand"
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <span className="nav-brand-icon">◈</span>
        <span className={`nav-brand-text ${this.state.hovered ? 'hovered' : ''}`}>
          CineTrack
        </span>
      </Link>
    );
  }
}

function Navbar() {
  const location = useLocation();
  const { watchlist } = useWatchlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Browse' },
    { to: '/watchlist', label: 'My Watchlist' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <div className="navbar-inner">
        <NavBrand />

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation-links"
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
        </button>

        <ul id="primary-navigation-links" className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
                aria-current={location.pathname === to ? 'page' : undefined}
              >
                {label}
                {to === '/watchlist' && watchlist.length > 0 && (
                  <span className="nav-badge">{watchlist.length}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
