import { LoaderContainer, LoaderIcon } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
      <LoaderIcon className="w-12 h-12 text-blue-600 animate-spin" />
      <p className="mt-4 text-lg font-medium text-gray-600">Loading awesome photos...</p>
    </div>
  );
};

export default LoadingSpinner;
