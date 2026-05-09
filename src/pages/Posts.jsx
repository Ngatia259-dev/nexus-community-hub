import React, { useState, useEffect } from 'react';
import PostList from '../components/Post/PostList';
import styles from './Posts.module.css';

// Mock data for development
const MOCK_POSTS = [
  {
    id: '1',
    title: 'How to use React Context API effectively',
    excerpt: 'React Context provides a way to pass data through the component tree without having to pass props down manually at every level. In this post, we explore best practices...',
    author: { name: 'Sarah Drasner', avatar: '' },
    date: '2023-10-15T10:00:00Z',
    tags: ['react', 'javascript', 'frontend'],
    likes: 42
  },
  {
    id: '2',
    title: 'CSS Modules vs Tailwind CSS',
    excerpt: 'A comprehensive comparison between two of the most popular styling approaches in modern web development. Which one should you choose for your next project?',
    author: { name: 'Adam Wathan', avatar: '' },
    date: '2023-10-16T14:30:00Z',
    tags: ['css', 'tailwind', 'styling'],
    likes: 128
  },
  {
    id: '3',
    title: 'Building a Full-Stack App with Vite',
    excerpt: 'Vite has revolutionized frontend tooling. Let\'s see how we can pair it with a Node.js backend to create a blazingly fast full-stack application.',
    author: { name: 'Evan You', avatar: '' },
    date: '2023-10-18T09:15:00Z',
    tags: ['vite', 'node', 'fullstack'],
    likes: 85
  }
];

const Posts = () => {
  // In real app, we'd use useFetch and useSearch hooks
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    // Simulate API fetch delay
    const fetchPosts = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setPosts(MOCK_POSTS);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Get all unique tags from available posts
  const allTags = Array.from(new Set(MOCK_POSTS.flatMap(post => post.tags)));

  // Filter posts based on search term and selected tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Community Feed</h1>
          <p className={styles.subtitle}>Discover discussions, projects, and ideas from the community.</p>
        </div>
        
        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search posts..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Filter by Topic</h3>
            <div className={styles.tagChips}>
              <button 
                className={`${styles.tagChip} ${selectedTag === null ? styles.activeTag : ''}`}
                onClick={() => setSelectedTag(null)}
              >
                All Topics
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`${styles.tagChip} ${selectedTag === tag ? styles.activeTag : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className={styles.feed}>
          <PostList posts={filteredPosts} loading={loading} error={error} />
        </section>
      </div>
    </div>
  );
};

export default Posts;
