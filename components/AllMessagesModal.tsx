import React from 'react';
import type { ThankYouMessage } from '../types';

interface AllMessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ThankYouMessage[];
  onDeleteMessage: (id: number) => void;
}

const AllMessagesModal: React.FC<AllMessagesModalProps> = ({ isOpen, onClose, messages, onDeleteMessage }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-black border-2 border-[#FEF200] rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-2xl transform transition-all flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        <h2 className="text-2xl font-bold text-[#FEF200] mb-4 flex-shrink-0">All Messages</h2>
        <p className="text-gray-300 mb-6 flex-shrink-0">
          {messages.length > 0
            ? `Here are all the messages from the last 7 days.`
            : `The archive is empty. Add a message to get started!`}
        </p>
        
        <div className="overflow-y-auto pr-2 -mr-2">
          {messages.length > 0 ? messages.map((msg) => (
            <div key={msg.id} className="group bg-gray-900 p-4 rounded-md mb-3 flex justify-between items-start gap-4">
              <p className="text-gray-200 break-words flex-1">{msg.text}</p>
              <button
                onClick={() => onDeleteMessage(msg.id)}
                className="opacity-50 hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-500 flex-shrink-0 p-1"
                aria-label="Delete message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )) : null}
        </div>

        <div className="flex justify-end mt-6 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-[#FEF200] hover:bg-[#E5D900] text-black font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllMessagesModal;