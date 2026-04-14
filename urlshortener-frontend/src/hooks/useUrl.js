import { useState } from 'react';
import { shortenUrl } from '../services/urlService';
import { useAuth } from './useAuth';

export const useUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const shorten = async (longUrl) => {
    setLoading(true);
    setError(null);
    try {
      const data = await shortenUrl(longUrl, user?.id);
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
      return `${baseUrl}/urls/${data.shortCode}`;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to shorten URL. Please try again.';
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { shorten, loading, error };
};
