import React from 'react';
import type { ThankYouMessage } from '../types';

interface ThankYouCardProps {
  message: ThankYouMessage;
}

const ThankYouCard: React.FC<ThankYouCardProps> = ({ message }) => {
  return (
    <div
      className="p-6 rounded-lg shadow-lg transform text-[#FEF200] w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center transition-transform hover:scale-105 bg-black border border-[#FEF200]/50"
      style={{
        transform: `rotate(${message.rotation}deg)`,
      }}
    >
      <p className="text-lg sm:text-xl font-medium leading-normal text-center font-serif">{message.text}</p>
    </div>
  );
};

export default ThankYouCard;