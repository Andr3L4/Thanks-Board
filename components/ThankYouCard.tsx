import React from 'react';
import type { ThankYouMessage } from '../types';

interface ThankYouCardProps {
  message: ThankYouMessage;
}

const ThankYouCard: React.FC<ThankYouCardProps> = ({ message }) => {
  return (
    <div
      className="p-6 rounded-lg shadow-lg transform text-slate-800 w-72 h-72 flex items-center justify-center transition-transform hover:scale-105"
      style={{
        transform: `rotate(${message.rotation}deg)`,
        backgroundColor: message.color,
      }}
    >
      <p className="text-xl font-medium leading-normal text-center font-serif">{message.text}</p>
    </div>
  );
};

export default ThankYouCard;
