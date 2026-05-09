import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ variant = 'spinner', className = '' }) => {
  if (variant === 'skeleton') {
    return (
      <div className={`${styles.skeleton} ${className}`}>
        <div className={styles.skeletonHeader}>
          <div className={styles.skeletonAvatar}></div>
          <div className={styles.skeletonTitle}></div>
        </div>
        <div className={styles.skeletonBody}></div>
        <div className={styles.skeletonBodyShort}></div>
      </div>
    );
  }

  return (
    <div className={`${styles.spinnerContainer} ${className}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
