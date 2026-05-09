import React from 'react';
import styles from './Avatar.module.css';

const Avatar = ({ src, alt, initials, size = 'md', className = '' }) => {
  const avatarClasses = `${styles.avatar} ${styles[size]} ${className}`;

  if (src) {
    return <img src={src} alt={alt || 'Avatar'} className={avatarClasses} />;
  }

  return (
    <div className={`${avatarClasses} ${styles.initials}`}>
      {initials || '?'}
    </div>
  );
};

export default Avatar;
