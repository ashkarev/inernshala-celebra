import { useState, useReducer, useMemo, useCallback } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favouritesReducer, getInitialFavourites, ACTIONS } from '../context/favouritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos(30);
  const [searchQuery, setSearchQuery] = useState('');
  const [favourites, dispatch] = useReducer(favouritesReducer, [], getInitialFavourites);

  // useMemo for filtering to prevent re-running filter on unrelated re-renders
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    return photos.filter((photo) => 
      photo.author.toLowerCase().includes(lowerCaseQuery)
    );
  }, [photos, searchQuery]);

  // useCallback to keep func ref stable for SearchBar React.memo
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleToggleFavourite = useCallback((photo) => {
    dispatch({ type: ACTIONS.TOGGLE_FAVOURITE, payload: photo });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          Discover Stunning Photos
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500">
          A curated gallery powered by Picsum. Find your favourites.
        </p>
      </div>

      <SearchBar value={searchQuery} onChange={handleSearchChange} />

      {filteredPhotos.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No photos found matching "{searchQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.some((fav) => fav.id === photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
