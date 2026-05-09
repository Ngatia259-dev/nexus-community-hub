import React, { useState } from 'react';
import styles from './CreatePostForm.module.css';

const CATEGORIES = ['General', 'Showcase', 'Help', 'Discussion', 'Careers'];

const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.length < 5) newErrors.title = 'Title must be at least 5 characters';
    
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    else if (formData.content.length < 20) newErrors.content = 'Content must be at least 20 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        id: Date.now().toString(),
        author: { name: 'Current User', avatar: '' }, // Should come from AuthContext
        date: new Date().toISOString(),
        likes: 0
      };
      
      console.log('New Post Created:', newPost);
      // In actual implementation: dispatch({ type: 'ADD_POST', payload: newPost })
      
      // Reset form
      setFormData({ title: '', content: '', category: 'General', tags: '' });
      alert('Post created successfully!');
    } catch (error) {
      console.error('Failed to create post:', error);
      setErrors({ submit: 'Failed to create post. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {errors.submit && <div className={styles.errorBanner}>{errors.submit}</div>}
      
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          placeholder="What's on your mind?"
        />
        {errors.title && <span className={styles.errorText}>{errors.title}</span>}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.select}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tags" className={styles.label}>Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className={styles.input}
            placeholder="react, javascript (comma separated)"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={`${styles.textarea} ${errors.content ? styles.inputError : ''}`}
          placeholder="Share your thoughts, ask a question, or start a discussion..."
          rows="8"
        />
        {errors.content && <span className={styles.errorText}>{errors.content}</span>}
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.cancelButton} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
