import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../config/api.js';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await apiFetch('/posts');
      const data = await response.json();
      
      if (data.success) {
        // Map backend fields to frontend expectations
        const enrichedPosts = data.data.map(post => ({
          ...post,
          id: post._id,
          body: post.content,
          excerpt: post.content.substring(0, 150) + '...',
          likes: post.likes ? post.likes.length : 0,
          date: post.createdAt,
          author: post.author || { name: 'Unknown', avatar: '' }
        }));
        setPosts(enrichedPosts);
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch posts');
      }
    } catch (err) {
      setError('Network error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (newPost) => {
    const token = localStorage.getItem('nexus_token');
    if (!token) return { success: false, message: 'Not logged in' };

    try {
      const response = await apiFetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.body || newPost.content,
          tags: newPost.tags || [],
          category: newPost.category || 'General'
        })
      });
      const data = await response.json();
      if (data.success) {
        fetchPosts(); // Refresh list to get populated author data
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      console.error("Add post error:", err);
      return { success: false, message: 'Network error' };
    }
  };

  const likePost = (postId) => {
    // In a fully complete app, this would hit PUT /api/posts/:id/like
    // For now we optimistically update locally
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.body && post.body.toLowerCase().includes(searchQuery.toLowerCase()))
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
