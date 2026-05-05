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
              <Link to={`/profile/${user.username}`} className={styles.avatar}>
                <img src={user.avatar} alt={user.name} />
              </Link>
            </>
          ) : (
            <Button onClick={() => logout()} size="sm">Login</Button>
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
          <div style={{ borderTop: '1px solid var(--nexus-border)', paddingTop: '12px', marginTop: '4px' }}>
            {user ? (
              <Button onClick={() => { logout(); setIsMenuOpen(false); }} variant="secondary" style={{ width: '100%' }}>Logout</Button>
            ) : (
              <Button onClick={() => { logout(); setIsMenuOpen(false); }} style={{ width: '100%' }}>Login</Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
