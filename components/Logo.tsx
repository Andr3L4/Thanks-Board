import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="w-10 h-10 flex items-center justify-center" role="img" aria-label="Gratitude Wall Logo">
      <span className="text-white text-4xl font-display" style={{ lineHeight: 1 }}>G</span>
    </div>
  );
};

export default Logo;