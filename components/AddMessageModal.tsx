import React, { useState, useEffect } from 'react';

interface AddMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMessage: (text: string) => void;
}

const AddMessageModal: React.FC<AddMessageModalProps> = ({ isOpen, onClose, onAddMessage }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setText('');
    }
  }, [isOpen]);
  
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMessage(text);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Share Your Gratitude</h2>
        <p className="text-slate-300 mb-6">Your message will be posted anonymously. What are you thankful for today?</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-40 p-4 bg-slate-900 text-slate-200 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-slate-500"
            placeholder="Write your thank you note here..."
            maxLength={280}
            required
          />
          <div className="flex justify-end items-center mt-6 space-x-4">
             <span className="text-sm text-slate-400">{text.length} / 280</span>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!text.trim()}
            >
              Post Anonymously
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMessageModal;