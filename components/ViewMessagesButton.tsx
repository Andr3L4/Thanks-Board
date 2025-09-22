import React from 'react';

interface ViewMessagesButtonProps {
  onClick: () => void;
}

const ViewMessagesButton: React.FC<ViewMessagesButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 left-8 bg-blue-600 hover:bg-blue-700 text-white font-bold w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
      aria-label="View all messages"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    </button>
  );
};

export default ViewMessagesButton;