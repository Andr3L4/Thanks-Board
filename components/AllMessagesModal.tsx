import React, { useState } from 'react';
import type { ThankYouMessage } from '../types';

interface AllMessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ThankYouMessage[];
  onDeleteMessage: (id: number) => void;
}

const AllMessagesModal: React.FC<AllMessagesModalProps> = ({ isOpen, onClose, messages, onDeleteMessage }) => {
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(null);
  
  if (!isOpen) {
    return null;
  }
  
  const handleConfirmDelete = (id: number) => {
    onDeleteMessage(id);
    setConfirmingDeleteId(null);
  }

  const handleCancelDelete = () => {
    setConfirmingDeleteId(null);
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={() => {
        onClose();
        handleCancelDelete();
      }}
    >
      <div
        className="bg-slate-800 rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all border border-slate-700 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '85vh' }}
      >
        <h2 className="text-3xl font-bold text-white mb-4 flex-shrink-0">Gratitude Archive</h2>
        <p className="text-slate-300 mb-6 flex-shrink-0">
          {messages.length > 0
            ? `Here are all the messages from the last 7 days. Hover to delete.`
            : `The archive is empty. Add a message to get started!`}
        </p>
        
        <div className="overflow-y-auto pr-4 -mr-4">
          {messages.map((msg) => (
            <div key={msg.id} className="group bg-slate-900/70 p-4 rounded-lg mb-4 border border-slate-700 flex justify-between items-center min-h-[4rem]">
              {confirmingDeleteId === msg.id ? (
                <div className="w-full flex justify-between items-center">
                  <p className="text-slate-300 font-semibold">Are you sure?</p>
                  <div className="space-x-2">
                    <button onClick={() => handleConfirmDelete(msg.id)} className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors">
                      Yes, Delete
                    </button>
                    <button onClick={handleCancelDelete} className="px-3 py-1 rounded-md bg-slate-600 hover:bg-slate-500 text-white text-sm font-semibold transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-slate-200">{msg.text}</p>
                  <button
                    onClick={() => setConfirmingDeleteId(msg.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-500 ml-4 flex-shrink-0"
                    aria-label="Delete message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              handleCancelDelete();
            }}
            className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllMessagesModal;