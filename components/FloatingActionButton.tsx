import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-blue-600 hover:bg-blue-700 text-white font-bold w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
      aria-label="Add new message"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 sm:h-8 sm:w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
};

export default FloatingActionButton;