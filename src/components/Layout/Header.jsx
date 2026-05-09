import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../context/PostContext';
import styles from './Header.module.css';
import Button from '../shared/Button';

const Header = () => {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = usePosts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <span>N</span>
          </div>
          <span className={styles.logoText}>Nexus</span>
        </Link>

        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search posts, projects..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => navigate('/posts')}
          />
        </div>

        <nav className={styles.nav}>
          <Link to="/posts" className={styles.navLink}>Feed</Link>
          <Link to="/network" className={styles.navLink}>Network</Link>
          <Link to="/careers" className={styles.navLink}>Careers</Link>
        </nav>

        <div className={styles.actions}>
          {user ? (
            <>
              <button className={styles.iconBtn}>
                <Bell size={20} />
              </button>
              <Button onClick={() => logout()} variant="secondary" size="sm" style={{ marginLeft: '1rem' }}>Logout</Button>
              <Link to={`/profile/${user._id}`} className={styles.avatar}>
                <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0ea5e9&color=fff`} alt={user.name} />
              </Link>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button onClick={() => navigate('/login')} variant="secondary" size="sm">Login</Button>
              <Button onClick={() => navigate('/register')} size="sm">Sign up</Button>
            </div>
          )}

          <button 
            className={`${styles.iconBtn} md-hidden`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/posts" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Feed</Link>
          <Link to="/network" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Network</Link>
          <Link to="/careers" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Careers</Link>
          <Link to="/about" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>About</Link>
          <div style={{ borderTop: '1px solid var(--nexus-border)', paddingTop: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {user ? (
              <Button onClick={() => { logout(); setIsMenuOpen(false); }} variant="secondary" style={{ width: '100%' }}>Logout</Button>
            ) : (
              <>
                <Button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} variant="secondary" style={{ width: '100%' }}>Login</Button>
                <Button onClick={() => { navigate('/register'); setIsMenuOpen(false); }} style={{ width: '100%' }}>Sign up</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
