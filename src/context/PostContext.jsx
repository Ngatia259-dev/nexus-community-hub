import React, { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Mock data fetching from JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const data = await response.json();
      
      // Enrich data with Nexus-specific fields
      const enrichedPosts = data.map(post => ({
        ...post,
        likes: Math.floor(Math.random() * 100),
        author: {
          name: `User ${post.userId}`,
          username: `user${post.userId}`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId}`
        },
        date: new Date().toLocaleDateString(),
        category: 'Engineering'
      }));
      
      setPosts(enrichedPosts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const addPost = (newPost) => {
    const postWithMeta = {
      ...newPost,
      id: posts.length + 1,
      userId: 1,
      likes: 0,
      date: new Date().toLocaleDateString(),
      author: {
        name: 'Ngatia dev',
        username: 'Ngatia259-dev',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngatia'
      }
    };
    setPosts([postWithMeta, ...posts]);
  };

  const likePost = (postId) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PostContext.Provider value={{ 
      posts: filteredPosts, 
      allPosts: posts,
      loading, 
      error, 
      fetchPosts, 
      addPost, 
      likePost,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePosts must be used within a PostProvider');
  return context;
};
