import React from 'react';
import type { ThankYouMessage } from '../types';

interface ThankYouCardProps {
  message: ThankYouMessage;
}

const ThankYouCard: React.FC<ThankYouCardProps> = ({ message }) => {
  return (
    <div
      className="p-5 rounded-md shadow-lg transform bg-black text-[#FEF200] border-2 border-[#FEF200] w-full sm:w-64 h-64 md:w-60 md:h-60 flex flex-col justify-center transition-transform duration-200 hover:scale-105 hover:shadow-xl"
      style={{
        transform: `rotate(${message.rotation}deg)`,
      }}
    >
      <p className="text-lg font-medium leading-normal text-center">{message.text}</p>
    </div>
  );
};

export default ThankYouCard;