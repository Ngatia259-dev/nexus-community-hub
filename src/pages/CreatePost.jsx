import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePostForm from '../components/Post/CreatePostForm';
import styles from './CreatePost.module.css';

const CreatePost = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <button 
          onClick={() => navigate(-1)} 
          className={styles.backButton}
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
        <div className={styles.titleContent}>
          <h1 className={styles.title}>Create a New Post</h1>
          <p className={styles.subtitle}>Share your knowledge, ask a question, or start a discussion with the community.</p>
        </div>
      </div>

      <div className={styles.formContainer}>
        <CreatePostForm />
      </div>
      
      <div className={styles.guidelines}>
        <h3 className={styles.guidelinesTitle}>Posting Guidelines</h3>
        <ul className={styles.guidelinesList}>
          <li>Be respectful and welcoming to all members.</li>
          <li>Ensure your content is relevant to the community.</li>
          <li>Use clear and descriptive titles.</li>
          <li>Add appropriate tags to help others find your post.</li>
        </ul>
      </div>
    </div>
  );
};

export default CreatePost;
