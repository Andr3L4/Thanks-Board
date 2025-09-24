import React from 'react';

interface ViewMessagesButtonProps {
  onClick: () => void;
}

const ViewMessagesButton: React.FC<ViewMessagesButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 bg-[#FEF200] hover:bg-yellow-400 text-black font-bold w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50 border-2 border-black/50"
      aria-label="View all messages"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 sm:h-8 sm:w-8"
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