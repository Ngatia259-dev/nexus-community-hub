import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Hash, Info } from 'lucide-react';
import styles from './Sidebar.module.css';
import Card from '../shared/Card';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Card className={styles.aboutCard} style={{ padding: '24px' }}>
        <div className={styles.titleWrapper} style={{ color: 'var(--nexus-primary)' }}>
          <Info size={20} />
          <h3 className={styles.sectionTitle}>About Nexus</h3>
        </div>
        <p className={styles.aboutText}>
          Nexus is a community-driven platform for developers to share projects, find jobs, and build meaningful connections in tech.
        </p>
        <Link to="/about" className={styles.learnMore}>
          Learn more
        </Link>
      </Card>

      <section className={styles.section}>
        <div className={styles.titleWrapper}>
          <Hash size={20} />
          <h3 className={styles.sectionTitle}>Trending Topics</h3>
        </div>
        <div className={styles.tagGrid}>
          {['react', 'node', 'mongodb', 'careers', 'vite', 'tailwindcss'].map(tag => (
            <Link 
              key={tag} 
              to={`/posts?tag=${tag}`}
              className={styles.tag}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.titleWrapper}>
          <TrendingUp size={20} />
          <h3 className={styles.sectionTitle}>Popular Now</h3>
        </div>
        <div className={styles.postList}>
          {[1, 2, 3].map(i => (
            <Link key={i} to="/posts" className={styles.postItem}>
              <h4 className={styles.postItemTitle}>
                How I built a full-stack community hub in 12 weeks...
              </h4>
              <span className={styles.postItemMeta}>42 comments • 120 likes</span>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
