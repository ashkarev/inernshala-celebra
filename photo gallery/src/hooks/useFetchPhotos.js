import { useState, useEffect } from 'react';

const useFetchPhotos = (limit = 30) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://picsum.photos/v2/list?limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        
        // Prevent state update if component unmounted
        if (!cancelled) {
          setPhotos(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'An error occurred while fetching photos');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPhotos();

    // Cleanup function sets cancelled to true
    return () => {
      cancelled = true;
    };
  }, [limit]); // Fetch again if limit changes, though here it's static

  return { photos, loading, error };
};

export default useFetchPhotos;
