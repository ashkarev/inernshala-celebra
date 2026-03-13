import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200 min-h-[50vh]">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-red-700 mb-2">Oops! Something went wrong.</h2>
      <p className="text-red-600 text-center">{message}</p>
    </div>
  );
};

export default ErrorMessage;
