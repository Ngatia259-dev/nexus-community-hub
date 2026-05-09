import React from 'react';
import PostCard from './PostCard';
import styles from './PostList.module.css';

const PostList = ({ posts, loading, error }) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIllustration}>📭</div>
        <h3 className={styles.emptyTitle}>No posts found</h3>
        <p className={styles.emptyText}>Be the first to share something with the community!</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
