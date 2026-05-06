import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <span>N</span>
              </div>
              <span>Nexus</span>
            </Link>
            <p className={styles.tagline}>
              Empowering developers to reach their full potential through connection and collaboration.
            </p>
          </div>
          
          <div>
            <h4 className={styles.heading}>Community</h4>
            <ul className={styles.linkList}>
              <li><Link to="/posts" className={styles.link}>Discussions</Link></li>
              <li><Link to="/network" className={styles.link}>Members</Link></li>
              <li><Link to="/about" className={styles.link}>Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.heading}>Resources</h4>
            <ul className={styles.linkList}>
              <li><Link to="/careers" className={styles.link}>Jobs</Link></li>
              <li><Link to="/about" className={styles.link}>About Us</Link></li>
              <li><Link to="/about" className={styles.link}>Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.heading}>Social</h4>
            <div className={styles.social}>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Nexus Community Hub. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.link}>Privacy Policy</a>
            <a href="#" className={styles.link}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
