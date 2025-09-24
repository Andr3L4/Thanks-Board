import React, { useState, useEffect } from 'react';
import SuggestionComponent from './SuggestionComponent';

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
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-black border-2 border-[#FEF200] rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-[#FEF200] mb-4">Add a message of gratitude</h2>
        <p className="text-gray-300 mb-6">Your message will be posted anonymously to the wall for others to see.</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-36 p-3 bg-gray-900 text-gray-200 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FEF200] resize-none placeholder-gray-500"
            placeholder="Write your thank you note here..."
            maxLength={280}
            required
            autoFocus
          />
           <SuggestionComponent onUseSuggestion={setText} />
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-400">{text.length} / 280</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-[#FEF200] hover:bg-[#E5D900] text-black font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!text.trim()}
              >
                Post Anonymously
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMessageModal;