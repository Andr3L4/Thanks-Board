import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  onAddClick: () => void;
  onViewClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick, onViewClick }) => {
  return (
    <header className="bg-black text-white p-4 shadow-lg w-full flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center">
        <Logo />
      </div>
      <nav className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onViewClick}
          className="font-semibold text-white hover:text-[#FEF200] transition-colors px-3 py-2 text-sm sm:text-base"
        >
          View All
        </button>
        <button
          onClick={onAddClick}
          className="bg-[#FEF200] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#E5D900] transition-colors text-sm sm:text-base"
        >
          Add Gratitude
        </button>
      </nav>
    </header>
  );
};

export default Header;