export const ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
  CLEAR_FAVOURITES: 'CLEAR_FAVOURITES',
};

// Initialize from localStorage if available
export const getInitialFavourites = () => {
  try {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse favourites from localStorage', error);
    return [];
  }
};

export const favouritesReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case ACTIONS.TOGGLE_FAVOURITE: {
      const isFavourite = state.some((photo) => photo.id === action.payload.id);
      if (isFavourite) {
        // Remove from favourites
        newState = state.filter((photo) => photo.id !== action.payload.id);
      } else {
        // Add to favourites
        newState = [...state, action.payload];
      }
      break;
    }
    case ACTIONS.CLEAR_FAVOURITES:
      newState = [];
      break;
    default:
      return state;
  }

  // Persist to localStorage
  try {
    localStorage.setItem('favourites', JSON.stringify(newState));
  } catch (error) {
    console.error('Failed to save favourites to localStorage', error);
  }

  return newState;
};
