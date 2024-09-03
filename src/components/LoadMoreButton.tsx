import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  hasMore: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, hasMore }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onClick}
        disabled={!hasMore}
        className={`px-6 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${
          hasMore
            ? 'bg-teal-500 hover:bg-teal-600'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreButton;