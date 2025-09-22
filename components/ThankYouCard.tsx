import React from 'react';
import type { ThankYouMessage } from '../types';

interface ThankYouCardProps {
  message: ThankYouMessage;
}

const ThankYouCard: React.FC<ThankYouCardProps> = ({ message }) => {
  return (
    <div
      className="p-10 rounded-xl shadow-xl transform bg-slate-50 w-full max-w-3xl min-h-[24rem] flex items-center justify-center"
      style={{ transform: `rotate(${message.rotation}deg)` }}
    >
      <p className="text-4xl font-semibold leading-relaxed text-center text-slate-800">{message.text}</p>
    </div>
  );
};

export default ThankYouCard;