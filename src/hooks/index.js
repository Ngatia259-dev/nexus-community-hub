import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api.js';

// useFetch Hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fullUrl;
        if (url.startsWith('http')) {
          fullUrl = url;
        } else {
          // Ensure URL starts with / if not already present
          const formattedPath = url.startsWith('/') ? url : `/${url}`;
          fullUrl = `${API_BASE_URL}${formattedPath}`;
        }
        const response = await fetch(fullUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// useLocalStorage Hook
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// useSearch Hook (Debounced)
export const useSearch = (query, items, filterFn) => {
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query) {
        setFilteredItems(items);
        return;
      }
      setFilteredItems(items.filter(item => filterFn(item, query)));
    }, 300);

    return () => clearTimeout(handler);
  }, [query, items, filterFn]);

  return filteredItems;
};
