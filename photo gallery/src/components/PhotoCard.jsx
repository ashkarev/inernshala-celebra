import { Heart } from 'lucide-react';

const PhotoCard = ({ photo, isFavourite, onToggleFavourite }) => {
  return (
    <div className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex justify-between items-center text-white">
          <p className="font-medium truncate pr-4 text-sm md:text-base">
            {photo.author}
          </p>
          <button
            onClick={() => onToggleFavourite(photo)}
            className="p-2 -mr-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart
              className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${
                isFavourite ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>
        </div>
      </div>
      
      {/* Mobile persistent view for favourites */}
      {isFavourite && (
        <div className="absolute top-3 right-3 lg:hidden">
          <Heart className="w-5 h-5 fill-red-500 text-red-500 drop-shadow-md" />
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
