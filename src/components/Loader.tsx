'use client';

const Loader = () => {
  return (
    <div className="max-w-3xl mx-auto p-5 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-700 font-semibold">Checking your text...</span>
      </div>
    </div>
  );
};

export default Loader;