// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL.endsWith('/api') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/api`)
  : 'https://nexus-community-hub.onrender.com/api';

// Helper function to make API calls with the base URL
export const apiFetch = async (endpoint, options = {}) => {
  // Ensure endpoint starts with /
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${formattedEndpoint}`;
  return fetch(url, options);
};
