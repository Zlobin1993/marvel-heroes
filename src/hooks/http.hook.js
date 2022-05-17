import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false),
    [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${response.status}.`)
      }

      const data = await response.json();

      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { isLoading, request, error, clearError };
}

export default useHttp;
