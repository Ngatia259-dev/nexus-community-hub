import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.css';

const PostCard = ({ post }) => {
  const { id, title, excerpt, author, date, tags, likes } = post;
  
  // Placeholder for context-based like function
  const handleLike = (e) => {
    e.preventDefault();
    console.log(`Liked post ${id}`);
    // In actual implementation: dispatch({ type: 'LIKE_POST', payload: id })
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.authorInfo}>
          <img 
            src={author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=random`} 
            alt={author.name} 
            className={styles.avatar} 
          />
          <div>
            <h4 className={styles.authorName}>{author.name}</h4>
            <time className={styles.date}>{new Date(date).toLocaleDateString()}</time>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link to={`/posts/${id}`} className={styles.titleLink}>{title}</Link>
        </h2>
        <p className={styles.excerpt}>{excerpt}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.tags}>
          {tags && tags.map(tag => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
        
        <div className={styles.actions}>
          <button onClick={handleLike} className={styles.likeButton} aria-label="Like post">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>{likes || 0}</span>
          </button>
          <Link to={`/posts/${id}`} className={styles.readMore}>
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
